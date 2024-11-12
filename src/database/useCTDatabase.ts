import { useSQLiteContext } from "expo-sqlite";

export type usuariosLogin = {
    id: number
    email: string
    senha: string
}

export type usuarios ={
    id: number
    email: string
    senha: string
    eAluno: string
    eInstrutor: string
    eAdmin: string
}

export type alunos = {
    id: number
    nome: string
    nascimento: string
    telefone: string
    usuario_id: string
    aula_id: string
}

export type alunoPerfil = {
    nome: string
    nascimento: string
    telefone: string
}

export type instrutores = {
    id: number
    nome: string
    nascimento: string
    telefone: string
    usuario_id: string
}

export type aulas = {
    id: number
    inicio: string
    termino: string
}

export type pagamentos = {
    id: number,
    ano: string,
    mes: string,
    dia: string,
    valor: string,
    estaPago: boolean,
    aluno_id: string
}

export type ano = {
    ano: number
}

export type count = {
    count: string
}

export type anomes = {
    anoAtual: string
    mesAtual: string
    search: string
}

export type anomesAluno = {
    anoAtual: string
    mesAtual: string
    idAluno: string
}

export type nome = {
    nome: string
}

export type nomePagamentos ={
    nome: string
    ano: string
    mes: string
    dia: string
    valor: string
    estaPago: string
    aluno_id: string
    pagamento_id: string
}

export type nomePagamentosAluno ={
    ano: string
    mes: string
    dia: string
    valor: string
    estaPago: string
    pagamento_id: string
}

export type pagar = {
    pagamento_id: string
}

export type infosUser = {
    id: string,
    eAluno: string
    eInstrutor: string
    eAdmin: string
}

export type instrutor_id = {
    instrutor_id: string
}

export type aluno_id = {
    aluno_id: string
}

export type usuario_id = {
    usuario_id: string
}


