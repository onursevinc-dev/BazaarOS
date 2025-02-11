"use server";
// Clerk
import { currentUser } from "@clerk/nextjs/server";

// DB
import { db } from "@/lib/db";

// Prisma
import { Store } from "@prisma/client";

// Function: upsertStore
// Description: Upserts store details into the database, ensuring uniqueness of name, url, email, and phone number.
// Permission Level: Seller only
// Parameters:
// - store: Partial store object containing details of the store to be upserted
// Returns: Updated or newly created store details

export const upsertStore = async (store: Partial<Store>) => {
  try {
    // get current user
    const user = await currentUser();

    // Ensure user is authenticated
    if (!user) throw new Error("Unauthenticated.");

    // Verify admin permission
    if (user.privateMetadata.role !== "SELLER")
      throw new Error(
        "Unauthorized Access: Seller Privileges Required for Entry."
      );
    // Ensure store data is provided
    if (!store) throw new Error("Please provide store data.");

    // check if store with same name, email, url, or phone number already exist

    const existingStore = await db.store.findFirst({
      where: {
        AND: [
          {
            OR: [
              { name: store.name },
              { email: store.email },
              { phone: store.phone },
              { url: store.url },
            ],
          },
          {
            NOT: {
              id: store.id,
            },
          },
        ],
      },
    });

    // If a store with same name , email, or phone number already exists, thorow an error
    if (existingStore) {
      let errorMessage = "";
      if (existingStore.name === store.name) {
        errorMessage = "A store with the same name already exist";
      } else if (existingStore.email === store.email) {
        errorMessage = "A store with the same email already exist";
      } else if (existingStore.phone === store.phone) {
        errorMessage = "A store with the same phone already exist";
      } else if (existingStore.url === store.url) {
        errorMessage = "A store with the same url already exist";
      }
      throw new Error(errorMessage);
    }

    // Upsert store into the database
    const storeDetails = await db.store.upsert({
      where: {
        id: store.id,
      },
      update: store,
      create: {
        ...store,
        user: {
          connect: { id: user.id },
        },
      },
    });

    return storeDetails;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

// Function: getAllStores
// Description: Retrieves all stores from the database.
// Permission Level: public
// Returns: Array of stores sorted by updatedAt date in descending order.

export const getAllStores = async () => {
  // Retrieves all stores from the database
  const stores = await db.store.findMany({
    orderBy: { updatedAt: "desc" },
  });
  return stores;
};

// Function: getStore
// Description: Retrieves a specific store from the database.
// Access Level: Public
// Parameters:
// - storeId: The ID of the store to be retrieved.
// Returns: Details of the requested store

export const getStore = async (storeId: string) => {
  // Retrieve store
  const store = await db.store.findUnique({
    where: {
      id: storeId,
    },
  });
  return store;
};

// Function: deleteStore
// Description: Deletes a store from the database.
// Permission Level: Admin only
// Parameters:
// - storeId: The ID of the store to be deleted.
// Returns: Response indicating success or failure of the deletion operation.
export const deleteStore = async (storeId: string) => {
  // Ensure store ID is provided
  if (!storeId) return new Error("Please provide store ID.");

  // Get current user
  const user = await currentUser();

  // Check if user is authenticated
  if (!user) throw new Error("Unauthorized.");

  //Verify admin permission
  if (user.privateMetadata.role !== "ADMIN")
    throw new Error(
      "Unauthorized Access: Admin Privileges Required for Entry."
    );

  // Delete store from the database
  const response = await db.store.delete({
    where: {
      id: storeId,
    },
  });
  return response;
};
