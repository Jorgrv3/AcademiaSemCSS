import { View, Text, FlatList, TouchableOpacity, Alert } from "react-native";
import { Link, router, Redirect } from "expo-router";
import { ano, pagamentos, useCTDatabase } from "@/database/useCTDatabase";
import { useEffect, useState } from "react";

import { idInstrutor } from "..";
import { eAdmin } from "..";

import { Anos } from "@/components/Anos";

export default function Index(){
    const CTDatabase = useCTDatabase()

    const [eAdmin2, setEAdmin2] = useState(eAdmin)

    //const [eAdmin, setEAdmin] = useState<{eAdmin: string}>()
    
    /* async function verificarAdmin(){
        try {
            const result = await CTDatabase.eAdmin(idInstrutor)

            if(result){
                setEAdmin(result)
            }
        } catch (error) {
            console.log(error)
        }
    }  */


    if(eAdmin2 == undefined){
        Alert.alert("Precisa ser Administrador!")
        return <Redirect href={'/Instrutor'}/>
    }

    const [anos, setAnos] = useState<pagamentos[]>([])

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
                <Link style={{marginTop:5}} href={'/Instrutor/(tabs)/pagamentos/addpagamentos'}>Adicionar pagamento</Link>
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
                        onPress={() => router.navigate('/Instrutor/(tabs)/pagamentos/'+ item.ano)}
                    />}
                />
        </View>
    )
}