import { teamMembers } from '../data/teamMembers';
import DepartmentSection from '../components/team/DepartmentSection';

export default function Team() {
  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Team Members</h1>
        <p className="mt-1 text-sm text-gray-500">
          Meet our amazing team across different departments
        </p>
      </div>

      {Object.entries(teamMembers).map(([key, department]) => (
        <DepartmentSection
          key={key}
          name={department.name}
          members={department.members}
        />
      ))}
    </div>
  );
}