"use server";
// Clerk
import { currentUser } from "@clerk/nextjs/server";

// DB
import { db } from "@/lib/db";

// Prisma
import { SubCategory } from "@prisma/client";

// Function: upsertSubCategory
// Description: Upserts a subCategory into the database, updating if it exist or creating a new one if not.
// Permission Level: Admin only
// Parameters:
// - subCategory: SubCategory object containing details of the subCategory to be upsert
// Returns: Updated or newly created subCategory details

export const upsertSubCategory = async (subCategory: SubCategory) => {
  try {
    // get current user
    const user = await currentUser();

    // Ensure user is authenticated
    if (!user) throw new Error("Unauthenticated.");

    // Verify admin permission
    if (user.privateMetadata.role !== "ADMIN")
      throw new Error(
        "Unauthorized Access: Admin Privileges Required for Entry."
      );
    // Ensure subCategory data is provided
    if (!subCategory) throw new Error("Please provide subCategory data.");

    // Throw error if subCategory with same name or URL already exist
    const existingSubCategory = await db.subCategory.findFirst({
      where: {
        AND: [
          {
            OR: [{ name: subCategory.name }, { url: subCategory.url }],
          },
          {
            NOT: {
              id: subCategory.id,
            },
          },
        ],
      },
    });

    // Throw error if subCategory with same or URL already exist
    if (existingSubCategory) {
      let errorMessage = "";
      if (existingSubCategory.name === subCategory.name) {
        errorMessage = "A subCategory with the same name already exist";
      } else if (existingSubCategory.url === subCategory.url) {
        errorMessage = "A subCategory with the same URL already exist";
      }
      throw new Error(errorMessage);
    }

    // Upsert subCategory into the database
    const subCategoryDetails = await db.subCategory.upsert({
      where: {
        id: subCategory.id,
      },
      update: subCategory,
      create: subCategory,
    });

    return subCategoryDetails;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

// Function: getAllSubCategories
// Description: Retrieves all subCategories from the database.
// Permission Level: public
// Returns: Array of subCategories sorted by updatedAt date in descending order.

export const getAllSubCategories = async () => {
  // Retrieves all subCategories from the database
  const subCategories = await db.subCategory.findMany({
    include: {
      category: true,
    },
    orderBy: { updatedAt: "desc" },
  });
  return subCategories;
};

// Function: getSubCategory
// Description: Retrieves a specific subCategory from the database.
// Access Level: Public
// Parameters:
// - subCategoryId: The ID of the subCategory to be retrieved.
// Returns: Details of the requested subCategory

export const getSubCategory = async (subCategoryId: string) => {
  // Retrieve subCategory
  const subCategory = await db.subCategory.findUnique({
    where: {
      id: subCategoryId,
    },
  });
  return subCategory;
};

// Function: deleteSubCategory
// Description: Deletes a subCategory from the database.
// Permission Level: Admin only
// Parameters:
// - subCategoryId: The ID of the subCategory to be deleted.
// Returns: Response indicating success or failure of the deletion operation.
export const deleteSubCategory = async (subCategoryId: string) => {
  // Ensure subCategory ID is provided
  if (!subCategoryId) return new Error("Please provide subCategory ID.");

  // Get current user
  const user = await currentUser();

  // Check if user is authenticated
  if (!user) throw new Error("Unauthorized.");

  //Verify admin permission
  if (user.privateMetadata.role !== "ADMIN")
    throw new Error(
      "Unauthorized Access: Admin Privileges Required for Entry."
    );

  // Delete subCategory from the database
  const response = await db.subCategory.delete({
    where: {
      id: subCategoryId,
    },
  });
  return response;
};
