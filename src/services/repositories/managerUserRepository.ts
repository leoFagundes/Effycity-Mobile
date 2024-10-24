import { UsuarioGestor } from "@/types/types";
import { api } from "../api";

class ManagerUserRepository {
  static async getById(id: string) {
    try {
      const response = await api.get(`/api/usuario-gestor/${id}`);
      console.log(response.data);
      return response.data;
    } catch (error) {
      console.error("Erro ao localizar usuário gestor:", error);
      throw error;
    }
  }

  static async getAll() {
    try {
      const response = await api.get("/api/usuario-gestor");
      console.log(response.data);
      return response.data;
    } catch (error) {
      console.error("Erro ao localizar todos os usuários gestores:", error);
      throw error;
    }
  }

  static async create(newUsuarioGestor: Partial<UsuarioGestor>) {
    try {
      const response = await api.post("/api/usuario-gestor", newUsuarioGestor);
      console.log(response.data);
      return response.data;
    } catch (error) {
      console.error("Erro ao criar usuário gestor:", error);
      throw error;
    }
  }

  static async update(id: string, bodyJson: Partial<UsuarioGestor>) {
    try {
      const response = await api.put(`/api/usuario-gestor/${id}`, bodyJson);
      console.log(response.data);
      return response.data;
    } catch (error) {
      console.error("Erro ao atualizar usuário gestor:", error);
      throw error;
    }
  }

  static async delete(id: string) {
    try {
      const response = await api.delete(`/api/usuario-gestor/${id}`);
      console.log(response.data.message);
      return response.data;
    } catch (error) {
      console.error("Erro ao deletar usuário gestor:", error);
      throw error;
    }
  }
}

export default ManagerUserRepository;
