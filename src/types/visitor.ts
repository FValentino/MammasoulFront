export interface VisitorInput{
  name: string;
  email: string;
  phone: string;
}

export interface Visitor{
  id: number;
  name: string;
  email: string;
  phone: string;
  isBuyer: boolean;
}