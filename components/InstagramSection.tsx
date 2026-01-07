import Link from "next/link";
import Image from "next/image";
import { INSTAGRAM_URL } from "@/lib/constants";
import { BACKEND_BASE_URL } from "@/lib/api";
import { Instagram } from "lucide-react";

// Placeholder for Instagram feed - you can integrate with Instagram API later
const instagramPosts = [
  {
    id: 1,
    image: `${BACKEND_BASE_URL}/uploads/images/products/silver-ganesh-idol-1.jpg`,
    alt: "Silver Ganesh Idol",
  },
  {
    id: 2,
    image: `${BACKEND_BASE_URL}/uploads/images/products/silver-lakshmi-idol-1.jpg`,
    alt: "Silver Lakshmi Idol",
  },
  {
    id: 3,
    image: `${BACKEND_BASE_URL}/uploads/images/products/silver-om-pendant-1.jpg`,
    alt: "Silver Om Pendant",
  },
  {
    id: 4,
    image: `${BACKEND_BASE_URL}/uploads/images/products/silver-pooja-thali-1.jpg`,
    alt: "Silver Pooja Thali",
  },
  {
    id: 5,
    image: `${BACKEND_BASE_URL}/uploads/images/products/silver-krishna-idol-1.jpg`,
    alt: "Silver Krishna Idol",
  },
  {
    id: 6,
    image: `${BACKEND_BASE_URL}/uploads/images/products/silver-diya-set-1.jpg`,
    alt: "Silver Diya Set",
  },
];

export default function InstagramSection() {
  return (
    <section className="py-10 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center gap-2 mb-4">
            <Instagram className="w-8 h-8 text-gold-600" />
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-gray-900">
              Follow Us on Instagram
            </h2>
          </div>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto mb-6">
            See our latest creations and customer stories
          </p>
          <Link
            href={INSTAGRAM_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-gold-600 hover:text-gold-700 font-semibold transition-colors"
          >
            @panchnity
            <Instagram className="w-5 h-5" />
          </Link>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-2">
          {instagramPosts.map((post) => (
            <Link
              key={post.id}
              href={INSTAGRAM_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative aspect-square overflow-hidden rounded-lg bg-gray-100 hover:opacity-90 transition-opacity"
            >
              <Image
                src={post.image}
                alt={post.alt}
                fill
                className="object-cover transition-transform duration-300 group-hover:scale-110"
                sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 16vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity z-10 flex items-center justify-center">
                <Instagram className="w-8 h-8 text-white opacity-80" />
              </div>
            </Link>
          ))}
        </div>

        <div className="text-center mt-8">
          <Link
            href={INSTAGRAM_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-semibold px-6 py-3 rounded-lg transition-all shadow-md hover:shadow-lg"
          >
            <Instagram className="w-5 h-5" />
            Follow @panchnity
          </Link>
        </div>
      </div>
    </section>
  );
}
