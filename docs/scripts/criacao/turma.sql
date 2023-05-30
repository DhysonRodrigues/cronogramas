drop table if exists Turma;

CREATE TABLE Turma (
	idturma VARCHAR  PRIMARY KEY ,
	datainicio VARCHAR NOT NULL,
	dataFim DATE,
	horasAulaDia INT,
	fkcurso VARCHAR REFERENCES cursos(idCurso)
);