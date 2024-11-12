import { View, Text, FlatList, TouchableOpacity } from "react-native";
import { Link, router } from "expo-router";
import { ano, pagamentos, useCTDatabase } from "@/database/useCTDatabase";
import { useEffect, useState } from "react";


import { Anos } from "@/components/Anos";

export default function Index(){
    const [anos, setAnos] = useState<pagamentos[]>([])
    const CTDatabase = useCTDatabase()

    function atualizar(){
        listarAnos()
    }

    async function listarAnos(){
        const response = await CTDatabase.listarAnos()
        setAnos(response)
    }

    useEffect(()=> {
        listarAnos()
    },[])

    return(
        <View style={{alignItems:'center', justifyContent:'center'}}>
            <View style={{flexDirection:'row'}}>
                <Link style={{marginTop:5}} href={'/Admin/(tabs)/pagamentos/addpagamentos'}>Adicionar pagamento</Link>
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
                        onPress={() => router.navigate('/Admin/(tabs)/pagamentos/'+ item.ano)}
                    />}
                />
        </View>
    )
}