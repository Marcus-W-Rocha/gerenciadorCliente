import React, { useState } from "react";
import { View, } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { PaperProvider,Text,Button, DataTable } from "react-native-paper";



const ConsulEst = () =>{ 
    const Navigation = useNavigation();
    const Estoque =[
        {
            idEstoque: 1,
            tipoAnimal: "Bovino",
            quantidade: 3
        },
        {
            idEstoque: 2,
            tipoAnimal: "Suino",
            quantidade: 2
        },
        {
            idEstoque: 3,
            tipoAnimal: "Caprino",
            quantidade: 5
        }

    ]
    return (
        <View>
            <View>
                <Text variant="headlineSmall" style={{textAlign:"center"}} >Seu Estoque Disponivel</Text>
            </View>
            <View style={{ height:"2%", backgroundColor: "black",marginTop:10 }}/>
            <View>
                <DataTable>
                    <DataTable.Header>
                        <DataTable.Title>Especie</DataTable.Title>
                        <DataTable.Title numeric>Quantidade</DataTable.Title>
                    </DataTable.Header>
                        {Estoque.map((Estoque)=>{
                            return (
                                <DataTable.Row key={Estoque.idEstoque}>
                                    <DataTable.Cell>{Estoque.tipoAnimal}</DataTable.Cell>
                                    <DataTable.Cell numeric>{Estoque.quantidade}</DataTable.Cell>
                                </DataTable.Row>
                            )})}   
                </DataTable>
            </View>
            <View>
                <Button 
                mode="contained-tonal"
                title="Novo Pedido"
                icon="plus"
                onPress={()=> Navigation.navigate("NovoPedido")}>Novo Pedido</Button>
            </View>
        </View>
    )
}


export default () => (
    <PaperProvider>
        <ConsulEst/>
    </PaperProvider>
)
