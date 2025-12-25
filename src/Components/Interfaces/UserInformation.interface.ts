interface combinedInterface {
  copy: Boolean;
  color: String;
  name: String;
  salutation: String;
  value: String;
}

export interface userInformation {
  transaction_details: [combinedInterface];
  course_details: [{
    name: String,
    coursePaymentDate: String,
    upcomingPaymentDate: Date,
    lastDateToPay: Date,
    validity: Date,
    color: String
  }];
  applied_course_details: [combinedInterface];
  payment_details: [combinedInterface];
  upcoming_payments: [combinedInterface],
  amount: {
    name: String,
    value: Number,
    salutation: String,
    color: String,
  },
  log_details: [{
    name: String,
    value1: String,
    value2: String,
    value3: String
  }],
  referCode: String | Number
}
