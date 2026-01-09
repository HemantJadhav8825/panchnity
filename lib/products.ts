import { BACKEND_BASE_URL } from "@/lib/api";
import { Product } from "@/types/product";
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
      const url = typeof img === "string" ? img : img.url;
      // Convert relative URLs to full backend URLs
      if (url.startsWith("/uploads/")) {
        return `${BACKEND_BASE_URL}${url}`;
      }
      return url;
    }),
    model3d: apiProduct.model3d
      ? typeof apiProduct.model3d === "string"
        ? apiProduct.model3d.startsWith("/uploads/")
          ? `${BACKEND_BASE_URL}${apiProduct.model3d}`
          : apiProduct.model3d
        : `${BACKEND_BASE_URL}${apiProduct.model3d.url}`
      : null,
    featured: apiProduct.isFeatured,
    seoKeywords: apiProduct.tags,
  };
}

// Static fallback data for when API is not available
const fallbackProducts = [
  {
    id: "1",
    name: "925 Silver Ganesh Idol",
    slug: "925-silver-ganesh-idol",
    description:
      "Beautiful handcrafted silver Ganesh idol made from pure 925 silver.",
    category: "idols",
    material: "silver",
    purity: "925",
    weight: "500g",
    images: [
      `${BACKEND_BASE_URL}/uploads/images/products/silver-ganesh-idol-1.jpg`,
      `${BACKEND_BASE_URL}/uploads/images/products/silver-ganesh-idol-2.jpg`,
      `${BACKEND_BASE_URL}/uploads/images/products/silver-ganesh-idol-3.jpg`,
      `${BACKEND_BASE_URL}/uploads/images/products/silver-ganesh-idol-4.jpg`,
      `${BACKEND_BASE_URL}/uploads/images/products/silver-ganesh-idol-5.jpg`,
    ],
    model3d: null,
    featured: true,
    seoKeywords: ["silver idol", "ganesh", "925 silver", "handcrafted"],
  },
  {
    id: "2",
    name: "925 Silver Lakshmi Idol",
    slug: "925-silver-lakshmi-idol",
    description:
      "Elegant Lakshmi idol crafted from pure 925 silver with intricate detailing.",
    category: "idols",
    material: "silver",
    purity: "925",
    weight: "450g",
    images: [
      `${BACKEND_BASE_URL}/uploads/images/products/silver-lakshmi-idol-1.jpg`,
      `${BACKEND_BASE_URL}/uploads/images/products/silver-lakshmi-idol-2.jpg`,
      `${BACKEND_BASE_URL}/uploads/images/products/silver-lakshmi-idol-3.jpg`,
      `${BACKEND_BASE_URL}/uploads/images/products/silver-lakshmi-idol-4.jpg`,
      `${BACKEND_BASE_URL}/uploads/images/products/silver-lakshmi-idol-5.jpg`,
    ],
    model3d: null,
    featured: true,
    seoKeywords: ["silver idol", "lakshmi", "925 silver", "goddess"],
  },
  {
    id: "3",
    name: "925 Silver Krishna Idol",
    slug: "925-silver-krishna-idol",
    description:
      "Divine Krishna idol made from pure 925 silver with traditional craftsmanship.",
    category: "idols",
    material: "silver",
    purity: "925",
    weight: "400g",
    images: [
      `${BACKEND_BASE_URL}/uploads/images/products/silver-krishna-idol-1.jpg`,
      `${BACKEND_BASE_URL}/uploads/images/products/silver-krishna-idol-2.jpg`,
      `${BACKEND_BASE_URL}/uploads/images/products/silver-krishna-idol-3.jpg`,
      `${BACKEND_BASE_URL}/uploads/images/products/silver-krishna-idol-4.jpg`,
      `${BACKEND_BASE_URL}/uploads/images/products/silver-krishna-idol-5.jpg`,
    ],
    model3d: null,
    featured: true,
    seoKeywords: ["silver idol", "krishna", "925 silver", "divine"],
  },
  {
    id: "4",
    name: "925 Silver Om Pendant",
    slug: "925-silver-om-pendant",
    description: "Sacred Om symbol pendant crafted in pure 925 silver.",
    category: "necklaces",
    material: "silver",
    purity: "925",
    weight: "25g",
    images: [
      `${BACKEND_BASE_URL}/uploads/images/products/silver-om-pendant-1.jpg`,
      `${BACKEND_BASE_URL}/uploads/images/products/silver-om-pendant-2.jpg`,
      `${BACKEND_BASE_URL}/uploads/images/products/silver-om-pendant-3.jpg`,
      `${BACKEND_BASE_URL}/uploads/images/products/silver-om-pendant-4.jpg`,
      `${BACKEND_BASE_URL}/uploads/images/products/silver-om-pendant-5.jpg`,
    ],
    model3d: null,
    featured: false,
    seoKeywords: [
      "om pendant",
      "silver pendant",
      "sacred symbol",
      "925 silver",
    ],
  },
  {
    id: "5",
    name: "925 Silver Pooja Thali",
    slug: "925-silver-pooja-thali",
    description:
      "Traditional pooja thali made from pure 925 silver for religious ceremonies.",
    category: "pooja-items",
    material: "silver",
    purity: "925",
    weight: "300g",
    images: [
      `${BACKEND_BASE_URL}/uploads/images/products/silver-pooja-thali-1.jpg`,
      `${BACKEND_BASE_URL}/uploads/images/products/silver-pooja-thali-2.jpg`,
      `${BACKEND_BASE_URL}/uploads/images/products/silver-pooja-thali-3.jpg`,
      `${BACKEND_BASE_URL}/uploads/images/products/silver-pooja-thali-4.jpg`,
      `${BACKEND_BASE_URL}/uploads/images/products/silver-pooja-thali-5.jpg`,
    ],
    model3d: null,
    featured: false,
    seoKeywords: ["pooja thali", "silver thali", "religious", "ceremony"],
  },
  {
    id: "6",
    name: "925 Silver Diya Set",
    slug: "925-silver-diya-set",
    description:
      "Beautiful silver diya set for lighting lamps during festivals and ceremonies.",
    category: "pooja-items",
    material: "silver",
    purity: "925",
    weight: "200g",
    images: [
      `${BACKEND_BASE_URL}/uploads/images/products/silver-diya-set-1.jpg`,
      `${BACKEND_BASE_URL}/uploads/images/products/silver-diya-set-2.jpg`,
      `${BACKEND_BASE_URL}/uploads/images/products/silver-diya-set-3.jpg`,
      `${BACKEND_BASE_URL}/uploads/images/products/silver-diya-set-4.jpg`,
      `${BACKEND_BASE_URL}/uploads/images/products/silver-diya-set-5.jpg`,
    ],
    model3d: null,
    featured: false,
    seoKeywords: ["diya set", "silver diya", "festival", "lighting"],
  },
];

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
    console.warn(
      "Failed to fetch products from API, using fallback data:",
      error
    );
  }

  // Return fallback static data if API fails
  return fallbackProducts;
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
    console.warn(
      "Failed to fetch featured products from API, using fallback data:",
      error
    );
  }

  // Return featured products from fallback data
  return fallbackProducts.filter((product) => product.featured);
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
