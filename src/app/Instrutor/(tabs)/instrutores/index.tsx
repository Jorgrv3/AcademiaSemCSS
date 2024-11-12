import { View, FlatList, TextInput, TouchableOpacity, StyleSheet, Text} from 'react-native';
import { useEffect, useState } from 'react';
import { MaterialIcons } from '@expo/vector-icons'
import { router } from 'expo-router';


import { useCTDatabase, alunos, instrutores } from '@/database/useCTDatabase';

import styles from '@/styles';
import { Instrutores } from '@/components/Instrutores';

export default function Index() {
    const [search, setSearch] = useState('')
    const [instrutores, setInstrutores] = useState<instrutores[]>([])

    function atualizar(){
        listarInstrutores()
    }

    const CTDatabase = useCTDatabase()

    async function listarInstrutores(){
        try {
            const result = await CTDatabase.procurarInstrutores(search)
            setInstrutores(result)
        } catch (error) {
            console.log(error)
        }
    }

    async function removerInstrutores(id: number){
        try {
            await CTDatabase.removerInstrutores(id)

            await listarInstrutores()
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(()=> {
        listarInstrutores()
    },[])

    return(
        <View style={aulasStyle.bigView}>
            <View style={{justifyContent:'center',flexDirection:'row'}}>
                <TouchableOpacity
                    onPress={() => router.navigate('/Instrutor/(tabs)/instrutores/addinstrutores')}
                >
                    <MaterialIcons name='add' size={24} color={'black'} />
                </TouchableOpacity>
                <TextInput 
                style={styles.input} 
                onChangeText={setSearch}
                value={search}
                placeholder='Pesquisar'
                />
                <TouchableOpacity style={{marginTop:5}}
                    onPress={atualizar}
                >
                    <Text>Atualizar</Text>
                </TouchableOpacity>
            </View>
            <View style={{}}>
                <FlatList 
                    data={instrutores}
                    keyExtractor={(item)=> String(item.id)}
                    renderItem={({ item }) => 
                    <Instrutores
                        data={item} 
                        onDelete={() => removerInstrutores(item.id)}
                        onOpen={() => router.navigate('/Instrutor/(tabs)/instrutores/' + item.id)}
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