import express, { Request, Response } from "express";
import { clientes, animais } from "./database";
import Animal from "./types/animal";
import { sequelize } from "./database/sequelize";
import { Cliente } from "./database/models/cliente";
import { Endereco } from "./database/models/endereco";

interface AnimalRequest extends Animal {
  cpf_dono: string;
}

const port = 3000;
const app = express();

app.use(express.json());

//CONTROLLERS
const listarClientes = (req: Request, res: Response) => {
  res.json(clientes);
};

const listaranimais = (req: Request, res: Response) => {
  res.json(animais);
};

const cadastrarcliente = (req: Request, res: Response) => {
  const corpo = req.body;

  const cpfexistente = clientes.find((c) => c.cpf === corpo.cpf);
  clientes.push(corpo);
  res.json(corpo);
};
const atualizar_cliente = (req: Request, res: Response) => {
  const { cpf, nome, idade, telefone, endereco } = req.body;

  if (!cpf) {
    return res.status(400).json({
      mensagem: "O CPF é obrigatorio para atualizar",
    });
  }

  const indice = clientes.findIndex((c) => c.cpf === cpf);

  if (indice === -1) {
    return res.status(404).json({
      mensagem: "Cliente nao encontrado",
    });
  }

  if (nome) clientes[indice].nome = nome;
  if (idade) clientes[indice].idade = idade;
  if (telefone) clientes[indice].telefone = telefone;

  if (endereco) {
    if (endereco.país && typeof endereco.país === "string")
      clientes[indice].endereco.país = endereco.país;
    else if (typeof endereco.país !== "string")
      return res.status(400).json({ mensagem: "o país deve ser uma string" });
    if (endereco.estado && typeof endereco.estado === "string")
      clientes[indice].endereco.estado = endereco.estado;
    else if (typeof endereco.estado !== "string")
      return res.status(400).json({ mensagem: "Estado deve ser uma string" });
    if (endereco.cep) clientes[indice].endereco.cep = endereco.cep;
    else if (typeof endereco.cep !== "string")
      return res.status(400).json({ mensagem: "o cep deve ser uma string" });
    if (endereco.cidade) clientes[indice].endereco.cidade = endereco.cidade;
    else if (typeof endereco.cidade !== "string")
      return res
        .status(400)
        .json({ mensagem: "a requisição 'cidade' deve ser uma string" });
    if (endereco.bairro) clientes[indice].endereco.bairro = endereco.bairro;
    else if (typeof endereco.bairro !== "string")
      return res
        .status(400)
        .json({ mensagem: "a requisição 'bairro ' deve ser uma string" });

    if (endereco.nome_da_rua)
      clientes[indice].endereco.nome_da_rua = endereco.nome_da_rua;
    else if (typeof endereco.nome_da_rua !== "string")
      return res
        .status(400)
        .json({ mensagem: "a requisição 'nome_da_rua' deve ser uma string" });

    if (endereco.numero_da_casa)
      clientes[indice].endereco.numero_da_casa = endereco.numero_da_casa;
    else if (typeof endereco.numero_da_casa !== "string")
      return res
        .status(400)
        .json({ mensagem: "o numero da cada deve-se ser uma string" });
    if (endereco.bloco) {
      if (endereco.bloco) clientes[indice].endereco.bloco = endereco.bloco;
      else if (typeof endereco.bloco !== "string")
        return res
          .status(400)
          .json({ mensagem: "o bloco deve ser uma string" });
    }
  }

  return res.json({
    mensagem: "Cliente atualizado com sucesso",
    data: clientes[indice],
  });
};

const cadastraranimal = (
  req: Request<{}, {}, AnimalRequest>,
  res: Response
) => {
  const corpo_da_requisicao = req.body;

  const cliente = clientes.find((c) => c.cpf === corpo_da_requisicao.cpf_dono);

  if (!cliente)
    return res
      .status(400)
      .json({ messagem: "CPF informado não está cadastrado no sistema" });

  const existe_nome_animal = animais.find(
    (a) => a.nome.toLowerCase() === corpo_da_requisicao.nome.toLowerCase()
  );

  const nome_animal_duplicado = animais.some(
    (a) => a.nome.toLowerCase() === corpo_da_requisicao.nome.toLowerCase()
  );

  if (existe_nome_animal || nome_animal_duplicado) {
    return res
      .status(400)
      .json({ mensagem: "Já existe um animal com esse nome." });
  }

  const novo_animal: Animal = {
    tipo: corpo_da_requisicao.tipo,
    nome: corpo_da_requisicao.nome,
    cor: corpo_da_requisicao.cor,
    idade: corpo_da_requisicao.idade,
    dono: cliente,
    raça: corpo_da_requisicao.raça,
  };

  animais.push(novo_animal);

  return res.json({
    mensagem: "Animal cadastrado com sucesso",
    data: novo_animal,
  });
};
const atualizaCadastroAnimal = (req: Request, res: Response) => {
  const { nome, idade, cor, raça, tipo } = req.body;

  if (!nome) {
    return res.status(400).json({
      mensagem: "O nome do animal é obrigatório para atualizar",
    });
  }

  const indice = animais.findIndex(
    (a) => a.nome.toLowerCase() === nome.toLowerCase()
  );

  if (indice === -1) {
    return res.status(404).json({
      mensagem: "Animal não foi encontrado",
    });
  }

  if (idade) animais[indice].idade = idade;
  if (cor) animais[indice].cor = cor;
  if (raça) animais[indice].raça = raça;
  if (tipo) animais[indice].tipo = tipo;

  return res.json({
    mensagem: "Animal atualizado com sucesso",
    data: animais[indice],
  });
};

//ROTAS
app.get("/clientes", listarClientes);

app.get("/animais", listaranimais);

app.post("/animais", cadastraranimal);

app.post("/clientes", cadastrarcliente);

app.put("/clientes", atualizar_cliente);

app.put("/animais", atualizaCadastroAnimal);
/*
Create
Read
Update
Delete
*/

(async () => {
  sequelize.sync({ alter: true });
  console.log("Banco de dados sincronizado");
})();

app.listen(port, () => console.log(`Servidor rodando na porta ${port}`));
