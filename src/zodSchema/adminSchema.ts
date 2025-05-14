import { z } from "zod";


export const adminRegisterSchema = z.object({
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
  accesToken: z
    .string({
      invalid_type_error: "accesToken must be a string",
    })
    .optional()
});


export const adminLoginSchema = z.object({
  email: z.string({
    required_error: "Email is required",
    invalid_type_error: "Email must be a string",
  })
    .email("Invalid email format"),

  password: z.string({
    required_error: "Password is required",
    invalid_type_error: "Password must be a string",
  })
    .min(6, "Password must be at least 6 characters long"),
  accessToken: z.string().optional()
})


export const adminLogoutSchema = z.object({
  adminId: z
    .string()
    .regex(/^[0-9a-fA-F]{24}$/, "Invalid admin id"),
  accessToken: z.string().optional()
});


export const sendOtpSchema = z.object({
  email: z.string({
    required_error: "Email is required",
    invalid_type_error: "Email must be a string",
  })
    .email("Invalid email format"),
})


export const adminLoginWithOtpSchema = z.object({
  email: z.string({
    required_error: "Email is required",  
    invalid_type_error: "Email must be a string",
  })
    .email("Invalid email format"),
  otp: z.string({
    required_error: "OTP is required",
    invalid_type_error: "OTP must be a string",
  }),
  accessToken: z.string().optional()
})

export const forgetPasswordSchema = z.object({
  email: z
    .string({
      required_error: "Email is required!!!"
    })
    .email("Invalid email format!!!")
})  