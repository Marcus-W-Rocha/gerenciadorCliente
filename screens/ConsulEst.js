import React, { useState } from "react";
import { View, } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { PaperProvider,Text,Button, DataTable } from "react-native-paper";
import axios from "axios";
import {URLBase} from "../const"



const ConsulEst = () =>{ 
    const Navigation = useNavigation();
    const perfilAtual = Navigation.getState()["routes"][Navigation.getState()["index"]]["params"]
    const [Estoque,setEstoque] = React.useState([])
    const [tipoAni,setTipoAni] = React.useState([])
    const [BdLoaded,setBdLoaded] = React.useState(false)
    const config = {
        headers: { 'token':perfilAtual.token }
    };
    //recueprar estoque da API passando Envio, colocar nesse array
    React.useEffect(() =>{
        callBD = async () =>{
            let response = await axios.get(`${URLBase}/estoque/idc/${perfilAtual.idCliente}`,config) 
            response = response.data
            let list = [] 
            response.forEach(element => {
                a = {
                    idEstoque: element[0],
                    idCliente: element[1],
                    tipoAnimal: element[2],
                    quantidade: element[3]
                }
                list.push(a)
            });
            response = await axios.get(`${URLBase}/tipoAnimais`, config) 
            response = response.data
            list2 = []
            response.forEach(element => {
                a = {
                    idAnimal: element[0],
                    nomeEspecie: element[1]
                }
                list2.push(a)
            })
            setTipoAni(list2)
            setEstoque(list)
            setBdLoaded(true)
        }
        if(BdLoaded==false){callBD()} 
    })

    retAni = (id) =>{
        tipoAni.forEach(element => {
            if (element["idAnimal"]==id){
                a = element["nomeEspecie"]
                return a
            }

        });
        return a
    }

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
                                    <DataTable.Cell>{retAni(Estoque.tipoAnimal)}</DataTable.Cell>
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
                onPress={()=> Navigation.navigate("NovoPedido",perfilAtual)}>Novo Pedido</Button>
            </View>
        </View>
    )
}


export default () => (
    <PaperProvider>
        <ConsulEst/>
    </PaperProvider>
)
