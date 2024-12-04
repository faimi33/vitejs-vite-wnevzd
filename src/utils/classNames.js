import { clsx } from 'clsx';

export const cn = (...args) => clsx(...args);

export const getStatusColor = (status) => {
  const statusColors = {
    'In Progress': 'bg-blue-100 text-blue-800',
    'Completed': 'bg-green-100 text-green-800',
    'Planning': 'bg-yellow-100 text-yellow-800',
    'On Hold': 'bg-gray-100 text-gray-800',
    'Delayed': 'bg-red-100 text-red-800'
  };
  
  return statusColors[status] || 'bg-gray-100 text-gray-800';
};