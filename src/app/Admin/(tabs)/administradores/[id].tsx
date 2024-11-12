import { View, Text} from 'react-native'
import { useLocalSearchParams } from 'expo-router'
import { useEffect, useState } from 'react';

import { useCTDatabase } from '@/database/useCTDatabase';

export default function Alunox(){
    const params = useLocalSearchParams<{id: string}>();
    const [data, setData] = useState({
        email: ''
    })

    const CTDatabase = useCTDatabase()

    async function getInfo(){
        if(params.id){
            const response = await CTDatabase.adminInfo(params.id)
            if(response){
                setData({
                    email: response.email
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
            <Text>E-mail: {data.email}</Text>
        </View>
    )
}