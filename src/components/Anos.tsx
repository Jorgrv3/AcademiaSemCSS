import { View, Text, Pressable, PressableProps, TouchableOpacity} from 'react-native'

import { MaterialIcons } from '@expo/vector-icons'

type Props = PressableProps & {
    data:{
        id: number,
        ano: string,
        mes: string,
        dia: string,
        valor: string,
        estaPago: boolean,
        aluno_id: string
    }
}

export function Anos({data, ...rest}: Props){
    
    return(
        <Pressable style={{backgroundColor:'#CECECE', padding:8, marginVertical:5, marginHorizontal:25,borderRadius:10}} {...rest}>
            <Text style={{flex:1}}>
                Ano: {(data.ano)}
            </Text> 
        </Pressable>
    )
}