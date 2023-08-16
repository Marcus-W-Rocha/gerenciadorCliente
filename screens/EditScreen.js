import React, { useState } from "react";
import { View, Alert } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { PaperProvider,Text,Button, DataTable, TextInput, Modal, List, Portal} from "react-native-paper";
import { TouchableOpacity } from "react-native";
import DropDown from "react-native-paper-dropdown";
import ListaPedidos from "./ListaPedidos";


const EditScreen = () =>{ 
    const Navigation = useNavigation();
    const Pedido = Navigation.getState()["routes"][Navigation.getState()["index"]]["params"]["detalhes"]
    const [PedidoEdit,setPedidoEdit] = React.useState(Pedido)
    const [visible, setVisible] = React.useState(false);

    //recuperar estoque do banco de dados de acordo com o idCliente Navigation.getState()["routes"][Navigation.getState()["index"]]["params"]["idCliente"]
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
            tipoAnimal: "Ovino",
            quantidade: 5
        },
        {
            idEstoque: 4,
            tipoAnimal: "Caprino",
            quantidade: 15
        },
        {
            idEstoque: 5,
            tipoAnimal: "Aviario",
            quantidade: 144
        }

    ]
    const tipoUsados = PedidoEdit.map((pedido)=>{
            return pedido.tipoAnimal
    })

    const confirmar = () => {
        PedidoEdit.map((pedido)=>{
            const Enviar = {
                idPedido: pedido.idPedido,
                idTipoAnimal: pedido.tipoAnimal,
                quantidade: pedido.quantidade
            }
            //enviar junto com pedido.idDetalhes para update.
        })
        Navigation.goBack()
    }

    return (
        <View>
             <View>
                <Text variant="headlineSmall" style={{textAlign:"center"}} >Editar Pedido</Text>
            </View>
            <View style={{ height:"2%", backgroundColor: "black",marginTop:10 }}/>
            <View>
                <DataTable.Header>
                    <DataTable.Title>Especie</DataTable.Title>
                    <DataTable.Title numeric>Quantidade</DataTable.Title>
                    <DataTable.Title numeric>Excluir</DataTable.Title>
                </DataTable.Header>
                {PedidoEdit.map((DetPedido,index) => {
                    return(
                        <DataTable.Row key={DetPedido.idDetalhe}>
                            <DataTable.Cell>{DetPedido.tipoAnimal}</DataTable.Cell>
                            <DataTable.Cell numeric><TextInput keyboardType = "number-pad" placeholder={String(DetPedido.quantidade)} mode="outlined" onChangeText={quant=>{
                                quant = Number(quant)
                                Estoque.map((est) => {
                                    if(DetPedido.tipoAnimal === est.tipoAnimal){
                                        if (quant<=est.quantidade && quant>0){
                                            const newPedidoEdit = PedidoEdit
                                            newPedidoEdit[index].quantidade = quant
                                            setPedidoEdit(newPedidoEdit)
                                        }
                                        else if (quant!==0){
                                            Alert.alert(
                                                'Error',
                                                'Estoque Insuficiente',
                                                [
                                                  { text: 'Ok', onPress: () =>{
                                                    quant == DetPedido.quantidade
                                                  } }
                                                ],
                                              );
                                            const newPedidoEdit = PedidoEdit
                                            newPedidoEdit[index].quantidade = DetPedido.quantidade
                                            setPedidoEdit(newPedidoEdit)
                                        }
                                    }
                                })        
                            }}/></DataTable.Cell>
                            <DataTable.Cell numeric><Button mode="elevated" icon={"alpha-x-box-outline"} onPress={()=>{
                                Alert.alert(
                                    'Alerta de Remoção',
                                    'Deseja Remover Essa Parte do Pedido?',
                                    [
                                      { text: 'Cancelar', style: 'cancel' },
                                      { text: 'Sim', onPress: () =>{
                                        const newPedidoEdit = PedidoEdit.filter((pedido) => pedido.idDetalhe !==DetPedido.idDetalhe)
                                        setPedidoEdit(newPedidoEdit)
                                      } }
                                    ],
                                    { cancelable: false }
                                  );
                                
                            }}/></DataTable.Cell>
                        </DataTable.Row>
                    )})}
                </View>
            <View>
                <Button onPress={()=>setVisible(true)}>Adicionar Novo Abate</Button>
            </View>
            <Button mode='contained-tonal' icon={"check-all"} onPress={()=>confirmar()}>Confirmar Edição</Button>
            <Portal>
                <Modal visible={visible} onDismiss={()=> setVisible(false)} contentContainerStyle={{backgroundColor: 'white', padding: 20}}>
                    {Estoque.filter((est)=> !tipoUsados.includes(est.tipoAnimal)).map((teste)=>{
                        return(
                            <List.Item key={teste.idEstoque} title={teste.tipoAnimal} onPress={()=>{
                                const newPedidoEdit = PedidoEdit
                                newPedidoEdit.push({//provisorio
                                    idDetalhe: PedidoEdit.length+1,
                                    idPedido: Navigation.getState()["routes"][Navigation.getState()["index"]]["params"]["detalhes"][0]["idPedido"],
                                    quantidade: 0,
                                    tipoAnimal: teste.tipoAnimal
                                })
                                console.log(newPedidoEdit)
                                //setPedidoEdit(newPedidoEdit)
                                const envio = {//envia para a API um novo detalhe, o valor de pedido deve ser entao editado, 
                                    //para isso todas as outras mudanças devem ser enviadas
                                    idPedido: Navigation.getState()["routes"][Navigation.getState()["index"]]["params"]["detalhes"][0]["idPedido"],
                                    quant: 0
                                }
                                setVisible(false)
                            }}/>
                        )})}     
                </Modal>
            </Portal>
        </View>
    )
}


export default () => (
    <PaperProvider>
        <EditScreen/>
    </PaperProvider>
)
