import { CalendarIcon, UserGroupIcon } from '@heroicons/react/24/outline';
import Badge from '../common/Badge';
import { formatDate } from '../../utils/date';
import { getStatusColor } from '../../utils/classNames';

export default function ProjectCard({ project }) {
  return (
    <div className="bg-white rounded-lg shadow p-6 hover:shadow-md transition-shadow">
      <div className="flex justify-between items-start">
        <h3 className="text-lg font-semibold text-gray-900">{project.name}</h3>
        <Badge className={getStatusColor(project.status)}>{project.status}</Badge>
      </div>
      <p className="mt-2 text-sm text-gray-600">{project.description}</p>
      <div className="mt-4 flex items-center justify-between text-sm text-gray-500">
        <div className="flex items-center">
          <CalendarIcon className="h-4 w-4 mr-1" />
          <span>{formatDate(project.dueDate)}</span>
        </div>
        <div className="flex items-center">
          <UserGroupIcon className="h-4 w-4 mr-1" />
          <span>{project.teamSize} members</span>
        </div>
      </div>
    </div>
  );
}