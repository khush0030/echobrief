import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";
import { getCorsHeaders, handleCorsPrelight } from "../_shared/cors.ts";

serve(async (req) => {
  const corsResponse = handleCorsPrelight(req);
  if (corsResponse) return corsResponse;

  const origin = req.headers.get("origin");
  const corsHeaders = getCorsHeaders(origin);

  try {
    // Get user from auth header
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

    const token = authHeader.replace("Bearer ", "");
    const { data: { user }, error: userError } = await supabase.auth.getUser(token);

    if (userError || !user) {
      return new Response(
        JSON.stringify({ error: "Invalid user token" }),
        { status: 401, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Get user's Google access token
    const { data: tokenData, error: tokenError } = await supabase
      .from("user_oauth_tokens")
      .select("google_access_token")
      .eq("user_id", user.id)
      .single();

    if (tokenError || !tokenData?.google_access_token) {
      return new Response(
        JSON.stringify({ error: "Google calendar not connected" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    console.log(`[sync-google-calendar] Fetching calendars for user ${user.id}`);

    // Fetch calendars from Google Calendar API
    const calendarResponse = await fetch(
      "https://www.googleapis.com/calendar/v3/users/me/calendarList",
      {
        headers: {
          "Authorization": `Bearer ${tokenData.google_access_token}`,
          "Content-Type": "application/json",
        },
      }
    );

    console.log(`[sync-google-calendar] Google API response: ${calendarResponse.status}`);

    if (!calendarResponse.ok) {
      const errorText = await calendarResponse.text();
      console.error(`[sync-google-calendar] Google API error: ${errorText}`);
      return new Response(
        JSON.stringify({ error: `Google API error: ${calendarResponse.status}` }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const { items: calendars } = await calendarResponse.json();
    console.log(`[sync-google-calendar] Got ${calendars?.length || 0} calendars`);

    if (!calendars || calendars.length === 0) {
      return new Response(
        JSON.stringify({ success: true, calendars: [], events: 0 }),
        { headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Save calendars to DB
    const calendarInserts = calendars.map((cal: any) => ({
      user_id: user.id,
      provider: "google",
      calendar_id: cal.id,
      calendar_name: cal.summary,
      email: cal.id,
      is_primary: cal.primary || false,
      is_active: true,
    }));

    const { error: upsertError } = await supabase
      .from("calendars")
      .upsert(calendarInserts, { onConflict: "user_id,calendar_id" });

    if (upsertError) {
      console.error(`[sync-google-calendar] Upsert error: ${upsertError.message}`);
      return new Response(
        JSON.stringify({ error: "Failed to save calendars" }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    console.log(`[sync-google-calendar] Successfully saved ${calendarInserts.length} calendars`);

    // Fetch events for all calendars
    let totalEvents = 0;

    for (const cal of calendars) {
      try {
        const eventsResponse = await fetch(
          `https://www.googleapis.com/calendar/v3/calendars/${encodeURIComponent(cal.id)}/events?maxResults=50&orderBy=startTime&singleEvents=true&timeMin=${new Date().toISOString()}`,
          {
            headers: {
              "Authorization": `Bearer ${tokenData.google_access_token}`,
              "Content-Type": "application/json",
            },
          }
        );

        if (eventsResponse.ok) {
          const { items: events } = await eventsResponse.json();

          if (events && events.length > 0) {
            const eventInserts = events.map((event: any) => ({
              user_id: user.id,
              calendar_id: cal.id,
              event_id: event.id,
              title: event.summary,
              description: event.description,
              start_time: event.start?.dateTime || event.start?.date,
              end_time: event.end?.dateTime || event.end?.date,
              location: event.location,
              meeting_link: event.hangoutLink || event.conferenceData?.entryPoints?.[0]?.uri,
              organizer_name: event.organizer?.displayName,
              organizer_email: event.organizer?.email,
              attendees: event.attendees || [],
              is_recurring: false,
              raw_data: event,
            }));

            const { error: eventError } = await supabase
              .from("calendar_events")
              .upsert(eventInserts, { onConflict: "user_id,event_id" });

            if (!eventError) {
              totalEvents += eventInserts.length;
              console.log(`[sync-google-calendar] Synced ${eventInserts.length} events from ${cal.summary}`);
            }
          }
        }
      } catch (err) {
        console.error(`[sync-google-calendar] Error syncing calendar ${cal.id}:`, err);
      }
    }

    return new Response(
      JSON.stringify({
        success: true,
        calendars: calendarInserts.length,
        events: totalEvents,
      }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.error("[sync-google-calendar] Error:", error);
    return new Response(
      JSON.stringify({ error: error instanceof Error ? error.message : "Unknown error" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
