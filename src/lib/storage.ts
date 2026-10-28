import type { EquipmentListing } from "../types";

const KEY = "awn-user-listings-v1";

export function loadUserListings(): EquipmentListing[] {
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw) as EquipmentListing[];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

export function saveUserListings(listings: EquipmentListing[]) {
  localStorage.setItem(KEY, JSON.stringify(listings));
}
