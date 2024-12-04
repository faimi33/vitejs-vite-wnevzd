import Badge from '../common/Badge';

export default function TeamMemberCard({ member }) {
  const getStatusVariant = (status) => {
    const variants = {
      'Available': 'success',
      'In a meeting': 'warning',
      'Do not disturb': 'error',
      'Away': 'default'
    };
    return variants[status] || 'default';
  };

  return (
    <div className="bg-white rounded-lg shadow p-4 flex items-start space-x-4">
      <img
        src={`${member.avatar}?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80`}
        alt={member.name}
        className="h-12 w-12 rounded-full"
      />
      <div className="flex-1">
        <div className="flex justify-between">
          <div>
            <h3 className="text-sm font-medium text-gray-900">{member.name}</h3>
            <p className="text-sm text-gray-500">{member.role}</p>
          </div>
          <Badge variant={getStatusVariant(member.status)}>{member.status}</Badge>
        </div>
        <p className="mt-1 text-sm text-gray-500">{member.email}</p>
      </div>
    </div>
  );
}