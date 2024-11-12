import { View, Text} from 'react-native'
import { useLocalSearchParams } from 'expo-router'
import { useEffect, useState } from 'react';

import { useCTDatabase, aulas } from '@/database/useCTDatabase';

export default function Alunox(){
    const params = useLocalSearchParams<{id: string}>();
    const [data, setData] = useState({
        nome: '',
        nascimento: '',
        telefone: '',
        usuario_id: '',
        aula_id: ''
    })

    const CTDatabase = useCTDatabase()

    async function getInfo(){
        if(params.id){
            const response = await CTDatabase.alunoInfo(Number(params.id))
            if(response){
                setData({
                    nome: response.nome,
                    nascimento: response.nascimento,
                    telefone : response.telefone,
                    usuario_id: response.usuario_id,
                    aula_id: response.aula_id
                })
            }else{
                console.log('Nenhuma informação passada pelo ID.')
            }
        }
    }

    useEffect(()=> {
        getInfo()
    },[])

    return(
        <View style={{flex:1, justifyContent:'center', alignItems:'center'}}>
            <Text>ID: {params.id}</Text>
            <Text>Nome: {data.nome}</Text>
            <Text>Nascimento: {data.nascimento}</Text>
            <Text>ID do usuário: {data.usuario_id}</Text>
            <Text>Aula ID: {data.aula_id}</Text>
        </View>
    )
}