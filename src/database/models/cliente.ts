import { DataTypes, Model } from "sequelize";
import { sequelize } from "../sequelize";
import { Endereco } from "./endereco";

export class Cliente extends Model {
  declare id: number;
  declare nome: string;
  declare idade: number;
  declare cpf: string;
  declare enderecoId: number;
}

Cliente.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    nome: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    idade: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    cpf: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    enderecoId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    sequelize,
    tableName: "clientes",
  }
);

Cliente.belongsTo(Endereco, { foreignKey: "enderecoId" });
