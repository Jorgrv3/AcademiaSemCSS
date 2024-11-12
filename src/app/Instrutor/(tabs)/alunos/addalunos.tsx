import { router } from "expo-router";
import { useEffect, useState } from "react";
import { View, Text, StyleSheet, TextInput, FlatList } from "react-native";
import styles from "@/styles";

import { useCTDatabase, usuarios } from "@/database/useCTDatabase";
import { Usuarios } from "@/components/Usuarios";

export default function AddAluno(){
    const CTDatabase = useCTDatabase()
    const [search, setSearch] = useState('')
    const [usuarios, setUsuarios] = useState<usuarios[]>([])

    async function listarUsuarios(){
        try {
            const response = await CTDatabase.listarUsuarios(search)

            setUsuarios(response)
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(()=> {
        listarUsuarios()
    },[search])

    useEffect(()=>{
        listarUsuarios()
    },[])

    return(
            <View style={aulasStyle.bigView}>
                <Text style={aulasStyle.bigText}>Usuários:</Text>
                <Text style={{alignSelf:'center'}}>Selecione um usuário: </Text>
                <View style={{justifyContent:'center',flexDirection:'row'}}>
                    <TextInput 
                    style={styles.input} 
                    onChangeText={setSearch}
                    value={search}
                    placeholder='Pesquisar'
                    />      
                </View>
                <View style={{}}>
                    <FlatList 
                        data={usuarios}
                        keyExtractor={(item)=> String(item.id)}
                        renderItem={({ item }) => 
                        <Usuarios 
                            data={item} 
                            onSelect={()=> router.navigate('/Instrutor/(tabs)/alunos/addalunos/'+ item.id)}
                        />}
                    />
                </View>
            </View>
    )
}

const aulasStyle = StyleSheet.create({
    bigView:{
        flex:1
    },
    bigText:{
        alignSelf:'center',
        fontSize:24
    }
})