"use client";

import { searchService } from "@/services/searchService";
import { Language } from "@/lib/config/i18n";
import SearchResults from "@/components/SearchResults";
import { Option } from "@/components/Dropdown";
import { notFound } from "next/navigation";
import { ThemedTypography } from "@/components/Typography/ThemedTypography";

interface SearchPageProps {
  searchParams: {
    query?: string;
    page?: string;
    type?: string;
  };
}

const contentTypeOptions: Option[] = [
  { label: "All", value: "all" },
  { label: "Projects", value: "project" },
  { label: "Documentation", value: "documentation" },
];

export default async function SearchPage({ searchParams }: SearchPageProps) {
  const { query = "", page = "1", type = "all" } = searchParams;

  // Validate query
  if (!query || query.length < 2) {
    notFound();
  }

  // Parse current page
  const currentPage = parseInt(page);
  if (isNaN(currentPage) || currentPage < 1) {
    notFound();
  }

  // Get selected content type
  const selectedContentType =
    contentTypeOptions.find((option) => option.value === type) ||
    contentTypeOptions[0];

  try {
    // Get search results
    const searchEntities = await searchService.search(query, "en");

    // Filter by type if needed
    const filteredResults =
      type === "all"
        ? searchEntities
        : searchEntities.filter((entity) => entity.type === type);

    // Transform to SearchResult type
    const results = filteredResults.map((entity) =>
      searchService.toSearchResult(entity)
    );

    const resultsPerPage = 10;
    const totalPages = Math.ceil(results.length / resultsPerPage);

    // Validate current page is not beyond total pages
    if (currentPage > totalPages) {
      notFound();
    }

    return (
      <SearchResults
        results={results}
        contentTypeOptions={contentTypeOptions}
        selectedContentType={selectedContentType}
        searchQuery={query}
        isSearching={false}
        totalResults={results.length}
        currentPage={currentPage}
        // resultsPerPage={resultsPerPage}
        resultsPerPage={5}
        theme="dark"
        dictionary={{
          searchPlaceholder: "Search...",
          searchButton: "Search",
          noResults: "No results found.",
          loadMore: "Load more results",
        }}
        language="en"
      />
    );
  } catch (error) {
    console.error("Search error:", error);
    notFound();
  }
}

// Error boundaries
// export function generateMetadata({ searchParams }: SearchPageProps) {
//   const { query = "" } = searchParams;

//   return {
//     title: `Search Results for "${query}"`,
//     description: `Search results page for query "${query}"`,
//   };
// }

// // Static configuration for the page
// export const dynamic = 'force-dynamic';
// export const revalidate = 0;
