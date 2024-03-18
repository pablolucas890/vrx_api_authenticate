// Tentar usar apenas um props.ts para ambos os lados
export interface Users {
  id?: number;
  name: string;
  email: string;
  phone: string;
  password: string;
  salt: string;
  forgotPassword?: boolean;
}
