import { Product, BACKEND_BASE_URL } from "@/lib/api";
import { apiClient } from "@/lib/api";

// Cache for products to avoid repeated API calls
let productsCache: Product[] | null = null;
let featuredProductsCache: Product[] | null = null;

// Helper function to transform API product to frontend format
function transformApiProduct(apiProduct: Product): any {
  return {
    id: apiProduct.id,
    slug: apiProduct.name
      .toLowerCase()
      .replace(/\s+/g, "-")
      .replace(/[^a-z0-9-]/g, ""),
    name: apiProduct.name,
    description: apiProduct.description,
    category: apiProduct.subcategory || apiProduct.category,
    material: apiProduct.materials[0] || "silver",
    purity: "925",
    weight: `${apiProduct.weight || 0}g`,
    images: apiProduct.images.map((img) => {
      // Convert relative URLs to full backend URLs
      if (img.url.startsWith("/uploads/")) {
        return `${BACKEND_BASE_URL}${img.url}`;
      }
      return img.url;
    }),
    model3d: apiProduct.model3d?.url,
    featured: apiProduct.isFeatured,
    seoKeywords: apiProduct.tags,
  };
}

// Helper function to get products from API with caching
async function fetchProducts(): Promise<any[]> {
  if (productsCache) {
    return productsCache.map(transformApiProduct);
  }

  try {
    const response = await apiClient.getProducts({ limit: 100 });
    if (response.status === "success" && response.data?.products) {
      productsCache = response.data.products;
      return productsCache.map(transformApiProduct);
    }
  } catch (error) {
    console.error("Failed to fetch products:", error);
  }

  return [];
}

// Helper function to get featured products from API with caching
async function fetchFeaturedProducts(): Promise<any[]> {
  if (featuredProductsCache) {
    return featuredProductsCache.map(transformApiProduct);
  }

  try {
    const response = await apiClient.getFeaturedProducts();
    if (response.status === "success" && response.data?.products) {
      featuredProductsCache = response.data.products;
      return featuredProductsCache.map(transformApiProduct);
    }
  } catch (error) {
    console.error("Failed to fetch featured products:", error);
  }

  return [];
}

// Async function to get product by slug
export async function getProductBySlug(slug: string): Promise<any | undefined> {
  const products = await fetchProducts();
  return products.find((product: any) => product.slug === slug);
}

// Async function to get featured products
export async function getFeaturedProducts(): Promise<any[]> {
  return await fetchFeaturedProducts();
}

// Async function to get products by category
export async function getProductsByCategory(category: string): Promise<any[]> {
  const products = await fetchProducts();
  return products.filter((product: any) => product.category === category);
}

// Async function to get products by material
export async function getProductsByMaterial(material: string): Promise<any[]> {
  const products = await fetchProducts();
  return products.filter((product: any) => product.material === material);
}

// Async function to get all products
export async function getAllProducts(): Promise<any[]> {
  return await fetchProducts();
}

// Legacy synchronous functions for backward compatibility (return empty arrays)
export function getProductBySlugSync(slug: string): any | undefined {
  // This will be deprecated, use getProductBySlug instead
  console.warn(
    "getProductBySlugSync is deprecated, use getProductBySlug instead"
  );
  return undefined;
}

export function getFeaturedProductsSync(): any[] {
  // This will be deprecated, use getFeaturedProducts instead
  console.warn(
    "getFeaturedProductsSync is deprecated, use getFeaturedProducts instead"
  );
  return [];
}

export function getProductsByCategorySync(category: string): any[] {
  // This will be deprecated, use getProductsByCategory instead
  console.warn(
    "getProductsByCategorySync is deprecated, use getProductsByCategory instead"
  );
  return [];
}

export function getProductsByMaterialSync(material: string): any[] {
  // This will be deprecated, use getProductsByMaterial instead
  console.warn(
    "getProductsByMaterialSync is deprecated, use getProductsByMaterial instead"
  );
  return [];
}

export function getAllProductsSync(): any[] {
  // This will be deprecated, use getAllProducts instead
  console.warn("getAllProductsSync is deprecated, use getAllProducts instead");
  return [];
}
