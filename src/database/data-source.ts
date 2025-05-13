import { config } from "dotenv";
import { DadosConf } from "@/entities/dadosConf";
import { DadosConfItem } from "@/entities/dadosConfItem";
import "reflect-metadata";
import { DataSource } from "typeorm";

// Carrega as variáveis de ambiente
config();

// Verifica se as variáveis necessárias estão definidas
if (
  !process.env.POSTGRES_HOST ||
  !process.env.POSTGRES_USER ||
  !process.env.POSTGRES_PASSWORD ||
  !process.env.POSTGRES_DATABASE
) {
  throw new Error("Variáveis de ambiente necessárias não estão definidas");
}

export const AppDataSource = new DataSource({
  type: "postgres",
  host: process.env.POSTGRES_HOST,
  port: parseInt(process.env.DATABASE_PORT || "5432"),
  username: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  database: process.env.POSTGRES_DATABASE,
  ssl: { rejectUnauthorized: false },
  synchronize: process.env.NODE_ENV === "development", // Cuidado em produção!
  logging: process.env.NODE_ENV === "development",
  //entities: [__dirname + "/../entities/*.ts"],
  entities: [DadosConf, DadosConfItem],
  migrations: [__dirname + "/../migrations/*.ts"],
  subscribers: [],
});
