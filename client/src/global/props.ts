// Tentar usar apenas um props.ts para ambos os lados
export interface Users {
  id?: number;
  email: string;
  password: string;
  salt: string;
}
