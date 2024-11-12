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
    onSelect: () => void
}

export function Usuarios({data, onSelect, ...rest}: Props){
    
    return(
        <Pressable style={{flexDirection:'row',backgroundColor:'#CECECE', padding:8, marginVertical:5, marginHorizontal:25,borderRadius:10}} {...rest}>
            <Text style={{flex:1}}>
                ID: {data.id} E-mail: {data.email}/{data.eAluno?'Aluno':null}{data.eInstrutor?'Instrutor/':null}{data.eAdmin?'Admin':null}
                
            </Text> 

            <TouchableOpacity onPress={onSelect}>
                <MaterialIcons name='add' size={24} color='grey'/>
            </TouchableOpacity>
        </Pressable>
    )
}