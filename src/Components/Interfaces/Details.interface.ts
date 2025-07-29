export interface userdetails {
  name: string;
  email: string;
  phone?: string;
  password?: string
  refercode: string;
  isvalid?: string
  usenumber?: number;
  school_name?: string;
  college_name?: string
  college_year?: string;
  college_stream?: string;
  school_year?: string;
}

export interface teamDetails {
    position: string, 
    name: string, 
    phoneNumber: string, 
    degree: string,
    emailId: string, 
    linkedin?: string
}
