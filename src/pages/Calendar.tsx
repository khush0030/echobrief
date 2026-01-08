import { useEffect, useState } from 'react';
import { DashboardLayout } from '@/components/dashboard/DashboardLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Calendar as CalendarIcon, ExternalLink, Video, Loader2, RefreshCw, Clock, Link as LinkIcon } from 'lucide-react';
import { Link } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { format, isToday, parseISO, isTomorrow } from 'date-fns';

interface CalendarEvent {
  id: string;
  title: string;
  start: string;
  end: string;
  meetingLink: string | null;
  source: string;
  status: string;
}

export default function CalendarPage() {
  const { user, session } = useAuth();
  const [events, setEvents] = useState<CalendarEvent[]>([]);
  const [loading, setLoading] = useState(true);
  const [syncing, setSyncing] = useState(false);
  const [isConnected, setIsConnected] = useState(false);
  const [isSampleData, setIsSampleData] = useState(false);

  const fetchCalendarEvents = async () => {
    if (!session?.access_token) return;

    try {
      const response = await fetch(
        `https://zuljmldniwynmnilnffu.supabase.co/functions/v1/sync-google-calendar`,
        {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${session.access_token}`,
            'Content-Type': 'application/json',
          },
        }
      );

      const data = await response.json();
      
      if (data.events) {
        setEvents(data.events);
        setIsConnected(true);
        setIsSampleData(data.isSample || false);
      } else if (data.error === "Google Calendar not connected") {
        setIsConnected(false);
      }
    } catch (error) {
      console.error('Error fetching calendar:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSync = async () => {
    setSyncing(true);
    await fetchCalendarEvents();
    setSyncing(false);
  };

  useEffect(() => {
    // Check if Google Calendar is connected
    const checkConnection = async () => {
      if (!user) return;
      
      const { data: profile } = await supabase
        .from('profiles')
        .select('google_calendar_connected')
        .eq('user_id', user.id)
        .single();

      setIsConnected(profile?.google_calendar_connected || false);
      
      if (profile?.google_calendar_connected) {
        await fetchCalendarEvents();
      } else {
        setLoading(false);
      }
    };

    checkConnection();
  }, [user, session]);

  const todayEvents = events.filter(e => isToday(parseISO(e.start)));
  const upcomingEvents = events.filter(e => !isToday(parseISO(e.start)));

  const formatEventTime = (start: string, end: string) => {
    const startDate = parseISO(start);
    const endDate = parseISO(end);
    return `${format(startDate, 'h:mm a')} - ${format(endDate, 'h:mm a')}`;
  };

  const getEventDateLabel = (start: string) => {
    const date = parseISO(start);
    if (isToday(date)) return 'Today';
    if (isTomorrow(date)) return 'Tomorrow';
    return format(date, 'EEEE, MMM d');
  };

  if (loading) {
    return (
      <DashboardLayout>
        <div className="flex items-center justify-center min-h-[400px]">
          <Loader2 className="w-8 h-8 animate-spin text-muted-foreground" />
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="p-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Calendar</h1>
            <p className="text-muted-foreground mt-1">
              View and manage your upcoming meetings
            </p>
          </div>
          {isConnected && (
            <Button variant="outline" onClick={handleSync} disabled={syncing} className="gap-2">
              <RefreshCw className={`w-4 h-4 ${syncing ? 'animate-spin' : ''}`} />
              Sync
            </Button>
          )}
        </div>

        {!isConnected ? (
          <Card className="lg:col-span-2">
            <CardContent className="py-12 text-center">
              <div className="w-16 h-16 rounded-full bg-muted mx-auto mb-4 flex items-center justify-center">
                <CalendarIcon className="w-8 h-8 text-muted-foreground" />
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-2">
                Connect Your Calendar
              </h3>
              <p className="text-muted-foreground mb-6 max-w-md mx-auto">
                Link your Google Calendar to automatically detect upcoming meetings and get reminders to start recording.
              </p>
              <div className="flex items-center justify-center gap-4">
                <Link to="/settings">
                  <Button className="gap-2">
                    <ExternalLink className="w-4 h-4" />
                    Connect Google Calendar
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        ) : (
          <>
            {isSampleData && (
              <div className="mb-6 p-4 bg-muted/50 rounded-lg border border-border">
                <p className="text-sm text-muted-foreground">
                  📅 Showing sample calendar events. Your actual Google Calendar events will appear once the full OAuth flow is configured.
                </p>
              </div>
            )}

            <div className="grid gap-6 lg:grid-cols-2">
              {/* Today's Meetings */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Video className="w-5 h-5 text-primary" />
                    Today's Meetings
                  </CardTitle>
                  <CardDescription>
                    {todayEvents.length} meeting{todayEvents.length !== 1 ? 's' : ''} scheduled for today
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {todayEvents.length === 0 ? (
                    <div className="py-8 text-center text-muted-foreground">
                      <p>No meetings scheduled for today</p>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {todayEvents.map((event) => (
                        <div
                          key={event.id}
                          className="p-4 rounded-lg border border-border bg-card hover:bg-muted/50 transition-colors"
                        >
                          <div className="flex items-start justify-between">
                            <div className="flex-1">
                              <h4 className="font-medium text-foreground">{event.title}</h4>
                              <div className="flex items-center gap-2 mt-1 text-sm text-muted-foreground">
                                <Clock className="w-3.5 h-3.5" />
                                {formatEventTime(event.start, event.end)}
                              </div>
                              {event.meetingLink && (
                                <a 
                                  href={event.meetingLink}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="flex items-center gap-1.5 mt-2 text-sm text-primary hover:underline"
                                >
                                  <LinkIcon className="w-3.5 h-3.5" />
                                  Join meeting
                                </a>
                              )}
                            </div>
                            <Badge variant="outline" className="text-xs">
                              {event.source === 'google_calendar' ? 'Google' : 'Manual'}
                            </Badge>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* This Week */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <CalendarIcon className="w-5 h-5 text-primary" />
                    This Week
                  </CardTitle>
                  <CardDescription>
                    {upcomingEvents.length} upcoming meeting{upcomingEvents.length !== 1 ? 's' : ''}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {upcomingEvents.length === 0 ? (
                    <div className="py-8 text-center text-muted-foreground">
                      <p>No upcoming meetings this week</p>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {upcomingEvents.map((event) => (
                        <div
                          key={event.id}
                          className="p-4 rounded-lg border border-border bg-card hover:bg-muted/50 transition-colors"
                        >
                          <div className="flex items-start justify-between">
                            <div className="flex-1">
                              <h4 className="font-medium text-foreground">{event.title}</h4>
                              <p className="text-sm text-muted-foreground mt-0.5">
                                {getEventDateLabel(event.start)}
                              </p>
                              <div className="flex items-center gap-2 mt-1 text-sm text-muted-foreground">
                                <Clock className="w-3.5 h-3.5" />
                                {formatEventTime(event.start, event.end)}
                              </div>
                              {event.meetingLink && (
                                <a 
                                  href={event.meetingLink}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="flex items-center gap-1.5 mt-2 text-sm text-primary hover:underline"
                                >
                                  <LinkIcon className="w-3.5 h-3.5" />
                                  Join meeting
                                </a>
                              )}
                            </div>
                            <Badge variant="outline" className="text-xs">
                              {event.source === 'google_calendar' ? 'Google' : 'Manual'}
                            </Badge>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          </>
        )}
      </div>
    </DashboardLayout>
  );
}
