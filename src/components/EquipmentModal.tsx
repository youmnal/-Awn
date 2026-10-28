import { useListings } from "../context/ListingsContext";
import type { EquipmentListing } from "../types";

type EquipmentModalProps = {
  listing: EquipmentListing | null;
  onClose: () => void;
};

export function EquipmentModal({ listing, onClose }: EquipmentModalProps) {
  const { deleteListing } = useListings();

  if (!listing) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-end justify-center bg-slate-900/40 p-4 sm:items-center"
      onClick={onClose}
    >
      <div
        className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-3xl bg-white p-5 shadow-xl"
        onClick={(event) => event.stopPropagation()}
      >
        <img
          src={listing.image}
          alt={listing.name}
          className="mb-4 h-56 w-full rounded-2xl object-cover"
        />
        <div className="mb-3 flex flex-wrap items-center gap-2">
          {listing.isSample ? (
            <span className="rounded-full bg-awn-100 px-3 py-1 text-xs font-bold text-awn-800">
              مثال تجريبي
            </span>
          ) : (
            <span className="rounded-full bg-awn-700 px-3 py-1 text-xs font-bold text-white">
              محفوظ على هذا المتصفح
            </span>
          )}
          <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-bold text-slate-600">
            {listing.category}
          </span>
        </div>
        <h2 className="text-2xl font-extrabold text-awn-900">{listing.name}</h2>
        <p className="mt-2 text-lg font-extrabold text-awn-700">
          {listing.isFree ? "مجاني" : `${listing.priceEgp} جنيه`}
        </p>
        <p className="mt-4 leading-8 text-slate-700">{listing.description}</p>
        <dl className="mt-5 grid gap-3 text-sm sm:grid-cols-2">
          <div className="rounded-2xl bg-awn-50 p-3">
            <dt className="text-slate-500">مدة الاستخدام</dt>
            <dd className="font-bold">{listing.usageDuration}</dd>
          </div>
          <div className="rounded-2xl bg-awn-50 p-3">
            <dt className="text-slate-500">حالة الجهاز</dt>
            <dd className="font-bold">{listing.condition}</dd>
          </div>
          <div className="rounded-2xl bg-awn-50 p-3">
            <dt className="text-slate-500">هل يعمل؟</dt>
            <dd className="font-bold">{listing.workingStatus}</dd>
          </div>
          <div className="rounded-2xl bg-awn-50 p-3">
            <dt className="text-slate-500">المكان</dt>
            <dd className="font-bold">
              {listing.area}، {listing.governorate}
            </dd>
          </div>
        </dl>
        <p className="mt-4 text-sm leading-7 text-slate-600">
          <span className="font-bold text-awn-900">العيوب: </span>
          {listing.defects || "غير مذكورة"}
        </p>
        {listing.isSample ? (
          <p className="mt-4 rounded-2xl bg-amber-50 p-3 text-sm leading-7 text-amber-900">
            هذا مثال تجريبي للتجربة داخل الموقع. مش عرض حقيقي، ومفيش بيانات تواصل
            لمعلن فعلي.
          </p>
        ) : (
          <div className="mt-4 rounded-2xl bg-awn-50 p-3 text-sm leading-7">
            <p>
              <span className="font-bold">اسم صاحب الإعلان: </span>
              {listing.contactName || "غير مذكور"}
            </p>
            <p>
              <span className="font-bold">طريقة التواصل: </span>
              {listing.contactNote || "غير مذكورة"}
            </p>
            <p className="mt-2 text-teal-800">
              الإعلان ده محفوظ على جهازك الحالي فقط، ومش هيبان لوحده عند مستخدمين
              تانيين.
            </p>
          </div>
        )}
        <div className="mt-5 flex flex-wrap gap-2">
          <button type="button" className="btn-secondary" onClick={onClose}>
            إغلاق
          </button>
          {!listing.isSample ? (
            <button
              type="button"
              className="rounded-2xl bg-rose-600 px-5 py-3 font-bold text-white hover:bg-rose-700"
              onClick={() => {
                deleteListing(listing.id);
                onClose();
              }}
            >
              حذف إعلاني
            </button>
          ) : null}
        </div>
      </div>
    </div>
  );
}
