// import Cookies from "js-cookie";
// type CookieOptions = {
//   expires?: number;
//   path?: string;
//   domain?: string;
//   secure?: boolean;
//   sameSite?: "strict" | "Strict" | "lax" | "Lax" | "none" | "None";
// };

// export class CookiesService {
//   constructor(
//     public readonly name: string,
//     public readonly value: string,
//     public readonly options?: CookieOptions,
//   ) {}
//   set() {
//     Cookies.set(this.name, this.value, this.options);
//   }
//   get(): string | undefined {
//     return Cookies.get(this.name);
//   }
//   remove(): void {
//     Cookies.remove(this.name, this.options);
//   }
// }
// export const cookiesService = new CookiesService("refreshToken", "", {
//   expires: 1.5 / 60, // 1.5 minutes
//   path: "/",
//   sameSite: "strict",
//   secure: true,
// });
