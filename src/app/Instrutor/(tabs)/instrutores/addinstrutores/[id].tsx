import { View, Text, TextInput, Pressable, Alert, StyleSheet } from "react-native";
import { useState } from "react";
import { useLocalSearchParams, router } from "expo-router";

import { useCTDatabase } from "@/database/useCTDatabase";

import styles from "@/styles";

export default function AddAulas(){
    const params = useLocalSearchParams<{id : string}>()

    const [nome, setNome] = useState("")
    const [nascimento, setNascimento] = useState("")
    const [telefone, setTelefone] = useState('')
    const [usuario_id, setUsuario_id] = useState(params.id)
    const [error, setError] = useState(false)

    const CTDatabase = useCTDatabase()

    async function AdicionarInstrutores(){
        if(nome && nascimento && telefone){
            try {
                const response = await CTDatabase.cadastrarInstrutor({nome, nascimento, telefone, usuario_id})
                Alert.alert("Instrutor cadastrado com o ID: " + response.insertedRowId)
    
                setNome('')
                setNascimento('')
                setTelefone('')
                setUsuario_id('')
                
                await definirInstrutor()

                linkInstrutor(response.insertedRowId)

                try {
                    const result = await CTDatabase.temRegistroAluno(params.id)
                    if(result){
                        await CTDatabase.limparRegistroAluno(result.aluno_id)
                        console.log("Registro de aluno limpo com sucesso!")
                    }
                } catch (error) {
                    console.log(error)
                }
                
                router.back()
            } catch (error) {
                console.log(error)
            }
        }else{
            Alert.alert("Preencha todos os campos!")
        }
    }

    async function definirInstrutor(){
        try {
            await CTDatabase.setarInstrutor(usuario_id)

            console.log("Instrutor setado com sucesso!")
        } catch (error) {
            console.log(error)
        }
    }

    async function linkInstrutor(lastInsertedRowId: string){
        try {
            await CTDatabase.linkarInstrutorAUsuario(params.id, lastInsertedRowId)
        } catch (error) {
            console.log(error)
        }
    }

    return(
        <View style={styles.container}>
            <Text>ID do usuário: {params.id}</Text>

            <Text style={{alignSelf:'center'}} >Adicionar instrutor</Text>
            <Text style={{marginHorizontal:15}}>Nome:</Text>
            <TextInput 
                style={styles.input}
                onChangeText={setNome}
                value={nome}
                placeholder=""
            />
            <Text style={{marginHorizontal:15}}>Nascimento:</Text>
            <TextInput 
                style={styles.input} 
                onChangeText={setNascimento}
                value={nascimento}
                placeholder="ex: 2005/09/05"
            />
            <Text style={{marginHorizontal:15}}>Telefone:</Text>
            <TextInput 
                style={styles.input} 
                onChangeText={setTelefone}
                value={telefone}
                placeholder=""
            />
            <Pressable
                onPress={AdicionarInstrutores}
            >
            <Text style={{alignSelf:'center', marginVertical:15, backgroundColor:'#cecece', borderRadius:5}}>Adicionar</Text>
            </Pressable>
        </View>
    )
}