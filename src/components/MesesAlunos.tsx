import { View, Text, TouchableOpacity, TouchableOpacityProps, StyleSheet } from "react-native";
import { router } from "expo-router";

type Props = TouchableOpacityProps &{
    ano: string
}
export default function MesesAlunos({...rest}: Props){


    return(
        <View style={{alignItems:'center',justifyContent:'center'}}>
            <View style={{flexDirection:'row'}}>
                <TouchableOpacity style={styles.Touchable} onPress={() => router.navigate('/Aluno/(tabs)/pagamentos/mes/1')} >
                    <Text style={styles.Text}>Jan</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.Touchable} onPress={() => router.navigate('/Aluno/(tabs)/pagamentos/mes/2')} >
                    <Text style={styles.Text}>Fev</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.Touchable} onPress={() => router.navigate('/Aluno/(tabs)/pagamentos/mes/3')} >
                    <Text style={styles.Text}>Mar</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.Touchable} onPress={() => router.navigate('/Aluno/(tabs)/pagamentos/mes/4')} >
                    <Text style={styles.Text}>Abr</Text>
                </TouchableOpacity>
            </View>
            <View style={{flexDirection:'row'}}>
                <TouchableOpacity style={styles.Touchable} onPress={() => router.navigate('/Aluno/(tabs)/pagamentos/mes/5')} >
                    <Text style={styles.Text}>Mai</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.Touchable} onPress={() => router.navigate('/Aluno/(tabs)/pagamentos/mes/6')} >
                    <Text style={styles.Text}>Jun</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.Touchable} onPress={() => router.navigate('/Aluno/(tabs)/pagamentos/mes/7')} >
                    <Text style={styles.Text}>Jul</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.Touchable} onPress={() => router.navigate('/Aluno/(tabs)/pagamentos/mes/8')} >
                    <Text style={styles.Text}>Ago</Text>
                </TouchableOpacity>
            </View>
            <View style={{flexDirection:'row'}}>
                <TouchableOpacity style={styles.Touchable} onPress={() => router.navigate('/Aluno/(tabs)/pagamentos/mes/9')} >
                    <Text style={styles.Text}>Set</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.Touchable} onPress={() => router.navigate('/Aluno/(tabs)/pagamentos/mes/10')} >
                    <Text style={styles.Text}>Out</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.Touchable} onPress={() => router.navigate('/Aluno/(tabs)/pagamentos/mes/11')} >
                    <Text style={styles.Text}>Nov</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.Touchable} onPress={() => router.navigate('/Aluno/(tabs)/pagamentos/mes/12')} >
                    <Text style={styles.Text}>Dez</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    Touchable:{
        margin:15,
        backgroundColor:'#8f8c8c',
        padding:10,
        borderRadius:70,
    },
    Text:{
        fontWeight:'bold'
    }
})