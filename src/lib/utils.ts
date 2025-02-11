import { PrismaClient } from "@prisma/client";
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { db } from "./db";
import ColorThief from "colorthief";
import { CartProductType, Country } from "./types";
import countries from "@/data/countries.json";
import { differenceInDays, differenceInHours } from "date-fns";
import { NextRequest } from "next/server";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Helper function to genarae a unique slug
export const generateUniqueSlug = async (
  baseSlug: string,
  model: keyof PrismaClient,
  field: string = "slug",
  separator: string = "-"
) => {
  let slug = baseSlug;
  let suffix = 1;

  while (true) {
    const exisitngRecord = await (db[model] as any).findFirst({
      where: {
        [field]: slug,
      },
    });
    if (!exisitngRecord) {
      break;
    }
    slug = `${slug}${separator}${suffix}`;
    suffix += 1;
  }
  return slug;
};

// Helper function to grid grid classnames dependng on length
export const getGridClassName = (length: number) => {
  switch (length) {
    case 2:
      return "grid-cols-2";
    case 3:
      return "grid-cols-2 grid-rows-2";
    case 4:
      return "grid-cols-2 grid-rows-1";
    case 5:
      return "grid-cols-2 grid-rows-6";
    case 6:
      return "grid-cols-2";
    default:
      return "";
  }
};

// Function to get prominent colors from an image
export const getDominantColors = (imgUrl: string): Promise<string[]> => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.crossOrigin = "Anonymous";
    img.src = imgUrl;
    img.onload = () => {
      try {
        const colorThief = new ColorThief();
        const colors = colorThief.getPalette(img, 4).map((color) => {
          // Convert RGB array to hex string
          return `#${((1 << 24) + (color[0] << 16) + (color[1] << 8) + color[2])
            .toString(16)
            .slice(1)
            .toUpperCase()}`;
        });
        resolve(colors);
      } catch (error) {
        reject(error);
      }
    };
    img.onerror = () => {
      reject(new Error("Failed to load image"));
    };
  });
};

// the helper function to get the user country
// Define the default country
const DEFAULT_COUNTRY: Country = {
  name: "United States",
  code: "US",
  city: "",
  region: "",
};

// utils.ts
interface IPInfoResponse {
  country: string;
  city: string;
  region: string;
}
export async function getUserCountry(req: Request): Promise<Country> {
  let userCountry: Country = DEFAULT_COUNTRY;

  // If geo data is available (in production on Vercel as an edge function)
  const geo = (req as any).geo; // For edge functions in Vercel
  if (geo) {
    userCountry = {
      name: geo.country || DEFAULT_COUNTRY.name,
      code: geo.country || DEFAULT_COUNTRY.code,
      city: geo.city || DEFAULT_COUNTRY.city,
      region: geo.region || DEFAULT_COUNTRY.region,
    };
  } else {
    // Fallback to IPInfo API on localhost or non-edge environments
    try {
      const response = await fetch(
        `https://ipinfo.io/?token=${process.env.IPINFO_TOKEN}`
      );
      if (response.ok) {
        const data = (await response.json()) as IPInfoResponse;
        userCountry = {
          name:
            countries.find((c) => c.code === data.country)?.name ||
            data.country ||
            DEFAULT_COUNTRY.name,
          code: data.country || DEFAULT_COUNTRY.code,
          city: data.city || DEFAULT_COUNTRY.city,
          region: data.region || DEFAULT_COUNTRY.region,
        };
      }
    } catch (error) {
      // Handle error if necessary
    }
  }

  return userCountry;
}

/**
 * Function: getShippingDatesRange
 * Description: Returns the shipping date range by adding the specified min and max days to the current date.
 * Parameters:
 *    - minDays: Minimum number of days to add to the current date.
 *    - maxDays: Maximum number of days to add to the current date.
 * Returns: Object containing minDate and maxDate.
 */

