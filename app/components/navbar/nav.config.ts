import { NavCategory } from "./nav.types";

export const NAV_CATEGORIES: NavCategory[] = [
  {
    label: "Rings",
    slug: "/rings",
    featured: ["Engagement Rings", "Wedding Rings", "Diamond Rings", "Gold Rings", "Silver Rings", "Cocktail Rings"],
  },
  {
    label: "Necklaces",
    slug: "/necklaces",
    featured: ["Gold Chains", "Diamond Pendants", "Silver Necklaces", "Traditional Chains", "Layered Necklaces", "Statement Pieces"],
  },
  {
    label: "Earrings",
    slug: "/earrings",
    featured: ["Gold Earrings", "Diamond Earrings", "Silver Earrings", "Hoop Earrings", "Stud Earrings", "Jhumka"],
  },
  {
    label: "Bracelets",
    slug: "/bracelets",
    featured: ["Gold Bracelets", "Silver Bracelets", "Diamond Bracelets", "Bangles", "Kada", "Charm Bracelets"],
  },
  {
    label: "Bridal",
    slug: "/bridal",
    highlight: true,
    featured: ["Wedding Sets", "Engagement Rings", "Bridal Jewelry", "Traditional Pieces", "Modern Bridal", "Ceremony Items"],
  },
  {
    label: "Collections",
    slug: "/collections",
  },
];
