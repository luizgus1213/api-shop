interface Endereco {
  país: string;
  estado: string;
  cep: string;
  cidade: string;
  bairro: string;
  numero_da_casa: string;
  bloco?: string;
  ponto_referencia: string;
  nome_da_rua: string;
}

export default Endereco;
