import type { EquipmentListing } from "../types";

export function normalizeArabic(value: string) {
  return value
    .replace(/[\u064B-\u065F\u0670\u0640]/g, "")
    .replace(/[أإآٱ]/g, "ا")
    .replace(/ة/g, "ه")
    .replace(/ى/g, "ي")
    .replace(/[^\u0621-\u064Aa-zA-Z0-9\s]/g, " ")
    .replace(/\s+/g, " ")
    .trim()
    .toLowerCase();
}

export function filterListings(
  listings: EquipmentListing[],
  nameQuery: string,
  locationQuery: string,
) {
  const name = normalizeArabic(nameQuery);
  const location = normalizeArabic(locationQuery);

  return listings
    .filter((item) => {
      const matchesName = !name || normalizeArabic(item.name).includes(name);
      const place = normalizeArabic(`${item.area} ${item.governorate}`);
      const matchesLocation = !location || place.includes(location);
      return matchesName && matchesLocation;
    })
    .sort(
      (a, b) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
    );
}
