import React, { useState } from "react";
import { View} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { PaperProvider,Text, DataTable } from "react-native-paper";
import Perfil from "./Perfil";
import axios from "axios";
import {URLBase} from "../const"


const DetAbate = () =>{ 
    const Navigation = useNavigation();
    const [listEspecies,setListEspecies] = React.useState([])
    const [listAbates,setListaAbate] = React.useState([])
    const [bdLoaded,setBdLoaded] = React.useState(false)
    const perfilAtual = Navigation.getState()["routes"][Navigation.getState()["index"]]["params"]["Perfil"]
    const idPedido = Navigation.getState()["routes"][Navigation.getState()["index"]]["params"]["Pedidos"]
    const config = {
        headers: { 'token':perfilAtual.token }
    };
    //envio deve ser enviado para a api para recuperar todos os abates com o id do pedido. Esse valor deve ser entao colocado em listAbates
    
    React.useEffect(() =>{
        callbd = async () =>{
            let response = await axios.get(`${URLBase}/abates/idp/${idPedido}`,config)
            response = response.data
            let list = []
            response.forEach(element => {
                a = {
                    idAbate: element[0],
                    idPedidos: element[1],
                    TipoAnimal: element[2],
                    peso: element[3],
                    condenações: element[4],
                }
                list.push(a)
            });
            list.sort((a,b)=>{return (a.TipoAnimal>b.TipoAnimal) ? 1: (a.TipoAnimal<b.TipoAnimal) ? -1:0})
            response = await axios.get(`${URLBase}/tipoAnimais`, config) 
            response = response.data
            list2 = []
            response.forEach(element => {
                a = {
                    idAnimal: element[0],
                    nomeEspecie: element[1]
                }
                list2.push(a)
            });
            setBdLoaded(true)
            setListEspecies(list2)
            setListaAbate(list)
        }
        if(bdLoaded==false){
            callbd()}
    })

    const retIdAni = (id) =>{
        listEspecies.forEach(element => {
            if (element["idAnimal"]==id){
                a = element["nomeEspecie"]
                return a
            }
        });
        return a
    }
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
                                        <DataTable.Cell>{retIdAni(listAbates.TipoAnimal)}</DataTable.Cell>
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
