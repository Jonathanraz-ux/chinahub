export interface Product {
  id: string;
  slug: string;
  name: string;
  category: string;
  categorySlug: string;
  description: string;
  shortDescription: string;
  price: string;
  priceType: 'fixed' | 'quote';
  images: string[];
  badges: ProductBadge[];
  specs: { label: string; value: string }[];
  applications: string[];
  options: string[];
  orderConditions: string;
  deliveryTime: string;
  availability: 'available' | 'on-order' | 'limited';
  sector: string;
  featured: boolean;
}

export type ProductBadge = 'Sur commande' | 'Disponible' | 'Populaire' | 'Nouveau' | 'Promo';

export interface Category {
  id: string;
  slug: string;
  name: string;
  description: string;
  icon: string;
  productCount: number;
  image: string;
}

export interface QuoteRequest {
  id: string;
  product?: Product;
  productId?: string;
  quantity: number;
  name: string;
  phone: string;
  city: string;
  needs: string;
  contactPreference: 'whatsapp' | 'phone' | 'email';
  date: string;
  status: QuoteStatus;
  remark?: string;
}

export type QuoteStatus = 
  | 'Nouvelle'
  | 'À traiter'
  | 'Devis envoyé'
  | 'Confirmée'
  | "En cours d'importation"
  | 'Livrée'
  | 'Annulée';

export interface ContactMessage {
  id: string;
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
  productId?: string;
  date: string;
  read: boolean;
}

export interface RequestItem {
  product: Product;
  quantity: number;
  remark: string;
}

export interface Testimonial {
  id: string;
  name: string;
  city: string;
  text: string;
  rating: number;
}

export interface FAQ {
  question: string;
  answer: string;
}

export interface AdminStats {
  totalProducts: number;
  totalRequests: number;
  pendingQuotes: number;
  activeOrders: number;
  totalRevenue: string;
  monthlyGrowth: string;
}
