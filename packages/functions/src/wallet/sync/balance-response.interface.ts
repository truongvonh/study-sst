export interface IBalanceResponse {
  statusCode: number;
  success: string;
  data: Data;
}

export interface Data {
  detail: Detail;
}

export interface Detail {
  coinAmount: number;
  askPrice: number;
  totalPaidSavingInterestAmount: number;
  totalAccruedAmount: number;
  totalInterestRate: number;
  coinShortName: string;
}
