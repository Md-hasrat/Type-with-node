import { z } from "zod";
import mongoose from "mongoose";


export const foodWasteSchema = z
  .object({
    userId: z
      .string()
      .refine((val) => mongoose.Types.ObjectId.isValid(val), {
        message: "Invalid userId",
      }),
    date: z.coerce.date(),
    meat: z.boolean().optional().default(false),
    dairy: z.boolean().optional().default(false),
    other: z.boolean().optional().default(false),

    totalWaste: z.number(),
    meatPercentage: z.number().optional(),
    dairyPercentage: z.number().optional(),
    otherPercentage: z.number().optional(),
  })
  .superRefine((data, ctx) => {
    const { meat, dairy, other, meatPercentage, dairyPercentage, otherPercentage } = data;

    // Helper to check if percentage is valid when boolean is true
    function checkPercentage(field: string, boolVal: boolean, percVal?: number) {
      if (boolVal) {
        if (percVal === undefined) {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: `${field} percentage is required when ${field} is true.`,
            path: [`${field}Percentage`],
          });
        } else if (percVal < 0 || percVal > 100) {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: `${field} percentage must be between 0 and 100.`,
            path: [`${field}Percentage`],
          });
        }
      } else {
        // If boolean false, percentage should be undefined or 0
        if (percVal !== undefined && percVal !== 0) {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: `${field} percentage must be 0 or not provided when ${field} is false.`,
            path: [`${field}Percentage`],
          });
        }
      }
    }

    checkPercentage("meat", meat, meatPercentage);
    checkPercentage("dairy", dairy, dairyPercentage);
    checkPercentage("other", other, otherPercentage);

    // Calculate total percentage only for the true categories
    const totalPerc =
      (meat ? meatPercentage ?? 0 : 0) +
      (dairy ? dairyPercentage ?? 0 : 0) +
      (other ? otherPercentage ?? 0 : 0);

    if (totalPerc > 100) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Sum of percentages for selected categories must not exceed 100.",
        path: ["meatPercentage", "dairyPercentage", "otherPercentage"],
      });
    }
  });


export type FoodWasteInput = z.infer<typeof foodWasteSchema>;
