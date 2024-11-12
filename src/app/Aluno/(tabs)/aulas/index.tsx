import { View, Text, FlatList, TextInput, TouchableOpacity, StyleSheet} from 'react-native';
import { useEffect, useState } from 'react';
import { MaterialIcons } from '@expo/vector-icons'
import { router } from 'expo-router';

import { useCTDatabase, aulas } from '@/database/useCTDatabase';
import { AulasAlunos } from '@/components/AulasAlunos';


export default function Index() {
    const [search, setSearch] = useState('')
    const [aulas, setAulas] = useState<aulas[]>([])

    function atualizar(){
        ListarAulas()
    }

    const CTDatabase = useCTDatabase()

    async function ListarAulas(){
        const response = await CTDatabase.listarAulas()
        setAulas(response)
    }


   useEffect(() => {
    ListarAulas()
   },[])

    return(
        <View style={aulasStyle.bigView}>
            <Text style={aulasStyle.bigText}>Aulas:</Text>
            <View style={{justifyContent:'center',flexDirection:'row'}}>
                <TouchableOpacity style={{marginTop:2}}
                    onPress={atualizar}
                >
                    <Text>Atualizar</Text>
                </TouchableOpacity>
            </View>
            
            <View style={{}}>
                <FlatList 
                    data={aulas}
                    keyExtractor={(item)=> String(item.id)}
                    renderItem={({ item }) => 
                    <AulasAlunos
                        data={item} 
                        onOpen={() => router.navigate('/Aluno/(tabs)/aulas/' + item.id)}
                    />}
                />
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