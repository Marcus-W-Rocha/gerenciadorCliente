import React, { useState } from "react";
import { View, StyleSheet,FlatList, TouchableOpacity} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { PaperProvider,Text,List, Portal,Modal,Button, DataTable } from "react-native-paper";



const ListaPedidos = () =>{ 
    const Navigation = useNavigation();
    const hideModalDetalhes = () => setVisible(false);
    const showModalDetalhes = () =>setVisible(true);
    const [visible, setVisible] = React.useState(false);
    const [visibleButton,setVisibleButton] = React.useState(false);
    const [idPedido,setIdPedido] = React.useState(null)
    const [detalhesPedido,setDetalhesPedido] = React.useState([
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
    
        ])
    const listPedidos = [//recupera banco de dados de acordo com o cliente e o dado passado pela tela anterior e coloca nesse vetor 
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
            status: "Processado",

        },
        {
            id: 3,
            idCliente: 1,
            dataPedido: "15/08/2022",
            status: "Cancelado",

        }
    ]
    
    if (Navigation.getState()["routes"][Navigation.getState()["index"]]["params"]["requestType"].hasOwnProperty('status')){
        const Envio = {
            idCliente: Navigation.getState()["routes"][Navigation.getState()["index"]]["params"]["perfil"]["idCliente"],
            status: Navigation.getState()["routes"][Navigation.getState()["index"]]["params"]["requestType"]["status"]["valor"]
        }
        //faz chamada pro banco de dados passando o idCliente e status, respota q sera colocada em listPedidos
    }
    if (Navigation.getState()["routes"][Navigation.getState()["index"]]["params"]["requestType"].hasOwnProperty('data')){
        a = Navigation.getState()["routes"][Navigation.getState()["index"]]["params"]["requestType"]["data"]["startDate"]
        b = Navigation.getState()["routes"][Navigation.getState()["index"]]["params"]["requestType"]["data"]["endDate"]
        bday = b.getDate()
        bmonth = b.getMonth()+1
        byear = b.getFullYear()
        if (bday<10){
            bday = "0"+bday
            }
        if (bmonth<10){
            bmonth = "0"+bmonth
            }
        aday = a.getDate()
        amonth = a.getMonth()+1
        ayear = a.getFullYear()
        if (aday<10){
            aday = "0"+aday
            }
        if (amonth<10){
            amonth = "0"+amonth
            }
        const Envio = {
            idCliente: Navigation.getState()["routes"][Navigation.getState()["index"]]["params"]["perfil"]["idCliente"],
            dataInicio: `${amonth}-${aday}-${ayear}`,
            dataFim: `${bmonth}-${bday}-${byear}`,
        }
        console.log(Envio)//enviar para banco de dados e esperar respota q sera colocada em listPedidos
    }
    const detalhes = (listPedidos) => {
        if(listPedidos.status == "Processado"){
            Navigation.navigate("DetAbate",listPedidos.id)
        }
        else if (listPedidos.status == "Enviado"){
            setIdPedido(listPedidos.id)
            //detalhesPedidos = detalhes do pedido do banco de dados recebidos atrazer de requisição passando o id do pedido
            setVisibleButton(true)
            showModalDetalhes()

        }
        else{
            setIdPedido(listPedidos.id)
            setVisibleButton(false)
            showModalDetalhes()
            

        }
    }
    if (Navigation.getState()["routes"][Navigation.getState()["index"]]["params"]["requestType"].hasOwnProperty('Geral')){
        // Envia request somente com o id do cliente, que esta em Navigation.getState()
        // ["routes"][Navigation.getState()["index"]]["params"]["perfil"]["idCliente"]
        //respota q sera colocada em listPedidos
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
                                        <DataTable.Cell>{detalhesPedido.tipoAnimal}</DataTable.Cell>
                                        <DataTable.Cell numeric>{detalhesPedido.quantidade}</DataTable.Cell>
                                    </DataTable.Row>
                                )})} 
                    </DataTable>
                    {visibleButton && <Button icon="note-edit" mode="contained-tonal" onPress={() => Navigation.navigate("EditScreen",{
                                                detalhes: detalhesPedido.filter((pedido)=> pedido.idPedido==idPedido),
                                                idCliente: Navigation.getState()["routes"][Navigation.getState()["index"]]["params"]["idCliente"]})}>Editar Pedido</Button>}
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
