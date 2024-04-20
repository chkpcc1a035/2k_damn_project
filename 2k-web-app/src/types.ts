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
