import { View, Text, TextInput, Pressable, Alert } from "react-native";
import { useState } from "react";

import { useCTDatabase} from "@/database/useCTDatabase";

import styles from "@/styles";

export default function AddAulas(){
    const [inicio, setInicio] = useState("")
    const [termino, setTermino] = useState("")
    const [error, setError] = useState(false)

    const CTDatabase = useCTDatabase()

    async function AdicionarAulas(){
        if(inicio != "" && termino != ""){
            try {
                const response = await CTDatabase.criarAula({inicio, termino})
    
                Alert.alert("Aula cadastrada com o ID: " + response.insertedRowId)
            } catch (error) {
                console.log(error)
            }
        }
    }

    return(
        <View style={styles.container}>
            <Text style={{alignSelf:'center'}} >Adicionar aula</Text>
            <Text style={{marginHorizontal:15}}>Início:</Text>
            <TextInput 
                style={styles.input}
                onChangeText={setInicio}
                value={inicio}
                placeholder="ex: 19h00"
            />
            <Text style={{marginHorizontal:15}}>Término:</Text>
            <TextInput 
                style={styles.input} 
                onChangeText={setTermino}
                value={termino}
                placeholder="ex: 20h00"
            />
            <Pressable
                onPress={AdicionarAulas}
            >
            <Text style={{alignSelf:'center', marginVertical:15, backgroundColor:'#cecece', borderRadius:5}}>Adicionar</Text>
            </Pressable>
        </View>
    )
}