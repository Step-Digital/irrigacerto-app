import axios from "axios";

export const API = axios.create({
  baseURL: "https://manejodeirrigacao.agr.br",
});
  