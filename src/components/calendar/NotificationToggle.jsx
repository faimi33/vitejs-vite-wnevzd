import { Switch } from '@headlessui/react';
import { BellIcon, BellSlashIcon } from '@heroicons/react/24/outline';
import useCalendarStore from '../../store/calendarStore';

export default function NotificationToggle() {
  const { notifications, toggleNotifications } = useCalendarStore();

  return (
    <div className="flex items-center space-x-2">
      {notifications ? (
        <BellIcon className="h-5 w-5 text-gray-500" />
      ) : (
        <BellSlashIcon className="h-5 w-5 text-gray-500" />
      )}
      <Switch
        checked={notifications}
        onChange={toggleNotifications}
        className={`${
          notifications ? 'bg-primary-600' : 'bg-gray-200'
        } relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2`}
      >
        <span className="sr-only">Enable notifications</span>
        <span
          className={`${
            notifications ? 'translate-x-6' : 'translate-x-1'
          } inline-block h-4 w-4 transform rounded-full bg-white transition-transform`}
        />
      </Switch>
      <span className="text-sm text-gray-700">
        {notifications ? 'Notifications enabled' : 'Notifications disabled'}
      </span>
    </div>
  );
}