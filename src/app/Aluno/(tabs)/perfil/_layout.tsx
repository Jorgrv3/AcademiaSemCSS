import { Stack } from "expo-router";

export default function Layout(){
    return(
        <Stack
            initialRouteName="index"    
        >
            <Stack.Screen name='index' options={{title:'Perfil'}}/>
        </Stack>
    )
}