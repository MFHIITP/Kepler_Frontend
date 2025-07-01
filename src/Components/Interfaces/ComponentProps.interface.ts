import { userdetails } from "./Details.interface";

export interface componentPropsInterface {
  auth?: boolean, 
  details?: userdetails | undefined
}
