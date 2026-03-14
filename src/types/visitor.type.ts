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

export interface VisitorDTO {
  id: number;
  name: string;
  email: string;
  tel: string;
  is_buyer: boolean;
  purchase_count: number;
}

export interface VisitorEntity {
  id: number;
  name: string;
  email: string;
  tel: string;
  is_buyer: boolean | number;
  purchases?: any[]; 
  purchaseCount?: number; 
}