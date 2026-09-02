export interface Category {
  name: string;
  slug: string;
  description: string;
}

export const CATEGORIES: Category[] = [
  {
    name: "Solar & Energy",
    slug: "solar-energy",
    description: "Panels, inverters, batteries and balance-of-system components for solar installations.",
  },
  {
    name: "Electrical",
    slug: "electrical",
    description: "Cables, breakers, switches and protection devices for general electrical works.",
  },
  {
    name: "3-Phase & Industrial",
    slug: "3-phase-industrial",
    description: "Heavy-duty cabling, switching and protection for 3-phase and industrial installations.",
  },
  {
    name: "Lighting",
    slug: "lighting",
    description: "Interior and exterior lighting fixtures for residential and commercial spaces.",
  },
  {
    name: "Water & Power",
    slug: "water-power",
    description: "Water heating and portable power equipment.",
  },
];

export function getCategoryBySlug(slug: string): Category | undefined {
  return CATEGORIES.find((c) => c.slug === slug);
}
