export interface IResponseError {
  status: number;
  message: string;
  errors: string[];
  hints: string;
}
