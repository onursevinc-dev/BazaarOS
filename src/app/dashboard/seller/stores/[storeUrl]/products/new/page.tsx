import ProductDetails from "@/components/dashboard/forms/product-details";
import { getAllCategories } from "@/queries/category";
import React from "react";

export default async function SellerNewProductPage({
  params,
}: {
  params: { storeUrl: string };
}) {
  const categories = await getAllCategories();
  return (
    <div className="w-full">
      <ProductDetails categories={categories} storeUrl={params.storeUrl} />
    </div>
  );
}
