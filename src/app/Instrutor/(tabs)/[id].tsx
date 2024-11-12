import { useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { router } from "expo-router";
import { View } from "react-native";

export let id: {id: string}

export default function pegarEmail(){
    const params = useLocalSearchParams<{id: string}>()

    if(id== undefined){
        useEffect(()=>{
            router.replace('/Instrutor/(tabs)')
            id = params
        },[])
    }else{
        useEffect(()=>{
            router.back()
        },[])
    }

    return(
        <View>
        </View>    
    )
}