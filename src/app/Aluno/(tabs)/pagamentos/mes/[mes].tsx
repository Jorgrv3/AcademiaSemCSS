import { View, Text, FlatList, TextInput, StyleSheet, Alert} from 'react-native';
import { useEffect, useState } from 'react';
import { useLocalSearchParams } from 'expo-router';

import { anoAtual } from '../[ano]'; //Ano selecionado
import { idAluno } from '../..';

import { useCTDatabase, nomePagamentosAluno } from '@/database/useCTDatabase';

import styles from '@/styles';
import { PagamentosAluno } from '@/components/PagamentosAluno';

export default function Index() {
    const [search, setSearch] = useState('')
    
    const [list, setList] = useState<nomePagamentosAluno[]>([])

    const params = useLocalSearchParams<{mes: string}>() //Mês selecionado
    
    const [mesAtual, setMesAtual] = useState(params.mes)
    
    const CTDatabase = useCTDatabase()

    const meses = ['Janeiro','Fevereiro','Março','Abril','Maio','Junho','Julho','Agosto','Setembro','Outubro','Novembro','Dezembro']
    
    async function listarNomes(){
        try {
            const result = await CTDatabase.listarPagamentosAluno({mesAtual, anoAtual, idAluno})
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
                    <PagamentosAluno 
                        data={item} 
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