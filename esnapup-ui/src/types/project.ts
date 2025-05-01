// Define project category type
export type ProjectCategory = 'all' | 'web' | 'mobile' | 'business' | 'restaurant';

// Define project interface with category field
export interface Project {
  id: string;
  title: string;
  description: string;
  image: string;
  technologies: string[];
  categories: ProjectCategory[];
  liveUrl?: string;
  githubUrl?: string;
}