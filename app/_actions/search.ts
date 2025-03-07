// src/app/actions/search.ts
"use server";

import { Language } from "../_lib/config/i18n";
import { searchService } from "../_services/searchService";
import { SearchBarOption } from "../_components/SearchBar";

export async function searchAction(
  query: string,
  lang: Language
): Promise<SearchBarOption[]> {
  const results = await searchService.search(query, lang);
  return results.map((entity) => searchService.toSearchBarOption(entity));
}
