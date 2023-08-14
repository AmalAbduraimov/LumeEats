export interface User {
  id: string;
  name: string;
  phone: string;
}

export interface SortTypes {
  id: number;
  name: string;
}

export interface Vendor {
  id: string;
  banner: { url: string | undefined };
  name: string;
  sorts: SortTypes[];
  logo: { url: string };
  rating: { avg: number; count: number };
  closest_sale_point?: {
    distance: number;
    id: string;
    name: string;
    vendorId: string;
    lat: string;
    lng: string;
  };
}

interface Workdays {
  close_time: string;
  open_time: string;
}

export interface VendorType extends Vendor {
  categories: Category[];
  description: string;
  workdays: Workdays[];
}

export interface FoodParams {
  product_id: string;
  id: string;
  name: string;
  price: number;
  updated_at: string;
}

export interface Product {
  description: string;
  id: string;
  vendor_logo: { url: string };
  name: string;
  image: { url: string };
  params: FoodParams[];
  price: number;
  vendor_id?: string;
  count?: number;
  product_id?: string;
}

export interface Category {
  id: number;
  name: string;
  product_count: number;
  image: string;
}

export interface FavoriteCards {
  product: Product;
}

export enum OrderType {
  book = "booking",
  delivery = "delivery",
  takeaway = "takeaway",
}

export interface Order {
  id: string;
  image: { url: string | undefined };
  name: string;
  vendor_id: string;
  count: number;
  category: string;
  price: number;
  totalPrice: number;
  product_id: number;
}

export interface BasketFoodTypes {
  id: string;
  description: string;
  enabled: number;
  image: { url: string | undefined };
  name: string;
  params: FoodParams;
  sale_point_id?: string;
  vendor_id: string;
  count: number;
}

export enum EPresetTimes {
  SECOND = 1000,
  MINUTE = SECOND * 60,
  HOUR = MINUTE * 60,
  DAY = HOUR * 24,
  WEEK = DAY * 7,
  TEN_DAYS = DAY * 10,
}

export interface CheckoutType {
  order_product: {
    product_id: number | string;
    param_id: number | string;
    count: number;
    modification_id?: null | number;
  }[];
  user_requested_time: Date;
  description: string;
  type: OrderType | string;
  sale_point_id?: number | string;
  payment_id: string | undefined;

  address?: string | null;
  address_id?: null | string;
  lat?: number;
  lng?: number;

  seats_count?: number;
}

export interface AddressType {
  display_name: string;
  lat: number;
  lng: number;
}
