"use client";

import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import Fuse from "fuse.js";
import { ResourceCard } from "@/components/ResourceCard";
import { SearchField } from "@/components/SearchField";
import { FilterTabs } from "@/components/FilterTabs";
import { SortSelect } from "@/components/SortSelect";
import type { ResourceListItem } from "@/lib/sanity-mappers";
import { sortResources } from "@/lib/sort";
import {
  pageContainer,
  pageShell,
  pageHeaderBlock,
  pageTitle,
  pageSubtitle,
  pageSearchRow,
  pageFiltersRow,
} from "@/lib/layout";
import { fadeUpMountProps, listStaggerDelay } from "@/lib/motion";

const resourceTabs = ["All", "Roadmaps", "Cheatsheets", "Notes", "Guides", "Tools"];
const resourceSortOptions = ["A-Z", "Z-A", "By Type", "Downloads First"];

export default function ResourcesPageClient({
  initialResources,
}: {
  initialResources: ResourceListItem[];
}) {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState("All");
  const [sortBy, setSortBy] = useState("A-Z");
  const [visibleCount, setVisibleCount] = useState(6);

  const fuse = useMemo(
    () =>
      new Fuse(initialResources, {
        keys: ["title", "description", "type"],
        threshold: 0.3,
      }),
    [initialResources]
  );

  const filteredResources = useMemo(() => {
    let result = initialResources;

    if (searchQuery.trim()) {
      result = fuse.search(searchQuery).map((r) => r.item);
    }

    if (activeTab !== "All") {
      result = result.filter((resource) => resource.type === activeTab);
    }

    return sortResources(result, sortBy);
  }, [activeTab, fuse, initialResources, searchQuery, sortBy]);

  const visibleResources = filteredResources.slice(0, visibleCount);
  const hasMore = visibleCount < filteredResources.length;

  return (
    <div className={pageShell}>
      <div className={pageContainer}>
        <motion.div {...fadeUpMountProps(0)} className={pageHeaderBlock}>
          <h1 className={pageTitle}>Resources</h1>
          <p className={pageSubtitle}>Cheatsheets, Roadmaps, Guides and more</p>
        </motion.div>

        <motion.div {...fadeUpMountProps(0.1)} className={pageSearchRow}>
          <SearchField value={searchQuery} onChange={setSearchQuery} placeholder="Search resources..." />
        </motion.div>

        <motion.div {...fadeUpMountProps(0.2)} className={pageFiltersRow}>
          <FilterTabs tabs={resourceTabs} active={activeTab} onChange={setActiveTab} />
          <SortSelect value={sortBy} options={resourceSortOptions} onChange={setSortBy} label="Sort resources" />
        </motion.div>

        {visibleResources.length > 0 ? (
          <div
            key={`${activeTab}-${sortBy}-${searchQuery}`}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {visibleResources.map((resource, index) => (
              <div key={resource.slug}>
                <ResourceCard
                  title={resource.title}
                  slug={resource.slug}
                  type={resource.type}
                  image={resource.image}
                  description={resource.description}
                  downloadUrl={resource.downloadUrl}
                  author={resource.author}
                  publishedAt={resource.publishedAt}
                  animationDelay={listStaggerDelay(index)}
                />
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <p className="text-muted-foreground text-lg">No resources found matching your criteria.</p>
          </div>
        )}

        {hasMore && (
          <motion.div className="mt-10 text-center">
            <button
              type="button"
              onClick={() => setVisibleCount((prev) => prev + 6)}
              className="px-6 py-3 bg-card border border-border text-foreground font-medium rounded-full hover:border-primary/50 transition-colors min-h-[44px]"
            >
              Explore More
            </button>
          </motion.div>
        )}
      </div>
    </div>
  );
}
