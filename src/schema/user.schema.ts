import { z } from "zod/v4";
import {
  USER_GENDERS,
  USER_ROLES,
  USER_ACCOUNT_STATUS,
  USER_STATE,
} from "@/contract/user.dto";
export const emailRegex: RegExp =
  /^[a-zA-Z0-9._%+-]+@(gmail|yahoo|outlook|hotmail)\.(com|net|org)$/;

export const defaultUserZod = z
  .object({
    username: z
      .string()
      .min(3, "Username must be at least 3 characters")
      .max(50, "Username must be less than 50 characters")
      .transform((username) => username.trim()),
    email: z
      .string({ message: "Email is required" })
      .trim()
      .regex(emailRegex, "Invalid email address")
      .email("Invalid email format")
      .transform((email) => email.toLowerCase()),
    password: z
      .string({ message: "Password is required" })
      .min(6, { message: "Password must be at least 6 characters" })
      .max(30, { message: "Password must be at most 30 characters" }),
    gender: z.enum(USER_GENDERS).optional(),
    state: z.enum(USER_STATE).optional(),
    status: z.enum(USER_ACCOUNT_STATUS).optional(),
    age: z
      .number()
      .int()
      .refine((age) => age >= 18, "You must be 18 or older")
      .optional(),
    name: z
      .object({
        first: z
          .string()
          .min(3, "First name must be at least 3 characters")
          .max(20, "First name must be less than 20 characters"),
        last: z
          .string()
          .min(3, "Last name must be at least 3 characters")
          .max(20, "Last name must be less than 20 characters"),
      })
      .transform((name) => ({
        first: name.first.trim(),
        last: name.last.trim(),
      }))
      .optional(),
    image: z
      .object({
        secureUrl: z.string(),
        publicId: z.string(),
      })
      .optional(),
    role: z.enum(USER_ROLES).default("user"),
  })
  .strict();
// create user schema
export const createUserZod = defaultUserZod
  .extend({
    role: z.enum(USER_ROLES).optional(),
  })
  .pick({
    username: true,
    email: true,
    password: true,
    role: true,
  });
// update user schema
export const updateUserZod = defaultUserZod
  .clone()
  .partial()
  .omit({ email: true, image: true, age: true, gender: true });
// change role schema
// export const changeRoleZod = defaultUserZod
//   .clone()
//   .shape.role.refine((role) => USER_ROLES.includes(role), {
//     message: "Please select a valid role",
//   });

// register user schema
export const registerUserSchema = defaultUserZod
  .clone()
  .pick({
    email: true,
    username: true,
    password: true,
  })
  .extend({
    confirmPassword: z.string({ message: "Confirm password is required" }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });
export const resetPasswordZod = defaultUserZod
  .pick({
    password: true,
  })
  .extend({
    confirmPassword: z.string({ message: "Confirm password is required" }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });
// login user schema
export const loginUserSchema = defaultUserZod.pick({
  email: true,
  password: true,
});
// update profile schema
export const updateProfileZod = defaultUserZod
  .omit({
    username: true,
    email: true,
    role: true,
  })
  .partial();
export const forgotPasswordZod = defaultUserZod.pick({
  email: true,
});
export type FormSignUpSchema = z.infer<typeof registerUserSchema>;
export type FormSignInSchema = z.infer<typeof loginUserSchema>;
export type CreateUser = z.infer<typeof createUserZod>;
export type UpdateUser = z.infer<typeof updateUserZod>;
// export type UpdateUserRole = z.infer<typeof changeRoleZod>;
export type UpdateUserProfile = z.infer<typeof updateProfileZod>;
export type ForgotPassword = z.infer<typeof forgotPasswordZod>;
export type ResetPassword = z.infer<typeof resetPasswordZod>;
export const changePasswordSchema = z.object({
  body: z
    .object({
      oldPassword: z.string({ message: "Old password is required" }),
      newPassword: z
        .string({ message: "New password is required" })
        .min(6, { message: "New password must be at least 6 characters" })
        .max(30, { message: "New password must be at most 30 characters" }),
      confirmPassword: z.string({ message: "Confirm password is required" }),
    })
    .refine((data) => data.newPassword === data.confirmPassword, {
      message: "Passwords do not match",
      path: ["confirmPassword"],
    }),
}) satisfies z.ZodType<{
  body: { oldPassword: string; newPassword: string; confirmPassword: string };
}>;

export const deactivateUserSchema = z.object({
  body: z.object({
    password: z.string({
      message: "Password is required to confirm deactivation",
    }),
  }),
}) satisfies z.ZodType<{ body: { password: string } }>;
export const refreshTokenSchema = z.object({
  cookies: z.object({
    refreshToken: z.string({
      message: "Refresh token is missing",
    }),
  }),
});
export type ChangePassword = z.infer<typeof changePasswordSchema>["body"];
export type DeactivateUser = z.infer<typeof deactivateUserSchema>["body"];

// --------------------------------
// import { type UserDto } from "../contract/user.dto";

// export const updateStatusSchema = z.object({
//   body: z.object({
//     status: z.enum(USER_ACCOUNT_STATUS, {
//       message: "Please select a valid status",
//     }),
//   }),
// }) satisfies z.ZodType<{
//   body: { status: (typeof USER_ACCOUNT_STATUS)[number] };
// }>;

export const bulkDeleteZod = z.object({
  body: z.object({
    ids: z
      .array(z.string().regex(/^[0-9a-fA-F]{24}$/, "Invalid User ID format"))
      .min(1, "Please provide at least one user ID"),
  }),
}) satisfies z.ZodType<{
  body: { ids: string[] };
}>;

export const deleteUserZod = z.object({
  body: z.object({
    password: z.string({
      message: "Password is required to confirm deletion",
    }),
  }),
});
// satisfies z.ZodType<{
//   // body: Pick<UserDto, "password">;
// }>;
export const deactivateUserZod = z.object({
  body: z.object({
    password: z.string({
      message: "Password is required to confirm deactivation",
    }),
  }),
});

// export type UpdateUser = z.infer<typeof updateUserSchema>["body"];
// export type UpdateStatus = z.infer<typeof updateStatusSchema>["body"];
export type BulkDelete = z.infer<typeof bulkDeleteZod>["body"];
// export type DefaultUser = z.infer<typeof userSchema>;
export type DeleteUser = z.infer<typeof deleteUserZod>["body"];
export type DeactivateUserInput = z.infer<typeof deactivateUserZod>["body"];
export type DeleteUserInput = z.infer<typeof deleteUserZod>["body"];
