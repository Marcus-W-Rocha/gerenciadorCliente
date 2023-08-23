import React, { useState } from "react";
import { View, StyleSheet,FlatList, TouchableOpacity} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { PaperProvider,Text,List, Portal,Modal,Button, DataTable } from "react-native-paper";
import axios from "axios";
import {URLBase} from "../const"



const ListaPedidos = () =>{ 
    const Navigation = useNavigation();
    const hideModalDetalhes = () => setVisible(false);
    const showModalDetalhes = () =>setVisible(true);
    const [visible, setVisible] = React.useState(false);
    const [visibleButton,setVisibleButton] = React.useState(false);
    const [idPedido,setIdPedido] = React.useState(null)
    const [bdLoaded,setBdLoaded] = React.useState(false)
    const perfilAtual = Navigation.getState()["routes"][Navigation.getState()["index"]]["params"]["perfil"]
    const typeRequest = Navigation.getState()["routes"][Navigation.getState()["index"]]["params"]["requestType"]
    const [listPedidos,setListPedidos] = React.useState([])
    const [detalhesPedido,setDetalhesPedido] = React.useState([])
    const [listEspecies,setListEspecies] = React.useState([])
    const config = {
        headers: { 'token':perfilAtual.token }
    };
    

    React.useEffect(() => {
        callbd = async () =>{
            list = [] 
            if (typeRequest.hasOwnProperty("Geral")){
                let response = await axios.get(`${URLBase}/pedidos/idc/${perfilAtual.idCliente}`,config)
                response = response.data
                response.forEach(element => {
                    date = new Date(element[2]*1000).toLocaleDateString("pt-br")
                    a = {
                        id: element[0],
                        idCliente: element[1],
                        dataPedido: date,
                        status: element[3],
                    }
                    list.push(a)
                });
            }
            if (typeRequest.hasOwnProperty("Status")){
                let response = await axios.post(`${URLBase}/pedidos/status/${typeRequest["Status"]["valor"]}`,{idCliente: perfilAtual.idCliente},config)
                response = response.data
                response.forEach(element => {
                    date = new Date(element[2]*1000).toLocaleDateString("pt-br")
                    a = {
                        id: element[0],
                        idCliente: element[1],
                        dataPedido: date,
                        status: element[3],
                    }
                    list.push(a)
                });
            }
            if (typeRequest.hasOwnProperty("Data")){
                data_ini = new Date(typeRequest["Data"]["startDate"])
                ini_Year = data_ini.getFullYear()
                ini_month = data_ini.getMonth()+1
                ini_day = data_ini.getDate()
                if (ini_day<10){
                    ini_day = "0"+ini_day
                }
                if (ini_month<10){
                    ini_month = "0"+ini_month
                }
                data_ini = ini_Year+"-"+ini_month+"-"+ini_day
                
                data_end = new Date(typeRequest["Data"]["endDate"])
                end_Year = data_end.getFullYear()
                end_month = data_end.getMonth()+1
                end_day = data_end.getDate()
                if (end_day<10){
                    end_day = "0"+end_day
                }
                if (end_month<10){
                    end_month = "0"+end_month
                }
                data_end = end_Year+"-"+end_month+"-"+end_day

                let response = await axios.post(`${URLBase}/pedidos/date/byPeriod/${perfilAtual.idCliente}`,{start:data_ini ,end:data_end},config)
                response = response.data
                response.forEach(element => {
                    date = new Date(element[2]*1000).toLocaleDateString("pt-br")
                    a = {
                        id: element[0],
                        idCliente: element[1],
                        dataPedido: date,
                        status: element[3],
                    }
                    list.push(a)
                });
            }
            let response = await axios.get(`${URLBase}/tipoAnimais`, config) 
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
            setListPedidos(list)
        }
        if (bdLoaded == false) {callbd()}

    })
    
    const detalhes = async (listPedidos) => {
        if(listPedidos.status == "Processado"){
            Navigation.navigate("DetAbate",{Perfil: perfilAtual,Pedidos: listPedidos.id})
        }
        else if (listPedidos.status == "Enviado"){
            setIdPedido(listPedidos.id)
            let response = await axios.get(`${URLBase}/detalhesPedido/idp/${listPedidos.id}`,config)
            response = response.data
            let list = []
            response.forEach(element => {
                a = {
                    idDetalhe: element[0],
                    idPedido: element[1],
                    tipoAnimal: element[2],
                    quantidade: element[3],
                }
                list.push(a)
            });
            setDetalhesPedido(list)
            setVisibleButton(true)
            showModalDetalhes()

        }
        else{
            setIdPedido(listPedidos.id)
            setVisibleButton(false)
            showModalDetalhes()
            

        }
    }
    const retIdAni = (id) =>{
        result = null
        listEspecies.forEach(element => {
            if (element["idAnimal"]==id){
                result = element["nomeEspecie"]
                return
            }
        });
        return result
    }

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
                        onPress={()=>detalhes(listPedidos)}/>
                )})}
            </View>
            <Portal>
                <Modal visible={visible} onDismiss={hideModalDetalhes} contentContainerStyle={{backgroundColor: 'white', padding: 20}}>
                    <DataTable>
                        <DataTable.Header>
                            <DataTable.Title>Especie</DataTable.Title>
                            <DataTable.Title numeric>Quantidade</DataTable.Title>
                        </DataTable.Header>
                            {detalhesPedido.filter((pedido)=> pedido.idPedido==idPedido).map((detalhesPedido)=>{ 
                                return (
                                    <DataTable.Row key={detalhesPedido.idDetalhe}>
                                        <DataTable.Cell>{retIdAni(detalhesPedido.tipoAnimal)}</DataTable.Cell>
                                        <DataTable.Cell numeric>{detalhesPedido.quantidade}</DataTable.Cell>
                                    </DataTable.Row>
                                )})} 
                    </DataTable>
                    {visibleButton && <Button icon="note-edit" mode="contained-tonal" onPress={() => Navigation.navigate("EditScreen",{
                                                detalhes: detalhesPedido.filter((pedido)=> pedido.idPedido==idPedido),
                                                idCliente: perfilAtual})}>Editar Pedido</Button>}
                </Modal>
            </Portal>
        </View>
    )
}


export default () => (
    <PaperProvider>
        <ListaPedidos/>
    </PaperProvider>
)
