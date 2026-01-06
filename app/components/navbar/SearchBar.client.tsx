"use client";

import { useState } from "react";

export default function SearchBar() {
  const [query, setQuery] = useState("");

  return (
    <div className="relative hidden sm:block">
      <input
        type="search"
        placeholder="Search rings, diamonds, occasions…"
        aria-label="Search products"
        className="w-32 md:w-48 lg:w-64 rounded border px-3 py-2"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />

      {query && (
        <div className="absolute top-full w-full bg-white shadow-md">
          <p className="p-3 text-sm">Suggested results…</p>
        </div>
      )}
    </div>
  );
}
