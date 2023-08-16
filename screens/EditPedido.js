import React, { useState } from "react";
import { View, StyleSheet, TouchableOpacity} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { PaperProvider,Text,List, Portal,Modal,Button, DataTable } from "react-native-paper";
import ListaPedidos from "./ListaPedidos";



const EditPerfil = () =>{ 
    const Navigation = useNavigation();
    const hideModalDetalhes = () => setVisible(false);
    const showModalDetalhes = () =>setVisible(true);
    const [visible, setVisible] = React.useState(false);
    const [idPedido,setIdPedido] = React.useState(null)


    //enviar para banco de dados status + Enviar, recuperar pedidos com base no IdCliente e o status = "Enviado". Salvar na variavel ListPedidos
    const Enviar = Navigation.getState()["routes"][Navigation.getState()["index"]]["params"]["idCliente"]
    const [listPedidos,setListPedidos] = React.useState([
        {
            id: 1,
            idCliente: 1,
            dataPedido: "13-08-2022",
            status: "Enviado",

        },
        {
            id: 2,
            idCliente: 1,
            dataPedido: "14-08-2022",
            status: "Processado",

        },
        {
            id: 3,
            idCliente: 1,
            dataPedido: "15-08-2022",
            status: "Enviado",

        }
    ])
    //recuperar os detalhes dos pedidos de acordo com os pedidos da lista (um a um) (aqueles com status = "enviado")
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
        {
            idDetalhe: 4,
            idPedido: 2,
            tipoAnimal: "Bovino",
            quantidade: 1,

        },
        {
            idDetalhe: 5,
            idPedido: 2,
            tipoAnimal: "Ovino",
            quantidade: 2,

        },
        {
            idDetalhe: 6,
            idPedido: 3,
            tipoAnimal: "Ovino",
            quantidade: 12,

        },

    ]

    const abrirModal = (id) =>{
        setIdPedido(id)
        showModalDetalhes()
    }
    
    const deletePedido = (pedidoR) =>{
        const editedList = [...listPedidos]
        pedidoEditado = {
            dataPedido: pedidoR.dataPedido,
            status: "Cancelado"
        }//passa com id para api com uma chamada de alterar pedido
        for(var a = 0;a<editedList.length;a++){
            if (editedList[a].id == pedidoR.id){
                editedList[a].status = "Cancelado"
                console.log(editedList)
            }
        }
        setListPedidos(editedList)
        console.log("testeDelete")
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
                                        <DataTable.Cell>{detalhesPedido.tipoAnimal}</DataTable.Cell>
                                        <DataTable.Cell numeric>{detalhesPedido.quantidade}</DataTable.Cell>
                                    </DataTable.Row>
                                )})} 
                    </DataTable>
                    <Button icon="note-edit" mode="contained-tonal" onPress={() => Navigation.navigate("EditScreen",{
                                                detalhes: detalhesPedido.filter((pedido)=> pedido.idPedido==idPedido),
                                                idCliente: Navigation.getState()["routes"][Navigation.getState()["index"]]["params"]["idCliente"]
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
