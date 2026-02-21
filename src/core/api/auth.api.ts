import type { UserDto } from "@/contract/user.dto";
import { http } from "@/core/interceptors/http";
import { PATH_AUTH } from "@/lib/links";
import type { ResponseZod } from "@/contract/global.dto";
import type {
  ChangePassword,
  FormForgotPassword,
  FormResetPassword,
  FormSignInSchema,
  FormSignUpSchema,
} from "@/schema/user.schema";

export const authApi = {
  register: async (data: FormSignUpSchema) => {
    const res = await http.post<ResponseZod<UserDto>>(PATH_AUTH.SIGNUP, data);
    return res;
  },
  login: async (data: FormSignInSchema) => {
    const res = await http.post<ResponseZod<{ token: string; user: UserDto }>>(
      PATH_AUTH.SIGNIN,
      data,
    ); //as unknown as ApiResponse<{ token: string; user: UserDto }>;
    // console.log("✅ Login Response:", res);
    return res;
  },
  logout: async () => {
    const res = await http.post<ResponseZod<{ message: string }>>(
      PATH_AUTH.SIGNOUT,
    );
    console.log(res);
    return res;
  },
  logoutDevices: async () => {
    const res = await http.post(PATH_AUTH.SIGNOUT_DEVICES);
    return res;
  },
  forgotPassword: async (data: FormForgotPassword) => {
    const res = await http.post(PATH_AUTH.FORGOT_PASSWORD, data);
    return res;
  },
  resetPassword: async (data: FormResetPassword) => {
    const res = await http.post(PATH_AUTH.RESET_PASSWORD, data);
    return res;
  },
  changePassword: async (data: ChangePassword) => {
    const res = await http.post<ResponseZod<UserDto>>(
      PATH_AUTH.CHANGE_PASSWORD,
      data,
    );
    return res;
  },
  refresh: async () => {
    const res = await http.post<ResponseZod<{ token: string }>>(
      PATH_AUTH.REFRESH_TOKEN,
    ); //as unknown as ResponseZod<{ token: string }>;
    console.log("✅ Refresh:", res);
    return res;
  },
  //   verifyEmail: async (data: FormVerifyEmailSchema) => {
  //     const res = await http.post("/auth/verify-email", data);
  //     return res.data;
  //   },
  getMe: async () => {
    const res = await http.get<ResponseZod<UserDto>>(PATH_AUTH.ME); //as unknown as ApiResponse<UserDto>;
    console.log("✅ GetMe Response:", res.data);
    return res;
  },
};
