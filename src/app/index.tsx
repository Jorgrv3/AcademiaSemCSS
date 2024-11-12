import { View, Text, TextInput, Pressable, StyleSheet, Alert } from "react-native";
import { useState } from "react";
import { Link, router } from "expo-router";

import { useCTDatabase } from "@/database/useCTDatabase";

import styles from "@/styles";



export default function Login(){
    const [email, setEmail] = useState("")
    const [senha, setSenha] = useState("")
    const [errorEmail, setErrorEmail] = useState(false)
    const [errorSenha, setErrorSenha] = useState(false)


    const CTDatabase = useCTDatabase()

    async function fazerLogin(){
        setErrorEmail(false)
        setErrorSenha(false)
        try {
            const response = await CTDatabase.temEmail({email})

            if(response){
                const response = await CTDatabase.fazerLogin({email, senha})
                if (response){
                    const result = await CTDatabase.pegarInfosUser(email)
                    if(result?.eInstrutor == '1'){
                        router.replace('/Instrutor/(tabs)/' + String(result.id))
                        console.log("Instrutor redirecionado")
                    }else if(result?.eAluno == '1'){
                        router.replace('/Aluno/(tabs)/' + String(result?.id))
                        console.log("Aluno redirecionado!")
                    }else if(result?.eAdmin == '1'){
                        router.replace('Admin/(tabs)/' + String(result?.id))
                        console.log("Admin redirecionado!")
                    }else{
                        Alert.alert("Você não está cadastrado como instrutor, nem aluno, nem admin")
                    }
                }else{
                    setErrorSenha(true)
                    console.log('Senha incorreta!')
                }
            }else{
                setErrorEmail(true)
                return(console.log('Email não cadastrado!'))
            }
        } catch (error) {
            console.log(error)
        }
    }

    

    return(
            <View style={[styles.container,{flex:1}]}>
                <View style={styles.smallView}>
                    <Text style={styles.loginLogin}>Login</Text>
                    <Text style={[styles.camposInput,{marginHorizontal:15}]}>E-mail:</Text>
                    <TextInput 
                        style={styles.input}
                        onChangeText={setEmail}
                        value={email}
                    />
                    <Text style={[styles.camposInput,{marginHorizontal:15}]}>Senha:</Text>
                    <TextInput 
                        style={styles.input} 
                        onChangeText={setSenha}
                        value={senha}
                    />
                    {errorSenha?<Text style={{marginHorizontal:15, color:'red'}}>Senha incorreta!</Text>:null}
                    {errorEmail?<Text style={{marginHorizontal:15, color:'red'}}>E-mail não cadastrado!</Text>:null}
                    <Text style={{marginHorizontal:15}}>Não possui conta? <Link href={'/registrar'}>Registrar-se</Link></Text>
                    <Link style={{marginLeft:15, marginTop:20}} href={'/Admin/(tabs)/alunos'}>Instrutores</Link>
                    <Link style={{marginLeft:15, marginTop:20}} href={'/Aluno/(tabs)/alunos'}>Alunos</Link>
                    <Pressable
                        onPress={fazerLogin}
                    >
                    <Text style={{alignSelf:'center', marginVertical:15, backgroundColor:'#cecece', borderRadius:5}}>Fazer login</Text>
                    </Pressable>
                </View>
            </View>
    )
}