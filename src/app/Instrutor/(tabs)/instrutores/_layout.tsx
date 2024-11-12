import { Stack } from "expo-router";
import styles from "@/styles";

export default function Layout(){
    return(
        <Stack
            initialRouteName="index"
        >
            <Stack.Screen name='index' options={{title:'Instrutores'}}/>
            <Stack.Screen name='addinstrutores/[id]' options={{title:'Adicionar instrutor'}}/>
            <Stack.Screen name='addinstrutores' options={{title:'Selecione o instrutor'}}/>
            <Stack.Screen name='[id]' options={{title: 'Perfil do instrutor'}}/>
        </Stack>
    )
}