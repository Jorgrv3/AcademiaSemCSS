import { Stack } from "expo-router";
import styles from "@/styles";

export default function Layout(){
    return(
        <Stack
            initialRouteName="index"
        >
            <Stack.Screen name='index' options={{title:'Admins'}}/>
            <Stack.Screen name='addadministradores' options={{title:'Selecione o admin'}}/>
            <Stack.Screen name='[id]' options={{title: 'Perfil do admin'}}/>
        </Stack>
    )
}