import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { EquipmentCard } from "../components/EquipmentCard";
import { EquipmentModal } from "../components/EquipmentModal";
import { SearchForm } from "../components/SearchForm";
import { useListings } from "../context/ListingsContext";
import type { EquipmentListing } from "../types";

const steps = [
  {
    title: "اعرض جهازك",
    text: "اكتب اسم الجهاز وصورته وحالته في فورم بسيط.",
  },
  {
    title: "حدد مكانك",
    text: "اختار المحافظة والمنطقة عشان اللي قريب منك يلاقيه.",
  },
  {
    title: "خلي اللي محتاجه يوصلك",
    text: "دور أو اعرض. عون بتسهّل الوصلة من غير تعقيد.",
  },
];

export function Home() {
  const navigate = useNavigate();
  const { listings } = useListings();
  const [name, setName] = useState("");
  const [location, setLocation] = useState("");
  const [selected, setSelected] = useState<EquipmentListing | null>(null);

  const preview = useMemo(() => listings.slice(0, 6), [listings]);

  const goSearch = () => {
    const params = new URLSearchParams();
    if (name.trim()) params.set("name", name.trim());
    if (location.trim()) params.set("location", location.trim());
    navigate(`/equipment?${params.toString()}`);
  };

  return (
    <div>
      <section className="bg-[linear-gradient(180deg,#f0fdfa_0%,#ffffff_78%)]">
        <div className="mx-auto grid max-w-6xl gap-10 px-4 py-12 md:grid-cols-2 md:items-center md:py-16">
          <div>
            <img
              src="/awn-logo.png"
              alt="عون Awn"
              className="mb-3 h-16 w-32 object-contain object-right"
            />
            <h1 className="text-4xl font-extrabold leading-snug text-awn-900 md:text-5xl">
              بتدور على جهاز طبي؟
            </h1>
            <p className="mt-4 max-w-xl text-lg leading-9 text-slate-600">
              دور على الجهاز اللي محتاجه في منطقتك، أو اعرض جهازك ليستفيد منه حد
              تاني.
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <button type="button" className="btn-primary" onClick={goSearch}>
                دور على جهاز
              </button>
              <button
                type="button"
                className="btn-secondary"
                onClick={() => navigate("/add")}
              >
                اعرض جهازك
              </button>
            </div>
          </div>
          <div className="rounded-[2rem] bg-white p-3 shadow-card">
            <img
              src="/images/wheelchair.jpg"
              alt="كرسي متحرك"
              className="h-64 w-full rounded-[1.5rem] object-cover"
            />
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4">
        <SearchForm
          name={name}
          location={location}
          onNameChange={setName}
          onLocationChange={setLocation}
          onSubmit={goSearch}
        />
      </section>

      <section className="mx-auto max-w-6xl px-4 py-12">
        <div className="mb-6 flex items-end justify-between gap-3">
          <div>
            <h2 className="text-2xl font-extrabold text-awn-900">أجهزة للتجربة</h2>
            <p className="mt-1 text-sm text-slate-500">
              أمثلة تجريبية تقدر تتصفحها من غير حساب.
            </p>
          </div>
          <button
            type="button"
            className="text-sm font-bold text-awn-700"
            onClick={() => navigate("/equipment")}
          >
            كل الأجهزة
          </button>
        </div>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {preview.map((listing) => (
            <EquipmentCard
              key={listing.id}
              listing={listing}
              onOpen={setSelected}
            />
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 pb-8">
        <h2 className="mb-6 text-2xl font-extrabold text-awn-900">إزاي بتشتغل؟</h2>
        <div className="grid gap-4 md:grid-cols-3">
          {steps.map((step, index) => (
            <div key={step.title} className="rounded-3xl bg-awn-50 p-5">
              <span className="mb-3 inline-flex h-9 w-9 items-center justify-center rounded-full bg-awn-700 font-bold text-white">
                {index + 1}
              </span>
              <h3 className="text-lg font-extrabold text-awn-900">{step.title}</h3>
              <p className="mt-2 leading-7 text-slate-600">{step.text}</p>
            </div>
          ))}
        </div>
      </section>

      <EquipmentModal listing={selected} onClose={() => setSelected(null)} />
    </div>
  );
}
