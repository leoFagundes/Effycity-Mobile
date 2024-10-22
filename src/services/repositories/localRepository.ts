import { api } from "../api";

class LocalRepository {
  static async getMunicipiosById(id: string) {
    try {
      const response = await api.get(`/api/local/municipios/${id}`);
      // console.log(response.data);
      return response.data;
    } catch (error) {
      console.error("Erro ao localizar usuário gestor:", error);
      throw error;
    }
  }

  static async getAllMunicipios(
    estadoId: string | number,
    page = 0,
    size = ""
  ) {
    try {
      // Monta a URL com os parâmetros opcionais
      const params = new URLSearchParams();

      if (estadoId) {
        params.append("estadoId", estadoId.toString());
      }
      if (page) {
        params.append("page", page.toString());
      }
      if (size) {
        params.append("size", size);
      }

      const response = await api.get(
        `/api/local/municipios?${params.toString()}`
      );
      // console.log(response.data);
      return response.data;
    } catch (error) {
      console.error("Erro ao localizar municipios:", error);
      throw error;
    }
  }

  static async getAllMunicipiosList(estadoId: string | number) {
    try {
      const response = await api.get(
        `/api/local/municipios/list?estadoId=${estadoId}`
      );
      // console.log(response.data);
      return response.data;
    } catch (error) {
      console.error("Erro ao localizar municipios:", error);
      throw error;
    }
  }

  static async getAllEstados() {
    try {
      const response = await api.get("/api/local/estados");
      // console.log(response.data);
      return response.data;
    } catch (error) {
      console.error("Erro ao localizar estados:", error);
      throw error;
    }
  }
}

export default LocalRepository;
