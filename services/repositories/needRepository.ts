import { Necessidade } from "@/Types/types";
import { api } from "../api";

class NeedRepository {
  static async getAll() {
    try {
      const response = await api.get("/api/necessidade-gestor");
      console.log(response.data);
      return response.data;
    } catch (error) {
      console.error(
        "Erro ao localizar todas as necessidades dos gestores:",
        error
      );
      throw error;
    }
  }

  static async getById(id: string) {
    try {
      const response = await api.get(`/api/necessidade-gestor/${id}`);
      console.log(response.data);
      return response.data;
    } catch (error) {
      console.error("Erro ao localizar a necessidade do gestor:", error);
      throw error;
    }
  }

  static async create(newNecessidadeGestor: Partial<Necessidade>) {
    try {
      const response = await api.post(
        "/api/necessidade-gestor",
        newNecessidadeGestor
      );
      console.log(response.data);
      return response.data;
    } catch (error) {
      console.error("Erro ao criar necessidade do gestor:", error);
      throw error;
    }
  }

  static async update(id: string, bodyJson: Partial<Necessidade>) {
    try {
      const response = await api.put(`/api/necessidade-gestor/${id}`, bodyJson);
      console.log(response.data);
      return response.data;
    } catch (error) {
      console.error("Erro ao atualizar necessidade do gestor:", error);
      throw error;
    }
  }

  static async delete(id: string) {
    try {
      const response = await api.delete(`/api/necessidade-gestor/${id}`);
      console.log(response.data.message);
      return response.data;
    } catch (error) {
      console.error("Erro ao deletar necessidade do gestor:", error);
      throw error;
    }
  }
}

export default NeedRepository;
