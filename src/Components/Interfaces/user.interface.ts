import {Types} from "mongoose"
export interface user {
  _id: Types.ObjectId,
  name: string,
  phone: string,
  email: string,
  password: string,
  college:string
  college_stream: string,
  college_year: string,
  school: string,
  school_year: {
    type: String
  },
  refercode: string | number,
  usenumber: number,
  isvalid: number,
  paidAmount: boolean
}

export interface userMoreInformationInterface {
    _id: Types.ObjectId,
    email: string,
    name: string,
    visibleGroups: string[],
    selectedCourses: string[],
    admittedCourses: [{
        name: string, 
        coursePaymentDate: string,
        upcomingPaymentDate: Date,
        lastDateToPay: Date,
        validity: Date
    }],
    lastDate: string,
    log_details: [{
        name: string,
        value1: string,
        value2: string,
        value3: string,
    }],
    paidForMonth: boolean,
    payment_details: [{
        name: string,
        value: string,
    }],
    transaction_details: [{
        name: string,
        value: string,
    }],
    upcoming_payment_details: [{
        name: string,
        value: string,
    }],
    paidMonth: number
}