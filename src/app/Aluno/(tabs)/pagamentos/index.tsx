import { View, Text, FlatList, TouchableOpacity } from "react-native";
import { Link, router } from "expo-router";
import { ano, pagamentos, useCTDatabase } from "@/database/useCTDatabase";
import { useEffect, useState } from "react";

import { idAluno } from "..";

import { Anos } from "@/components/Anos";

export default function Index(){
    const [anos, setAnos] = useState<pagamentos[]>([])
    const CTDatabase = useCTDatabase()

    function atualizar(){
        listarAnos()
    }

    async function listarAnos(){
        try {
            const response = await CTDatabase.listarAnosDoAluno(idAluno)
            setAnos(response)
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(()=> {
        listarAnos()
    },[])

    return(
        <View style={{alignItems:'center', justifyContent:'center'}}>
            <View style={{flexDirection:'row'}}>
                <TouchableOpacity style={{marginTop:5, marginHorizontal:10}}
                        onPress={atualizar}
                    >
                        <Text>Atualizar</Text>
                    </TouchableOpacity>
            </View>
            <FlatList 
                    data={anos}
                    keyExtractor={(item, index)=> String(index)}
                    renderItem={({ item }) => 
                    <Anos
                        data={(item)}
                        onPress={() => router.navigate('/Aluno/(tabs)/pagamentos/'+ item.ano)}
                    />}
                />
        </View>
    )
}