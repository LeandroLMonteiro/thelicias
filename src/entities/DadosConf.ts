import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { DadosConfItem } from "./dadosConfItem";

@Entity("dados_conf")
export class DadosConf {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ name: "Tipo", type: "varchar", length: 100 })
  tipo: string = "";

  @OneToMany(() => DadosConfItem, (item) => item.dadosConf, {
    cascade: true,
    onDelete: "CASCADE",
  })
  itens!: DadosConfItem[];
}
