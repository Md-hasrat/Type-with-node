
import { z } from 'zod'


export const userRegisterSchema = z.object({
    username: z
        .string({
            required_error: "Username is required!!!"
        }),
    email: z
        .string({
            required_error: "Email is required!!!"
        })
        .email("Invalid email format"),
    password: z
        .string({
            required_error: "Password is required!!!"
        }),
})


export const userLogedInSchema = z.object({
    email: z
        .string({
            required_error: "Email is required!!!"
        })
        .email("Invalid email format!!!"),

    password: z
        .string({
            required_error: "Password is required!!!"
        }),
    accessToken: z.string().optional()
})


export const logoutSchema = z.object({
    userId: z
        .string()
        .length(24, "Invalid user id"),
    accessToken: z
        .string()
        .optional()
})


export const otpSchema = z.object({
    email: z
        .string({
            required_error: "Email is required!!!"
        })
        .email("Invalid email format!!!"),
});

export const userLogedInWithOtpSchema = z.object({
    email: z
        .string({
            required_error: "Email is required!!!"
        })
        .email("Invalid email format!!!"),
    otp: z.string({
        required_error: "Otp is required!!!"
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


export const verifyOtpSchema = z.object({
    otp: z
        .string({
            required_error: "Otp is required!!!"
        })
        .length(6, "Otp must be 6 digits long"),
})

export const resetPasswordSchema = z.object({
    id: z
        .string({
            required_error: "UserId is required!!!"
        }),
    password: z
        .string({
            required_error: "Confirm password is required!!!"
        })
        .min(6, "Confirm password must be at least 6 characters long")
})


export const deleteUserSchema = z
    .object({
        id: z.string().min(1).max(24),
        isDeleted: z.boolean(
            {
                required_error: "isDeleted is required",
                invalid_type_error: "isDeleted must be a boolean",
            }
        )
    })

export const getUserSchema = z.object({
    email: z
        .string({
            required_error: "Email is required!!!"
        })
        .email("Invalid email format!!!"),
        
})

export const updateUserSchema = z.object({
    username: z.string().optional(),
    userType: z.enum(["user", "admin", "subAdmin"]).optional(),
})
