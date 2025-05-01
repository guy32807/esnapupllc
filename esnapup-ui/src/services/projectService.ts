import { Project, ProjectCategory } from '../types/project';
import projectsData from '../data/projects.json';

// Load all projects
export const getAllProjects = (): Project[] => {
  return projectsData.projects as Project[];
};

// Filter projects by category
export const getProjectsByCategory = (category: ProjectCategory): Project[] => {
  const projects = getAllProjects();
  if (category === 'all') {
    return projects;
  }
  return projects.filter(project => project.categories.includes(category));
};

// Get project by ID
export const getProjectById = (id: string): Project | undefined => {
  const projects = getAllProjects();
  return projects.find(project => project.id === id);
};

// Get paginated projects
export const getPaginatedProjects = (
  projects: Project[], 
  page: number, 
  projectsPerPage: number
): Project[] => {
  const startIndex = (page - 1) * projectsPerPage;
  const endIndex = startIndex + projectsPerPage;
  return projects.slice(startIndex, endIndex);
};