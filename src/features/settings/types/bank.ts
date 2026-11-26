export interface BankDetailsFormValues {
  id: string;
  bankName: string;
  accountName: string;
  accountNumber: string;
  country: string;
}

export interface UpdateAccountDetailsPayload {
  password: string;
  number: string;
  bank: string;
  holdersName: string;
}
