"use client";

import Link from "next/link";
import { NavCategory } from "./nav.types";

export default function MegaMenu({
  categories,
  open,
  onOpen,
  onClose,
}: {
  categories: NavCategory[];
  open: string | null;
  onOpen?: (category: string) => void;
  onClose: () => void;
}) {
  if (!open) return null;

  const category = categories.find((c) => c.label === open);
  if (!category) return null;

  return (
    <div
      role="menu"
      className="absolute left-0 top-full w-full bg-white shadow-lg"
      onMouseLeave={onClose}
    >
      <div className="mx-auto max-w-7xl grid grid-cols-4 gap-8 p-8">
        {category.featured?.map((item) => (
          <Link
            key={item}
            href={`${category.slug}/${item.toLowerCase().replace(" ", "-")}`}
            className="hover:text-gold-600"
          >
            {item}
          </Link>
        ))}
      </div>
    </div>
  );
}
