
import { DataSource } from "typeorm";

export const appDatasource= new DataSource({
    type:"postgres",
    host: "localhost",
    port: 5432,
    username : "postgres",
    password : "ca845bac",
    database : "cronogramas",
    synchronize: true,
    logging: true,
    //entities: [Curso,Unidade,  Turma, Aula]
}) 