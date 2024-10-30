import { UsuarioGestor } from "@/Types/types";
import { api } from "../api";

class ManagerUserRepository {
  static async getById(id: string) {
    try {
      const response = await api.get(`/api/usuario-gestor/${id}`);
      return response.data;
    } catch (error) {
      console.error("Erro ao localizar usuário gestor:", error);
      throw error;
    }
  }

  static async getAll() {
    try {
      const response = await api.get("/api/usuario-gestor");
      return response.data;
    } catch (error) {
      console.error("Erro ao localizar todos os usuários gestores:", error);
      throw error;
    }
  }

  static async create(newUsuarioGestor: Partial<UsuarioGestor>) {
    try {
      const response = await api.post("/api/usuario-gestor", newUsuarioGestor);
      return response.data;
    } catch (error) {
      console.error("Erro ao criar usuário gestor:", error);
      throw error;
    }
  }

  static async update(id: string, bodyJson: Partial<UsuarioGestor>) {
    try {
      const response = await api.put(`/api/usuario-gestor/${id}`, bodyJson);
      return response.data;
    } catch (error) {
      console.error("Erro ao atualizar usuário gestor:", error);
      throw error;
    }
  }

  static async delete(id: string) {
    try {
      const response = await api.delete(`/api/usuario-gestor/${id}`);
      return response.data;
    } catch (error) {
      console.error("Erro ao deletar usuário gestor:", error);
      throw error;
    }
  }
}

export default ManagerUserRepository;
