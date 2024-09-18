export interface ManagerProps {
  id: string;
  name: string;
  email: string;
  phone: string;
  uf: string;
  city: string;
  position: string;
  organization: string;
}

export interface EnterpriseProps {
  id: string;
  username: string;
  enterpriseName: string;
  email: string;
  cnpj: string;
  phone: string;
  area: string;
}

export interface ManagerNeedProps {
  id: string;
  name: string;
  description: string;
  budget: number;
  creationDate: Date;
  city: string;
  uf: string;
}

export interface EnterpriseProjectProps {
  id: string;
  name: string;
  description: string;
  budget: number;
  creationDate: Date;
  duration: number;
  category: string;
}
