import { useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { EquipmentCard } from "../components/EquipmentCard";
import { EquipmentModal } from "../components/EquipmentModal";
import { SearchForm } from "../components/SearchForm";
import { useListings } from "../context/ListingsContext";
import { filterListings } from "../lib/search";
import type { EquipmentListing } from "../types";

export function Browse() {
  const { listings } = useListings();
  const [params, setParams] = useSearchParams();
  const [selected, setSelected] = useState<EquipmentListing | null>(null);

  const name = params.get("name") ?? "";
  const location = params.get("location") ?? "";

  const results = useMemo(
    () => filterListings(listings, name, location),
    [listings, name, location],
  );

  const updateParam = (key: string, value: string) => {
    const next = new URLSearchParams(params);
    if (value.trim()) next.set(key, value);
    else next.delete(key);
    setParams(next);
  };

  return (
    <div className="mx-auto max-w-6xl px-4 py-8">
      <h1 className="mb-2 text-3xl font-extrabold text-awn-900">
        الأجهزة المتاحة
      </h1>
      <p className="mb-6 text-slate-600">
        دور بالاسم أو بالمكان. النتائج بتتحدث فورًا من بيانات الموقع المحلية.
      </p>
      <SearchForm
        name={name}
        location={location}
        onNameChange={(value) => updateParam("name", value)}
        onLocationChange={(value) => updateParam("location", value)}
        onSubmit={() => undefined}
        onClear={() => setParams({})}
      />
      <p className="mt-5 text-sm text-slate-500">عدد النتائج: {results.length}</p>
      {results.length === 0 ? (
        <div className="mt-8 rounded-3xl bg-awn-50 p-8 text-center leading-8 text-awn-900">
          ملقيناش أجهزة مطابقة لبحثك. جربي اسم جهاز أو منطقة تانية.
        </div>
      ) : (
        <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {results.map((listing) => (
            <EquipmentCard
              key={listing.id}
              listing={listing}
              onOpen={setSelected}
            />
          ))}
        </div>
      )}
      <EquipmentModal listing={selected} onClose={() => setSelected(null)} />
    </div>
  );
}
