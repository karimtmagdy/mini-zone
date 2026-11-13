export const queryKeys = {
  auth: {
    all: ["auth"] as const,
    me: () => [...queryKeys.auth.all, "me"] as const,
    login: () => [...queryKeys.auth.all, "login"] as const,
    register: () => [...queryKeys.auth.all, "register"] as const,
    logout: () => [...queryKeys.auth.all, "logout"] as const,
  },
} as const
