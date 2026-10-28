import {
  createContext,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { sampleListings } from "../data/sampleListings";
import { loadUserListings, saveUserListings } from "../lib/storage";
import type { EquipmentListing, ListingFormValues } from "../types";

type ListingsContextValue = {
  listings: EquipmentListing[];
  addListing: (values: ListingFormValues) => EquipmentListing;
  deleteListing: (id: string) => void;
};

const ListingsContext = createContext<ListingsContextValue | null>(null);

export function ListingsProvider({ children }: { children: ReactNode }) {
  const [userListings, setUserListings] = useState<EquipmentListing[]>(() =>
    loadUserListings(),
  );

  const listings = useMemo(
    () =>
      [...userListings, ...sampleListings].sort(
        (a, b) =>
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
      ),
    [userListings],
  );

  const addListing = (values: ListingFormValues) => {
    const listing: EquipmentListing = {
      ...values,
      id: `local-${Date.now()}`,
      isSample: false,
      createdAt: new Date().toISOString(),
    };
    const next = [listing, ...userListings];
    saveUserListings(next);
    setUserListings(next);
    return listing;
  };

  const deleteListing = (id: string) => {
    setUserListings((current) => {
      const next = current.filter((item) => item.id !== id);
      saveUserListings(next);
      return next;
    });
  };

  return (
    <ListingsContext.Provider value={{ listings, addListing, deleteListing }}>
      {children}
    </ListingsContext.Provider>
  );
}

export function useListings() {
  const value = useContext(ListingsContext);
  if (!value) {
    throw new Error("useListings must be used inside ListingsProvider");
  }
  return value;
}
