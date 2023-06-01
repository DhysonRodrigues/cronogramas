import Unidade from "../databases/models/unidade"
import { AppDataSource } from "../databases/connections/data-source"


// 1) Estabelece conexão com a tabela alvo no banco de dados através de um cursor

const cursor = AppDataSource.getRepository(Unidade)

// 2) Recebe dados da Requisição HTTP lá do FRONTEND

type newUnidadeRequest = {
    id_unidade : string
    descricao_unidade: string
    carga_horaria_unidade: number
    ordem: number
    fk_curso:string
}

type findOneUnidadeRequest = {
    id_unidade: string
}

// 3) Classes CRUD

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
    if (await cursor.findOne({ where: { id_unidade } })) {
    return new Error(" unidade já cadastrada!")
    }Unidade

    // Cria um objeto (APP) para ser salvo como registro (BD)
    const unidade = cursor.create({
        id_unidade, 
    descricao_unidade,
    carga_horaria_unidade,
    ordem,
    fk_curso,
    })

    // Faz um INSERT lá na tabela "curso"
    // com os dados informados pelo usuário
    await cursor.save(unidade)

    // Devolve pro frontend o objeto criado da classe "Curso"
    return unidade
}
}

export class ReadAllCursoService {
async execute() {
    // Executa a consulta "SELECT * FROM curso" no BD
    // Armazena todos os registros do Result Set na variável "cursos"
    // Neste caso, esta variável é uma lista de cursos
    const unidade = await cursor.find()
    return unidade
}
}

export class ReadOneCursoService {
  // Recebe o ID do curso como parâmetro da Requisição do usuário
async execute({ id_unidade }: findOneUnidadeRequest) {
    // Vê se o curso existe na tabela no BD - SELECT * FROM curso WHERE id_curso = ??
    const unidade = await cursor.findOne({ where: { id_unidade } })
    // Se o curso não for encontrado no Result Set retorna um erro para o usuário
    if (!unidade) {
    return new Error("turma não encontrado!")
    }
    // Se o curso for encontrado retorna para o usuário o curso
    return unidade
}
}

export class UpdateCursoService {}

export class DeleteCursoService {
  // Recebe o ID do curso como parâmetro da Requisição do usuário
async execute({ id_unidade }: findOneUnidadeRequest) {
    // Vê se o curso existe na tabela no BD - SELECT * FROM curso WHERE id_curso = ??
    const unidade = await cursor.findOne({ where: { id_unidade } })
    // Se o curso não for encontrado no Result Set retorna um erro para o usuário
    if (!unidade) {
    return new Error("Unidade não encontrado!")
    }
    // Se o curso for encontrado, deleta do BD - DELETE FROM curso WHERE id_curso = ??
    await cursor.delete(unidade)
    // Retorna para o usuário o curso que foi deletado
    return unidade
}
}