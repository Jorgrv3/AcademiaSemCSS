import { Stack } from "expo-router";
import styles from "@/styles";

export default function Layout(){
    return(
        <Stack
            initialRouteName="index"
        >
            <Stack.Screen name='index' options={{title:'Alunos'}}/>
            <Stack.Screen name='addalunos/[id]' options={{title:'Adicionar aluno'}}/>
            <Stack.Screen name='addalunos' options={{title:'Selecione o usuário'}}/>
            <Stack.Screen name='[id]' options={{title: 'Aluno'}}/>
        </Stack>
    )
}