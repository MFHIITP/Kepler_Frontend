export interface Project {
  name: string;
  githuburl: string;
  websiteUrl?: string;
  description: string;
  technologies?: string[];
}

export interface ConnectionUser extends UserDetails {
  mutualConnections?: number;
  location?: string;
  company?: string;
  position?: string;
  experience?: string;
  education?: string;
}
export interface UserDetails {
  id: string;
  name: string;
  email: string;
  phone: string;
  country?: string;
  state?: string;
  city?: string;
  education_type?: string;
  college?: string;
  college_stream?: string;
  college_year?: string;
  college_department?: string;
  school?: string;
  school_year?: string;
  work_country?: string;
  work_state?: string;
  work_city?: string;
  work_company?: string;
  work_position?: string;
  work_duration?: string;
  
  // Additional profile fields
  githuburl?: string;
  linkedinurl?: string;
  portfoliourl?: string;
  bio?: string;
  headline?: string;
  techstack?: string[];
  projects?: Project[];
  skills?: string[];
  isOpenToWork?: boolean;
  avatar?: string;
  endorsements?: number;
}

export interface ProfileDetailsInterface {
  email?: string;
  githuburl?: string;
  linkedinurl?: string;
  portfoliourl?: string;
  bio?: string;
  headline?: string;
  techstack?: string[];
  projects?: Project[];
  skills?: string[];
  isOpenToWork?: boolean;
  avatar?: string;
  endorsements?: number;
}

export type StreamEvent = 
  | {
    type: "start";
    total: number;
    walletBalance: number;
  }
  | {
    type: "connection";
    index: number;
    email: string;
    connectionDetails: UserDetails;
    hasSocialProfile: boolean;
  }
  | {
    type: "end";
    connectionCount: number;
  }
  | {
    type: "Connection";
    message: string;
    responseData: any;
  }

