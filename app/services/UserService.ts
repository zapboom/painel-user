import axios, { Axios, AxiosResponse } from "axios";
import { LoginRequest, LoginResponse, UserProfile } from "./interfaces";

export default class UserServices {
  axiosInstance: Axios;
  constructor() {
    this.axiosInstance = axios.create({
      baseURL: process.env.NEXT_PUBLIC_API_URL,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }

  async login(credentials: LoginRequest): Promise<LoginResponse> {
    console.log(`Credentias`, credentials);
    try {
      let data = JSON.stringify({
        email: credentials.email,
        password: credentials.password,
      });
      const response = await this.axiosInstance.post<LoginResponse>(
        "/auth/email/login",
        data
      );
      console.log("inside function", credentials);
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("user", JSON.stringify(response.data.user));
      localStorage.setItem("refreshToken", response.data.refreshToken);
      localStorage.setItem("tokenExpires", response.data.tokenExpires + "");
      localStorage.setItem("planData", JSON.stringify(response.data.plan_data));
      return response.data;
    } catch (error) {
      // Trate os erros de forma apropriada
      console.error("Erro ao fazer login:", error);
      throw new Error("Erro ao fazer login");
    }
  }

  usuarioAutenticado() {
    return localStorage.getItem(
      process.env.NEXT_PUBLIC_USER_TOKEN ?? "token"
    ) != undefined
      ? true
      : false;
  }

  logout() {
    localStorage.removeItem(process.env.NEXT_PUBLIC_USER_TOKEN ?? "token");
    localStorage.removeItem("user");
    localStorage.removeItem("refreshToken");
    localStorage.removeItem("tokenExpires");
    localStorage.removeItem("planData");
  }

  async getProfileInfo(): Promise<UserProfile> {
    try {
      const response: AxiosResponse<UserProfile> = await this.axiosInstance.get(
        "/auth/me",
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem(
              process.env.NEXT_PUBLIC_USER_TOKEN ?? "token"
            )}`,
          },
        }
      );

      return response.data;
    } catch (error) {
      console.error("Error fetching profile information:", error);
      throw new Error("Error fetching profile information");
    }
  }
}
