import { View, Text, TextInput, TouchableOpacity, Alert, Switch, FlatList } from "react-native";
import { useState, useEffect } from "react";
import { alunos, useCTDatabase } from "@/database/useCTDatabase";
import { router } from "expo-router";

import styles from "@/styles";
import { AlunosPagamentos } from "@/components/AlunosPagamentos";

export default function Index(){
    const CTDatabase = useCTDatabase()

    const [ano, setAno] = useState('')
    const [mes, setMes] = useState('')
    const [dia, setDia] = useState('')
    const [valor, setValor] = useState('')
    const [estaPago, setEstaPago] = useState(false)
    const [aluno_id, setAluno_id] = useState('')
    const [search, setSearch] = useState('')
    const [alunos, setAlunos] = useState<alunos[]>([])
    const [alunoSelecionado, setAlunoSelecionado] = useState<string>()

    function togglePago(){
        setEstaPago(!estaPago)
    }

    async function registrarPagamentos(){
        try {
            const result = await CTDatabase.registrarPagamento({ano,mes,dia,valor,estaPago,aluno_id})

            Alert.alert("Pagamento cadastrado com o ID: "+ result.insertedRowId)
        } catch (error) {
            console.log(error)   
        }
    }

    function atribuidorID(id: string){
        setAluno_id(id)
    }

    async function listarAlunos(){
        try {
            const response = await CTDatabase.procurarAlunos(search)
            setAlunos(response)
        } catch (error) {
            console.log(error)
        }
    }

    function atualizar(){
        listarAlunos()
    }

    async function selecionarAluno(){
        if(aluno_id){
            try {
                const result = await CTDatabase.selecionarAlunoPagamento(aluno_id)
                
                setAlunoSelecionado(result?.nome)
            } catch (error) {
                console.log(error)
            }
        }
    }

   useEffect(() => {
    listarAlunos()
   },[search])

   useEffect(()=>{
    selecionarAluno()
   },[aluno_id])

   useEffect(()=> {
    listarAlunos()
   },[])

    return(
        <View style={{justifyContent:'center'}}>
            <View style={{flexDirection:'row', alignSelf:'center'}}>
            </View>
            <Text>AlunoID: {aluno_id}</Text>
            <Text style={{marginHorizontal:15}}>Ano:</Text>
            <TextInput 
                style={styles.input}
                onChangeText={setAno}
                value={ano}
            />
            <Text style={{marginHorizontal:15}}>Mês:</Text>
            <TextInput 
                style={styles.input} 
                onChangeText={setMes}
                value={mes}
            />
            <Text style={{marginHorizontal:15}}>Dia:</Text>
            <TextInput 
                style={styles.input} 
                onChangeText={setDia}
                value={dia}
            />
            <Text style={{marginHorizontal:15}}>Valor:</Text>
            <TextInput 
                style={styles.input} 
                onChangeText={setValor}
                value={valor}
            />
            <Text style={{marginHorizontal:15}}>Está pago:</Text>
            <View style={{flexDirection:'row', alignSelf:'flex-start'}}>
                <Switch style={{}}
                    trackColor={{false: 'red', true: 'green'}}
                    thumbColor={estaPago? '#0d5400':'#a60000'}
                    onValueChange={togglePago}
                    value={estaPago}
                />
            </View>
            <View style={{flexDirection:'row'}}>
                <Text style={{marginLeft:15, marginTop:5}}>Aluno:</Text>
                <Text style={{marginLeft:5, marginTop:5}}>{alunoSelecionado}</Text>
                <TextInput 
                    style={styles.input} 
                    onChangeText={setSearch}
                    value={search}
                    placeholder='Pesquisar'
                />
                <TouchableOpacity style={{marginTop:5}} onPress={registrarPagamentos}>
                    <Text>Pagar</Text>
                </TouchableOpacity>
            </View>
            <FlatList
                    data={alunos}
                    keyExtractor={(item)=> String(item.id)}
                    renderItem={({ item }) => 
                     <AlunosPagamentos 
                        onSelect={()=> atribuidorID(String(item.id))}
                        data={item} 
                        onOpen={() => router.navigate('/Instrutor/(tabs)/pagamentos/aluno/' + item.id)}
                    />}
                />
        </View>
    )
}