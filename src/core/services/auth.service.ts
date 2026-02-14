import type { ResponseType } from "@/contract/global.dto";
import type { UserDto } from "@/contract/user.dto";
import { http } from "@/core/interceptors/http";
import { PATH_ME, PATH_SIGNIN } from "@/lib/links/paths.routes";
import type { FormSignInSchema } from "@/schema/user.schema";

export const authApi = {
  // register: async (data: FormSignUpSchema) => {
  //   const res = await http.post<ResponseDto<UserDto>>(PATH_SIGNUP, data);
  //   return res;
  // },
  login: async (data: FormSignInSchema) => {
    const res = await http.post<ResponseType<{ token: string; user: UserDto }>>(
      PATH_SIGNIN,
      data,
    );
    // console.log(res)
    return res;
  },
  //   logout: async () => {
  //     const res = await http.post(PATH_SIGNOUT);
  //     return res;
  //   },
  //   logoutDevices: async () => {
  //     const res = await http.post(PATH_SIGNOUT_DEVICES);
  //     return res;
  //   },
  //   forgotPassword: async (data: FormForgotPasswordSchema) => {
  //     const res = await http.post(PATH_FORGOT_PASSWORD, data);
  //     return res;
  //   },
  //   resetPassword: async (data: FormResetPasswordSchema) => {
  //     const res = await http.post(PATH_RESET_PASSWORD, data);
  //     return res;
  //   },
  //   changePassword: async (data: FormChangePasswordSchema) => {
  //     const res = await http.post<ResponseDto<UserDto>>(
  //       PATH_CHANGE_PASSWORD,
  //       data,
  //     );
  //     return res;
  //   },
  //   refresh: async () => {
  //     const res = (await http.post<ResponseDto<{ token: string }>>(
  //       PATH_REFRESH_TOKEN,
  //     )) as unknown as ResponseDto<{ token: string }>;
  //     return res;
  //   },
  //   verifyEmail: async (data: FormVerifyEmailSchema) => {
  //     const res = await http.post("/auth/verify-email", data);
  //     return res.data;
  //   },
  getMe: async () => {
    const res = await http.get<ResponseType<{ user: UserDto }>>(PATH_ME);
    console.log(res);
    return res;
  },
};
