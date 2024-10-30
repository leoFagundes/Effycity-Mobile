import { UsuarioEmpresa } from "@/Types/types";
import { api } from "../api";

class EnterpriseUserRepository {
  static async getById(id: string) {
    try {
      const response = await api.get(`/api/usuario-empresa/${id}`);
      return response.data;
    } catch (error) {
      console.error("Erro ao localizar usuário empresa:", error);
      throw error;
    }
  }

  static async getAll() {
    try {
      const response = await api.get("/api/usuario-empresa");
      return response.data;
    } catch (error) {
      console.error("Erro ao localizar todos os usuários empresa:", error);
      throw error;
    }
  }

  static async create(newUsuarioEmpresa: Partial<UsuarioEmpresa>) {
    try {
      const response = await api.post(
        "/api/usuario-empresa",
        newUsuarioEmpresa
      );
      return response.data;
    } catch (error) {
      console.error("Erro ao criar usuário empresa:", error);
      throw error;
    }
  }

  static async update(id: string, bodyJson: Partial<UsuarioEmpresa>) {
    try {
      const response = await api.put(`/api/usuario-empresa/${id}`, bodyJson);
      return response.data;
    } catch (error) {
      console.error("Erro ao atualizar usuário empresa:", error);
      throw error;
    }
  }

  static async delete(id: string) {
    try {
      const response = await api.delete(`/api/usuario-empresa/${id}`);
      return response.data;
    } catch (error) {
      console.error("Erro ao deletar usuário empresa:", error);
      throw error;
    }
  }
}

export default EnterpriseUserRepository;
