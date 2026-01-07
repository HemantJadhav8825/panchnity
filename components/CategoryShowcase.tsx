"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { getCategories, Category } from "@/lib/categories";

function CategoryCard({ category }: { category: Category }) {
  const [imageError, setImageError] = useState(false);

  return (
    <Link
      href={`/categories/${category.slug}`}
      className="group relative overflow-hidden rounded-2xl bg-gray-100 aspect-[4/3] shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2"
    >
      {/* Image with overlay */}
      {!imageError && (
        <div className="absolute inset-0 z-0">
          <Image
            src={category.image}
            alt={category.name}
            fill
            className="object-cover transition-transform duration-350 group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, 33vw"
            onError={() => setImageError(true)}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent z-10"></div>
        </div>
      )}

      {/* Placeholder if image not found */}
      {imageError && (
        <div className="absolute inset-0 flex items-center justify-center z-0 bg-gradient-to-br from-gray-200 to-gray-300">
          <div className="text-center text-gray-400 p-6">
            <div className="text-6xl mb-4">✨</div>
            <div className="text-sm">Image Coming Soon</div>
          </div>
        </div>
      )}

      <div className="absolute bottom-0 left-0 right-0 p-6 z-20 animate-slide-up animate-delay-100">
        <h3 className="text-2xl font-serif font-bold text-white mb-2 group-hover:text-gold-200 transition-colors">
          {category.name}
        </h3>
        <p className="text-gold-100 text-sm mb-3">{category.description}</p>
        <div className="flex items-center gap-2 text-white group-hover:text-gold-200 transition-colors transform group-hover:translate-x-1 duration-300">
          <span className="text-sm font-medium">{category.itemCount}</span>
          <ArrowRight className="w-4 h-4" />
        </div>
      </div>
    </Link>
  );
}

export default function CategoryShowcase() {
  const [categories, setCategories] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchCategories() {
      try {
        const cats = await getCategories();
        // Transform to expected format
        const transformedCategories = cats.map((cat) => ({
          name: cat.name,
          description: cat.description,
          href: `/products?category=${cat.id}`,
          image: cat.image,
          count: `${cat.itemCount}+ Designs`,
        }));
        setCategories(transformedCategories);
      } catch (error) {
        console.error("Error fetching categories:", error);
        // Fallback to empty array
        setCategories([]);
      } finally {
        setLoading(false);
      }
    }

    fetchCategories();
  }, []);

  if (loading) {
    return (
      <section className="py-10 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-gray-900 mb-4">
              Shop by Category
            </h2>
            <p className="text-gray-600 text-lg">
              Discover our curated collections of religious jewellery and temple
              items
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[...Array(3)].map((_, i) => (
              <div
                key={i}
                className="aspect-[4/3] bg-gray-200 rounded-2xl animate-pulse"
              ></div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-10 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-gray-900 mb-4">
            Shop by Category
          </h2>
          <p className="text-gray-600 text-lg">
            Discover our curated collections of religious jewellery and temple
            items
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {categories.map((category) => (
            <CategoryCard key={category.name} category={category} />
          ))}
        </div>
      </div>
    </section>
  );
}
