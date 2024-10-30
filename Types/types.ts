export interface GoogleUser {
  displayName: string;
  email: string;
  emailVerified: boolean;
  isAnonymous: boolean;
  metadata: {
    creationTime: number;
    lastSignInTime: number;
  };
  multiFactor: {
    enrolledFactors: Array<unknown>;
  };
  phoneNumber: string | null;
  photoURL: string;
  providerData: Array<{
    displayName: string;
    email: string;
    phoneNumber: string | null;
    photoURL: string;
    providerId: string;
    uid: string;
  }>;
  providerId: string;
  tenantId: string | null;
  uid: string;
}

export interface Estado {
  id: number;
  sgEstado: string;
  noEstado: string;
}

export interface Municipio {
  id: number;
  noMunicipio: string;
  estado: Estado;
}

export interface UsuarioGestor {
  id: number;
  usuario: string;
  email: string;
  cargo: string;
  orgao: string;
  telefone: string;
  municipio: Partial<Municipio>;
  estado: Partial<Estado>;
}

export interface UsuarioEmpresa {
  id: number;
  usuario: string;
  dsEmail: string;
  empresa: string;
  cnpj: string;
  telefone: string;
  areaAtuacao: string;
}

export interface Projeto {
  id: number;
  usuarioEmpresa: UsuarioEmpresa;
  noProjeto: string;
  dsProjeto: string;
  custo: number;
  dtCriacao: Date;
  duracaoMeses: number;
  areaTematica: AreaTematica;
}

export interface Necessidade {
  id: number;
  noNecessidade: string;
  dsNecessidade: string;
  nuCusto: number;
  dtCriacao: Date;
  usuarioGestor: Partial<UsuarioGestor>;
  estado: Partial<Estado>;
  municipio: Partial<Municipio>;
  areaTematica: Partial<AreaTematica>;
}

export interface AreaTematica {
  id: number;
  dsAreaTematica: string;
}

export interface UserInfo {
  id: string;
  email: string;
  verified_email: true;
  name: string;
  given_name: string;
  picture: string;
  locale: string;
}
