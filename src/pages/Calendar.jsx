import { useState, useEffect } from 'react';
import CalendarGrid from '../components/calendar/CalendarGrid';
import NotificationToggle from '../components/calendar/NotificationToggle';
import EventModal from '../components/calendar/EventModal';
import useCalendarStore from '../store/calendarStore';

export default function Calendar() {
  const [selectedEvent, setSelectedEvent] = useState(null);
  const { events, notifications } = useCalendarStore();

  useEffect(() => {
    if (notifications) {
      const checkUpcomingEvents = () => {
        const now = new Date();
        events.forEach(event => {
          const eventTime = new Date(event.start);
          const timeDiff = eventTime.getTime() - now.getTime();
          
          // Check if event is within next 15 minutes and has notifications enabled
          if (timeDiff > 0 && timeDiff <= 900000 && event.notifications) {
            new Notification('Upcoming Event', {
              body: `${event.title} starts in ${Math.round(timeDiff / 60000)} minutes`,
            });
          }
        });
      };

      // Request notification permission
      if (Notification.permission !== 'granted') {
        Notification.requestPermission();
      }

      // Check for upcoming events every minute
      const interval = setInterval(checkUpcomingEvents, 60000);
      return () => clearInterval(interval);
    }
  }, [events, notifications]);

  return (
    <div className="p-6">
      <div className="mb-6">
        <div className="flex justify-between items-center mb-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Calendar</h1>
            <p className="mt-1 text-sm text-gray-500">
              Manage your schedule and upcoming events
            </p>
          </div>
          <NotificationToggle />
        </div>
      </div>

      <CalendarGrid onEventClick={setSelectedEvent} />

      <EventModal
        isOpen={!!selectedEvent}
        onClose={() => setSelectedEvent(null)}
        event={selectedEvent}
      />
    </div>
  );
}