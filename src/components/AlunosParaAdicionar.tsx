import { View, Text, Pressable, PressableProps, TouchableOpacity} from 'react-native'

import { MaterialIcons } from '@expo/vector-icons'
import AntDesign from '@expo/vector-icons/AntDesign';

type Props = PressableProps & {
    data:{
        id: number
        nome: string
        nascimento: string
        telefone: string
        usuario_id: string
    }
    onOpen: () => void
    onAdd: () => void
}

export function AlunosParaAdicionar({data, onOpen, onAdd, ...rest}: Props){
    
    return(
        <Pressable style={{flexDirection:'row',backgroundColor:'#CECECE', padding:8, marginVertical:5, marginHorizontal:25,borderRadius:10}} {...rest}>
            <Text style={{flex:1}}>
                Nome: {data.nome}, telefone: {data.telefone}
            </Text> 

            <TouchableOpacity onPress={onOpen}>
                <MaterialIcons name='visibility' size={24} color='grey'/>
            </TouchableOpacity>
            <TouchableOpacity onPress={onAdd}>
                <AntDesign name = 'adduser' size={24} color='grey'/>
            </TouchableOpacity>
        </Pressable>
    )
}