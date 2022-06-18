export type Currency = "mdl" | "usd" | "eur";

export interface IDetails {
  totalCredit: number;
  usedCredit: number;
  remainingCredit: number;
}

export interface IAvans {
  id: string;
  date: string;
  currency: Currency;
  amount: number;
  amountInMDL: number;
}

export interface IExpense {
  id: string;
  name: string;
  date: string;
  itemType: string;
  unitPrice: number;
  quantity: number;
  totalPrice: number;
}

export type ExpenseType = "achizitii" | "suplimentare";

export interface ISalariu {
  id: string;
  date: string;
  amount: number;
}

export interface IMuncitor {
  name: string;
  id: string;
  salarii: ISalariu[];
}


export interface IProject {
  name: string;
  details: IDetails;
  avansuri: IAvans[];
  achizitii: IExpense[];
  workers: IMuncitor[];
  suplimentare: IExpense[];
}

export interface IProjectInfo {
  name: string;
  id: string;
}
export interface IExchange {
  eur: number;
  usd: number;
}
