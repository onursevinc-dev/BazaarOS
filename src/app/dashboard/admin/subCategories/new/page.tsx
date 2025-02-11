import SubCategoryDetails from "@/components/dashboard/forms/subCategory-details";
import { getAllCategories } from "@/queries/category";
import React from "react";

export default async function AdminNewSubcategoriesPage() {
  const categories = await getAllCategories();
  return <SubCategoryDetails categories={categories} />;
}
