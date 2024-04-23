// Tentar usar apenas um props.ts para ambos os lados
export interface Users {
  id?: number;
  name: string;
  email: string;
  phone: string;
  password: string;
  salt: string;
  forgotPassword?: boolean;
  active?: boolean;
  company: string;
  role?: string;
}

export interface Companies {
  id?: number;
  name: string;
  cod: string;
  cnpj?: string;
  phone?: string;
  email?: string;
}

export interface Projects {
  id?: number;
  name: string;
  cod: string;
  id_architect: string;
  id_company: string;
}

export interface Plantas {
  id?: number;
  name: string;
  config: string;
  cod_project: string;
}