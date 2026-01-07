import { BACKEND_BASE_URL } from "@/lib/api";

// Category interface
export interface Category {
  id: string;
  slug: string;
  name: string;
  description: string;
  image: string;
  itemCount: number;
}

// Static category data - will be replaced with API call later
const categoriesData: Omit<Category, "itemCount">[] = [
  {
    id: "idol",
    slug: "idols",
    name: "Silver Idols",
    description:
      "Beautiful handcrafted idols of Hindu deities made from pure silver",
    image: `${BACKEND_BASE_URL}/uploads/images/products/idols.jpg`,
  },
  {
    id: "pooja-item",
    slug: "pooja-items",
    name: "Pooja Items",
    description:
      "Traditional pooja items and accessories for religious ceremonies",
    image: `${BACKEND_BASE_URL}/uploads/images/products/pooja.jpg`,
  },
  {
    id: "jewellery",
    slug: "jewellery",
    name: "Silver Jewelry",
    description:
      "Elegant silver jewelry pieces including rings, necklaces, and more",
    image: `${BACKEND_BASE_URL}/uploads/images/products/jewellery.jpg`,
  },
];

// Cache for categories with item counts
let categoriesCache: Category[] | null = null;

// Get all categories with item counts
export async function getCategories(): Promise<Category[]> {
  if (categoriesCache) {
    return categoriesCache;
  }

  try {
    // For now, return static data - later this will come from API
    // TODO: Replace with API call when backend categories endpoint is ready

    // Get product counts for each category
    const { getAllProducts } = await import("./products");
    const allProducts = await getAllProducts();

    const categoriesWithCounts = categoriesData.map((category) => ({
      ...category,
      itemCount: allProducts.filter((p) => p.category === category.id).length,
    }));

    categoriesCache = categoriesWithCounts;
    return categoriesWithCounts;
  } catch (error) {
    console.error("Error fetching categories:", error);
    // Return static data as fallback
    return categoriesData.map((category) => ({
      ...category,
      itemCount: 0,
    }));
  }
}

// Get category by ID
export async function getCategoryById(
  id: string
): Promise<Category | undefined> {
  const categories = await getCategories();
  return categories.find((cat) => cat.id === id);
}

// Get category by slug
export async function getCategoryBySlug(
  slug: string
): Promise<Category | undefined> {
  const categories = await getCategories();
  return categories.find((cat) => cat.slug === slug);
}

// Legacy synchronous functions for backward compatibility
export function getCategoriesSync(): Category[] {
  console.warn("getCategoriesSync is deprecated, use getCategories instead");
  return categoriesData.map((category) => ({
    ...category,
    itemCount: 0,
  }));
}

export function getCategoryByIdSync(id: string): Category | undefined {
  console.warn(
    "getCategoryByIdSync is deprecated, use getCategoryById instead"
  );
  const category = categoriesData.find((cat) => cat.id === id);
  return category ? { ...category, itemCount: 0 } : undefined;
}
