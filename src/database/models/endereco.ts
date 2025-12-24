import { DataTypes, Model } from "sequelize";
import { sequelize } from "../sequelize";
import { Cliente } from "./cliente";

export class Endereco extends Model {
  declare id: number;
  declare nome: string;
  declare idade: number;
  declare cpf: string;
  declare enderecoId: number;
}

Endereco.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },

    pais: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    estado: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    cep: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    cidade: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    bairro: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    numero_da_casa: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    bloco: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    ponto_referencia: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    nome_da_rua: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },

  {
    sequelize,
    tableName: "endereco",
  }
);

Endereco.hasOne;
