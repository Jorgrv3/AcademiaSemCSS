import { Stack } from "expo-router";
import styles from "@/styles";

export default function Layout(){
    return(
        <Stack
            initialRouteName="index"
        >
            <Stack.Screen name='index' options={{title:'Aulas'}}/>
            <Stack.Screen name='addaulas' options={{title:'Adicionar aula'}}/>
            <Stack.Screen name='[id]' options={{title: 'Aula'}}/>
            <Stack.Screen name='addaluno/[id]' options={{title:'Adicionar aluno na aula'}}/>
            <Stack.Screen name='aluno/[id]' options={{title:'Perfil do aluno'}} />
        </Stack>
    )
}