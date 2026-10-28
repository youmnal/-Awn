import { FormEvent } from "react";
import { LOCATION_OPTIONS } from "../data/egypt";

type SearchFormProps = {
  name: string;
  location: string;
  onNameChange: (value: string) => void;
  onLocationChange: (value: string) => void;
  onSubmit: () => void;
  onClear?: () => void;
};

export function SearchForm({
  name,
  location,
  onNameChange,
  onLocationChange,
  onSubmit,
  onClear,
}: SearchFormProps) {
  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    onSubmit();
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="grid gap-3 rounded-3xl bg-white p-4 shadow-card md:grid-cols-[1.3fr_1fr_auto]"
    >
      <label className="block">
        <span className="mb-2 block text-sm font-bold text-awn-900">
          اسم الجهاز
        </span>
        <input
          className="field"
          value={name}
          onChange={(event) => onNameChange(event.target.value)}
          placeholder="مثال: كرسي متحرك، سرير طبي، جهاز أكسجين"
        />
      </label>
      <label className="block">
        <span className="mb-2 block text-sm font-bold text-awn-900">
          المحافظة أو المنطقة
        </span>
        <input
          className="field"
          list="awn-locations"
          value={location}
          onChange={(event) => onLocationChange(event.target.value)}
          placeholder="مثال: مدينة نصر، القاهرة"
        />
        <datalist id="awn-locations">
          {LOCATION_OPTIONS.map((item) => (
            <option key={item.label} value={item.label} />
          ))}
        </datalist>
      </label>
      <div className="flex items-end gap-2">
        <button type="submit" className="btn-primary w-full md:w-auto">
          ابحث عن جهاز
        </button>
        {onClear ? (
          <button type="button" className="btn-secondary" onClick={onClear}>
            مسح
          </button>
        ) : null}
      </div>
    </form>
  );
}
