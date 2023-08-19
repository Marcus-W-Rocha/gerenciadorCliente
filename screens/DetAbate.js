import React, { useState } from "react";
import { View} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { PaperProvider,Text, DataTable } from "react-native-paper";



const DetAbate = () =>{ 
    const Navigation = useNavigation();
    const Envio = Navigation.getState()["routes"][Navigation.getState()["index"]]["params"]
    //envio deve ser enviado para a api para recuperar todos os abates com o id do pedido. Esse valor deve ser entao colocado em listAbates
    const listAbates = [
        {
        idAbate: 1,
        idPedidos: 1,
        TipoAnimal: "Bovino",
        peso: "15",
        condenações: true,
        },
        {
            idAbate:2,
            idPedidos: 1,
            TipoAnimal: "Suino",
            peso: "10",
            condenações: true,
        },
        {
            idAbate: 3,
            idPedidos: 1,
            TipoAnimal: "ovino",
            peso: "5,10",
            condenações: false,
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
                            <DataTable.Title numeric>condenações</DataTable.Title>
                        </DataTable.Header>
                            {listAbates.map((listAbates)=>{
                                return (
                                    <DataTable.Row key={listAbates.idAbate}>
                                        <DataTable.Cell>{listAbates.TipoAnimal}</DataTable.Cell>
                                        <DataTable.Cell numeric>{listAbates.peso}</DataTable.Cell>
                                        <DataTable.Cell numeric>{listAbates.condenações}</DataTable.Cell>
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
