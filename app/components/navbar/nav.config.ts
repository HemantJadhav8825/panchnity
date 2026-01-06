import { NavCategory } from "./nav.types";

export const NAV_CATEGORIES: NavCategory[] = [
  {
    label: "Rings",
    slug: "/rings",
    featured: ["Engagement Rings", "Diamond Rings", "Gold Rings"],
  },
  {
    label: "Necklaces",
    slug: "/necklaces",
    featured: ["Gold Chains", "Diamond Pendants"],
  },
  {
    label: "Earrings",
    slug: "/earrings",
  },
  {
    label: "Bracelets",
    slug: "/bracelets",
  },
  {
    label: "Bridal",
    slug: "/bridal",
    highlight: true,
  },
  {
    label: "Collections",
    slug: "/collections",
  },
];
