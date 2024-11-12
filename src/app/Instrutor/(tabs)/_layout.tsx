import { Drawer } from 'expo-router/drawer'
import { GestureHandlerRootView } from "react-native-gesture-handler";

export default function Layout() {
    return(
        <GestureHandlerRootView>
            <Drawer>
                <Drawer.Screen name= "index" options={{title:'Home'}} />
                <Drawer.Screen name= "perfil" options={{title:'Perfil'}}/>
                <Drawer.Screen name= "alunos" options={{title:'Alunos'}}/>
                <Drawer.Screen name= "instrutores" options={{title:'Instrutores'}}/>
                <Drawer.Screen name= "aulas" options={{title:'Aulas'}} />
                <Drawer.Screen name= "pagamentos" options={{title:'Pagamentos'}}/>
                <Drawer.Screen name= "administradores" options={{title:'Administradores'}}/>
                <Drawer.Screen name= "[id]" options={{title:'', unmountOnBlur:true, lazy:false}}/>
            </Drawer>
        </GestureHandlerRootView>
    )
}
