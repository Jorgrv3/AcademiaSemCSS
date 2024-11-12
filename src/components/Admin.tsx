import { View, Text, Pressable, PressableProps, TouchableOpacity} from 'react-native'

import { MaterialIcons } from '@expo/vector-icons'

type Props = PressableProps & {
    data:{
        id: number
        email: string
        senha: string
        eAluno: string
        eInstrutor: string
        eAdmin: string
    }
    onDelete: () => void
    onOpen: () => void
}

export function Admin({data, onDelete, onOpen,  ...rest}: Props){
    
    return(
        <Pressable style={{flexDirection:'row',backgroundColor:'#CECECE', padding:8, marginVertical:5, marginHorizontal:25,borderRadius:10}} {...rest}>
            <Text style={{flex:1}}>
                ID: {data.id} E-mail: {data.email}
            </Text> 

            <TouchableOpacity onPress={onDelete}>
                <MaterialIcons name='delete' size={24} color='red'/>
            </TouchableOpacity>
            <TouchableOpacity onPress={onOpen}>
                <MaterialIcons name='visibility' size={24} color='grey'/>
            </TouchableOpacity>
        </Pressable>
    )
}