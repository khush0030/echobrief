import React, { createContext, useContext, useState } from 'react';

interface CalendarEvent {
  id: string;
  title: string;
  start_time: string;
  end_time: string;
  is_all_day: boolean;
}

interface CalendarContextType {
  events: CalendarEvent[];
  setEvents: (events: CalendarEvent[]) => void;
  synced: boolean;
  setSynced: (synced: boolean) => void;
  lastSyncTime: Date | null;
  setLastSyncTime: (time: Date | null) => void;
}

const CalendarContext = createContext<CalendarContextType | undefined>(undefined);

export function CalendarProvider({ children }: { children: React.ReactNode }) {
  const [events, setEvents] = useState<CalendarEvent[]>([]);
  const [synced, setSynced] = useState(false);
  const [lastSyncTime, setLastSyncTime] = useState<Date | null>(null);

  return (
    <CalendarContext.Provider value={{ events, setEvents, synced, setSynced, lastSyncTime, setLastSyncTime }}>
      {children}
    </CalendarContext.Provider>
  );
}

export function useCalendar() {
  const context = useContext(CalendarContext);
  if (!context) {
    throw new Error('useCalendar must be used within CalendarProvider');
  }
  return context;
}
