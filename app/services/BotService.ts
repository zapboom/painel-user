import axios, { Axios } from "axios";
import { Bot, CreateBotRequest, WhatssapBotGroup } from "./interfaces";

export default class BotService {
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

  async createBot(createBotRequest: CreateBotRequest) {
    try {
      let data = JSON.stringify({
        ...createBotRequest,
      });
      console.log("data", data);
      await this.axiosInstance.post("/bot", data);
    } catch (error) {
      return "Erro ao criar bot";
    }
  }

  async listBots() {
    try {
      const response = await this.axiosInstance.get<Bot[]>("/bot");
      return response.data;
    } catch (error) {
      return "Erro ao buscar bots";
    }
  }

  async deleteBot(botId: string) {
    try {
      await this.axiosInstance.delete<Bot[]>(`/bot/${botId}`);
    } catch (error) {
      return "Erro ao deletar Bot";
    }
  }

  async listBotGroups(botId: string) {
    try {
      const response = await this.axiosInstance.get<WhatssapBotGroup[]>(
        `/bot/groups/${botId}`
      );
      return response.data;
    } catch (error) {
      return "Erro ao buscar grupos do Bot";
    }
  }

  async startBot(bot_id: string, target_group_id: string) {
    try {
      await this.axiosInstance.post(`/bot/start/${bot_id}/${target_group_id}`);
    } catch (error) {
      return "Erro ao iniciar Bot";
    }
  }

  async stopBot(bot_id: string) {
    try {
      await this.axiosInstance.patch(`/bot/stop/${bot_id}`);
    } catch (error) {
      return `Erro ao parar bot, (desconecte a conexão em "aparelhos conectados"`;
    }
  }
}
