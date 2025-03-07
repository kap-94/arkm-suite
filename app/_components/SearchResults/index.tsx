"use client";

import React, { FC, useMemo, useState } from "react";
import classNames from "classnames/bind";
import styles from "./SearchResults.module.scss";
import { SearchResultsProps } from "./types";
import { Dropdown, Option } from "../Dropdown";
import { SearchCard } from "../SearchCard";
import { Pagination } from "../Pagination";
import { ThemedTypography } from "../Typography/ThemedTypography";
import { useRouter, useSearchParams } from "next/navigation";
import { ChevronDown } from "lucide-react";
import { useSettings } from "../../_context/SettingsContext";

const cx = classNames.bind(styles);

const SearchResults: FC<SearchResultsProps> = ({
  results,
  contentTypeOptions,
  selectedContentType,
  searchQuery,
  isSearching,
  totalResults,
  currentPage: initialPage = 1,
  resultsPerPage = 10,
  dictionary,
  language,
}) => {
  const router = useRouter();
  const { theme } = useSettings();
  const searchParams = useSearchParams();

  // Get current page from URL or use initial value
  const page = searchParams.get("page")
    ? parseInt(searchParams.get("page")!)
    : initialPage;

  // Calculate pagination details
  const totalPages = Math.max(1, Math.ceil(results.length / resultsPerPage));

  // Get current page's results
  const paginatedResults = useMemo(() => {
    const startIndex = (page - 1) * resultsPerPage;
    const endIndex = startIndex + resultsPerPage;
    return results.slice(startIndex, endIndex);
  }, [results, page, resultsPerPage]);

  const handlePageChange = (newPage: number) => {
    // Ensure page is within bounds
    const validPage = Math.max(1, Math.min(newPage, totalPages));

    // Create new URLSearchParams with current params
    const params = new URLSearchParams(searchParams);

    // Update or add page parameter
    params.set("page", validPage.toString());

    // Update URL with new page
    router.push(`?${params.toString()}`);

    // Scroll to top
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleOptionChange = (option: Option) => {
    // Reset to page 1 when changing filters
    const params = new URLSearchParams(searchParams);
    params.set("page", "1");
    if (option.value !== "all") {
      params.set("type", option.value);
    } else {
      params.delete("type");
    }
    router.push(`?${params.toString()}`);
  };

  return (
    <section className={cx("search-results", `search-results--${theme}`)}>
      <div className={cx("search-results__header")}>
        <div className={cx("search-results__title")}>
          <ThemedTypography variant="h3" color="primary">
            Search Results for:
            <span style={{ marginLeft: "8px" }}>"{searchQuery}"</span>
          </ThemedTypography>
        </div>
        {contentTypeOptions && contentTypeOptions.length > 0 && (
          <div className={cx("search-results__dropdown-wrapper")}>
            <Dropdown
              options={contentTypeOptions}
              selected={selectedContentType}
              onSelectedChange={handleOptionChange}
              theme={{
                type: theme,
                customValues: {
                  background: theme === "dark" ? "#0b0b0b" : "#efefef",
                },
              }}
              icon={
                <ChevronDown className={cx("search-results__dropdown-icon")} />
              }
            />
          </div>
        )}
      </div>

      {/* Results count summary */}
      {!isSearching && results.length > 0 && (
        <ThemedTypography
          variant="p2"
          className={cx("search-results__summary")}
        >
          {`Showing ${(page - 1) * resultsPerPage + 1} - ${Math.min(
            page * resultsPerPage,
            results.length
          )} of ${results.length} results`}
        </ThemedTypography>
      )}

      {isSearching ? (
        <ThemedTypography className={cx("search-results__placeholder")}>
          {language === "en" ? "Searching..." : "Buscando..."}
        </ThemedTypography>
      ) : results.length === 0 ? (
        <ThemedTypography className={cx("search-results__placeholder")}>
          {dictionary.noResults}
        </ThemedTypography>
      ) : (
        <div className={cx("search-results__results-wrapper")}>
          {paginatedResults.map((result, index) => (
            <SearchCard
              key={`${result.slug}-${index}`}
              {...result}
              theme={theme}
            />
          ))}
        </div>
      )}

      {totalPages > 1 && (
        <div className={cx("search-results__pagination")}>
          <Pagination
            currentPage={page}
            totalPages={totalPages}
            onPageChange={handlePageChange}
            theme={theme}
          />
        </div>
      )}
    </section>
  );
};

export default SearchResults;
