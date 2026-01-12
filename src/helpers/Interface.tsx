import type { ReactNode } from "react";

export interface Category {
  id: number;
  identifier: string;
  name: string;
  icon: string;
}

export interface MealCardProps {
  id?: number;
  title: string;
  price: number;
  rating?: number;
  image?: string;
  color?: string;
  popular?: boolean;
  category?: string;
  ingredients?: string[];
  images?: string[];
  reviews?: number;
  prepTime?: string;
  calories?: number;
  description?: string;
}

export interface Chefs {
  id: number;
  title: string;
  image: string;
  description: string;
}
export interface ChefCardProps {
  title: string;
  image: string;
  description: string;
}

export interface CartItem {
  id?: number;
  size: string;
  quantity: number;
  price: number;
  image: string;
  name?: string;
}

export interface RelatedCategoryItemProps {
  dishes: MealCardProps[];
}

export interface ButtonProps {
  label: string;
  onClick?: () => void;
  href?: string;
  icon?: ReactNode;
  variant?: "primary" | "secondary";
  className?: string;
}

export interface FormInputProps {
  label: string;
  type?: string;
  value: string;
  placeholder?: string;
  required?: boolean;
  readonly?: boolean;
  onChange?: (value: string) => void;
  error?: boolean;
}

export interface PrimaryButtonProps extends ButtonProps {
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
}

export interface AdminMealData extends MealCardProps {
  stock?: number;
  sales?: number;
  status?: boolean;
}

export interface AddNewDishProps {
  onClose: () => void;
  setMeals: React.Dispatch<React.SetStateAction<AdminMealData[]>>;
  editDish?: AdminMealData | null;
}
export interface AddNewCategoryProps {
  onClose: () => void;
  setCategory: React.Dispatch<React.SetStateAction<Category[]>>;
  editCategory?: Category | null;
}
export interface AddNewChefProps {
  onClose: () => void;
  setChef: React.Dispatch<React.SetStateAction<Chefs[]>>;
  editChef?: Chefs | null;
}

export interface TableColumn<T> {
  key: string;
  header: string;
  render: (row: T) => React.ReactNode;
}

export interface DataTableProps<T> {
  data: T[];
  columns: TableColumn<T>[];
  rowKey: (row: T) => string | number;
}

export interface UserProfile {
  name: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  zipCode: string;
  avatar: string;
}
export interface Order {
  id: number;
  createdAt: string;
  customer: string;
  date: string;
  status: "pending" | "on-the-way" | "delivered";
  items: CartItem[];
  itemsCount: number;
  total: number;
  timeline: OrderTimelineItem[];
}
export interface ConfirmationPopupProps {
  title: string;
  message: string;
  acceptBtnLabel: string;
  declineBtnLabel: string;
  onAccept?: () => void;
  onDecline?: () => void;
}
export interface DeliveryDriver {
  id: number;
  name: string;
  phone: string;
  rating: number;
  vehicle: string;
}

export interface OrderTimelineItem {
  status: string;
  time: string;
  completed: boolean;
  icon: string;
}

export interface CustomizationSettings {
  siteName: string;
  primaryColor: string;
}

export interface PublicPage {
  id: number;
  title: string;
  slug: string;
  content: string;
  status: string;
  lastModified: string;
}

export interface AddNewPageProps {
  onClose: () => void;
  setPage: React.Dispatch<React.SetStateAction<PublicPage[]>>;
  editPage?: PublicPage | null;
}
export interface adminOrder {
  id: string;
  customer: string;
  customerEmail: string;
  customerPhone: string;
  deliveryAddress: string;
  items: number;
  total: number;
  status: string;
  time: string;
  date: string;
  dishes: {
    name: string;
    quantity: number;
    price: number;
  }[];
  paymentMethod: string;
  subtotal: number;
  tax: number;
  deliveryFee: number;
}
export interface OrderDetailsSectionProps {
  selectedOrder: adminOrder | null;
  onClose: () => void;
}
export interface ChangeOrderStatusProps {
  selectedOrder: adminOrder | null;
  onClose: () => void;
  onUpdate: (status: string) => void;
}
export interface User {
  id: number;
  name: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  zipCode: string;
  avatar: string;
  status: string;
  joinDate: string;
  totalOrders: number;
  totalSpent: number;
}
export interface ViewUserDetailsProps {
  viewUser: User | null;
  onClose: () => void;
}
