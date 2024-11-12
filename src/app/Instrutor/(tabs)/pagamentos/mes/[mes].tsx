import { View, Text, FlatList, TextInput, TouchableOpacity, StyleSheet, Alert} from 'react-native';
import { useEffect, useState } from 'react';
import { MaterialIcons } from '@expo/vector-icons'
import { router } from 'expo-router';
import { useLocalSearchParams } from 'expo-router';

import { anoAtual } from '../[ano]'; //Ano selecionado

import { useCTDatabase, pagamentos, nome, nomePagamentos, pagar } from '@/database/useCTDatabase';
import { Pagamentos } from '@/components/Pagamentos';

import styles from '@/styles';

export default function Index() {
    const [search, setSearch] = useState('')
    const [pagamentos, setPagamentos] = useState<pagamentos[]>([])
    
    const [list, setList] = useState<nomePagamentos[]>([])


    const params = useLocalSearchParams<{mes: string}>() //Mês selecionado
    
    const [mesAtual, setMesAtual] = useState(params.mes)
    
    const CTDatabase = useCTDatabase()

    const [pagamento_id, setPagamento_id] = useState<nomePagamentos>()

    
    const meses = ['Janeiro','Fevereiro','Março','Abril','Maio','Junho','Julho','Agosto','Setembro','Outubro','Novembro','Dezembro']
    
    async function listarNomes(){
        try {
            const result = await CTDatabase.listarPagamentos({mesAtual, anoAtual, search})
            setList(result)
        } catch (error) {
            console.log(error)
        }
    }
    
    async function realizarPagamento(pagamento_id:string){
        try {
            await CTDatabase.pagar({pagamento_id})
            
            Alert.alert("Pagamento efetuado com sucesso")
            await listarNomes()
        } catch (error) {
            console.log(error)
        }
    }
    
    useEffect(()=>{
        listarNomes()
    },[])

    useEffect(()=>{
        listarNomes()
    },[search])

    return(
        <View style={aulasStyle.bigView}>
            <Text style={aulasStyle.bigText}>Ano: {anoAtual} {meses[Number(params.mes)-1]}</Text>
            <View style={{justifyContent:'center',flexDirection:'row'}}>
                <TextInput 
                style={styles.input} 
                onChangeText={setSearch}
                value={search}
                placeholder='Pesquisar'
                />      
            </View>
            <View style={{}}>
                <FlatList 
                    data={list}
                    keyExtractor={(item, index) => String(index)}
                    renderItem={({ item }) => 
                    <Pagamentos 
                        data={item} 
                        onOpen={() => router.navigate('/Instrutor/(tabs)/pagamentos/aluno/' + item.aluno_id)} //Esse erro é ignorável e não sei como faz pra corrigir
                        onPagar={() => realizarPagamento(item.pagamento_id)}
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