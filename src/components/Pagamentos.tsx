import { View, Text, Pressable, PressableProps, TouchableOpacity} from 'react-native'

import { MaterialIcons } from '@expo/vector-icons'


type Props = PressableProps & {
    data:{
        nome: string
        ano: string,
        mes: string
        dia: string
        valor: string
        estaPago: string
        aluno_id: string
        pagamento_id: string
    }
    onOpen: () => void
    onPagar: () => void
}

export function Pagamentos({data, onOpen, onPagar, ...rest}: Props){
    
    return(
        <Pressable style={{flexDirection:'row',backgroundColor:data.estaPago?'#89fc72':'#fc7272', padding:8, marginVertical:5, marginHorizontal:25,borderRadius:10}} {...rest}>
            <Text style={{flex:1}}>
                {data.nome}: {data.ano}/{data.mes}/{data.dia} R$ {Number(data.valor)/100}
            </Text> 

            <TouchableOpacity onPress={onPagar} style={{marginHorizontal:15}}>
                <MaterialIcons name='payments' size={24} color='#015413'/>
            </TouchableOpacity>
            <TouchableOpacity onPress={onOpen}>
                <MaterialIcons name='visibility' size={24} color='grey'/>
            </TouchableOpacity>
        </Pressable>
    )
}