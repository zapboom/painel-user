import axios, { Axios } from "axios";
import { Entrie } from "./interfaces";

export default class EntrieService {
  axiosInstance: Axios;
  constructor(token: string) {
    this.axiosInstance = axios.create({
      baseURL: process.env.NEXT_PUBLIC_API_URL,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
  }

  async getAllEntriesDouble() {
    try {
      const response = await this.axiosInstance.get<Entrie[]>("/entrie");

      return response.data;
    } catch (error: any) {
      return "Erro ao buscar todas as entradas do double";
    }
  }
}
