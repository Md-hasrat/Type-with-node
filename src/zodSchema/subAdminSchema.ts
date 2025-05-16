import { z } from "zod";


export const updateSubAdminSchema = z.object({
    params: z.object({
        id: z
            .string({
                required_error: "Id is required",
                invalid_type_error: "Id must be a string",
            })
            .max(24, "Invalid credentials"),
    }),
    body: z.object({
        fullName: z.string({
            required_error: "Full name is required",
            invalid_type_error: "Full name must be a string",
        })
            .max(100, "Invalid credentials")
            .optional(),
        email: z.string({
            required_error: "Email is required",
            invalid_type_error: "Email must be a string",
        })
            .email({
                message: "Invalid email format",
            })
            .optional(),
        phone: z.string({
            required_error: "Phone number is required",
            invalid_type_error: "Phone number must be a string",
        })
            .min(10, "Invalid credentials")
            .max(15, "Invalid credentials")
            .optional(),
        isBlock: z.boolean().optional(),
    })
})


export const getAdminByIdSchema = z.object({
    params: z.object({
        id: z
            .string({
                required_error: "Id is required",
                invalid_type_error: "Id must be a string",
            })
            .max(24, "Invalid credentials"),
    })
})


export const subadminSearchQuerySchema = z.object({
  search: z.string().trim().optional(),

  page: z
    .preprocess((val) => parseInt(String(val), 10), z.number().int())
    .default(1)
    .refine((val) => val >= 1, {
      message: 'Page must be at least 1',
    }),

  limit: z
    .preprocess((val) => parseInt(String(val), 10), z.number().int())
    .default(10)
    .refine((val) => val >= 10, {
      message: 'Limit must be at least 10',
    }),
});
