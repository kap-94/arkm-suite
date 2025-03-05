// src/app/actions/search.ts
"use server";

import { Language } from "@/lib/config/i18n";
import { searchService } from "@/services/searchService";
import { SearchBarOption } from "@/components/SearchBar";

export async function searchAction(
  query: string,
  lang: Language
): Promise<SearchBarOption[]> {
  const results = await searchService.search(query, lang);
  return results.map((entity) => searchService.toSearchBarOption(entity));
}
