import { HomeIcon, UserGroupIcon, CalendarIcon, ChatBubbleLeftIcon } from '@heroicons/react/24/outline';
import { NavLink } from 'react-router-dom';

const navigation = [
  { name: 'Dashboard', href: '/', icon: HomeIcon },
  { name: 'Team', href: '/team', icon: UserGroupIcon },
  { name: 'Calendar', href: '/calendar', icon: CalendarIcon },
  { name: 'Chat', href: '/chat', icon: ChatBubbleLeftIcon },
];

export default function Sidebar() {
  return (
    <div className="flex h-full flex-col bg-gray-800 w-64">
      <div className="flex h-16 items-center px-4">
        <h1 className="text-white text-xl font-bold">RemoteCollab</h1>
      </div>
      <nav className="flex-1 space-y-1 px-2 py-4">
        {navigation.map((item) => (
          <NavLink
            key={item.name}
            to={item.href}
            className={({ isActive }) =>
              `flex items-center px-2 py-2 text-sm font-medium rounded-md ${
                isActive
                  ? 'bg-gray-900 text-white'
                  : 'text-gray-300 hover:bg-gray-700 hover:text-white'
              }`
            }
          >
            <item.icon className="mr-3 h-6 w-6" aria-hidden="true" />
            {item.name}
          </NavLink>
        ))}
      </nav>
    </div>
  );
}