import { format } from 'date-fns';
import { cn } from '../../utils/classNames';

const eventStyles = {
  meeting: 'bg-blue-100 text-blue-800 border-blue-300',
  deadline: 'bg-red-100 text-red-800 border-red-300',
  event: 'bg-green-100 text-green-800 border-green-300',
};

export default function EventIndicator({ event }) {
  return (
    <div
      className={cn(
        'text-xs p-1 rounded border',
        eventStyles[event.type] || 'bg-gray-100 text-gray-800 border-gray-300'
      )}
    >
      <div className="font-medium truncate">{event.title}</div>
      <div className="text-xs opacity-75">
        {format(new Date(event.start), 'h:mm a')}
      </div>
    </div>
  );
}