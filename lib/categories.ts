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

// Static category data
const categoriesData: Omit<Category, "itemCount">[] = [
  {
    id: "necklaces",
    slug: "necklaces",
    name: "Necklaces",
    description:
      "Elegant silver necklaces and pendants handcrafted to perfection",
    image: `${BACKEND_BASE_URL}/uploads/images/products/necklaces.jpg`,
  },
  {
    id: "earrings",
    slug: "earrings",
    name: "Earrings",
    description: "Sophisticated earrings in authentic 925 silver",
    image: `${BACKEND_BASE_URL}/uploads/images/products/earrings.jpg`,
  },
  {
    id: "rings",
    slug: "rings",
    name: "Rings",
    description: "Timeless silver rings for every occasion",
    image: `${BACKEND_BASE_URL}/uploads/images/products/rings.jpg`,
  },
  {
    id: "bracelets",
    slug: "bracelets",
    name: "Bracelets",
    description: "Beautifully designed silver bracelets and bangles",
    image: `${BACKEND_BASE_URL}/uploads/images/products/bracelets.jpg`,
  },
  {
    id: "bridal",
    slug: "bridal",
    name: "Bridal Collection",
    description: "Exquisite silver bridal sets for your special day",
    image: `${BACKEND_BASE_URL}/uploads/images/products/bridal.jpg`,
  },
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
];

// Cache for categories with item counts
let categoriesCache: Category[] | null = null;

// Get all categories with item counts
export async function getCategories(): Promise<Category[]> {
  if (categoriesCache) {
    return categoriesCache;
  }

  try {
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
    return categoriesData.map((category) => ({
      ...category,
      itemCount: 0,
    }));
  }
}

export async function getCategoryById(
  id: string
): Promise<Category | undefined> {
  const categories = await getCategories();
  return categories.find((cat) => cat.id === id);
}

export async function getCategoryBySlug(
  slug: string
): Promise<Category | undefined> {
  const categories = await getCategories();
  return categories.find((cat) => cat.slug === slug);
}
