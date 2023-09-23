export const APP_ROUTES = {
  private: {
    dashboard: {
      name: "/",
    },
    unauthorized: {
      name: "/login",
    },
  },
  public: {
    login: "/auth/signin",
    reset_password: "/reset_password",
  },
};