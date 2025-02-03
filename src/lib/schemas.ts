import { ShippingFeeMethod } from "@prisma/client";
import * as z from "zod";

// Catgeory form schema
export const CategoryFormSchema = z.object({
  name: z
    .string({
      required_error: "Category name is required.",
      invalid_type_error: "Category nale must be a string.",
    })
    .min(2, { message: "Category name must be at least 2 characters long." })
    .max(50, { message: "Category name cannot exceed 50 characters." })
    .regex(/^[a-zA-Z0-9\s'&-]+$/, {
      message:
        "Only letters, numbers, and spaces are allowed in the category name.",
    }),
  image: z
    .object({
      url: z.string(),
    })
    .array()
    .length(1, "Choose a category image."),
  url: z
    .string({
      required_error: "Category url is required",
      invalid_type_error: "Category url must be a string",
    })
    .min(2, { message: "Category url must be at least 2 characters long." })
    .max(50, { message: "Category url cannot exceed 50 characters." })
    .regex(/^(?!.*(?:[-_ ]){2,})[a-zA-Z0-9_-]+$/, {
      message:
        "Only letters, numbers, hyphen, and underscore are allowed in the category url, and consecutive occurrences of hyphens, underscores, or spaces are not permitted.",
    }),
  featured: z.boolean().default(false),
});

// SubCategory schema
export const SubCategoryFormSchema = z.object({
  name: z
    .string({
      required_error: "SubCategory name is required",
      invalid_type_error: "SubCategory name must be a string",
    })
    .min(2, { message: "SubCategory name must be at least 2 characters long." })
    .max(50, { message: "SubCategory name cannot exceed 50 characters." })
    .regex(/^[a-zA-Z0-9\s'&-]+$/, {
      message:
        "Only letters, numbers, and spaces are allowed in the subCategory name.",
    }),
  image: z
    .object({ url: z.string() })
    .array()
    .length(1, "Choose only one subCategory image"),
  url: z
    .string({
      required_error: "SubCategory url is required",
      invalid_type_error: "SubCategory url must be a string",
    })
    .min(2, { message: "SubCategory url must be at least 2 characters long." })
    .max(50, { message: "SubCategory url cannot exceed 50 characters." })
    .regex(/^(?!.*(?:[-_ ]){2,})[a-zA-Z0-9_-]+$/, {
      message:
        "Only letters, numbers, hyphen, and underscore are allowed in the subCategory url, and consecutive occurrences of hyphens, underscores, or spaces are not permitted.",
    }),
  categoryId: z.string().uuid(),
  featured: z.boolean().default(false),
});

// Store schema
export const StoreFormSchema = z.object({
  name: z
    .string({
      required_error: "Store name is required",
      invalid_type_error: "Store name must be a string",
    })
    .min(2, { message: "Store name must be at least 2 characters long." })
    .max(50, { message: "Store name cannot exceed 50 characters." })
    .regex(/^(?!.*(?:[-_& ]){2,})[a-zA-Z0-9_ &-]+$/, {
      message:
        "Only letters, numbers, space, hyphen, and underscore are allowed in the store name, and consecutive occurrences of hyphens, underscores, or spaces are not permitted.",
    }),
  description: z
    .string({
      required_error: "Store description is required",
      invalid_type_error: "Store description must be a string",
    })
    .min(30, {
      message: "Store description must be at least 30 characters long.",
    })
    .max(500, { message: "Store description cannot exceed 500 characters." }),
  email: z
    .string({
      required_error: "Store email is required",
      invalid_type_error: "Store email must be a string",
    })
    .email({ message: "Invalid email format." }),
  phone: z
    .string({
      required_error: "Store phone number is required",
      invalid_type_error: "Store phone number must be a string",
    })
    .regex(/^\+?\d+$/, { message: "Invalid phone number format." }),
  logo: z.object({ url: z.string() }).array().length(1, "Choose a logo image."),
  cover: z
    .object({ url: z.string() })
    .array()
    .length(1, "Choose a cover image."),
  url: z
    .string({
      required_error: "Store url is required",
      invalid_type_error: "Store url must be a string",
    })
    .min(2, { message: "Store url must be at least 2 characters long." })
    .max(50, { message: "Store url cannot exceed 50 characters." })
    .regex(/^(?!.*(?:[-_ ]){2,})[a-zA-Z0-9_-]+$/, {
      message:
        "Only letters, numbers, hyphen, and underscore are allowed in the store url, and consecutive occurrences of hyphens, underscores, or spaces are not permitted.",
    }),
  featured: z.boolean().default(false).optional(),
  status: z.string().default("PENDING").optional(),
});

