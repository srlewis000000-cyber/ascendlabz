export type PaymentMethod = "paypal" | "bitcoin";
export type OrderStatus = "Pending" | "Paid" | "Pending Bitcoin Payment" | "Confirmed" | "Shipped";
export type ProductGroup = 
  | "Weight Loss & Metabolic"
  | "Healing & Recovery"
  | "Growth Hormone & IGF"
  | "Anti-Aging & Longevity"
  | "Sexual Health & Wellness"
  | "Cognitive & Neuro"
  | "Immune & Inflammation"
  | "Peptide Blends & Combos";

export type UnitType = 1 | 5 | 10;

export interface CategorySpec {
  name: ProductGroup;
  color: string;
}

export interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  packSize: UnitType;
  image: string;
  group: ProductGroup;
  mg: string;
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

export interface Product {
  id: string;
  name: string;
  description: string;
  prices: {
    [K in UnitType]: number;
  };
  group: ProductGroup;
  categoryColor: string;
  mg: string;
  coa?: {
    taskNumber: string;
    date: string;
    purity: string;
    content: string;
    key: string;
    imageUrl?: string;
  };
  rating: number;
  reviewCount: number;
  image?: string;
}
