export interface Skill {
  id: string;
  name: string;
  category: 'technical' | 'soft' | 'language' | 'tool';
}

export interface Certification {
  id: string;
  title: string;
  issuer: string;
  issueDate: string;
  expirationDate?: string;
  description: string;
  imageUrl: string;
  credlyUrl?: string;
  courseraUrl?: string;
}