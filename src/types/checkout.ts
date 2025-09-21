export interface CheckoutPayload {
  amount: string;              
  description: string;
  externalReference: string;
}

interface CheckoutLinks {
  checkout_link: string;
  success: string;
  failed: string;
}

export interface CheckoutResponse {
  uuid: string;
  amount: number;
  status: "PENDING" | "APPROVED" | "REJECTED"; 
  external_reference: string;
  links: CheckoutLinks;
}