// Product schema
export const ProductFormSchema = z.object({
  name: z
    .string({
      required_error: "Product name is mandatory.",
      invalid_type_error: "Product name must be a valid string.",
    })
    .min(2, { message: "Product name should be at least 2 characters long." })
    .max(200, { message: "Product name cannot exceed 200 characters." }),
  /*
    .regex(/^(?!.*(?:[-_ &' ]){2,})[a-zA-Z0-9_ '&-]+$/, {
      message:
        "Product name may only contain letters, numbers, spaces, hyphens, underscores, ampersands, and apostrophes, without consecutive special characters.",
    })
   */ description: z
    .string({
      required_error: "Product description is mandatory.",
      invalid_type_error: "Product description must be a valid string.",
    })
    .min(200, {
      message: "Product description should be at least 200 characters long.",
    }),
  variantName: z
    .string({
      required_error: "Product variant name is mandatory.",
      invalid_type_error: "Product variant name must be a valid string.",
    })
    .min(2, {
      message: "Product variant name should be at least 2 characters long.",
    })
    .max(100, {
      message: "Product variant name cannot exceed 100 characters.",
    }),
  /*
    .regex(/^(?!.*(?:[-_ ]){2,})[a-zA-Z0-9_ -]+$/, {
      message:
        "Product variant name may only contain letters, numbers, spaces, hyphens, and underscores, without consecutive special characters.",
    })
     
       */ variantDescription: z
    .string({
      required_error: "Product variant description is mandatory.",
      invalid_type_error: "Product variant description must be a valid string.",
    })
    .optional(),
  images: z
    .object({ url: z.string() })
    .array()
    .min(3, "Please upload at least 3 images for the product.")
    .max(6, "You can upload up to 6 images for the product."),
  variantImage: z
    .object({ url: z.string() })
    .array()
    .length(1, "Choose a product variant image."),
  categoryId: z
    .string({
      required_error: "Product category ID is mandatory.",
      invalid_type_error: "Product category ID must be a valid UUID.",
    })
    .uuid(),
  subCategoryId: z
    .string({
      required_error: "Product sub-category ID is mandatory.",
      invalid_type_error: "Product sub-category ID must be a valid UUID.",
    })
    .uuid(),
  offerTagId: z
    .string({
      required_error: "Product offer tag ID is mandatory.",
      invalid_type_error: "Product offer tag ID must be a valid UUID.",
    })
    .uuid()
    .optional(),
  brand: z
    .string({
      required_error: "Product brand is mandatory.",
      invalid_type_error: "Product brand must be a valid string.",
    })
    .min(2, {
      message: "Product brand should be at least 2 characters long.",
    })
    .max(50, {
      message: "Product brand cannot exceed 50 characters.",
    }),
  sku: z
    .string({
      required_error: "Product SKU is mandatory.",
      invalid_type_error: "Product SKU must be a valid string.",
    })
    .min(6, {
      message: "Product SKU should be at least 6 characters long.",
    })
    .max(50, {
      message: "Product SKU cannot exceed 50 characters.",
    }),
  weight: z.number().min(0.01, {
    message: "Please provide a valid product weight.",
  }),
  keywords: z
    .string({
      required_error: "Product keywords are mandatory.",
      invalid_type_error: "Keywords must be valid strings.",
    })
    .array()
    .min(5, {
      message: "Please provide at least 5 keywords.",
    })
    .max(10, {
      message: "You can provide up to 10 keywords.",
    }),
  colors: z
    .object({ color: z.string() })
    .array()
    .min(1, "Please provide at least one color.")
    .refine((colors) => colors.every((c) => c.color.length > 0), {
      message: "All color inputs must be filled.",
    }),
  sizes: z
    .object({
      size: z.string(),
      quantity: z
        .number()
        .min(1, { message: "Quantity must be greater than 0." }),
      price: z.number().min(0.01, { message: "Price must be greater than 0." }),
      discount: z.number().min(0).default(0),
    })
    .array()
    .min(1, "Please provide at least one size.")
    .refine(
      (sizes) =>
        sizes.every((s) => s.size.length > 0 && s.price > 0 && s.quantity > 0),
      {
        message: "All size inputs must be filled correctly.",
      }
    ),
  product_specs: z
    .object({
      name: z.string(),
      value: z.string(),
    })
    .array()
    .min(1, "Please provide at least one product spec.")
    .refine(
      (product_specs) =>
        product_specs.every((s) => s.name.length > 0 && s.value.length > 0),
      {
        message: "All product specs inputs must be filled correctly.",
      }
    ),
  variant_specs: z
    .object({
      name: z.string(),
      value: z.string(),
    })
    .array()
    .min(1, "Please provide at least one product variant spec.")
    .refine(
      (product_specs) =>
        product_specs.every((s) => s.name.length > 0 && s.value.length > 0),
      {
        message: "All product variant specs inputs must be filled correctly.",
      }
    ),
  questions: z
    .object({
      question: z.string(),
      answer: z.string(),
    })
    .array()
    .min(1, "Please provide at least one product question.")
    .refine(
      (questions) =>
        questions.every((q) => q.question.length > 0 && q.answer.length > 0),
      {
        message: "All product question inputs must be filled correctly.",
      }
    ),
  isSale: z.boolean().default(false),
  saleEndDate: z.string().optional(),
  freeShippingForAllCountries: z.boolean().default(false),
  freeShippingCountriesIds: z
    .object({
      id: z.string().optional(),
      label: z.string(),
      value: z.string(),
    })
    .array()
    .optional()
    .refine(
      (ids) => ids?.every((item) => item.label && item.value),
      "Each country must have a valid name and ID."
    )
    .default([]),
  shippingFeeMethod: z.nativeEnum(ShippingFeeMethod),
});

