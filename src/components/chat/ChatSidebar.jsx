import { useState } from 'react';
import { UsersIcon, UserIcon } from '@heroicons/react/24/outline';
import { teamMembers } from '../../data/teamMembers';
import SearchInput from '../common/SearchInput';
import { useSearch } from '../../hooks/useSearch';
import useChatStore from '../../store/chatStore';

export default function ChatSidebar() {
  const [activeTab, setActiveTab] = useState('direct');
  const { query, handleSearch } = useSearch();
  const { groups, setActiveChat } = useChatStore();

  const allMembers = Object.values(teamMembers)
    .flatMap(dept => dept.members);

  const filteredMembers = allMembers.filter(member =>
    member.name.toLowerCase().includes(query.toLowerCase())
  );

  const filteredGroups = groups.filter(group =>
    group.name.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="w-80 border-r border-gray-200 bg-white flex flex-col">
      <div className="p-4">
        <SearchInput
          value={query}
          onChange={handleSearch}
          placeholder="Search conversations..."
        />
        <div className="mt-4 flex space-x-2">
          <button
            onClick={() => setActiveTab('direct')}
            className={`flex-1 py-2 px-4 rounded-md ${
              activeTab === 'direct'
                ? 'bg-primary-100 text-primary-800'
                : 'bg-gray-100 text-gray-800'
            }`}
          >
            <UserIcon className="h-5 w-5 inline-block mr-2" />
            Direct
          </button>
          <button
            onClick={() => setActiveTab('groups')}
            className={`flex-1 py-2 px-4 rounded-md ${
              activeTab === 'groups'
                ? 'bg-primary-100 text-primary-800'
                : 'bg-gray-100 text-gray-800'
            }`}
          >
            <UsersIcon className="h-5 w-5 inline-block mr-2" />
            Groups
          </button>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto">
        {activeTab === 'direct' ? (
          <div className="space-y-1 p-2">
            {filteredMembers.map(member => (
              <button
                key={member.id}
                onClick={() => setActiveChat(`user-${member.id}`)}
                className="w-full flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-100"
              >
                <img
                  src={`${member.avatar}?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80`}
                  alt={member.name}
                  className="h-10 w-10 rounded-full"
                />
                <div className="flex-1 text-left">
                  <p className="font-medium text-gray-900">{member.name}</p>
                  <p className="text-sm text-gray-500">{member.status}</p>
                </div>
              </button>
            ))}
          </div>
        ) : (
          <div className="space-y-1 p-2">
            {filteredGroups.map(group => (
              <button
                key={group.id}
                onClick={() => setActiveChat(`group-${group.id}`)}
                className="w-full flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-100"
              >
                <div className="h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center">
                  <UsersIcon className="h-6 w-6 text-gray-500" />
                </div>
                <div className="flex-1 text-left">
                  <p className="font-medium text-gray-900">{group.name}</p>
                  <p className="text-sm text-gray-500">
                    {group.members.length} members
                  </p>
                </div>
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}