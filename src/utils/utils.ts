import { GameSearchResponse } from "../types";

export function formatingUnixDate(unixDate: number) {
  return new Date(unixDate * 1000).toLocaleDateString();
}

export const isExpired = (expiryDate: string): boolean => {
  const currentDate = new Date();
  const expirationDate = new Date(expiryDate);

  return currentDate > expirationDate;
};

export function formatingQuery(query: string) {
  return query.replace(/ /g, "").toLowerCase()
}

export function removeDuplicateResults(response: GameSearchResponse): GameSearchResponse {
  const uniqueNewIdsSet = new Set<string>();
  response.data.results = response.data.results.filter(result => {
      if (!uniqueNewIdsSet.has(result.new_id)) {
          uniqueNewIdsSet.add(result.new_id);
          return true;
      }
      return false;
  });
  return response;
}