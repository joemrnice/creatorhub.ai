export interface User {
  id: string;
  email: string;
  name: string;
  avatarUrl?: string;
  role: 'CREATOR' | 'CUSTOMER' | 'ADMIN';
  createdAt: string;
}

export interface CreatorWorkspace {
  id: string;
  name: string;
  slug: string;
  ownerId: string;
  logoUrl?: string;
  customDomain?: string;
  createdAt: string;
}

export type ProductType = 'EBOOK' | 'TEMPLATE' | 'SOFTWARE' | 'COURSE' | 'DOWNLOADABLE_ASSET' | 'SERVICE' | 'MEMBERSHIP';
export type ProductStatus = 'DRAFT' | 'PUBLISHED' | 'ARCHIVED';

export interface Product {
  id: string;
  workspaceId: string;
  title: string;
  slug: string;
  type: ProductType;
  status: ProductStatus;
  category: string;
  price: number;
  originalPrice?: number;
  shortDescription: string;
  fullDescription: string;
  coverImage: string;
  gallery: string[];
  features: string[];
  whatsIncluded: string[];
  rating: number;
  salesCount: number;
  createdAt: string;
}

export interface Order {
  id: string;
  workspaceId: string;
  customerId: string;
  customerName: string;
  customerEmail: string;
  items: { productId: string; title: string; price: number }[];
  subtotal: number;
  discount: number;
  tax: number;
  total: number;
  status: 'PENDING' | 'COMPLETED' | 'REFUNDED';
  createdAt: string;
}

export interface OrderCalculationResult {
  subtotal: number;
  discount: number;
  tax: number;
  total: number;
  appliedCoupon?: string;
}

export interface AIServiceRequest {
  mode: 'title' | 'description' | 'headline' | 'seo' | 'social' | 'email';
  prompt: string;
  workspaceId: string;
}

export interface AIServiceResponse {
  mode: string;
  result: string;
  tokensUsed: number;
}
