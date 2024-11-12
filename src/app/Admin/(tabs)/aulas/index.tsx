import { View, Text, FlatList, TextInput, TouchableOpacity, StyleSheet} from 'react-native';
import { useEffect, useState } from 'react';
import { MaterialIcons } from '@expo/vector-icons'
import { router } from 'expo-router';
import { ScrollView } from 'react-native';

import { useCTDatabase, aulas } from '@/database/useCTDatabase';
import { Aulas } from '@/components/Aulas';

import styles from '@/styles';

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

    async function removerAula(id: number){
        try {
            await CTDatabase.removerAula(id)

            await ListarAulas()
        } catch (error) {
            console.log(error)
        }
    }

   useEffect(() => {
    ListarAulas()
   },[])

    return(
        <View style={aulasStyle.bigView}>
            <Text style={aulasStyle.bigText}>Aulas:</Text>
            <View style={{justifyContent:'center',flexDirection:'row'}}>
                <TouchableOpacity
                    onPress={() => router.navigate('/Admin/(tabs)/aulas/addaulas')}
                >
                    <MaterialIcons name='add' size={24} color={'black'} />
                </TouchableOpacity>
                <TouchableOpacity style={{marginTop:2, marginLeft:10}}
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
                    <Aulas 
                        data={item} 
                        onDelete={() => removerAula(item.id)}
                        onOpen={() => router.navigate('/Admin/(tabs)/aulas/' + item.id)}
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