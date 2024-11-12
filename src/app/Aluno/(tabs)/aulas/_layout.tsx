import { Stack } from "expo-router";
import styles from "@/styles";

export default function Layout(){
    return(
        <Stack
            initialRouteName="index"
        >
            <Stack.Screen name='index' options={{title:'Aulas'}}/>
            <Stack.Screen name='[id]' options={{title:'Aula'}}/>
            <Stack.Screen name="seinscrever/[id]" options={{title:'Se inscrever na aula'}}/>
        </Stack>
    )
}