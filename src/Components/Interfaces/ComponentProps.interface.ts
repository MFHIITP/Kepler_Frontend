import { Dispatch, SetStateAction } from "react";
import { userdetails } from "./Details.interface";

export interface componentPropsInterface {
  auth?: boolean, 
  details?: userdetails | undefined
}

export interface componentPropsInterfacePaymentProfile extends componentPropsInterface{
  goToPage: Dispatch<SetStateAction<string>>
}
