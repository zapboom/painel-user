import { checkUserAuthenticated } from "@/app/functions/check-user-authenticated";
import { isClient } from "@/app/functions/is-client";
import UserServices from "@/app/services/UserService";
import { LoginRequest, UserProfile } from "@/app/services/interfaces";
import { useState, useEffect } from "react";

interface AuthState {
  user: UserProfile | null;
  isAuthenticated: boolean;
}

const useAuth = () => {
  const [authState, setAuthState] = useState<AuthState>({
    user: null,
    isAuthenticated: isClient()
      ? localStorage.getItem(process.env.NEXT_PUBLIC_USER_TOKEN ?? "token")
        ? true
        : false
      : false,
  });
  const userServices = new UserServices();

  useEffect(() => {
    const checkAuthentication = () => {
      const isAuthenticated = userServices.usuarioAutenticado();
      if (isAuthenticated) {
        const storedUser = localStorage.getItem("user");
        if (storedUser) {
          const user = JSON.parse(storedUser);
          setAuthState({ user, isAuthenticated });
        }
      }
    };

    checkAuthentication();
  }, []);

  const login = async (
    credentials: LoginRequest
  ): Promise<boolean | string> => {
    try {
      const loginResponse = await userServices.login(credentials);
      setAuthState({
        user: loginResponse.user,
        isAuthenticated: true,
      });
      return checkUserAuthenticated();
    } catch (error: any) {
      console.error("Error logging in:", error);
      return error.message;
    }
  };

  const logout = () => {
    userServices.logout();
    setAuthState({ user: null, isAuthenticated: false });
  };

  const getToken = () => {
    return localStorage.getItem(process.env.NEXT_PUBLIC_USER_TOKEN ?? "token");
  };

  return {
    user: authState.user,
    isAuthenticated: authState.isAuthenticated,
    login,
    logout,
    getToken,
  };
};

export default useAuth;
