import { View, Text, Pressable, PressableProps, TouchableOpacity, Switch, SwitchProps} from 'react-native'

import { MaterialIcons } from '@expo/vector-icons'
import AntDesign from '@expo/vector-icons/AntDesign';

type atribuidorID = {
    atribuidorID: Function
}

type Props = PressableProps & {
    data:{
        id: number
        nome: string
        nascimento: string
        telefone: string
        usuario_id: string
    }
    onOpen: () => void
    onSelect: () => void
}

export function AlunosPagamentos({data, onOpen, onSelect, ...rest}: Props){
    
    return(
        <Pressable style={{flexDirection:'row',backgroundColor:'#CECECE', padding:8, marginVertical:5, marginHorizontal:25,borderRadius:10}} {...rest}>
            <TouchableOpacity onPress={onSelect}>
                <MaterialIcons name='add' size={24} color='grey'/>
            </TouchableOpacity>
            <Text style={{flex:1}}>
                Nome: {data.nome}, telefone: {data.telefone}
            </Text> 

            <TouchableOpacity onPress={onOpen}>
                <MaterialIcons name='visibility' size={24} color='grey'/>
            </TouchableOpacity>
        </Pressable>
    )
}