import { type SQLiteDatabase} from 'expo-sqlite'

export async function initializeDatabase(database: SQLiteDatabase){
    await database.execAsync(`
        CREATE TABLE IF NOT EXISTS usuarios (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            email VARCHAR(45) NOT NULL,
            senha VARCHAR(45) NOT NULL,
            eAluno TINYINT,
            eInstrutor TINYINT,
            eAdmin TINYINT,
            aluno_id INTEGER,
            instrutor_id INTEGER,
            FOREIGN KEY (aluno_id) REFERENCES alunos(id),
            FOREIGN KEY (instrutor_id) REFERENCES instrutores(id)
        );

        CREATE TABLE IF NOT EXISTS alunos (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            nome VARCHAR(100) NOT NULL,
            nascimento DATE,
            telefone VARCHAR(15),
            usuario_id INTEGER,
            aula_id INTEGER,
            FOREIGN KEY (aula_id) REFERENCES aulas(id),
            FOREIGN KEY (usuario_id) REFERENCES usuarios(id)
        );

        CREATE TABLE IF NOT EXISTS aulas (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            inicio CHAR(5) NOT NULL, 
            termino CHAR(5) NOT NULL,
            inscritos INTEGER,
            instrutor_id INTEGER,
            FOREIGN KEY (instrutor_id) REFERENCES instrutores(id)
        );

        CREATE TABLE IF NOT EXISTS instrutores (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            nome VARCHAR(100) NOT NULL,
            nascimento DATE,
            telefone VARCHAR(15),
            usuario_id INTEGER,
            FOREIGN KEY (usuario_id) REFERENCES usuarios(id)
        );

        CREATE TABLE IF NOT EXISTS pagamentos (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            ano INTEGER NOT NULL,
            mes INTEGER NOT NULL,
            dia INTEGER NOT NULL,
            valor INTEGER NOT NULL,
            estaPago TINYINT NOT NULL,
            aluno_id INTEGER,
            FOREIGN KEY (aluno_id) REFERENCES alunos(id)
        );
    `)
}