export function useCTDatabase(){
    const database = useSQLiteContext() //Instância da database

    async function registrar(data: Omit<usuariosLogin, "id">){
        const statement = await database.prepareAsync(
            "INSERT INTO usuarios (email, senha) VALUES ($email, $senha)"
        )

        try {
            const result = await statement.executeAsync({
                $email: data.email,
                $senha: data.senha
            })

            const insertedRowId = result.lastInsertRowId.toLocaleString()

            return {insertedRowId}
        } catch (error) {
            throw error
        } finally{
            await statement.finalizeAsync()
        }
    }

    async function temEmail(data: Pick<usuariosLogin, "email">){
        let existeEmail:boolean = true; //Variável para saber se já existe um email cadastrado
        
        try {
            const query = "SELECT email FROM usuarios WHERE email = ?"

            const response = await database.getFirstAsync<Pick<usuariosLogin,"email">>(query, `${data.email}`)
            
            //Se já existir um email, "existeEmail" vai ser true, se não, false
            if (!response){
                existeEmail = false;
                return(existeEmail) 
            }else{
                return(existeEmail)
            }
        } catch (error) {
            throw error
        }
    }

    async function fazerLogin(data: Omit<usuariosLogin,"id">){ //Fazer login
        let senhaCerta:boolean;
       try {
            const query = "SELECT senha FROM usuarios WHERE email = ?"

            const response = await database.getFirstAsync<Omit<usuariosLogin,"id">>(query, `${data.email}`)

            if (response?.senha == data.senha){
                senhaCerta = true;
                return(senhaCerta)
            }else{
                senhaCerta = false;
                return(senhaCerta)
            }
       } catch (error) {
        throw error
       }
    }

    async function pegarInfosUser(email: string){
        try {
            const query = "SELECT id, eAluno, eInstrutor, eAdmin FROM usuarios WHERE email = ?"

            const response = await database.getFirstAsync<infosUser>(query,`${email}`)

            return(response)
        } catch (error) {
            throw error
        }
    }

    async function criarAula(data: Omit<aulas,"id">){ //Criar aula
        const statement = await database.prepareAsync(
            "INSERT INTO aulas (inicio, termino) VALUES ($inicio, $termino)"
        )

        try {
            const result = await statement.executeAsync({
                $inicio: data.inicio,
                $termino: data.termino
            })

            const insertedRowId = result.lastInsertRowId.toLocaleString()

            return {insertedRowId}
        } catch (error) {
            throw error
        } finally{
            await statement.finalizeAsync()
        }
    }

    async function listarAulas(){ //Listar aulas
        try {
            const query = "SELECT id, inicio, termino FROM aulas"

            const response = await database.getAllAsync<aulas>(query)

            return (response)
        } catch (error) {
            throw error
        } 
    }

    async function removerAula(id: number){ //Apagar/remover aulas
        try {
            await database.execAsync("DELETE FROM aulas WHERE id = " + id)
        } catch (error) {
            throw error
        }
    }

    async function aulaInfo(id:number){ //Buscar informações da aula
        try {
            const query = "SELECT inicio, termino FROM aulas WHERE id = ?"

            const response = await database.getFirstAsync<aulas>(query, id)

            return(response)
        } catch (error) {
            throw error
        }
    }

    async function alunosInscritos(id: number){ //Buscar a quantidade de alunos inscritos em uma aula
        try {
            const query = "SELECT COUNT (nascimento) as count FROM alunos WHERE aula_id = ?"

            const response = await database.getFirstAsync<count>(query,id)

            return response

        } catch (error) {
            throw error
        }
    }

    async function registrarAlunoAula(id:number, aluno_id:number){ //Colocar um aluno numa determinada aula
        const statement = await database.prepareAsync(
            "UPDATE alunos SET aula_id = $id WHERE id = $aluno_id"
        )

        try {
            await statement.executeAsync({
                $id: id,
                $aluno_id: aluno_id
            })
        } catch (error) {
            throw error
        } finally{
            statement.finalizeAsync()
        }
    }

    async function cadastrarAluno(data: Omit<alunos, "id"|"aula_id">){ //Cadastrar um aluno
        const statement = await database.prepareAsync(
            "INSERT INTO alunos (nome, nascimento, telefone, usuario_id) VALUES ($nome, $nascimento, $telefone, $usuario_id)"
        )

        try {
            const result = await statement.executeAsync({
                $nome: data.nome,
                $nascimento: data.nascimento,
                $telefone: data.telefone,
                $usuario_id: data.usuario_id
            })

            const insertedRowId = result.lastInsertRowId.toLocaleString()

            return {insertedRowId}

        } catch (error) {
            throw error
        } finally{
            statement.finalizeAsync()
        }
    }

    async function linkarAlunoAUsuario(usuario_id:string,aluno_id:string){ //Mudar o atributo "aluno_id" de acordo com o aluno cadastrado
        const statement = await database.prepareAsync(
            "UPDATE usuarios SET aluno_id = $aluno_id WHERE id = $usuario_id"
        )
        try {
            await statement.executeAsync({
                $aluno_id: aluno_id,
                $usuario_id: usuario_id
            })
        } catch (error) {
            throw error
        } finally{
            statement.finalizeAsync()
        }
    }

    async function temRegistroInstrutor(usuario_id:string){ //Ter certeza que não existem registros duplicados entre usuarios e instrutores
        try {
            const query =  "SELECT instrutor_id FROM usuarios WHERE id = ?"

            const result = await database.getFirstAsync<instrutor_id>(query,`${usuario_id}`)

            if (result){
                return result
            }
        } catch (error) {
            throw error
        }
    
    }

    async function limparRegistroInstrutor(instrutor_id:string){
        const statement = await database.prepareAsync(
            "DELETE FROM instrutores WHERE id = $id"
        )
        try {
            await statement.executeAsync({
                $id: instrutor_id
            })
        } catch (error) {
            throw error
        } finally{
            statement.finalizeAsync()
        }
    }

    async function setarAluno(id: string){ //Atualizar o atributo "eAluno" da tabela usuário do respectivo aluno
        try {
            await database.execAsync("UPDATE usuarios SET eAluno = 1, eInstrutor = 0, eAdmin = 0 WHERE id = " + id)
        } catch (error) {
            throw error
        }
    }

    async function procurarAlunos(nome: string){ //Procurar/listar alunos
        try {
            const query = "SELECT id, nome, nascimento, telefone, usuario_id FROM alunos WHERE nome LIKE ?"

            const response = await database.getAllAsync<alunos>(query,`%${nome}%`)

            return (response)
        } catch (error) {
            throw error
        } 
    }

    async function removerAluno(id: number){ //Apagar registros do aluno
        try {
            await database.execAsync("DELETE FROM alunos WHERE id = " + id)
        } catch (error) {
            throw error
        }
    }

    async function removerAlunoDaAula(id:number){ //Remover aluno de uma determinada aula
        try {
            await database.execAsync("UPDATE alunos SET aula_id = '0' WHERE id = " + id)
        } catch (error) {
            throw error
        }
    }

    async function alunoInfo(id: number){ //Pegar as informações de um aluno
        try {
            const query = "SELECT nome, nascimento, telefone, usuario_id, aula_id FROM alunos WHERE ID = ?"

            const response = await database.getFirstAsync<alunos>(query,id)

            return (response)
        } catch (error) {
            throw error
        }
    }

    async function registrarPagamento(data: Omit<pagamentos,"id">){ //Criar uma nova fatura/pagamento
        const statement = await database.prepareAsync(
            "INSERT INTO pagamentos (ano, mes, dia, valor, estaPago, aluno_id) VALUES ($ano, $mes, $dia, $valor, $estaPago, $aluno_id)"
        )
        try {
            const result = await statement.executeAsync({
                $ano: data.ano,
                $mes: data.mes,
                $dia: data.dia,
                $valor: data.valor,
                $estaPago: data.estaPago,
                $aluno_id: data.aluno_id
            })

            const insertedRowId = result.lastInsertRowId.toLocaleString()

            return {insertedRowId}
        } catch (error) {
            throw error
        }
    }

    async function listarAnos(){ //Listar os anos que possuem pagamentos
        try {
            const query = "SELECT * FROM pagamentos GROUP BY ano"

            const response = await database.getAllAsync<pagamentos>(query)

            return(response)
        } catch (error) {
            throw error
        }
    }

    async function listarAlunosEmAula(id: number){ //Listar os alunos em uma aula
        try {
            const query = "SELECT id, nome, nascimento, telefone, usuario_id FROM alunos WHERE aula_id = ?"

            const response = await database.getAllAsync<alunos>(query,id)

            return(response)
        } catch (error) {
            throw error
        }
    }

    async function listarPagamentos(data: anomes){ //Listar os pagamentos em um ano X e mês X
        try {
            const response = database.getAllAsync<nomePagamentos>(
                "SELECT p.id AS pagamento_id, p.aluno_id AS aluno_id, a.nome AS nome, p.ano AS ano, p.mes AS mes, p.dia AS dia, p.valor AS valor, p.estaPago FROM alunos AS a INNER JOIN pagamentos AS p ON p.aluno_id = a.id WHERE p.ano = $ano AND p.mes = $mes AND a.nome LIKE $search",
                {$ano: data.anoAtual, $mes: data.mesAtual, $search: `%${data.search}%`}
            )

            return(response)
        } catch (error) {
            throw error
        }
    }

    async function listarPagamentosAluno(data: anomesAluno){ //Listar os pagamentos em um ano X e mês X do aluno
        try {
            const response = database.getAllAsync<nomePagamentosAluno>(
                "SELECT p.id AS pagamento_id, p.ano AS ano, p.mes AS mes, p.dia AS dia, p.valor AS valor, p.estaPago FROM alunos AS a INNER JOIN pagamentos AS p ON p.aluno_id = a.id WHERE p.ano = $ano AND p.mes = $mes AND p.aluno_id = $aluno_id",
                {$ano: data.anoAtual, $mes: data.mesAtual, $aluno_id: data.idAluno}
            )

            return(response)
        } catch (error) {
            throw error
        }
    }

    async function pagar(data: pagar){ //Alterar o status para "pago" de um certo pagamento
        const statement = await database.prepareAsync(
            "UPDATE pagamentos SET estaPago = 1 WHERE id = $pagamento_id"
        )
        try {
            await statement.executeAsync({
                $pagamento_id: data.pagamento_id
            })
        } catch (error) {
            throw error
        }finally{
            statement.finalizeAsync()
        }
    }

    async function listarUsuarios(email: string){ //Listagem de usuários
        try {
            const query = "SELECT id, email, eAluno, eInstrutor, eAdmin FROM usuarios WHERE email LIKE ?"
            
            const response = await database.getAllAsync<usuarios>(query,`%${email}%`)

            return(response)
        } catch (error) {
            throw error
        }
    }

    async function procurarInstrutores(nome: string){ //Procurar/listar instrutores
        try {
            const query = "SELECT id, nome, nascimento, telefone, usuario_id FROM instrutores WHERE nome LIKE ?"

            const response = await database.getAllAsync<instrutores>(query,`%${nome}%`)

            return (response)
        } catch (error) {
            throw error
        } 
    }

    async function removerInstrutores(id: number){ //Apagar registros de um instrutor
        try {
            await database.execAsync("DELETE FROM instrutores WHERE id = " + id)
        } catch (error) {
            throw error
        }
    }

    async function cadastrarInstrutor(data: Omit<instrutores,"id">){ //Cadastrar um instrutor
        const statement = await database.prepareAsync(
            "INSERT INTO instrutores (nome, nascimento, telefone, usuario_id) VALUES ($nome, $nascimento, $telefone, $usuario_id)"
        )

        try {
            const result = await statement.executeAsync({
                $nome: data.nome,
                $nascimento: data.nascimento,
                $telefone: data.telefone,
                $usuario_id: data.usuario_id
            })

            const insertedRowId = result.lastInsertRowId.toLocaleString()

            return {insertedRowId}

        } catch (error) {
            throw error
        } finally{
            statement.finalizeAsync()
        }
    }

    async function temRegistroAluno(usuario_id:string){ //Ter certeza que não existem registros duplicados entre usuarios e instrutores
        try {
            const query =  "SELECT aluno_id FROM usuarios WHERE id = ?"

            const result = await database.getFirstAsync<aluno_id>(query,`${usuario_id}`)

            if (result){
                return result
            }
        } catch (error) {
            throw error
        }
    
    }

    async function linkarInstrutorAUsuario(usuario_id:string,instrutor_id:string){ //Mudar o atributo "aluno_id" de acordo com o aluno cadastrado
        const statement = await database.prepareAsync(
            "UPDATE usuarios SET instrutor_id = $instrutor_id WHERE id = $usuario_id"
        )
        try {
            await statement.executeAsync({
                $instrutor_id: instrutor_id,
                $usuario_id: usuario_id
            })
        } catch (error) {
            throw error
        } finally{
            statement.finalizeAsync()
        }
    }

    async function limparRegistroAluno(aluno_id:string){
        const statement = await database.prepareAsync(
            "DELETE FROM alunos WHERE id = $id"
        )
        try {
            await statement.executeAsync({
                $id: aluno_id
            })
        } catch (error) {
            throw error
        } finally{
            statement.finalizeAsync()
        }
    }

    async function instrutorInfo(id : number){ //Pegar as informações de um instrutor
        try {
            const query = "SELECT nome, nascimento, telefone, usuario_id FROM instrutores WHERE ID = ?"

            const response = await database.getFirstAsync<instrutores>(query,id)

            return (response)
        } catch (error) {
            throw error
        }
    }

    async function registrarInstrutorAula(instrutor_id: number, aula_id: number){ //Registrar um instrutor para uma aula X
        const statement = await database.prepareAsync(
            "UPDATE aulas SET instrutor_id = $instrutor_id WHERE id = $aula_id"
        )

        try {
            await statement.executeAsync({
                $instrutor_id: instrutor_id,
                $id: aula_id
            })
        } catch (error) {
            throw error
        } finally{
            statement.finalizeAsync()
        }
    }

    async function listarInstrutorEmAula(id: number){ //Pegar qual instrutor é responsável por aula X
        try {
            const query = "SELECT i.id, i.nome, i.nascimento, i.telefone, i.usuario_id FROM instrutores AS i INNER JOIN aulas AS a ON a.instrutor_id = i.id WHERE aula_id = ?"

            const response = await database.getFirstAsync<instrutores>(query,id)

            return(response)
        } catch (error) {
            throw error
        }
    }

    async function removerInstrutorDaAula(id: number){ //Remover um instrutor de uma aula X
        try {
            await database.execAsync("UPDATE aulas SET instrutor_id = '0' WHERE id = " + id)
        } catch (error) {
            throw error
        }
    }

    async function setarInstrutor(id: string){ //Atualizar o atributo "eInstrutor" de um determinado usuario
        try {
            await database.execAsync("UPDATE usuarios SET eInstrutor = 1, eAluno = 0 WHERE id = " + id)
        } catch (error) {
            throw error
        }
    }

    async function selecionarAlunoPagamento(id: string){ //Pegar o nome do aluno selecionado durante a criação de um novo pagamento
        try {
            const result = await database.getFirstAsync<nome>("SELECT nome FROM alunos WHERE id = " + id)

            return(result)
        } catch (error) {
            throw error
        }
    }

    async function procurarAdmin(email: string){ //Procurar/listar admins
        try {
            const query = "SELECT id, email, senha FROM usuarios WHERE email LIKE ? AND eAdmin = 1"

            const response = await database.getAllAsync<usuarios>(query,`%${email}%`)

            return (response)
        } catch (error) {
            throw error
        } 
    }

    async function cadastrarAdmin(id: string){ //Cadastrar um admin
        try {
            await database.execAsync("UPDATE usuarios SET eAdmin = 1, eAluno = 0 WHERE id = " + id)
        } catch (error) {
            throw error
        }
    }

    async function removerAdmin(id: string){
        try {
            await database.execAsync("UPDATE usuarios SET eAdmin = 0 WHERE id = " + id)
        } catch (error) {
            throw error
        }
    }

    async function adminInfo(id:string){
        try {
            const query = "SELECT email FROM usuarios WHERE eAdmin = 1 AND id = ?"

            const result = database.getFirstAsync<usuarios>(query,id)

            return(result)
        } catch (error) {
            throw error
        }
    }

    async function pegarNomeAluno(id:string){
        try {
            const query = "SELECT nome FROM alunos WHERE id = ?"

            const response = await database.getFirstAsync<nome>(query,`${id}`)

            if(response){
                return(response)
            }
        } catch (error) {
            throw error
        }
    }

    async function pegarNomeInstrutor(id:string){
        try {
            const query = "SELECT nome FROM instrutores WHERE id = ?"

            const response = await database.getFirstAsync<nome>(query,`${id}`)

            if(response){
                return(response)
            }
        } catch (error) {
            throw error
        }
    }

    async function pegarIdAluno(usuario_id:string){
        try {
            const query = "SELECT aluno_id FROM usuarios WHERE id = ?"

            const result = await database.getFirstAsync<aluno_id>(query,`${usuario_id}`)

            if(result) {
                return(result)
            }
        } catch (error) {
            throw error
        }
    }

    async function pegarIdInstrutor(usuario_id:string){
        try {
            const query = "SELECT instrutor_id, eAdmin FROM usuarios WHERE id = ?"

            const result = await database.getFirstAsync<{instrutor_id:string,eAdmin:string}>(query,`${usuario_id}`)

            if(result) {
                return(result)
            }
        } catch (error) {
            throw error
        }
    }

    async function listarAnosDoAluno(aluno_id:string){ //Listar os anos que possuem pagamentos
        try {
            const query = "SELECT * FROM pagamentos WHERE aluno_id = ? GROUP BY ano"
            const response = await database.getAllAsync<pagamentos>(query,`${aluno_id}`)
            return(response)
        } catch (error) {
            throw error
        }
    }

    async function pegarInfosPerfilAluno(aluno_id:string){
        try {
            const query = "SELECT nome, nascimento, telefone FROM alunos WHERE id = ?"

            const result = await database.getFirstAsync<alunoPerfil>(query,`${aluno_id}`)

            return(result)
        } catch (error) {
            throw error
        }
    }

    async function pegarInfosPerfilInstrutor(instrutor_id:string){
        try {
            const query = "SELECT nome, nascimento, telefone FROM instrutores WHERE id = ?"

            const result = await database.getFirstAsync<alunoPerfil>(query,`${instrutor_id}`)

            return(result)
        } catch (error) {
            throw error
        }
    }

    async function eAdmin(instrutor_id:string){
        try {
            const query = "SELECT eAdmin FROM usuarios WHERE instrutor_id = ?"

            const result = await database.getFirstAsync<{eAdmin: string}>(query,instrutor_id)

            return(result)
        } catch (error) {
            throw error
        }
    }


    return { temEmail, 
        registrar, 
        fazerLogin, 
        pegarInfosUser,
        pegarIdAluno,
        pegarNomeAluno,
        criarAula, 
        listarAulas, 
        procurarAlunos, 
        removerAula, 
        aulaInfo, 
        cadastrarAluno,
        linkarAlunoAUsuario,
        temRegistroInstrutor,
        limparRegistroInstrutor,
        removerAluno, 
        alunoInfo, 
        alunosInscritos,
        registrarAlunoAula,
        registrarPagamento,
        listarAnos,
        listarAlunosEmAula,
        removerAlunoDaAula,
        listarPagamentos,
        pagar,
        listarUsuarios,
        setarAluno,
        procurarInstrutores,
        cadastrarInstrutor,
        linkarInstrutorAUsuario,
        temRegistroAluno,
        limparRegistroAluno,
        instrutorInfo,
        registrarInstrutorAula,
        listarInstrutorEmAula,
        removerInstrutorDaAula,
        setarInstrutor,
        removerInstrutores,
        selecionarAlunoPagamento,
        procurarAdmin,
        cadastrarAdmin,
        removerAdmin, 
        adminInfo,
        listarAnosDoAluno,
        listarPagamentosAluno,
        pegarInfosPerfilAluno,
        pegarNomeInstrutor,
        pegarIdInstrutor,
        eAdmin,
        pegarInfosPerfilInstrutor
    }
}