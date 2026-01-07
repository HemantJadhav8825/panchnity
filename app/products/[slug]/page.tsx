import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { getProductBySlug, getAllProducts } from "@/lib/products";
import Product3DViewer from "@/components/Product3DViewer";
import WhatsAppButton from "@/components/WhatsAppButton";
import {
  generateProductMetadata,
  generateProductJsonLd,
  generateBreadcrumbJsonLd,
} from "@/lib/seo";
import { SITE_URL } from "@/lib/constants";
import { ChevronRight, Package, Scale, Sparkles } from "lucide-react";
import { Product } from "@/types/product";

interface ProductPageProps {
  params: {
    slug: string;
  };
}

export async function generateStaticParams() {
  // During build time, API might not be available
  // Return empty array to generate pages dynamically
  try {
    const products = await getAllProducts();
    return products.map((product) => ({
      slug: product.slug,
    }));
  } catch (error) {
    console.warn(
      "API not available during build, generating pages dynamically:",
      error
    );
    // Return empty array to let Next.js handle routing dynamically
    return [];
  }
}

export async function generateMetadata({ params }: ProductPageProps) {
  try {
    const product = await getProductBySlug(params.slug);
    if (!product) {
      return {};
    }
    return generateProductMetadata(product);
  } catch (error) {
    console.error("Error generating metadata:", error);
    return {};
  }
}

export default async function ProductPage({ params }: ProductPageProps) {
  let product: Product | undefined;
  let relatedProducts: Product[] = [];

  try {
    product = await getProductBySlug(params.slug);
    if (!product) {
      notFound();
    }

    // Fetch related products
    const allProducts = await getAllProducts();
    relatedProducts = allProducts
      .filter(
        (p: any) => p.id !== product!.id && p.category === product!.category
      )
      .slice(0, 4);
  } catch (error) {
    console.error("Error fetching product data:", error);
    notFound();
  }

  const productJsonLd = generateProductJsonLd(product);
  const breadcrumbJsonLd = generateBreadcrumbJsonLd([
    { name: "Home", url: SITE_URL },
    { name: "Products", url: `${SITE_URL}/products` },
    { name: product.name, url: `${SITE_URL}/products/${product.slug}` },
  ]);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />

      <div className="min-h-screen bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Breadcrumbs */}
          <nav className="mb-6 flex items-center space-x-2 text-sm text-gray-600">
            <Link href="/" className="hover:text-gold-300 transition-colors">
              Home
            </Link>
            <ChevronRight className="w-4 h-4" />
            <Link
              href="/products"
              className="hover:text-gold-300 transition-colors"
            >
              Products
            </Link>
            <ChevronRight className="w-4 h-4" />
            <span className="text-gray-900">{product.name}</span>
          </nav>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-12">
            {/* Product Images & 3D Viewer */}
            <div>
              {product.model3d ? (
                <Product3DViewer product={product} className="mb-6" />
              ) : (
                <div
                  className="bg-gray-100 rounded-lg overflow-hidden mb-6"
                  style={{ minHeight: "500px" }}
                >
                  {product.images[0] && (
                    <Image
                      src={product.images[0]}
                      alt={product.name}
                      width={800}
                      height={800}
                      className="w-full h-full object-contain"
                      priority
                    />
                  )}
                </div>
              )}

              {/* Image Gallery */}
              {product.images.length > 1 && (
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                  {product.images.slice(1).map((image, index) => (
                    <div
                      key={index}
                      className="relative aspect-square bg-gray-100 rounded-lg overflow-hidden cursor-pointer hover:opacity-80 transition-opacity"
                    >
                      <Image
                        src={image}
                        alt={`${product!.name} - View ${index + 2}`}
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 50vw, 200px"
                      />
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Product Details */}
            <div>
              <div className="mb-6">
                <div className="flex items-center gap-3 mb-4">
                  <span className="px-3 py-1 bg-gold-50 text-gold-600 rounded-full text-sm font-medium capitalize">
                    {product.category.replace("-", " ")}
                  </span>
                  {product.featured && (
                    <span className="px-3 py-1 bg-gold-300 text-white rounded-full text-sm font-semibold">
                      Featured
                    </span>
                  )}
                </div>
                <h1 className="text-4xl md:text-5xl font-serif font-bold text-gray-900 mb-4">
                  {product.name}
                </h1>
                <p className="text-lg text-gray-700 leading-relaxed mb-6">
                  {product.description}
                </p>
              </div>

              {/* Product Specifications */}
              <div className="border-t border-b border-gray-200 py-6 mb-6 space-y-4">
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2 text-gray-600">
                    <Package className="w-5 h-5" />
                    <span className="font-medium">Material:</span>
                  </div>
                  <span className="text-gray-900 font-semibold capitalize">
                    {product.material}
                  </span>
                </div>
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2 text-gray-600">
                    <Sparkles className="w-5 h-5" />
                    <span className="font-medium">Purity:</span>
                  </div>
                  <span className="text-gray-900 font-semibold">
                    {product.purity}
                  </span>
                </div>
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2 text-gray-600">
                    <Scale className="w-5 h-5" />
                    <span className="font-medium">Weight:</span>
                  </div>
                  <span className="text-gray-900 font-semibold">
                    {product.weight}
                  </span>
                </div>
              </div>

              {/* WhatsApp CTA */}
              <div className="mb-8">
                <WhatsAppButton
                  product={product}
                  className="w-full md:w-auto"
                />
              </div>

              {/* Trust Message */}
              <div className="bg-gold-50 border border-gold-200 rounded-lg p-6">
                <h3 className="font-serif text-lg font-semibold text-gray-900 mb-2">
                  Authentic & Handcrafted
                </h3>
                <p className="text-gray-700 text-sm">
                  This piece is handcrafted with traditional techniques and made
                  from authentic 925 pure silver. Each item is created with
                  devotion and care, ensuring it meets our high standards of
                  quality and craftsmanship.
                </p>
              </div>
            </div>
          </div>

          {/* Related Products Section */}
          {relatedProducts.length > 0 && (
            <div className="border-t border-gray-200 pt-12">
              <h2 className="text-2xl font-serif font-bold text-gray-900 mb-6">
                You May Also Like
              </h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {relatedProducts.map((relatedProduct: any) => (
                  <Link
                    key={relatedProduct.id}
                    href={`/products/${relatedProduct.slug}`}
                    className="group block"
                  >
                    <div className="relative aspect-square bg-gray-100 rounded-lg overflow-hidden mb-2">
                      {relatedProduct.images[0] && (
                        <Image
                          src={relatedProduct.images[0]}
                          alt={relatedProduct.name}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform"
                          sizes="(max-width: 768px) 50vw, 25vw"
                        />
                      )}
                    </div>
                    <p className="text-sm font-medium text-gray-900 group-hover:text-gold-300 transition-colors line-clamp-2">
                      {relatedProduct.name}
                    </p>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
