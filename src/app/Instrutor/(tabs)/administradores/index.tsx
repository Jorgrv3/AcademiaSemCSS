import { View, FlatList, TextInput, TouchableOpacity, StyleSheet, Text, Alert} from 'react-native';
import { useEffect, useState } from 'react';
import { MaterialIcons } from '@expo/vector-icons'
import { Redirect, router } from 'expo-router';

import { idInstrutor } from '..';

import { useCTDatabase, usuarios } from '@/database/useCTDatabase';

import styles from '@/styles';
import { Admin } from '@/components/Admin';

import { eAdmin } from '..';

export default function Index() {

    const [search, setSearch] = useState('')
    const [admins, setAdmins] = useState<usuarios[]>([])

    const [eAdmin2, setEAdmin2] = useState(eAdmin)
    
    const CTDatabase = useCTDatabase()
    
    //const [eAdmin, setEAdmin] = useState<{eAdmin: string}>()
    
    

    if(eAdmin2 == undefined){
        Alert.alert("Precisa ser Administrador!")
        return <Redirect href={'/Instrutor'}/>
    }

    function atualizar(){
        listarAdmins()
    }


    async function listarAdmins(){
        try {
            const result = await CTDatabase.procurarAdmin(search)
            setAdmins(result)
        } catch (error) {
            console.log(error)
        }
    }

    async function removerAdmins(id: number){
        try {
            await CTDatabase.removerAdmin(String(id))

            await listarAdmins()
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(()=>{
        listarAdmins()
    },[])

    return(
        <View style={aulasStyle.bigView}>
            <View style={{justifyContent:'center',flexDirection:'row'}}>
                <TouchableOpacity
                    onPress={() => router.navigate('/Instrutor/(tabs)/administradores/addadministradores')}
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
                    data={admins}
                    keyExtractor={(item)=> String(item.id)}
                    renderItem={({ item }) => 
                    <Admin
                        data={item} 
                        onDelete={() => removerAdmins(item.id)}
                        onOpen={() => router.navigate('/Instrutor/(tabs)/administradores/' + item.id)}
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