import React, { useState } from "react";
import { View, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { PaperProvider,Text, Button, TextInput, Badge,FAB,  Portal,Modal,DataTable, HelperText } from "react-native-paper";
import DropDown from "react-native-paper-dropdown";
import axios from "axios";
import {URLBase} from "../const"


const NovoPedido = () =>{
    const Navigation = useNavigation();
    const [showDropDown, setShowDropDown] = useState(false);
    const [especies, setEspecies] = useState ("");
    const showModal = () => setVisible(true);
    const hideModal = () => setVisible(false);
    const [visible, setVisible] = React.useState(false);
    const [visibleEstInvalido, setvisibleEstInvalido] = React.useState(false);
    const ShowEstInsufi= () => setvisibleEstInvalido(true);
    const hideEstInsufi= () => setvisibleEstInvalido(false);
    const [visibleQuantZero, setVisibleQuantZero] = React.useState(false);
    const ShowQuantZero= () => setVisibleQuantZero(true);
    const hideQuantZero= () => setVisibleQuantZero(false);
    const [quantidade, setQuantidade] = React.useState("")
    const [carrinho, setCarrinho] = React.useState([])
    const [especiesList, setEspeciesList] = React.useState([])
    const [estoque, setEstoqueList] = React.useState([])
    const [visibleSucess, setvisibleSucess] = React.useState(false);
    const ShowSucess= () => setvisibleSucess(true);
    const hideSucess= () => setvisibleSucess(false);
    const [visibleCarrinhoVazio, setvisibleCarrinhoVazio] = React.useState(false);
    const ShowCarrinhoVazio= () => setvisibleCarrinhoVazio(true);
    const hideCarrinhoVazio= () => setvisibleCarrinhoVazio(false);
    const [loaded, setLoaded] = React.useState(false);

    const perfilAtual = Navigation.getState()["routes"][Navigation.getState()["index"]]["params"]
    const config = {
        headers: { 'token':perfilAtual.token }
    };
    React.useEffect(() =>{
        callbd = async () => {
            let response = await axios.get(`${URLBase}/tipoAnimais`,config)
            responseData = response.data
            list = []
            for (let i=0; i <responseData.length; i++){ 
                a = {
                    value:responseData[i][0],
                    label:responseData[i][1]
                }
                list.push(a)
            }
            response = await axios.get(`${URLBase}/estoque/idc/${perfilAtual.idCliente}`,config)
            responseData = response.data
            list1 = []
            for (let i=0; i <responseData.length; i++){ 
                a = {
                    idEstoque:responseData[i][0],
                    idCliente:responseData[i][1],
                    idTipoAnimal: responseData[i][2],
                    quantidade: responseData[i][3]
                }
                list1.push(a)
            }
            setLoaded(true)
            setEspeciesList(list)
            setEstoqueList(list1)

        }     
        if(loaded==false){callbd()}
    }) 

    const addCart = (quantidade,especie) =>{
        hideEstInsufi()
        hideQuantZero()
        hideSucess()
        hideCarrinhoVazio()
        if (quantidade==0){
            ShowQuantZero()
        }
        flag = false
        carrinho.forEach(elementCarrinho => {
            if (elementCarrinho.idTipoAnimal === especie){
                estoque.forEach(elementEstoque => {
                    if(elementEstoque.idTipoAnimal===especie){
                        if (elementCarrinho.quantidade+Number(quantidade)<=elementEstoque.quantidade){
                            elementCarrinho.quantidade += Number(quantidade) 
                            flag = true
                            return
                        }
                        else{
                            flag = true
                            ShowEstInsufi()
                            return
                        }
                    }
                    
                });
            }
        })
        if (flag==true){
            return
        }
        estoque.forEach(elementEstoque => {
            if (elementEstoque.idTipoAnimal === especie){
                if (elementEstoque.quantidade>=quantidade && quantidade > 0){
                    especiesList.forEach(elementEspeciesList => {
                        if (elementEspeciesList.value === especie){
                            carrinho.push({
                                idCarrinho: carrinho.length+1,
                                tipoAnimal: elementEspeciesList.label,
                                idTipoAnimal:elementEspeciesList.value,
                                quantidade: Number(quantidade)
                            })
                            return
                        }
                    });
                }
                else{
                    ShowEstInsufi()
                    return
                }

                
            }
        });
    }

    const enviarPedido = async() =>{
        if (carrinho ==[]){
            ShowCarrinhoVazio()
            return
        }
        else{
            day = new Date().getDate()
            month = new Date().getMonth()+1
            year = new Date().getFullYear()
            if (day<10){
                day = "0"+day
            }
            if (month<10){
                month = "0"+month
            }
            const pedido = {
                idCliente:Navigation.getState()["routes"][Navigation.getState()["index"]]["params"]["idCliente"],
                dataPedido: `${year}-${month}-${day}`,
                status:"Enviado"
            }
            let response = await axios.post(`${URLBase}/pedidos`,pedido,config)

            let list2 = []
            carrinho.forEach(elementCarrinho => {
                const detalhesPedido ={
                    idPedido: response.data[0][0],
                    idTipoAnimal: elementCarrinho.idTipoAnimal,
                    quantidade: elementCarrinho.quantidade
                }
                list2.push(detalhesPedido)
            });
            response = await axios.post(`${URLBase}/detalhesPedido/`,list2,config)

            setCarrinho([])
            setEspecies("")
            setQuantidade("")
            hideModal()
            ShowSucess()
        }
    }

    return (
        
        <View>
            
            <View>
                <Text variant="displaySmall"  style ={{textAlign:'center'}}>Novo Pedido</Text>
            </View>
            <View style={{ height:"2%", backgroundColor: "black",marginTop:10 }}/>
            <View >
                <TextInput label= "Quantidade" keyboardType='numeric' value={quantidade} onChangeText={quantidade=>setQuantidade(quantidade)}/>
                {visibleEstInvalido ===true &&
                    <HelperText type="error">Estoque Insuficiente</HelperText>
                }
                {visibleQuantZero ===true &&
                    <HelperText type="error">Quantidade Deve ser Maior que 0</HelperText>
                }
                
            </View>
            <View>
                <DropDown 
                label={"Especie"}
                visible={showDropDown}
                showDropDown={() => setShowDropDown(true)}
                onDismiss={() => setShowDropDown(false)}
                value={especies}
                setValue={setEspecies}
                list={especiesList} 
                dropDownStyle={{
                    width:'90%',
                }}
                />
        </View>
            <View>
                <Button icon="cart-arrow-down" mode="contained-tonal" onPress={() => addCart(quantidade,especies)}>Adicionar Ao Carrinho</Button>
                {visibleSucess=== true &&
                <Text variant="labelLarge" style ={{textAlign:'center'}}>Pedido Realizado com Sucesso</Text>
                }

            </View>
            <View>
            <Portal>
                <Modal visible={visible} onDismiss={hideModal} contentContainerStyle={{backgroundColor: 'white', padding: 20}}>
                <DataTable>
                        <DataTable.Header>
                            <DataTable.Title>Especie</DataTable.Title>
                            <DataTable.Title numeric>Quantidade</DataTable.Title>
                        </DataTable.Header>
                            {carrinho.map((carrinho)=>{
                                return (
                                    <DataTable.Row key={carrinho.idCarrinho}>
                                        <DataTable.Cell>{carrinho.tipoAnimal}</DataTable.Cell>
                                        <DataTable.Cell numeric>{carrinho.quantidade}</DataTable.Cell>
                                    </DataTable.Row>
                                )})}   
                </DataTable>
                    <Button icon="cart-check" mode="contained-tonal" onPress={() =>enviarPedido()}>Confirmar Pedido</Button>
                    {visibleCarrinhoVazio=== true &&
                    <Text variant="labelLarge" style ={{textAlign:'center'}}>Carrinho Vazio</Text>
                    }
                </Modal>
            </Portal>
            </View>
            <View style={{marginTop: 50}} />
            <FAB style={styles.fab}
                    icon="cart-outline"
                    onPress={showModal}
                    mode = "elevated"
                    size="55"/>
                <Badge style={styles.badge} visible={carrinho.length!=0}/>
        </View>
        
    )
}

const styles = StyleSheet.create({
    fab:{ 
        position: 'absolute',
        top: "90%",
        left: "85%"
    },
    badge:{
        position: 'absolute',
        top: "90%",
        left: "85%" 
    }
})

export default () => (
    <PaperProvider>
        <NovoPedido/>
    </PaperProvider>
)
