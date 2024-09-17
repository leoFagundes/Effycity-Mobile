export interface ManagerProps {
  name: string;
  email: string;
  phone: string;
  uf: string;
  city: string;
  position: string;
  organization: string;
}

export interface EnterpriseProps {
  username: string;
  enterpriseName: string;
  email: string;
  cnpj: string;
  phone: string;
  area: string;
}

export interface ManagerNeedProps {
  name: string;
  description: string;
  budget: number;
  creationDate: Date;
  city: string;
  uf: string;
}

export interface EnterpriseProjectProps {
  name: string;
  description: string;
  budget: number;
  creationDate: Date;
  duration: number;
  category: string;
}