// OfferTag form schema
export const OfferTagFormSchema = z.object({
  name: z
    .string({
      required_error: "Category name is required.",
      invalid_type_error: "Category nale must be a string.",
    })
    .min(2, { message: "Category name must be at least 2 characters long." })
    .max(50, { message: "Category name cannot exceed 50 characters." })
    .regex(/^[a-zA-Z0-9\s&$.%,']+$/, {
      message:
        "Only letters, numbers, and spaces are allowed in the category name.",
    }),
  url: z
    .string({
      required_error: "Category url is required",
      invalid_type_error: "Category url must be a string",
    })
    .min(2, { message: "Category url must be at least 2 characters long." })
    .max(50, { message: "Category url cannot exceed 50 characters." })
    .regex(/^(?!.*(?:[-_ ]){2,})[a-zA-Z0-9_-]+$/, {
      message:
        "Only letters, numbers, hyphen, and underscore are allowed in the category url, and consecutive occurrences of hyphens, underscores, or spaces are not permitted.",
    }),
});

// Store shipping details
export const StoreShippingFormSchema = z.object({
  defaultShippingService: z
    .string({
      required_error: "Shipping service name is required.",
    })
    .min(2, "Shipping service name must be at least 2 characters long.")
    .max(50, { message: "Shipping service name cannot exceed 50 characters." }),
  defaultShippingFeePerItem: z.number(),
  defaultShippingFeeForAdditionalItem: z.number(),
  defaultShippingFeePerKg: z.number(),
  defaultShippingFeeFixed: z.number(),
  defaultDeliveryTimeMin: z.number(),
  defaultDeliveryTimeMax: z.number(),
  returnPolicy: z.string(),
});

export const ShippingRateFormSchema = z.object({
  shippingService: z
    .string({
      required_error: "Shipping service name is required.",
      invalid_type_error: "Shipping service name must be a string.",
    })
    .min(2, {
      message: "Shipping service name must be at least 2 characters long.",
    })
    .max(50, { message: "Shipping service name cannot exceed 50 characters." }),
  countryId: z.string().uuid().optional(),
  countryName: z.string().optional(),
  shippingFeePerItem: z.number(),
  shippingFeeForAdditionalItem: z.number(),
  shippingFeePerKg: z.number(),
  shippingFeeFixed: z.number(),
  deliveryTimeMin: z.number(),
  deliveryTimeMax: z.number(),
  returnPolicy: z.string().min(1, "Return policy is required."),
});

