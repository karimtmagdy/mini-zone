import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { authApi } from "@/core/services/auth.service";
import { storageUtils } from "@/lib/tokens";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

// export function useRegister() {
//   const qc = useQueryClient();
//   return useMutation({
//     mutationFn: authApi.register,
//     onSuccess: () => {
//       qc.invalidateQueries({ queryKey: ["register"] });
//     },
//   });
// }

export function useLogin() {
  const qc = useQueryClient();
  const navigate = useNavigate();
  return useMutation({
    mutationKey: ["login"],
    mutationFn: authApi.login,
    onSuccess: (response) => {

      if (response.data.status === "success") {
        const { token, user } = response.data.data;
        storageUtils.setToken(token);
        storageUtils.setUser(user);
        qc.setQueryData(["user"], user);
        qc.invalidateQueries({ queryKey: ["user"] });
        if (user.role === "admin") navigate("/admin");
        else navigate("/");
        toast.success(response?.data?.message as string);
      }
    },
    onError: (error: any) => {
      // console.log(error);
      toast.error(error?.response?.data?.message);
      qc.invalidateQueries({ queryKey: ["login"] });
    },
  });
}
// export function useLogout() {
//   const qc = useQueryClient();
//   const navigate = useNavigate();
//   return useMutation({
//     mutationFn: authApi.logout,
//     onSuccess: () => {
//       qc.invalidateQueries({ queryKey: ["logout"] });
//       storageUtils.removeToken();
//       storageUtils.removeUser();
//       qc.setQueryData(["user"], null); // Manually clear the user data to trigger UI updates
//       qc.clear();
//       navigate("/");
//     },
//   });
// }
// export function useForgotPassword() {
//   const qc = useQueryClient();

//   return useMutation({
//     mutationFn: authApi.forgotPassword,
//     onSuccess: () => {
//       qc.invalidateQueries({ queryKey: ["forgot-password"] });
//     },
//   });
// }
// export function useResetPassword() {
//   const qc = useQueryClient();

//   return useMutation({
//     mutationFn: authApi.resetPassword,
//     onSuccess: () => {
//       qc.invalidateQueries({ queryKey: ["reset-password"] });
//     },
//   });
// }
// export function useChangePassword() {
//   const qc = useQueryClient();

//   return useMutation({
//     mutationFn: authApi.changePassword,
//     onSuccess: () => {
//       qc.invalidateQueries({ queryKey: ["change-password"] });
//     },
//   });
// }
// export function useRefresh() {
//   const qc = useQueryClient();

//   return useMutation({
//     mutationFn: authApi.refresh,
//     onSuccess: () => {
//       qc.invalidateQueries({ queryKey: ["refresh"] });
//     },
//   });
// }
// export function useLogoutDevices() {
//   const qc = useQueryClient();

//   return useMutation({
//     mutationFn: authApi.logoutDevices,
//     onSuccess: () => {
//       qc.invalidateQueries({ queryKey: ["logout-devices"] });
//     },
//   });
// }
export function useGetMe() {
  const hasToken = storageUtils.getToken();
  return useQuery({
    queryKey: ["user"],
    queryFn: authApi.getMe,
    enabled: !!hasToken //&& !!storageUtils.getUser(),
  });
}
