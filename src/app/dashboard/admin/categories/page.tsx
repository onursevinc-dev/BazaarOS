import React from "react";
import { getAllCategories } from "@/queries/category";

// Data table
import DataTable from "@/components/ui/data-table";
import { Plus } from "lucide-react";
import CategoryDetails from "@/components/dashboard/forms/category-details";
import { columns } from "./columns";

export default async function AdminCategoriesPage() {
  const categories = await getAllCategories();

  // Check if no categories are found
  if (!categories) return null; //If no categories found, return null

  return (
    <DataTable
      actionButtonText={
        <>
          <Plus size={15} />
        </>
      }
      modalChildren={<CategoryDetails />}
      filterValue="name"
      data={categories}
      searchPlaceholder="Search category name..."
      columns={columns}
    />
  );
}
