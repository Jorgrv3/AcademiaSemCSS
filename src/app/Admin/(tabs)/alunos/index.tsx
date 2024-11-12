import { View, Text, FlatList, TextInput, TouchableOpacity, StyleSheet} from 'react-native';
import { useEffect, useState } from 'react';
import { MaterialIcons } from '@expo/vector-icons'
import { router } from 'expo-router';
import { RefreshControl } from 'react-native';


import { useCTDatabase, alunos } from '@/database/useCTDatabase';
import { Alunos } from '@/components/Alunos';

import styles from '@/styles';

export default function Index() {
    const [search, setSearch] = useState('')
    const [alunos, setAlunos] = useState<alunos[]>([])

    const CTDatabase = useCTDatabase()

    async function listarAlunos(){
        try {
            const response = await CTDatabase.procurarAlunos(search)
            setAlunos(response)
        } catch (error) {
            console.log(error)
        }
    }

    async function removerAlunos(id: number){
        try {
            await CTDatabase.removerAluno(id)

            await listarAlunos()
        } catch (error) {
            console.log(error)
        }
    }

    function atualizar(){
        listarAlunos()
    }

   useEffect(() => {
    listarAlunos()
   },[search])

   useEffect(()=> {
    listarAlunos()
   },[])

    return(
        <View style={aulasStyle.bigView}>
            <View style={{justifyContent:'center',flexDirection:'row'}}>
                <TouchableOpacity
                    onPress={() => router.navigate('/Admin/(tabs)/alunos/addalunos')}
                >
                    <MaterialIcons name='add' size={24} color={'black'} />
                </TouchableOpacity>
                <TouchableOpacity style={{marginTop:5, marginLeft:10}}
                    onPress={atualizar}
                >
                    <Text>Atualizar</Text>
                </TouchableOpacity>
                <TextInput 
                style={styles.input} 
                onChangeText={setSearch}
                value={search}
                placeholder='Pesquisar'
                />      
            </View>
            <View style={{}}>
                <FlatList
                    data={alunos}
                    keyExtractor={(item)=> String(item.id)}
                    renderItem={({ item }) => 
                    <Alunos 
                        data={item} 
                        onDelete={() => removerAlunos(item.id)}
                        onOpen={() => router.navigate('/Admin/(tabs)/alunos/' + item.id)}
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