import { z } from "zod";

export const adminSignUpZodSchema = z.object({
  registrationId: z
    .string({
      required_error: "Registration ID is required",
      invalid_type_error: "Registration ID must be a string",
    })
    .min(1, "Registration ID cannot be empty"),

  roleId: z
    .string({
      required_error: "roleId is required",
      invalid_type_error: "roleId must be a string",
    })
    .min(1, "roleId cannot be empty"),

  fullName: z
    .string({
      required_error: "Full name is required",
      invalid_type_error: "Full name must be a string",
    })
    .min(1, "Full name cannot be empty"),

  email: z
    .string({
      required_error: "Email is required",
      invalid_type_error: "Email must be a string",
    })
    .email("Invalid email format"),

  phone: z
    .string({
      required_error: "Phone number is required",
      invalid_type_error: "Phone number must be a string",
    })
    .min(1, "Phone number cannot be empty"),

  userType: z
    .enum(["admin", "subAdmin"], {
      required_error: "userType is required",
      invalid_type_error: "userType must be either 'admin' or 'subAdmin'",
    })
    .optional()
    .default("admin"),

  password: z
    .string({
      required_error: "Password is required",
      invalid_type_error: "Password must be a string",
    })
    .min(6, "Password must be at least 6 characters long"),

  isDeleted: z
    .boolean({
      invalid_type_error: "isDeleted must be a boolean",
    })
    .optional()
    .default(false),

  isBlocked: z
    .boolean({
      invalid_type_error: "isBlocked must be a boolean",
    })
    .optional()
    .default(false),

  isCurrentlyLoggedIn: z
    .boolean({
      invalid_type_error: "isCurrentlyLoggedIn must be a boolean",
    })
    .optional()
    .default(false),

  accesToken: z
    .string({
      invalid_type_error: "accesToken must be a string",
    })
    .optional()
});


