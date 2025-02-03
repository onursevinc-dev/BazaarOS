import CategoryDetails from "@/components/dashboard/forms/category-details";
import React from "react";

export default function AdminNewCategoryPage() {
  const CLOUDINARY_CLOUD_KEY = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_KEY;
  if (!CLOUDINARY_CLOUD_KEY) return null;
  return (
    <div>
      <CategoryDetails cloudinary_key={CLOUDINARY_CLOUD_KEY} />
    </div>
  );
}
