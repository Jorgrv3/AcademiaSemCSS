import { View, Text, TouchableOpacity} from 'react-native'
import { useLocalSearchParams } from 'expo-router'
import { useEffect, useState } from 'react';
import { MaterialIcons } from '@expo/vector-icons'
import { router } from 'expo-router';

import { useCTDatabase} from '@/database/useCTDatabase';

export default function AulaX(){
    const params = useLocalSearchParams<{id: string}>()
    const [inscritos, setInscritos] = useState('')

    function atualizar(){
        getInscritos()
    }

    const [data, setData] = useState({
        inicio: '0',
        termino: '0',
    })

    const CTDatabase = useCTDatabase()

    async function getInfo(){
        if(params.id){
            const response = await CTDatabase.aulaInfo(Number(params.id))
            if(response){
                setData({
                    inicio: response.inicio,
                    termino: response.termino,
                })
            }else{
                console.log('Nenhuma informação passada pelo ID.')
            }
        }
    }


    async function getInscritos(){
        try {
            const result = await CTDatabase.alunosInscritos(Number(params.id))
            setInscritos(String(result?.count))
        } catch (error) {
            console.log(error)
        }

    }

    useEffect(() => {
            getInfo()
            getInscritos()
    },[])

    return(
        <View style={{flex:1, justifyContent:'center', alignItems:'center'}}>
            <View style={{flexDirection:'row', alignItems:'center'}}>
                <TouchableOpacity
                    hitSlop={15}
                    onPress={() => router.navigate('/Aluno/(tabs)/aulas/seinscrever/' + Number(params.id))}
                >
                    <MaterialIcons name='add' size={20} color={'black'} />
                </TouchableOpacity>
                <TouchableOpacity style={{marginLeft:5}}
                    onPress={atualizar}
                >
                    <Text>Atualizar</Text>
                </TouchableOpacity>
            </View>

            <Text>ID: {params.id}</Text>
            <Text>Início: {data.inicio}</Text>
            <Text>Termino: {data.termino}</Text>
            <Text>Inscritos: {inscritos}</Text>
        </View>
    )
}