export type NewPropertyDTO = {
  nome: string;
  latitude: string;
  longitude: string;
  logradouro: string;
  cidade: string;
  estado: string;
  cep: string;
  area_propriedade: number;
  precipitacao: number;
}

export type NewGroundDTO = {
  tipo_solo: string;
  capacidade_campo: number;
  ponto_murcha: number;
  densidade: number;
  id_propriedade: number;
}

export type NewBombDTO = {
  fabricante: string;
  modelo: string;
  potencia: string;
  vazao_maxima: number;
  consumo: number;
  valor_kw: number;
  ativada: boolean;
  id_propriedade: number;
}

export type SystemInfoDTO = {
  nome: string,
  eficiencia_irrigacao: number;
  area_total_plantio: number;
  quantidade_setores: number;
  tipo_irrigacao: string;
  nome_setor: string;
  area_irrigada: number;
  espacamento_linha: number;
  coeficiente_uniformidade: number;
  eficiencia_sistema: number;
  vazao_aspressor?: number;
  espacamento_aspressor?: number;
  vazao_emissor?: number;
  espacamento_emissor?: number;
  percentual_area_molhada?: number;
  percentual_area_sombreada?: number;
  vazao_pivo?: number;
  raio_ultima_torre?: number;
  comprimento_vao_balanco?: number;
  velocidade_ultima_torre?: number;
  ativo: boolean;
  id_propriedade: number;
}