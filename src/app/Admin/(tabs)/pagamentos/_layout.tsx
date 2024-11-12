import { Stack } from "expo-router";
import styles from "@/styles";

export default function Layout(){
    return(
        <Stack
            initialRouteName="index"    
        >
            <Stack.Screen name='index' options={{title:'Pagamentos'}}/>
            <Stack.Screen name='addpagamentos' options={{title:'Adicionar pagamento'}}/>
            <Stack.Screen name='[ano]' options={{title:''}}/>
            <Stack.Screen name='mes/[mes]' options={{title:''}}/>
            <Stack.Screen name="aluno/[id]" options={{title:'Perfil do aluno'}}/>
        </Stack>
    )
}