import { z } from "zod";
import mongoose from "mongoose";


export const foodWasteSchema = z.object({
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
});

export type FoodWasteInput = z.infer<typeof foodWasteSchema>;
