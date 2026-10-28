export type EquipmentCondition =
  | "جديد"
  | "استعمال خفيف"
  | "حالة جيدة"
  | "محتاج صيانة";

export type WorkingStatus = "يعمل" | "لا يعمل" | "يعمل جزئيًا";

export type EquipmentListing = {
  id: string;
  name: string;
  category: string;
  description: string;
  usageDuration: string;
  condition: EquipmentCondition;
  workingStatus: WorkingStatus;
  defects: string;
  priceEgp: number | null;
  isFree: boolean;
  image: string;
  governorate: string;
  area: string;
  contactName?: string;
  contactNote?: string;
  isSample: boolean;
  createdAt: string;
};

export type ListingFormValues = Omit<
  EquipmentListing,
  "id" | "isSample" | "createdAt" | "image"
> & {
  image: string;
};
