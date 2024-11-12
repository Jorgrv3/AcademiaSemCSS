import { View, Text, StyleSheet} from 'react-native';
import { id } from './[id]';
import { useEffect, useState } from 'react';

import { nome, useCTDatabase } from '@/database/useCTDatabase';

export let idInstrutor: string
export let eAdmin: string

export default function Home() {
    
    const [eAdmin2, setEAdmin2] = useState<string>()

    const CTDatabase = useCTDatabase()
    
    async function pegarId(){
        try {
            const response = await CTDatabase.pegarIdInstrutor(id.id)
            if(response)
            {
                await pegarNome(response.instrutor_id)
                idInstrutor = response.instrutor_id
                eAdmin = response.eAdmin
                setEAdmin2(eAdmin)
                console.log(eAdmin)
            }
        } catch (error) {
            console.log(error)
        }
    }
    
    async function pegarNome(instrutor_id:string){
        const result = await CTDatabase.pegarNomeInstrutor(instrutor_id)

        setNome(result)
    }
    const [nome, setNome] = useState<nome>()


    useEffect(()=> {
        pegarId()
    },[])

    return(
        <View style={styles.container}>
            <View style={styles.smallView}>
                <Text>Bem vindo {nome?.nome}</Text>
                <Text>Email: {id.id}</Text>
                <Text>{eAdmin2}</Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container:{
        flex: 1,
        backgroundColor: '#6e7d96',
        alignItems:'center',
        justifyContent:'center'
    },
    smallView:{
        borderColor:'red',
        backgroundColor:'white',
        borderWidth:1,
        padding:50,
        borderRadius:5
    }
})