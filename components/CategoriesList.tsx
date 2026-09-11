"use client";

import { CategoryCard } from "@/components/CategoryCard";
import { cn } from "@/lib/utils";
import { listStaggerDelay } from "@/lib/motion";
import { resolveSanityImageUrl } from "@/sanity/client";

interface CategoriesListProps {
  categories: any[];
  categoryTabs?: string[];
  maxItems?: number;
}

export function CategoriesList({ categories, maxItems }: CategoriesListProps) {
  const visibleCategories =
    typeof maxItems === "number" ? categories.slice(0, maxItems) : categories;

  return (
    <div className="grid w-full grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {visibleCategories.map((category: any, index: number) => (
          <div
            key={category._id}
            className={cn(index >= 4 && "hidden sm:block")}
          >
            <CategoryCard
              title={category.title}
              slug={category.slug.current}
              image={resolveSanityImageUrl(category.image)}
              badge={category.tag}
              articleCount={category.articleCount}
              description={category.description}
              animationDelay={listStaggerDelay(index)}
            />
          </div>
        ))}
      </div>
  );
}
