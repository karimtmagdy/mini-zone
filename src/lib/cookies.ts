import Cookies from "js-cookie";

export class CookiesService {
  constructor() {}
  
  remove(name: string = "refreshToken") {
    Cookies.remove(name, { path: "/" });
  }
}
export const cookiesService = new CookiesService()
// export const cookiesService = new CookiesService("refreshToken", "", {
//   expires: 1.5 / 60, // 1.5 minutes
//   path: "/",
//   sameSite: "strict",
//   secure: true,
// });
