import React, { useState } from "react";
import { View, StyleSheet, TouchableOpacity} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { PaperProvider,Text,List, Portal,Modal,Button, DataTable } from "react-native-paper";
import axios from "axios";
import {URLBase} from "../const"


const EditPerfil = () =>{ 
    const Navigation = useNavigation();
    const hideModalDetalhes = () => setVisible(false);
    const showModalDetalhes = () =>setVisible(true);
    const [visible, setVisible] = React.useState(false);
    const [idPedido,setIdPedido] = React.useState(null)
    const [loaded,setLoaded] = React.useState(false)
    const [listPedidos,setListPedidos] = React.useState([])
    const [detalhesPedido,setDetalhesPedido] = React.useState([])
    const [listEspecies,setListEspecies] = React.useState([])
    const [loadedlistEspecies,setLoadedListEspecies] = React.useState(false)

    //enviar para banco de dados status + Enviar, recuperar pedidos com base no IdCliente e o status = "Enviado". Salvar na variavel ListPedidos
    const perfilAtual = Navigation.getState()["routes"][Navigation.getState()["index"]]["params"]
    const config = {
        headers: { 'token':perfilAtual.token }
    };
    
    React.useEffect(() => {
        callbd = async () =>{
            let response = await axios.post(`${URLBase}/pedidos/status/Enviado`,{idCliente: perfilAtual.idCliente}, config)
            response = response.data
            let list = []
            let listId = []
            response.forEach(element => {
                let data = new Date(element[2]*1000).toLocaleDateString("pt")
                a = {
                    id: element[0],
                    idCliente: element[1],
                    dataPedido: data,
                    status: element[3],
                }
                list.push(a)
                listId.push(element[0])    
            });


            setListPedidos(list)
            setLoaded(true)
        }
        if (loaded == false) callbd()

    })

    const abrirModal = async (id) =>{
        setIdPedido(id)
        let response = await axios.get(`${URLBase}/detalhesPedido/idp/${id}`, config) 
        response = response.data
        list = []
        response.forEach(element => {
            a = {
                idDetalhe: element[0],
                idPedido: element[1],
                tipoAnimal: element[2],
                quantidade: element[3],
            }
            list.push(a)
        });
        if (loadedlistEspecies == false){
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
        }
        setLoadedListEspecies(true)
        setListEspecies(list2)
        setDetalhesPedido(list)
        showModalDetalhes()
    }
    
    const retIdAni = (id) =>{
        listEspecies.forEach(element => {
            if (element["idAnimal"]==id){
                a = element["nomeEspecie"]
                return a
            }

        });
        return a
    }

    const deletePedido = async (pedidoR) =>{
        const editedList = [...listPedidos]
        var date = pedidoR.dataPedido
        var dia  = date.split("/")[0];
        var mes  = date.split("/")[1];
        var ano  = date.split("/")[2];
        date = ano + '-' + ("0"+mes).slice(-2) + '-' + ("0"+dia).slice(-2)

        pedidoEditado = {
            dataPedido: date,
            status: "Cancelado"
        }
        response = await axios.put(`${URLBase}/pedidos/idp/${pedidoR.id}`,pedidoEditado,config)
        response = response.data
        console.log(response)
        for(var a = 0;a<editedList.length;a++){
            if (editedList[a].id == pedidoR.id){
                editedList[a].status = "Cancelado"
            }
        }
        setListPedidos(editedList)
    }

    return (
        <View>
            <View style={{marginTop:10 }}>
                <Text variant="headlineMedium" 
                style={{textAlign:'center'}}>Lista de Pedidos Editáveis</Text>
            </View>
            <View style={{ height:"2%", backgroundColor: "black",marginTop:10 }}/>
            <View>
            {listPedidos.filter((value)=>value.status=="Enviado").map((pedidos)=>{
                    return (
                        <List.Item
                            key={pedidos.id}
                            title = {pedidos.dataPedido}
                            description = {pedidos.status}
                            right={props => <TouchableOpacity onPress={() => deletePedido(pedidos)}>
                                                <List.Icon icon="delete-circle"/>
                                            </TouchableOpacity>}
                            onPress={() => abrirModal(pedidos.id)}/>
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
                    <Button icon="note-edit" mode="contained-tonal" onPress={() => Navigation.navigate("EditScreen",{
                                                detalhes: detalhesPedido.filter((pedido)=> pedido.idPedido==idPedido),
                                                idCliente: perfilAtual
                                                })}>Editar Pedido</Button>
                </Modal>
            </Portal>

        </View>
    )
}

export default () => (
    <PaperProvider>
        <EditPerfil/>
    </PaperProvider>
)
