import { useCTDatabase } from "@/database/useCTDatabase";
import { idAluno } from "..";
import { View, Text } from "react-native";
import { useEffect, useState } from "react";

export default function Perfil(){
    const CTDatabase = useCTDatabase()

    const [infos, setInfos] = useState({
        nome: '',
        nascimento: '',
        telefone: ''
    })

    async function PegarInfos(){
        const result = await CTDatabase.pegarInfosPerfilAluno(idAluno)
        if(result){
            setInfos({
                nome: result.nome,
                nascimento: result.nascimento,
                telefone: result.telefone
            })
        }
    }

    useEffect(()=> {
        PegarInfos()
    },[])

    return(
        <View style={{flex:1, justifyContent:'center', alignItems:'center'}}>
            <Text>Nome: {infos.nome}</Text>
            <Text>Nascimento: {infos.nascimento}</Text>
            <Text>Telefone: {infos.telefone}</Text>
        </View>
    )
}