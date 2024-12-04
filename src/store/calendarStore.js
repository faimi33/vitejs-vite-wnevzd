import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const useCalendarStore = create(
  persist(
    (set) => ({
      events: [
        {
          id: 1,
          title: 'Website Design Review',
          start: '2024-03-20T10:00',
          end: '2024-03-20T11:30',
          type: 'meeting',
          description: 'Review website mockups with the design team',
          notifications: true,
        },
        {
          id: 2,
          title: 'Q1 Report Deadline',
          start: '2024-03-25T17:00',
          end: '2024-03-25T17:00',
          type: 'deadline',
          description: 'Submit Q1 financial reports',
          notifications: true,
        },
        {
          id: 3,
          title: 'Team Building Event',
          start: '2024-03-28T14:00',
          end: '2024-03-28T16:00',
          type: 'event',
          description: 'Virtual team building activities',
          notifications: true,
        }
      ],
      notifications: true,
      toggleNotifications: () => 
        set((state) => ({ notifications: !state.notifications })),
      toggleEventNotification: (eventId) =>
        set((state) => ({
          events: state.events.map(event =>
            event.id === eventId
              ? { ...event, notifications: !event.notifications }
              : event
          )
        })),
      addEvent: (event) =>
        set((state) => ({
          events: [...state.events, { ...event, id: Date.now() }]
        })),
      updateEvent: (updatedEvent) =>
        set((state) => ({
          events: state.events.map(event =>
            event.id === updatedEvent.id ? updatedEvent : event
          )
        })),
      deleteEvent: (eventId) =>
        set((state) => ({
          events: state.events.filter(event => event.id !== eventId)
        })),
    }),
    {
      name: 'calendar-storage',
    }
  )
);

export default useCalendarStore;