export interface TipPrice {
    days: number[];
    months: number[];
  }
  
  export interface Transaction {
    date: string;
    location: string;
    amount: number;
  }
  
  export interface TransactionsData {
    tipPrice: TipPrice;
    transactions: Transaction[];
  }