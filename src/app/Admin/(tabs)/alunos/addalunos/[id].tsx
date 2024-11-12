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

    async function AdicionarAlunos(){
        if(nome && nascimento && telefone){
            try {
                const response = await CTDatabase.cadastrarAluno({nome, nascimento, telefone, usuario_id})
                Alert.alert("Aluno cadastrado com o ID: " + response.insertedRowId)
    
                setNome('')
                setNascimento('')
                setTelefone('')
                setUsuario_id('')

                await definirAluno()
                
                linkAluno(response.insertedRowId)
                
                try {
                    const result = await CTDatabase.temRegistroInstrutor(params.id)
                    if (result){
                        await CTDatabase.limparRegistroInstrutor(result.instrutor_id)
                        console.log("Registro de instrutor limpo com sucesso!")
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

    async function definirAluno(){
        try {
            await CTDatabase.setarAluno(usuario_id)

            console.log("Aluno setado com sucesso!")
        } catch (error) {
            console.log(error)
        }
    }

    async function linkAluno(insertedRowId:string){
        try {
            await CTDatabase.linkarAlunoAUsuario(params.id,insertedRowId)
        } catch (error) {
            console.log(error)
        }
    }

    return(
        <View style={styles.container}>
            <Text>ID do usuário: {params.id}</Text>

            <Text style={{alignSelf:'center'}} >Adicionar aluno</Text>
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
                onPress={AdicionarAlunos}
            >
            <Text style={{alignSelf:'center', marginVertical:15, backgroundColor:'#cecece', borderRadius:5}}>Adicionar</Text>
            </Pressable>
        </View>
    )
}