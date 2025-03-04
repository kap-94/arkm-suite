// types.ts
import { Language } from "@/lib/config/i18n";
import { SearchResult } from "../SearchCard/types";
import { Option } from "../Dropdown";

export interface SearchResultsProps {
  results: SearchResult[];
  contentTypeOptions: Option[];
  selectedContentType: Option;
  searchQuery: string;
  isSearching: boolean;
  totalResults: number;
  currentPage: number;
  resultsPerPage: number;
  theme?: "light" | "dark" | "custom";
  dictionary: {
    searchPlaceholder: string;
    searchButton: string;
    noResults: string;
    loadMore: string;
  };
  language: Language;
  // onSearchQueryChange: (query: string) => void;
  // onContentTypeChange: (contentType: Option) => void;
  // onPageChange: (page: number) => void;
}
