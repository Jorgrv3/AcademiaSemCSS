import { View, Text, FlatList, TextInput, TouchableOpacity, StyleSheet, Alert} from 'react-native';
import { useEffect, useState } from 'react';
import { MaterialIcons } from '@expo/vector-icons'
import { router, useLocalSearchParams } from 'expo-router';

import { useCTDatabase, alunos } from '@/database/useCTDatabase';
import { AlunosParaAdicionar } from '@/components/AlunosParaAdicionar';

import styles from '@/styles';

export default function Index() {
    const [search, setSearch] = useState('')
    const [alunos, setAlunos] = useState<alunos[]>([])

    const params = useLocalSearchParams<{ id : string}>()

    const CTDatabase = useCTDatabase()

    async function listarAlunos(){
        try {
            const response = await CTDatabase.procurarAlunos(search)
            setAlunos(response)
        } catch (error) {
            console.log(error)
        }
    }

    async function registarAlunoNaAula(id:string, aluno_id:string){
        try {
            await CTDatabase.registrarAlunoAula(Number(id), Number(aluno_id))
        } catch (error) {
            console.log(error)
        }
        Alert.alert("Aluno adicionado com sucesso!", "")
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
                    onPress={() => router.navigate('/Instrutor/(tabs)/alunos/addalunos')}
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
                    <AlunosParaAdicionar 
                        data={item}
                        onAdd={() => registarAlunoNaAula(params.id,String(item.id))} 
                        onOpen={() => router.navigate('/Instrutor/(tabs)/alunos/' + item.id)}
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