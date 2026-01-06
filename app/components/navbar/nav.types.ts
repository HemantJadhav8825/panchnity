export interface NavCategory {
    label: string;
    slug: string;
  
    /**
     * Optional featured links for mega menu
     * Example: ["Engagement Rings", "Diamond Rings"]
     */
    featured?: string[];
  
    /**
     * Used for visual emphasis (e.g. Bridal)
     */
    highlight?: boolean;
  }
  