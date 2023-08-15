import React, { useState } from "react";
import { View, StyleSheet, TouchableOpacity} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { PaperProvider,Text,List, Portal,Modal,Button, DataTable } from "react-native-paper";



const EditPerfil = () =>{ 
    const Navigation = useNavigation();
    const showModalDetalhes = () => setVisible(true);
    const hideModalDetalhes = () => setVisible(false);
    const [visible, setVisible] = React.useState(false);
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
                style={{textAlign:'center'}}>Lista de Pedidos Editáveis</Text>
            </View>
            <View style={{ height:"2%", backgroundColor: "black",marginTop:10 }}/>
            <View>
            {listPedidos.map((listPedidos)=>{
                return (
                    <List.Item
                        key={listPedidos.id}
                        title = {listPedidos.dataPedido}
                        description = {listPedidos.status}
                        right={props => <TouchableOpacity onPress={() => console.log('delete')}>
                                            <List.Icon icon="delete-circle"/>
                                        </TouchableOpacity>}
                        onPress={showModalDetalhes}/>
                )})}
            </View>
            <Portal>
                <Modal visible={visible} onDismiss={hideModalDetalhes} contentContainerStyle={{backgroundColor: 'white', padding: 20}}>
                    <Text variant="headlineSmall" style={{textAlign: "center"}}>Data</Text>
                    <Text variant="titleMedium" style={{textAlign: "center"}}>Status</Text>
                    <DataTable>
                        <DataTable.Header>
                            <DataTable.Title>Especie</DataTable.Title>
                            <DataTable.Title numeric>Quantidade</DataTable.Title>
                            <DataTable.Title numeric>Editar</DataTable.Title>
                            <DataTable.Title numeric>Excluir</DataTable.Title>
                        </DataTable.Header>
                            {detalhesPedido.map((detalhesPedido)=>{
                                return (
                                    <DataTable.Row key={detalhesPedido.idDetalhe}>
                                        <DataTable.Cell>{detalhesPedido.tipoAnimal}</DataTable.Cell>
                                        <DataTable.Cell numeric>{detalhesPedido.quantidade}</DataTable.Cell>
                                        <DataTable.Cell numeric>{<Button icon="pencil" />}</DataTable.Cell>
                                        <DataTable.Cell numeric>{<Button icon="alpha-x" />}</DataTable.Cell>
                                    </DataTable.Row>
                                )})} 
                    </DataTable>
                    <Button icon="note-edit" mode="contained-tonal" onPress={() => console.log("editar pedido")}>Editar Pedido</Button>
                </Modal>
            </Portal>

        </View>
    )
}
const styles = StyleSheet.create({


})

export default () => (
    <PaperProvider>
        <EditPerfil/>
    </PaperProvider>
)
