import { View, Text, TextInput, Pressable, Alert} from "react-native";
import { useState } from "react";
import { Link } from "expo-router";

import { useCTDatabase, alunos, usuarios } from "@/database/useCTDatabase";

import styles from "@/styles";

export default function Login(){

    const CTDatabase = useCTDatabase();

    const [email, setEmail] = useState("")
    const [senha, setSenha] = useState("")
    const [error, setError] = useState(false)

    async function registrar(){
        if(email != '' && senha != ''){
                setError(false)
            try {
                const response = await CTDatabase.temEmail({email})

                if(response){
                    setError(true)
                    return(console.log('Email já cadastrado!'))
                }
            } catch (error) {
                console.log(error)
            }
            try {
                const response = await CTDatabase.registrar({email, senha})

                Alert.alert("Usuário cadastrado com o ID: " + response.insertedRowId)
                setEmail('')
                setSenha('')
            } catch (error) {
                console.log("Erro no cadastro: ",error)
            }
        }
    }


    return(
        <View style={[styles.container, {flex:1}]}>
            <Text style={{alignSelf:'center'}} >Registro</Text>
            <Text style={{marginHorizontal:15}}>E-mail:</Text>
            <TextInput 
                style={styles.input}
                onChangeText={setEmail}
                value={email}
            />
            <Text style={{marginHorizontal:15}}>Senha:</Text>
            <TextInput 
                style={styles.input} 
                onChangeText={setSenha}
                value={senha}
            />
            {error?<Text style={{marginHorizontal:15, color:'red'}}>E-mail já cadastrado!</Text>:null}
            <Text style={{marginHorizontal:15}}>Já possui conta? <Link href={'/'}>Login</Link></Text>
            <Pressable
                onPress={registrar}
            >
            <Text style={{alignSelf:'center', marginVertical:15, backgroundColor:'#cecece', borderRadius:5}}>Registrar-se</Text>
            </Pressable>
        </View>
    )
}