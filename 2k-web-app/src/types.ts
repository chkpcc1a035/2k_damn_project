//src/types.ts
export type CartType = {
  product_id: string;
  product_image: string;
  product_name: string;
  product_price: number;
  quantity: number;
};

export type ProductType = {
  id: string;
  image: string;
  name: string;
  description: string;
  tag: string | null;
  features: string;
  price: number;
  stock: number;
  quantity: number;
  createdAt: string;
};

export type OrderType = {
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

export type CustomerType = {
  customer_id: string;
  customer_username: string;
  customer_orders: number;
  customer_spend: number;
  customer_createdAt: string;
};

export type Product = {
  id: string;
  image: string;
  name: string;
  description: string;
  tag: string | null;
  features: string;
  price: number;
  stock: number;
  quantity: number;
  createdAt: string;
};

export type OrderItem = {
  id: number;
  orderId: number;
  productId: string;
  quantity: number;
  productPrice: number;
  product: Product;
};

export type Customer = {
  id: number;
  username: string;
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
  createdAt: string;
  orders?: number;
  spend?: number;
};

export type Order = {
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
};

export type OrdersArray = Order[];

export type ProductArray = Product[];

export type CustomerArray = Customer[];
