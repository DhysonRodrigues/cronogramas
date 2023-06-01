import Turma from "../databases/models/turma"
import { AppDataSource } from "../databases/connections/data-source"


// 1) Estabelece conexão com a tabela alvo no banco de dados através de um cursor

const cursor = AppDataSource.getRepository(Turma)

// 2) Recebe dados da Requisição HTTP lá do FRONTEND

type newTurmaRequest = {
    id_turma: string
    fk_curso: string
    data_inicio: Date
    data_fim: Date
    horas_aula_dia: number
}

type findOneTurmaRequest = {
    id_turma: string
}

// 3) Classes CRUD

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
    return new Error(" turma já cadastrada!")
    }Turma

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

export class ReadAllCursoService {
async execute() {
    // Executa a consulta "SELECT * FROM curso" no BD
    // Armazena todos os registros do Result Set na variável "cursos"
    // Neste caso, esta variável é uma lista de cursos
    const turma = await cursor.find()
    return turma
}
}

export class ReadOneCursoService {
  // Recebe o ID do curso como parâmetro da Requisição do usuário
async execute({ id_turma }: findOneTurmaRequest) {
    // Vê se o curso existe na tabela no BD - SELECT * FROM curso WHERE id_curso = ??
    const turma = await cursor.findOne({ where: { id_turma } })
    // Se o curso não for encontrado no Result Set retorna um erro para o usuário
    if (!turma) {
    return new Error("turma não encontrado!")
    }
    // Se o curso for encontrado retorna para o usuário o curso
    return turma
}
}

export class UpdateCursoService {}

export class DeleteCursoService {
  // Recebe o ID do curso como parâmetro da Requisição do usuário
async execute({ id_turma }: findOneTurmaRequest) {
    // Vê se o curso existe na tabela no BD - SELECT * FROM curso WHERE id_curso = ??
    const turma = await cursor.findOne({ where: { id_turma } })
    // Se o curso não for encontrado no Result Set retorna um erro para o usuário
    if (!turma) {
    return new Error("Curso não encontrado!")
    }
    // Se o curso for encontrado, deleta do BD - DELETE FROM curso WHERE id_curso = ??
    await cursor.delete(turma.id_turma)
    // Retorna para o usuário o curso que foi deletado
    return turma
}
}