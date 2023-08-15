import React, { useState } from "react";
import { View, StyleSheet,FlatList, TouchableOpacity} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { PaperProvider,Text,List, Portal,Modal,Button, DataTable } from "react-native-paper";



const DetAbate = () =>{ 
    const Navigation = useNavigation();
    const listAbates = [
        {
        idAbate: 1,
        idPedidos: 1,
        TipoAnimal: "Bovino",
        peso: 15,
        viabilidade: true,
        },
        {
            idAbate:2,
            idPedidos: 1,
            TipoAnimal: "Suino",
            peso: 10,
            viabilidade: true,
        },
        {
            idAbate: 3,
            idPedidos: 1,
            TipoAnimal: "ovino",
            peso: 5,
            viabilidade: false,
        },
    ]

    return (
        <View>
            <View style={{marginTop:10 }}>
                <Text variant="headlineMedium" 
                style={{textAlign:'center'}}>Detalhes de Abates</Text>
            </View>
            <View style={{ height:"2%", backgroundColor: "black",marginTop:10 }}/>
            <DataTable>
                    <DataTable.Header>
                            <DataTable.Title>Especie</DataTable.Title>
                            <DataTable.Title numeric>peso</DataTable.Title>
                            <DataTable.Title numeric>viabilidade</DataTable.Title>
                        </DataTable.Header>
                            {listAbates.map((listAbates)=>{
                                return (
                                    <DataTable.Row key={listAbates.idAbate}>
                                        <DataTable.Cell>{listAbates.TipoAnimal}</DataTable.Cell>
                                        <DataTable.Cell numeric>{listAbates.peso}</DataTable.Cell>
                                        <DataTable.Cell numeric>{listAbates.viabilidade==true ? <Text>Viavel</Text>: <Text>Nao Viavel</Text>}</DataTable.Cell>
                                    </DataTable.Row>
                                )})}   
                    </DataTable>
        </View>
    )
}


export default () => (
    <PaperProvider>
        <DetAbate/>
    </PaperProvider>
)
