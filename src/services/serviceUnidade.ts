import Unidade from "../databases/models/unidade"
import { AppDataSource } from "../databases/connections/data-source"

const cursor = AppDataSource.getRepository(Unidade)

// Captura os dados vindos do frontend via requisição
type newUnidadeRequest = {
    id_unidade : string
    descricao_unidade: string
    carga_horaria_unidade: number
    ordem: number
    fk_curso:string
}
export class CreateUnidadeService {
    // passa os dados da requisição como parametro do método "execute()"
async execute({
    id_unidade, 
    descricao_unidade,
    carga_horaria_unidade,
    ordem,
    fk_curso,
}: newUnidadeRequest): Promise<Unidade | Error> {
     // Se já existir um curso com a mesma descrição informada pelo usuário
        // o sistema retornará uma mensagem de erro
    if (await cursor.findOne({ where: { descricao_unidade } })) {
    return new Error("não pode matricular em mais de uma unidade!")
}
 // Faz um INSERT lá na tabela "curso"
    // com os dados informados pelo usuário
const unidade = cursor.create({
    id_unidade, 
    descricao_unidade,
    carga_horaria_unidade,
    ordem,
    fk_curso,
})
await cursor.save(unidade)
// Devolve pro frontend o objeto criado da classe "Curso"
return unidade
}
}

export class ReadAllCursoService {}

export class ReadOneCursoService {}

export class UpdateCursoService {}

export class DeleteCursoService {}
