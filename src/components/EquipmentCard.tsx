import type { EquipmentListing } from "../types";

type EquipmentCardProps = {
  listing: EquipmentListing;
  onOpen: (listing: EquipmentListing) => void;
};

export function EquipmentCard({ listing, onOpen }: EquipmentCardProps) {
  return (
    <article className="flex h-full flex-col overflow-hidden rounded-3xl border border-teal-50 bg-white shadow-card transition hover:-translate-y-1 hover:shadow-lg">
      <div className="relative h-44 bg-awn-50">
        <img
          src={listing.image}
          alt={listing.name}
          className="h-full w-full object-cover"
        />
        {listing.isSample ? (
          <span className="absolute right-3 top-3 rounded-full bg-white/95 px-3 py-1 text-xs font-bold text-awn-800">
            مثال تجريبي
          </span>
        ) : (
          <span className="absolute right-3 top-3 rounded-full bg-awn-700 px-3 py-1 text-xs font-bold text-white">
            جهازك
          </span>
        )}
      </div>
      <div className="flex flex-1 flex-col gap-3 p-4">
        <div className="flex items-start justify-between gap-3">
          <h3 className="text-lg font-extrabold text-awn-900">{listing.name}</h3>
          <p className="shrink-0 text-base font-extrabold text-awn-700">
            {listing.isFree ? "مجاني" : `${listing.priceEgp} جنيه`}
          </p>
        </div>
        <p className="text-sm leading-6 text-slate-600">
          {listing.condition} · استخدام {listing.usageDuration}
        </p>
        <p className="text-sm font-bold text-teal-800">
          {listing.area}، {listing.governorate}
        </p>
        <button
          type="button"
          className="btn-primary mt-auto"
          onClick={() => onOpen(listing)}
        >
          التفاصيل
        </button>
      </div>
    </article>
  );
}
