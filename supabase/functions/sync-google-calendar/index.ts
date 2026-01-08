import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const googleClientId = Deno.env.get("GOOGLE_CLIENT_ID");
    const googleClientSecret = Deno.env.get("GOOGLE_CLIENT_SECRET");

    if (!googleClientId || !googleClientSecret) {
      return new Response(
        JSON.stringify({ error: "Google credentials not configured" }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Get the authorization header
    const authHeader = req.headers.get("authorization");
    if (!authHeader) {
      return new Response(
        JSON.stringify({ error: "Authorization required" }),
        { status: 401, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const supabaseServiceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    // Get user from token
    const token = authHeader.replace("Bearer ", "");
    const { data: { user }, error: userError } = await supabase.auth.getUser(token);

    if (userError || !user) {
      return new Response(
        JSON.stringify({ error: "Invalid user token" }),
        { status: 401, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Check if user has Google Calendar connected
    const { data: profile } = await supabase
      .from("profiles")
      .select("google_calendar_connected")
      .eq("user_id", user.id)
      .single();

    if (!profile?.google_calendar_connected) {
      return new Response(
        JSON.stringify({ error: "Google Calendar not connected", events: [] }),
        { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // For demo purposes, return mock calendar events since full OAuth flow 
    // requires user token exchange which needs frontend OAuth implementation
    // In production, you would store the user's Google access token and use it here
    
    const now = new Date();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const endOfWeek = new Date(today);
    endOfWeek.setDate(endOfWeek.getDate() + 7);

    // Get existing meetings from database to show as calendar events
    const { data: meetings, error: meetingsError } = await supabase
      .from("meetings")
      .select("*")
      .eq("user_id", user.id)
      .gte("start_time", today.toISOString())
      .lte("start_time", endOfWeek.toISOString())
      .order("start_time", { ascending: true });

    if (meetingsError) {
      console.error("Error fetching meetings:", meetingsError);
    }

    // Transform meetings to calendar event format
    const events = (meetings || []).map(meeting => ({
      id: meeting.id,
      title: meeting.title,
      start: meeting.start_time,
      end: meeting.end_time || new Date(new Date(meeting.start_time).getTime() + 60 * 60 * 1000).toISOString(),
      meetingLink: meeting.meeting_link,
      source: meeting.source || "manual",
      status: meeting.status,
    }));

    // Add sample upcoming meetings if calendar is connected but no events exist
    // This helps demonstrate the feature
    if (events.length === 0 && profile?.google_calendar_connected) {
      const sampleEvents = [
        {
          id: "sample-1",
          title: "Team Standup",
          start: new Date(today.getTime() + 10 * 60 * 60 * 1000).toISOString(), // 10 AM today
          end: new Date(today.getTime() + 10.5 * 60 * 60 * 1000).toISOString(),
          meetingLink: "https://meet.google.com/abc-defg-hij",
          source: "google_calendar",
          status: "scheduled",
        },
        {
          id: "sample-2", 
          title: "Product Review",
          start: new Date(today.getTime() + 14 * 60 * 60 * 1000).toISOString(), // 2 PM today
          end: new Date(today.getTime() + 15 * 60 * 60 * 1000).toISOString(),
          meetingLink: "https://meet.google.com/xyz-uvwx-rst",
          source: "google_calendar",
          status: "scheduled",
        },
        {
          id: "sample-3",
          title: "1:1 with Manager",
          start: new Date(today.getTime() + (24 + 11) * 60 * 60 * 1000).toISOString(), // 11 AM tomorrow
          end: new Date(today.getTime() + (24 + 11.5) * 60 * 60 * 1000).toISOString(),
          meetingLink: null,
          source: "google_calendar",
          status: "scheduled",
        },
        {
          id: "sample-4",
          title: "Sprint Planning",
          start: new Date(today.getTime() + (48 + 10) * 60 * 60 * 1000).toISOString(), // Day after tomorrow
          end: new Date(today.getTime() + (48 + 12) * 60 * 60 * 1000).toISOString(),
          meetingLink: "https://zoom.us/j/123456789",
          source: "google_calendar",
          status: "scheduled",
        },
      ];
      
      return new Response(
        JSON.stringify({ events: sampleEvents, isSample: true }),
        { headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    return new Response(
      JSON.stringify({ events, isSample: false }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.error("Sync calendar error:", error);
    return new Response(
      JSON.stringify({ error: error instanceof Error ? error.message : "Unknown error" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
