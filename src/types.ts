export type PaymentMethod = "paypal" | "bitcoin" | "venmo";
export type OrderStatus = "Pending" | "Paid" | "Pending Bitcoin Payment" | "Confirmed" | "Shipped";

export type ProductGroup =
  | "Tissue Repair Research"
  | "Cellular Research"
  | "Dermal Research"
  | "Secretagogue Research"
  | "Cognitive Research";

export interface ProductVariant {
  size: string;
  price: number;
  compareAt?: number;
}

export interface Product {
  id: string;
  name: string;
  group: ProductGroup;
  variants: ProductVariant[];
  /** Purity reported on the current batch COA, e.g. "99.755%". */
  purity: string;
  image: string;
  coaImage: string;
  description: string[];
}

export interface CartItem {
  /** `${productId}-${size}` */
  id: string;
  productId: string;
  name: string;
  size: string;
  price: number;
  quantity: number;
  image: string;
}

export interface Order {
  id: string;
  items: CartItem[];
  total: number;
  paymentMethod: PaymentMethod;
  status: OrderStatus;
  createdAt: string;
  email?: string;
  shippingAddress?: any;
}
