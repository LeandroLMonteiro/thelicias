import * as typeorm from "typeorm";
import { DadosConf } from "./dadosConf";
import "reflect-metadata";
import { AppDataSource } from "@/database/data-source";

@typeorm.Entity("dados_conf_item")
export class DadosConfItem {
  @typeorm.PrimaryColumn({ name: "id" })
  @typeorm.Generated("increment")
  id!: number;

  @typeorm.PrimaryColumn({ name: "idDadosConf" })
  idDadosConf!: number;

  @typeorm.Column({ name: "Descricao", type: "varchar", length: 255 })
  descricao!: string;

  @typeorm.Column({
    name: "ManuseioEspecial",
    type: "varchar",
    length: 100,
    nullable: true,
  })
  manuseioEspecial?: string;

  @typeorm.ManyToOne(() => DadosConf, (dadosConf) => dadosConf.itens, {
    onDelete: "CASCADE",
  })
  @typeorm.JoinColumn({ name: "idDadosConf" })
  dadosConf!: typeorm.Relation<DadosConf>;
}
