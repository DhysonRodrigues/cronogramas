import { Entity, PrimaryColumn,Column } from "typeorm"
import {v4 as uuid} from "uuid"

//chave primaria 
@Entity("turma")
export default class turma{
    @PrimaryColumn()
    id_turma:string
// chave estrangeira
@Column()
    fk_curso: string
// atributos
@Column({nullable : true})
    data_inicio : Date

@Column({nullable : true})
    data_fim : Date

@Column({nullable : true})
    horas_auladia: number

constructor(){
    this.id_turma=uuid()
}
}
