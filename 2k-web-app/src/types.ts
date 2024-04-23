//src/types.ts
type CartType = {
  product_id: string;
  product_image: string;
  product_name: string;
  product_price: number;
  quantity: number;
};

type ProductType = {
  product_id: string;
  product_image: string;
  product_name: string;
  product_description: string;
  product_tag: string | null;
  product_features: string[];
  product_price: number;
  product_stock: number;
  product_quantity: number;
  product_createdAt: string;
};

type OrderType = {
  order_id: string;
  order_username: string;
  order_status: string;
  order_date: string;
  order_items: {
    product_id: string;
    product_image: string;
    product_name: string;
    product_price: number;
    quantity: number;
  }[];
  order_summary: {
    order: number;
    shipping: number;
    discount: number;
    subtotal: number;
    taxes: number;
    total: number;
  };
  order_detail: {
    name: string;
    email: string;
    phone: string;
    address: string;
    district: string;
    area: string;
    cardNumber: string;
    cardDate: string;
    cardCVC: string;
    cardHolder: string;
  };
};

type CustomerType = {
  customer_id: string;
  customer_username: string;
  customer_orders: number;
  customer_spend: number;
  customer_createdAt: string;
};

export interface Product {
  id: string;
  image: string;
  name: string;
  description: string;
  tag: string;
  features: string; // Serialized JSON string or could be converted to string[]
  price: number;
  stock: number;
  quantity: number;
  createdAt: string;
}

export interface OrderItem {
  id: number;
  orderId: number;
  productId: string;
  quantity: number;
  productPrice: number;
  product: Product;
}

export interface Customer {
  id: number;
  name: string;
  email: string;
  phone: string;
  address: string;
  district: string;
  area: string;
  cardNumber: string;
  cardHolder: string;
  cardDate: string;
  cardCVC: string;
}

export interface Order {
  id: number;
  customerId: number;
  orderTotal: number;
  shippingCost: number;
  discount: number;
  subtotal: number;
  taxes: number;
  total: number;
  createdAt: string;
  orderItems: OrderItem[];
  customer: Customer;
}

// If you need to handle an array of such Order objects:
export type OrdersArray = Order[];

export type ProductArray = Product[];
