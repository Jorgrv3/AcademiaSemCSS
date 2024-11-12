import { View, TouchableOpacity, StyleSheet, Alert, Text} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons'
import { useLocalSearchParams } from 'expo-router';

import { idAluno } from '../..';

import { useCTDatabase} from '@/database/useCTDatabase';


export default function Index() {
    const params = useLocalSearchParams<{ id : string}>()
    const CTDatabase = useCTDatabase()
    async function registarAlunoNaAula(id:string, aluno_id:string){
        try {
            await CTDatabase.registrarAlunoAula(Number(id), Number(aluno_id))
        } catch (error) {
            console.log(error)
        }
        Alert.alert("Aluno adicionado com sucesso!", "")
    }

    return(
        <View style={aulasStyle.bigView}>
            <View style={{justifyContent:'center',flexDirection:'row'}}>
                <Text>Inscrever-se na aula!</Text>
                <TouchableOpacity
                    onPress={() => registarAlunoNaAula(params.id, idAluno)}
                >
                    <MaterialIcons name='add' size={24} color={'black'} />
                </TouchableOpacity>
            </View>
        </View>
    )
}

const aulasStyle = StyleSheet.create({
    bigView:{
        flex:1
    },
    bigText:{
        alignSelf:'center',
        fontSize:24
    }
})