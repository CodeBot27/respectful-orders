export interface Product {
  id: string;
  name: string;
  price: number;
  category: string;
  description: string;
  images: string[];
  inStock: boolean;
  featured?: boolean;
  bestSeller?: boolean;
}

export interface CartItem extends Product {
  quantity: number;
}

export interface CustomerDetails {
  name: string;
  phone: string;
  email: string;
  address: string;
  notes?: string;
}

export interface OrderPayload {
  customer: CustomerDetails;
  cart: CartItem[];
  total: number;
}
