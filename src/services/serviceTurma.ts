import Turma from "../databases/models/turma"
import { AppDataSource } from "../databases/connections/data-source"

const cursor = AppDataSource.getRepository(Turma)

// Captura os dados vindos do frontend via requisição
type newTurmaRequest = {
    id_turma: string
    fk_curso: string
    data_inicio: Date
    data_fim: Date
    horas_aula_dia: number
}

export class CreateTurmaService {
    // passa os dados da requisição como parametro do método "execute()"
    async execute({
        id_turma,
        fk_curso,
        data_inicio,
        data_fim,
        horas_aula_dia,
}: newTurmaRequest): Promise<Turma | Error> {
        // Se já existir um curso com a mesma descrição informada pelo usuário
        // o sistema retornará uma mensagem de erro
        if (await cursor.findOne({ where: { id_turma } })) {
        return new Error("Turma já cadastrado!")
        }
    
// Cria um objeto (APP) para ser salvo como registro (BD)
    const turma = cursor.create({
        id_turma,
        fk_curso,
        data_inicio,
        data_fim,
        horas_aula_dia,
})
    // Faz um INSERT lá na tabela "curso"
    // com os dados informados pelo usuário
    await cursor.save(turma)

    // Devolve pro frontend o objeto criado da classe "Curso"
    return turma
}
}
export class ReadAllCursoService {}

export class ReadOneCursoService {}

export class UpdateCursoService {}

export class DeleteCursoService {}
