import axios, { Axios } from "axios";
import { CreateStrategieDoubleRequest, Strategie } from "./interfaces";

export default class StrategieService {
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

  async listStrategiesBot(bot_id: string) {
    try {
      const response = await this.axiosInstance.get<Strategie[]>(
        `/bot/strategies/${bot_id}`
      );

      return response.data;
    } catch (error) {
      return "Erro ao listar estratégias";
    }
  }

  async removeStrategie(strategie_id: string) {
    try {
      await this.axiosInstance.delete(`/bot/strategie/${strategie_id}`);
    } catch (error) {
      return "Deletar estratégia";
    }
  }

  async createStrategie(
    createStrategieDoubleRequest: CreateStrategieDoubleRequest
  ) {
    try {
      let data = JSON.stringify({
        ...createStrategieDoubleRequest,
      });

      await this.axiosInstance.post("/bot/strategie", data);
    } catch (error) {
      return "Erro ao criar estratégia";
    }
  }
}
