import axios, { Axios } from "axios";
import {
  Connection,
  CreateConnectionResponse,
  GetConnectionResponse,
} from "./interfaces";

export default class ConnectionService {
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

  async getAllConnections() {
    try {
      const response = await this.axiosInstance.get<Connection[]>(
        "/whatssap-connection"
      );

      return response.data;
    } catch (error) {
      return "Erro ao buscar conexões";
    }
  }

  async createConnection() {
    try {
      const response = await this.axiosInstance.post<CreateConnectionResponse>(
        "/whatssap-connection"
      );

      return response.data;
    } catch (error) {
      return "Erro ao criar conexão";
    }
  }

  async deleteConnection(connection_id: string) {
    try {
      await this.axiosInstance.delete(`/whatssap-connection/${connection_id}`);
    } catch (error) {
      return "Erro ao apagar a conexão";
    }
  }

  async getConnection(connection_id: string) {
    try {
      const response = await this.axiosInstance.get<GetConnectionResponse>(
        `/whatssap-connection/${connection_id}`
      );

      return response.data;
    } catch (error) {
      return "Erro ao obter conexão";
    }
  }

  async closeSession(connection_id: string) {
    try {
      await this.axiosInstance.delete(
        `/whatssap-connection/close/${connection_id}`
      );
    } catch (error) {
      return "Erro ao sair do seu Whatssap (tente sair pelo seu próprio whatssap)";
    }
  }
}
