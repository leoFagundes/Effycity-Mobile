import { Projeto } from "@/types/types";
import { api } from "../api";

class ProjectRepository {
  static async getById(id: string) {
    try {
      const response = await api.get(`/api/projetos/${id}`);
      console.log(response.data);
      return response.data;
    } catch (error) {
      console.error("Erro ao localizar projeto:", error);
      throw error;
    }
  }

  static async getAll() {
    try {
      const response = await api.get("/api/projetos");
      console.log(response.data);
      return response.data;
    } catch (error) {
      console.error("Erro ao localizar todos os projetos:", error);
      throw error;
    }
  }

  static async create(newProjeto: Partial<Projeto>) {
    try {
      const response = await api.post("/api/projetos", newProjeto);
      console.log(response.data);
      return response.data;
    } catch (error) {
      console.error("Erro ao criar projeto:", error);
      throw error;
    }
  }

  static async update(id: string, bodyJson: Partial<Projeto>) {
    try {
      const response = await api.put(`/api/projetos/${id}`, bodyJson);
      console.log(response.data);
      return response.data;
    } catch (error) {
      console.error("Erro ao atualizar projeto:", error);
      throw error;
    }
  }

  static async delete(id: string) {
    try {
      const response = await api.delete(`/api/projetos/${id}`);
      console.log(response.data.message);
      return response.data;
    } catch (error) {
      console.error("Erro ao deletar projeto:", error);
      throw error;
    }
  }
}

export default ProjectRepository;
