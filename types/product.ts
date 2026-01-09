export type ProductCategory =
  | "bracelets"
  | "necklaces"
  | "earrings"
  | "rings"
  | "bridal"
  | "collections"
  | "idol"
  | "pooja-item"
  | "jewellery";

export type ProductMaterial = "silver" | "gold" | "diamond";

export interface ProductImage {
  url: string;
  publicId: string;
  alt: string;
  isPrimary: boolean;
  order: number;
}

export interface ProductVideo {
  url: string;
  publicId: string;
  title: string;
  duration?: number;
  order?: number;
}

export interface ProductModel3d {
  url: string;
  publicId: string;
  fileName: string;
  fileSize: number;
  fileType: string;
}

export interface Product {
  id: string;
  name: string;
  description: string;
  category: ProductCategory;
  subcategory?: string;
  price?: number;
  weight?: string | number; // Support both backend weight string and frontend weight number if needed
  materials: string[];
  images: ProductImage[] | string[]; // Support legacy string arrays and new image objects
  videos?: ProductVideo[];
  model3d?: ProductModel3d | string;
  tags: string[];
  isActive: boolean;
  isFeatured: boolean;
  featured?: boolean; // Legacy support
  stock: number;
  sku?: string;
  slug?: string;
  createdAt: string;
  updatedAt: string;
  material?: string; // Legacy support
  purity?: string; // Legacy support
  seoKeywords?: string[]; // Legacy support
}