export const ShippingAddressSchema = z.object({
  countryId: z
    .string({
      required_error: "Country is mandatory.",
      invalid_type_error: "Country must be a valid string.",
    })
    .uuid(),
  firstName: z
    .string({
      required_error: "First name is mandatory.",
      invalid_type_error: "First name must be a valid string.",
    })
    .min(2, { message: "First name should be at least 2 characters long." })
    .max(50, { message: "First name cannot exceed 50 characters." })
    .regex(/^[a-zA-Z]+$/, {
      message: "No special characters are allowed in name.",
    }),

  lastName: z
    .string({
      required_error: "Last name is mandatory.",
      invalid_type_error: "Last name must be a valid string.",
    })
    .min(2, { message: "Last name should be at least 2 characters long." })
    .max(50, { message: "Last name cannot exceed 50 characters." })
    .regex(/^[a-zA-Z]+$/, {
      message: "No special characters are allowed in name.",
    }),
  phone: z
    .string({
      required_error: "Phone number is mandatory.",
      invalid_type_error: "Phone number must be a string",
    })
    .regex(/^\+?\d+$/, { message: "Invalid phone number format." }),

  address1: z
    .string({
      required_error: "Address line 1 is mandatory.",
      invalid_type_error: "Address line 1 must be a valid string.",
    })
    .min(5, { message: "Address line 1 should be at least 5 characters long." })
    .max(100, { message: "Address line 1 cannot exceed 100 characters." }),

  address2: z
    .string({
      invalid_type_error: "Address line 2 must be a valid string.",
    })
    .max(100, { message: "Address line 2 cannot exceed 100 characters." })
    .optional(),

  state: z
    .string({
      required_error: "State is mandatory.",
      invalid_type_error: "State must be a valid string.",
    })
    .min(2, { message: "State should be at least 2 characters long." })
    .max(50, { message: "State cannot exceed 50 characters." }),

  city: z
    .string({
      required_error: "City is mandatory.",
      invalid_type_error: "City must be a valid string.",
    })
    .min(2, { message: "City should be at least 2 characters long." })
    .max(50, { message: "City cannot exceed 50 characters." }),

  zip_code: z
    .string({
      required_error: "Zip code is mandatory.",
      invalid_type_error: "Zip code must be a valid string.",
    })
    .min(2, { message: "Zip code should be at least 2 characters long." })
    .max(10, { message: "Zip code cannot exceed 10 characters." }),

  default: z.boolean().default(false),
});

export const CouponFormSchema = z.object({
  code: z
    .string({
      required_error: "Coupon code is required.",
      invalid_type_error: "Coupon code must be a string.",
    })
    .min(2, { message: "Coupon code must be at least 2 characters long." })
    .max(50, { message: "Coupon code cannot exceed 50 characters." })
    .regex(/^[a-zA-Z0-9]+$/, {
      message: "Only letters and numbers are allowed in the coupon code.",
    }),
  startDate: z.string({
    required_error: "Start date is required.",
    invalid_type_error: "Start date must be a valid date.",
  }),
  endDate: z.string({
    required_error: "End date is required.",
    invalid_type_error: "End date must be a valid date.",
  }),
  discount: z
    .number({
      required_error: "Discount is required.",
      invalid_type_error: "Discount must be a number.",
    })
    .min(1, { message: "Discount must be at least 1." })
    .max(99, { message: "Discount cannot exceed 99." }),
});

export const ApplyCouponFormSchema = z.object({
  coupon: z
    .string({
      required_error: "Coupon is required",
      invalid_type_error: "Coupon must be a string",
    })
    .min(2, "Coupon must be atleast 2 characters."),
});

// Add review schema
export const AddReviewSchema = z.object({
  variantName: z.string().min(1, "Variant is required."),
  variantImage: z.string().min(1, "Variant image is required."),
  rating: z.number().min(1, "Please rate this product."),
  size: z.string().min(1, "Please select a size."), // Ensures size cannot be empty
  review: z
    .string()
    .min(
      10,
      "Your feedback matters! Please write a review of minimum 10 characters."
    ), // Ensures review cannot be empty
  quantity: z.string().default("1"),
  images: z
    .object({ url: z.string() })
    .array()
    .max(3, "You can upload up to 3 images for the review."),
  color: z.string({ required_error: "Color is required." }),
});

export const StoreShippingSchema = z.object({
  returnPolicy: z
    .string({
      required_error: "Return policy is required",
      invalid_type_error: "Return policy must be a string",
    })
    .default("Return in 30 days."),
  defaultShippingService: z
    .string({
      required_error: "Default shipping service is required",
      invalid_type_error: "Default shipping service must be a string",
    })
    .default("International Delivery"),
  defaultShippingFeePerItem: z
    .number({
      required_error: "Default shipping fee per item is required",
      invalid_type_error: "Default shipping fee per item must be a number",
    })
    .default(0),
  defaultShippingFeeForAdditionalItem: z
    .number({
      required_error: "Default shipping fee for additional items is required",
      invalid_type_error:
        "Default shipping fee for additional items must be a number",
    })
    .default(0),
  defaultShippingFeePerKg: z
    .number({
      required_error: "Default shipping fee per kilogram is required",
      invalid_type_error: "Default shipping fee per kilogram must be a number",
    })
    .default(0),
  defaultShippingFeeFixed: z
    .number({
      required_error: "Default fixed shipping fee is required",
      invalid_type_error: "Default fixed shipping fee must be a number",
    })
    .default(0),
  defaultDeliveryTimeMin: z
    .number({
      required_error: "Minimum delivery time is required",
      invalid_type_error: "Minimum delivery time must be a number",
    })
    .int()
    .default(7),
  defaultDeliveryTimeMax: z
    .number({
      required_error: "Maximum delivery time is required",
      invalid_type_error: "Maximum delivery time must be a number",
    })
    .int()
    .default(31),
});
