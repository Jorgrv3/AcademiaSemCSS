import { View, Text } from "react-native";
import { useLocalSearchParams } from "expo-router";
import MesesInstrutores from "@/components/MesesInstrutores";

export let anoAtual:string;

export default function AnoX(){
    const params = useLocalSearchParams<{ano: string}>()

    anoAtual = params.ano

    return(
        <View style={{justifyContent:'center', alignItems:'center'}}>
            <Text>Ano: {params.ano}</Text>
            <Text>Escolha o mês</Text>
            <MesesInstrutores ano={params.ano}/>
        </View>
    )
}