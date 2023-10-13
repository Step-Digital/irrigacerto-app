export type SignupDTO = {
  nome: string;
  email: string;
  celular: string;
  cep: string;
  logradouro: string;
  numero: string;
  bairro: string;
  complemento?: string;
  cidade: string;
  estado: string;
  password: string;
  roles: String[];
}