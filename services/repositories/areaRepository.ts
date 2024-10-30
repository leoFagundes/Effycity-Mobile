import { AreaTematica } from "@/Types/types";
import { api } from "../api";

class AreaRepository {
  static async getById(id: string) {
    try {
      const response = await api.get(`/api/area-tematica/${id}`);
      return response.data;
    } catch (error) {
      console.error("Erro ao localizar área temática:", error);
      throw error;
    }
  }

  static async getAll() {
    try {
      const response = await api.get("/api/area-tematica");
      return response.data;
    } catch (error) {
      console.error("Erro ao localizar todas as áreas temáticas:", error);
      throw error;
    }
  }

  static async create(newAreaTematica: AreaTematica) {
    try {
      const response = await api.post("/api/area-tematica", newAreaTematica);
      return response.data;
    } catch (error) {
      console.error("Erro ao criar área temática:", error);
      throw error;
    }
  }

  static async update(id: string, bodyJson: Partial<AreaTematica>) {
    try {
      const response = await api.put(`/api/area-tematica/${id}`, bodyJson);
      return response.data;
    } catch (error) {
      console.error("Erro ao atualizar área temática:", error);
      throw error;
    }
  }

  static async delete(id: string) {
    try {
      const response = await api.delete(`/api/area-tematica/${id}`);
      return response.data;
    } catch (error) {
      console.error("Erro ao deletar área temática:", error);
      throw error;
    }
  }
}

export default AreaRepository;
