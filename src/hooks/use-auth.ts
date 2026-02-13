import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  loginUserSchema,
  // FormSignInSchema,
  type FormSignInSchema,
  // formSignUpSchema,
  // type FormSignUpSchema,
  // type FormForgotPasswordSchema,
  // formForgotPasswordSchema,
} from "@/schema/user.schema";
import {
  useGetMe,
  // useForgotPassword,
  // useGetMe,
  useLogin,
  // useLogout,
  // useRegister,
} from "@/core/api/auth.queries";
import { storageUtils } from "@/lib/tokens";
// import { storageUtils } from "@/lib/tokens";

export function useAuthFormLogin() {
  const loginMutation = useLogin();
  const form = useForm<FormSignInSchema>({
    resolver: zodResolver(loginUserSchema),
    mode: "onSubmit",
    defaultValues: {
      email: "",
      password: "",
    },
  });
  const onSubmit = async (data: FormSignInSchema) => {
    await loginMutation.mutateAsync(data);
    // try {
    //   const response =
      
    //   // Handle business logic errors in 200/Success responses if applicable
    //   const result = response.data;
    //   if (result.status !== "success") {
    //     const msg = result.message || "Authentication failed";
    //     const target = msg.toLowerCase();
        
    //     if (target.includes("email") || target.includes("user")) {
    //       form.setError("email", { message: msg });
    //     } else if (target.includes("password")) {
    //       form.setError("password", { message: msg });
    //     } else {
    //       form.setError("root", { message: msg });
    //     }
    //   }
    // } catch (error: any) {
    //   // Handle Axios/Network errors (4xx/5xx)
    //   const serverResponse = error.response?.data;
    //   const message = serverResponse?.message || error.message || "An unexpected error occurred";
    //   const target = message.toLowerCase();

    //   // console.log("Tactical Error Captured:", { message, serverResponse });

    //   if (target.includes("email") || target.includes("user")) {
    //     form.setError("email", { message });
    //   } else if (target.includes("password") || target.includes("credential")) {
    //     form.setError("password", { message });
    //   } else {
    //     form.setError("root", { message });
    //   }
    // }
  };
  return {
    form,
    onSubmit,
    loginMutation,
  };
}

// export function useAuthFormRegister() {
//   const registerMutation = useRegister();

//   const form = useForm<FormSignUpSchema>({
//     resolver: zodResolver(formSignUpSchema),
//     defaultValues: {
//       username: "",
//       email: "",
//       password: "",
//       confirmPassword: "",
//     },
//   });
//   const onSubmit = async (data: FormSignUpSchema) => {
//     await registerMutation.mutateAsync(data);
//   };
//   return {
//     form,
//     onSubmit,
//     registerMutation,
//   };
// }
// export function useAuthFormLogout() {
//   const logoutMutation = useLogout();
//   const onSubmit = async () => {
//     await logoutMutation.mutateAsync();
//   };
//   return {
//     onSubmit,
//     logoutMutation,
//   };
// }
// export function useAuthForgotPassword() {
//   const forgotPasswordMutation = useForgotPassword();
//   const form = useForm<FormForgotPasswordSchema>({
//     resolver: zodResolver(formForgotPasswordSchema),
//     defaultValues: {
//       email: "",
//     },
//   });
//   const onSubmit = (data: FormForgotPasswordSchema) => {
//     forgotPasswordMutation.mutate(data);
//   };

//   return {
//     form,
//     onSubmit,
//     forgotPasswordMutation,
//   };
// }
export function useAuthGetMe() {
  const { data, isLoading } = useGetMe();
  const token = storageUtils.getToken();
  const localUser = storageUtils.getUser();
  const user = data?.data || localUser;

  // Truly authenticated only if we have a token AND (a successful query OR local data while loading)
  const isAuthenticated = (!!token && !!data) || !!localUser;

  const isAdmin = user?.role === "admin";
  const isUser = user?.role === "user";
  // const isLoading = data.isLoading && !!token;

  return {
    isAuthenticated,
    isUser,
    isAdmin,
    user,
    isLoading,
  };
}
