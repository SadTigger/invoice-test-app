import { Vendor } from './vendor';

export interface Invoice {
  number: number;
  date_of_issue: string;
  vendor: Vendor;
  invoice_amount: number;
}
