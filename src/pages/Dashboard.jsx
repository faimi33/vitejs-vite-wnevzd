import ProjectCard from '../components/dashboard/ProjectCard';

const projects = [
  {
    id: 1,
    name: 'Website Redesign',
    description: 'Modernizing the company website with new features and improved UI/UX',
    status: 'In Progress',
    dueDate: 'Mar 30, 2024',
    teamSize: 5
  },
  {
    id: 2,
    name: 'Mobile App Development',
    description: 'Creating a cross-platform mobile app for team collaboration',
    status: 'Planning',
    dueDate: 'Apr 15, 2024',
    teamSize: 8
  },
  {
    id: 3,
    name: 'Data Analytics Dashboard',
    description: 'Building a real-time analytics dashboard for team performance',
    status: 'Completed',
    dueDate: 'Mar 10, 2024',
    teamSize: 4
  }
];

export default function Dashboard() {
  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
        <p className="mt-1 text-sm text-gray-500">Welcome back! Here's what's happening with your projects.</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map(project => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>
    </div>
  );
}