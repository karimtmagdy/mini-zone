export const queryKeys = {
  auth: {
    all: ["auth"] as const,
    me: () => [...queryKeys.auth.all, "me"] as const,
    login: () => [...queryKeys.auth.all, "login"] as const,
    register: () => [...queryKeys.auth.all, "register"] as const,
    logout: () => [...queryKeys.auth.all, "logout"] as const,
  },
  employees: {
    all: ["employees"] as const,
    list: (params?: object) =>
      [...queryKeys.employees.all, "list", params ?? {}] as const,
    bootstrap: () => [...queryKeys.employees.all, "bootstrap"] as const,
  },
} as const