export const getShippingDatesRange = (
  minDays: number,
  maxDays: number,
  date?: Date
): { minDate: string; maxDate: string } => {
  // Get the current date
  const currentDate = date ? new Date(date) : new Date();

  // Calculate minDate by adding minDays to current date
  const minDate = new Date(currentDate);
  minDate.setDate(currentDate.getDate() + minDays);

  // Calculate maxDate by adding maxDays to current date
  const maxDate = new Date(currentDate);
  maxDate.setDate(currentDate.getDate() + maxDays);

  // Return an object containing minDate and maxDate
  return {
    minDate: minDate.toDateString(),
    maxDate: maxDate.toDateString(),
  };
};

// Function to validate the product data before adding it to the cart
export const isProductValidToAdd = (product: CartProductType): boolean => {
  // Check that all required fields are filled
  const {
    productId,
    variantId,
    productSlug,
    variantSlug,
    name,
    variantName,
    image,
    quantity,
    price,
    sizeId,
    size,
    stock,
    shippingFee,
    extraShippingFee,
    shippingMethod,
    shippingService,
    variantImage,
    weight,
    deliveryTimeMin,
    deliveryTimeMax,
  } = product;

  // Ensure that all necessary fields have values
  if (
    !productId ||
    !variantId ||
    !productSlug ||
    !variantSlug ||
    !name ||
    !variantName ||
    !image ||
    quantity <= 0 ||
    price <= 0 ||
    !sizeId || // Ensure sizeId is not empty
    !size || // Ensure size is not empty
    stock <= 0 ||
    weight <= 0 || // Weight should be <= 0
    !shippingMethod ||
    !variantImage ||
    deliveryTimeMin < 0 ||
    deliveryTimeMax < deliveryTimeMin // Ensure delivery times are valid
  ) {
    return false; // Validation failed
  }

  return true; // Product is valid
};

// Function to censor names
type CensorReturn = {
  firstName: string;
  lastName: string;
  fullName: string;
};
export function censorName(firstName: string, lastName: string): CensorReturn {
  const censor = (name: string): string => {
    if (name.length <= 2) return name; // Return short names as is

    // Get the first and last characters
    const firstChar = name[0];
    const lastChar = name[name.length - 1];

    // Calculate how many characters to censor
    const middleLength = name.length - 2; // Length of middle characters to censor

    // Create censored version
    return `${firstChar}${"*".repeat(middleLength)}${lastChar}`;
  };

  const censoredFullName = `${firstName[0]}***${lastName[lastName.length - 1]}`;
  return {
    firstName: censor(firstName),
    lastName: censor(lastName),
    fullName: censoredFullName,
  };
}

export const getTimeUntil = (
  targetDate: string
): { days: number; hours: number } => {
  // Convert the date string to a Date object
  const target = new Date(targetDate);
  const now = new Date();

  // Ensure the target date is in the future
  if (target <= now) return { days: 0, hours: 0 };

  // Calculate days and hours left
  const totalDays = differenceInDays(target, now);
  const totalHours = differenceInHours(target, now) % 24;

  return { days: totalDays, hours: totalHours };
};

export const downloadBlobAsFile = (blob: Blob, filename: string) => {
  const link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.download = filename;
  link.click();
  URL.revokeObjectURL(link.href);
};

export const printPDF = (blob: Blob) => {
  const pdfUrl = URL.createObjectURL(blob);
  const printWindow = window.open(pdfUrl, "_blank");
  if (printWindow) {
    printWindow.addEventListener("load", () => {
      printWindow.focus();
      printWindow.print();
    });
  }
};

// Handle product history in localStorage
export const updateProductHistory = (variantId: string) => {
  // Fetch existing product history from localStorage
  let productHistory: string[] = [];
  const historyString = localStorage.getItem("productHistory");

  if (historyString) {
    try {
      productHistory = JSON.parse(historyString);
    } catch (error) {
      productHistory = [];
    }
  }

  // Update the history: Remove the product if it exists, and add it to the front
  productHistory = productHistory.filter((id) => id !== variantId);
  productHistory.unshift(variantId);

  // Check storage limit (manage max number of products)
  const MAX_PRODUCTS = 100;
  if (productHistory.length > MAX_PRODUCTS) {
    productHistory.pop(); // Remove the oldest product
  }
  // Save updated history to localStorage
  localStorage.setItem("productHistory", JSON.stringify(productHistory));
};
