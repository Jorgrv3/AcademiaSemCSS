import { View, Text, StyleSheet} from 'react-native';
import { id } from './[id]';
import { useEffect, useState } from 'react';

import { nome, useCTDatabase } from '@/database/useCTDatabase';


export default function Home() {
    
    const CTDatabase = useCTDatabase()
    
    async function pegarId(){
        try {
            const response = await CTDatabase.pegarIdAluno(id.id)
            if(response)
            {
                await pegarNome(response.aluno_id)
            }
        } catch (error) {
            console.log(error)
        }
    }
    
    async function pegarNome(aluno_id:string){
        const result = await CTDatabase.pegarNomeAluno(aluno_id)

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