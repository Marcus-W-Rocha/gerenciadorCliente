import React, { useState } from "react";
import { View, StyleSheet,FlatList, TouchableOpacity} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { PaperProvider,Text,List, Portal,Modal,Button, DataTable } from "react-native-paper";



const ListaPedidos = () =>{ 
    const Navigation = useNavigation();
    const listPedidos = [
        {
            id: 1,
            idCliente: 1,
            dataPedido: "13/08/2022",
            status: "Enviado",

        },
        {
            id: 2,
            idCliente: 1,
            dataPedido: "14/08/2022",
            status: "Enviado",

        },
        {
            id: 3,
            idCliente: 1,
            dataPedido: "15/08/2022",
            status: "Enviado",

        }
    ]
    const detalhesPedido = [
        {
            idDetalhe: 1,
            idPedido: 1,
            tipoAnimal: "Bovino",
            quantidade: 3,

        },
        {
            idDetalhe: 2,
            idPedido: 1,
            tipoAnimal: "Ovino",
            quantidade: 4,

        },
        {
            idDetalhe: 3,
            idPedido: 1,
            tipoAnimal: "Suino",
            quantidade: 1,

        },

    ]

    return (
        <View>
            <View style={{marginTop:10 }}>
                <Text variant="headlineMedium" 
                style={{textAlign:'center'}}>Lista de Pedidos</Text>
                <Text variant="titleSmall" 
                style={{textAlign:'center'}}>Pressione para Detalhes</Text>
            </View>
            <View style={{ height:"2%", backgroundColor: "black",marginTop:10 }}/>
            <View>
            {listPedidos.map((listPedidos)=>{
                return (
                    <List.Item
                        key={listPedidos.id}
                        title = {listPedidos.dataPedido}
                        description = {listPedidos.status}
                        onPress={()=>Navigation.navigate("DetAbate")}/>
                )})}
            </View>
        </View>
    )
}


export default () => (
    <PaperProvider>
        <ListaPedidos/>
    </PaperProvider>
)
