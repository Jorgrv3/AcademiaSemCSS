import { Stack } from "expo-router";
import styles from "@/styles";

export default function Layout(){
    return(
        <Stack
            initialRouteName="index"    
        >
            <Stack.Screen name='index' options={{title:'Pagamentos'}}/>
            <Stack.Screen name='[ano]' options={{title:''}}/>
            <Stack.Screen name='mes/[mes]' options={{title:''}}/>
        </Stack>
    )
}