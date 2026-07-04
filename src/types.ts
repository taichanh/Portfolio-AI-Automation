export interface Message {
  id: string;
  role: 'user' | 'model';
  text: string;
  timestamp: Date;
}

export interface Skill {
  name: string;
  icon: string;
  category: string;
  tags: string[];
}

export interface Project {
  id: string;
  title: string;
  description: string;
  category: string;
  categoryTag: string;
  image: string;
  techStack: string[];
  caseStudy: CaseStudy;
}

export interface CaseStudy {
  challenge: string;
  solution: string;
  results: string[];
  workflowNodes: WorkflowNode[];
}

export interface WorkflowNode {
  id: string;
  title: string;
  description: string;
  icon: string;
}

export interface Inquiry {
  id: string;
  name: string;
  email: string;
  message: string;
  timestamp: string;
  autoReply?: string;
}
