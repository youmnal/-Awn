import { FormEvent, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { CATEGORIES, CONDITIONS, GOVERNORATES, WORKING_STATUSES } from "../data/egypt";
import { useListings } from "../context/ListingsContext";
import { compressImage } from "../lib/image";
import type { EquipmentCondition, WorkingStatus } from "../types";

const emptyErrors: Record<string, string> = {};

export function AddListing() {
  const navigate = useNavigate();
  const { addListing } = useListings();
  const [name, setName] = useState("");
  const [category, setCategory] = useState(CATEGORIES[0]);
  const [description, setDescription] = useState("");
  const [usageDuration, setUsageDuration] = useState("");
  const [condition, setCondition] = useState<EquipmentCondition>("حالة جيدة");
  const [workingStatus, setWorkingStatus] = useState<WorkingStatus>("يعمل");
  const [defects, setDefects] = useState("");
  const [priceEgp, setPriceEgp] = useState("");
  const [isFree, setIsFree] = useState(false);
  const [governorate, setGovernorate] = useState("القاهرة");
  const [area, setArea] = useState("مدينة نصر");
  const [contactName, setContactName] = useState("");
  const [contactNote, setContactNote] = useState("");
  const [image, setImage] = useState("");
  const [errors, setErrors] = useState(emptyErrors);
  const [success, setSuccess] = useState("");
  const [saving, setSaving] = useState(false);

  const areas = useMemo(() => GOVERNORATES[governorate] ?? [], [governorate]);

  const validate = () => {
    const next: Record<string, string> = {};
    if (name.trim().length < 2) next.name = "اكتبي اسم الجهاز بوضوح.";
    if (description.trim().length < 10) next.description = "الوصف قصير جدًا.";
    if (!isFree && (!priceEgp || Number(priceEgp) <= 0)) {
      next.priceEgp = "اكتبي سعر بالجنيه، أو اختاري إن الجهاز مجاني.";
    }
    if (!governorate) next.governorate = "اختاري المحافظة.";
    if (!area) next.area = "اختاري المنطقة.";
    return next;
  };

  const defaultImage = "/images/wheelchair.svg";

  const onImage = async (file?: File) => {
    if (!file) return;
    try {
      const compressed = await compressImage(file);
      setImage(compressed);
      setErrors((current) => ({ ...current, image: "" }));
    } catch {
      setErrors((current) => ({
        ...current,
        image: "الصورة مش مقبولة. جرّبي صورة أوضح.",
      }));
    }
  };

  const onSubmit = (event: FormEvent) => {
    event.preventDefault();
    const nextErrors = validate();
    setErrors(nextErrors);
    setSuccess("");
    if (Object.keys(nextErrors).length > 0) return;

    setSaving(true);
    try {
      const listing = addListing({
        name: name.trim(),
        category,
        description: description.trim(),
        usageDuration: usageDuration.trim(),
        condition,
        workingStatus,
        defects: defects.trim() || "غير مذكورة",
        priceEgp: isFree ? null : Number(priceEgp),
        isFree,
        image: image || defaultImage,
        governorate,
        area,
        contactName: contactName.trim(),
        contactNote: contactNote.trim(),
      });
      setSuccess("تم حفظ الجهاز على هذا المتصفح. تقدري تدوري عليه دلوقتي.");
      setTimeout(() => navigate(`/equipment?name=${encodeURIComponent(listing.name)}`), 700);
    } catch {
      setErrors({ form: "المساحة المحلية مش كافية للصورة. جرّبي صورة أصغر." });
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="mx-auto max-w-3xl px-4 py-8">
      <h1 className="text-3xl font-extrabold text-awn-900">اعرض جهازك</h1>
      <p className="mt-2 leading-8 text-slate-600">
        الفورم بسيط ومش محتاج حساب. الإعلان بيتحفظ على نفس المتصفح فقط، ومش
        بينتقل تلقائيًا لأجهزة تانية.
      </p>
      <form onSubmit={onSubmit} className="mt-6 space-y-4 rounded-3xl bg-white p-5 shadow-card">
        <label className="block">
          <span className="mb-2 block font-bold">اسم الجهاز</span>
          <input className="field" value={name} onChange={(e) => setName(e.target.value)} />
          {errors.name ? <p className="mt-1 text-sm text-rose-600">{errors.name}</p> : null}
        </label>
        <label className="block">
          <span className="mb-2 block font-bold">التصنيف</span>
          <select className="field" value={category} onChange={(e) => setCategory(e.target.value)}>
            {CATEGORIES.map((item) => (
              <option key={item}>{item}</option>
            ))}
          </select>
        </label>
        <label className="block">
          <span className="mb-2 block font-bold">وصف الجهاز</span>
          <textarea
            className="field min-h-28"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          {errors.description ? (
            <p className="mt-1 text-sm text-rose-600">{errors.description}</p>
          ) : null}
        </label>
        <div className="grid gap-4 sm:grid-cols-2">
          <label className="block">
            <span className="mb-2 block font-bold">مدة الاستخدام (اختياري)</span>
            <input
              className="field"
              placeholder="مثال: 6 شهور"
              value={usageDuration}
              onChange={(e) => setUsageDuration(e.target.value)}
            />
            {errors.usageDuration ? (
              <p className="mt-1 text-sm text-rose-600">{errors.usageDuration}</p>
            ) : null}
          </label>
          <label className="block">
            <span className="mb-2 block font-bold">حالة الجهاز</span>
            <select
              className="field"
              value={condition}
              onChange={(e) => setCondition(e.target.value as EquipmentCondition)}
            >
              {CONDITIONS.map((item) => (
                <option key={item}>{item}</option>
              ))}
            </select>
          </label>
        </div>
        <label className="block">
          <span className="mb-2 block font-bold">هل الجهاز يعمل؟</span>
          <select
            className="field"
            value={workingStatus}
            onChange={(e) => setWorkingStatus(e.target.value as WorkingStatus)}
          >
            {WORKING_STATUSES.map((item) => (
              <option key={item}>{item}</option>
            ))}
          </select>
        </label>
        <label className="block">
          <span className="mb-2 block font-bold">العيوب الموجودة، إن وجدت</span>
          <input className="field" value={defects} onChange={(e) => setDefects(e.target.value)} />
        </label>
        <label className="flex items-center gap-3 rounded-2xl bg-awn-50 px-4 py-3">
          <input
            type="checkbox"
            checked={isFree}
            onChange={(e) => setIsFree(e.target.checked)}
          />
          <span className="font-bold">الجهاز مجاني</span>
        </label>
        {!isFree ? (
          <label className="block">
            <span className="mb-2 block font-bold">السعر بالجنيه المصري</span>
            <input
              className="field"
              type="number"
              min="1"
              value={priceEgp}
              onChange={(e) => setPriceEgp(e.target.value)}
            />
            {errors.priceEgp ? (
              <p className="mt-1 text-sm text-rose-600">{errors.priceEgp}</p>
            ) : null}
          </label>
        ) : null}
        <label className="block">
          <span className="mb-2 block font-bold">صورة الجهاز</span>
          <input
            className="field"
            type="file"
            accept="image/*"
            onChange={(e) => onImage(e.target.files?.[0])}
          />
          {image ? (
            <img src={image} alt="معاينة" className="mt-3 h-40 w-full rounded-2xl object-cover" />
          ) : null}
          {errors.image ? <p className="mt-1 text-sm text-rose-600">{errors.image}</p> : null}
        </label>
        <div className="grid gap-4 sm:grid-cols-2">
          <label className="block">
            <span className="mb-2 block font-bold">المحافظة</span>
            <select
              className="field"
              value={governorate}
              onChange={(e) => {
                const next = e.target.value;
                setGovernorate(next);
                setArea(GOVERNORATES[next]?.[0] ?? "");
              }}
            >
              {Object.keys(GOVERNORATES).map((item) => (
                <option key={item}>{item}</option>
              ))}
            </select>
          </label>
          <label className="block">
            <span className="mb-2 block font-bold">المنطقة</span>
            <select className="field" value={area} onChange={(e) => setArea(e.target.value)}>
              {areas.map((item) => (
                <option key={item}>{item}</option>
              ))}
            </select>
          </label>
        </div>
        <label className="block">
          <span className="mb-2 block font-bold">اسمك (اختياري)</span>
          <input className="field" value={contactName} onChange={(e) => setContactName(e.target.value)} />
        </label>
        <label className="block">
          <span className="mb-2 block font-bold">طريقة تواصل اختيارية</span>
          <input
            className="field"
            placeholder="مثال: واتساب أو رسالة من خلال معارف"
            value={contactNote}
            onChange={(e) => setContactNote(e.target.value)}
          />
        </label>
        {errors.form ? <p className="text-sm text-rose-600">{errors.form}</p> : null}
        {success ? (
          <p className="rounded-2xl bg-emerald-50 p-3 font-bold text-emerald-800">{success}</p>
        ) : null}
        <button type="submit" className="btn-primary w-full" disabled={saving}>
          نشر الجهاز
        </button>
      </form>
    </div>
  );
}
