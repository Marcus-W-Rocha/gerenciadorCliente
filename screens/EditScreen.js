import React, { useState } from "react";
import { View, Alert } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { PaperProvider,Text,Button, DataTable, TextInput, Modal, List, Portal} from "react-native-paper";
import {URLBase} from "../const";
import axios from "axios";



const EditScreen = () =>{ 
    const Navigation = useNavigation();
    const [listEspecies,setListEspecies] = React.useState([])
    const [Estoque,setEstoque] = React.useState([])
    const [bdLoaded,setBdLoaded] = React.useState(false)
    const Pedido = Navigation.getState()["routes"][Navigation.getState()["index"]]["params"]["detalhes"]
    const perfilAtual = Navigation.getState()["routes"][Navigation.getState()["index"]]["params"]["idCliente"]
    const config = {
        headers: { 'token':perfilAtual.token }
    };
    
    const [PedidoEdit,setPedidoEdit] = React.useState(Pedido)
    const [visible, setVisible] = React.useState(false);

    React.useEffect(() =>{
        callbd = async () => {
            let response = await axios.get(`${URLBase}/estoque/idc/${perfilAtual.idCliente}`, config)
            response = response.data
            let list = []
            response.forEach(element => {
                list.push({
                    idEstoque: element[0],
                    idCliente: element[1],
                    tipoAnimal: element[2],
                    quantidade: element[3]
                })
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
            });
            setBdLoaded(true)
            setListEspecies(list2)
            setEstoque(list)
        }
        if (bdLoaded == false) {callbd()}
    })
    
    const tipoUsados = PedidoEdit.map((pedido)=>{
            return pedido.tipoAnimal
    })

    const confirmar = async () => {
        listUpdate = [] 
        listAdd = []
        PedidoEdit.map((pedido)=>{
            if(pedido["idDetalhe"]!= "novo"){
                listUpdate.push({
                    idDetalhe: pedido.idDetalhe,
                    idPedido: pedido.idPedido,
                    idTipoAnimal: pedido.tipoAnimal,
                    quantidade: pedido.quantidade
                    })
            }
            else{
                listAdd.push({
                    idPedido: pedido.idPedido,
                    idTipoAnimal: pedido.tipoAnimal,
                    quantidade: pedido.quantidade
                })
            }
        })
        listAdd = listAdd.filter((element) => element.quantidade !==0)
        if(listAdd.length>0){
            console.log(listAdd)
            let response = await axios.post(`${URLBase}/detalhesPedido/`,listAdd,config)
            response = response.data
            console.log(response)
            
        }
        listDelete = listUpdate.filter((element) => element.quantidade ==0)
        for (a=0; a<listUpdate.length;a++){
            let response = await axios.put(`${URLBase}/detalhesPedido/idd/${listUpdate[a]["idDetalhe"]}`,listUpdate[a],config)
            response = response.data
        }
        Navigation.navigate("Perfil",perfilAtual)
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
    const deletar = async (DetPedido) =>{
        console.log(DetPedido)
        let response = await axios.delete(`${URLBase}/detalhesPedido/idd/${DetPedido["idDetalhe"]}`,config)
        response = response.data
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
                            <DataTable.Cell>{retIdAni(DetPedido.tipoAnimal)}</DataTable.Cell>
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
                                        deletar(DetPedido)
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
                            <List.Item key={teste.idEstoque} title={retIdAni(teste.tipoAnimal)} onPress={()=>{
                                const newPedidoEdit = PedidoEdit
                                newPedidoEdit.push({
                                    idDetalhe: "novo",
                                    idPedido: Navigation.getState()["routes"][Navigation.getState()["index"]]["params"]["detalhes"][0]["idPedido"],
                                    quantidade: 0,
                                    tipoAnimal: teste.tipoAnimal
                                })
                                setPedidoEdit(newPedidoEdit)
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
