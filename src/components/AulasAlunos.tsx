import { View, Text, Pressable, PressableProps, TouchableOpacity} from 'react-native'

import { MaterialIcons } from '@expo/vector-icons'

type Props = PressableProps & {
    data:{
        id: number
        inicio: string
        termino: string
    }
    onOpen: () => void
}

export function AulasAlunos({data, onOpen, ...rest}: Props){
    
    return(
        <Pressable style={{flexDirection:'row', backgroundColor:'#CECECE', padding:8, marginVertical:5, marginHorizontal:25,borderRadius:10}} {...rest}>
            <Text style={{flex:1}}>
                ID: {data.id}, Início: {data.inicio}, Término: {data.termino}
            </Text> 
            <TouchableOpacity onPress={onOpen}>
                <MaterialIcons name='visibility' size={24} color='grey'/>
            </TouchableOpacity>
        </Pressable>
    )
}