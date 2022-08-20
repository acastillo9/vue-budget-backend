export default interface Transaction {
  id: string;
  value: number;
  description: string;
  creationDate: Date;
  userId: string;
}
