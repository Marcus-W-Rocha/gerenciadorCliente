import React, { useState } from "react";
import { View, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { PaperProvider,Text, Button, TextInput, Badge,FAB,  Portal,Modal,DataTable, HelperText } from "react-native-paper";
import DropDown from "react-native-paper-dropdown";


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
    const [visibleSucess, setvisibleSucess] = React.useState(false);
    const ShowSucess= () => setvisibleSucess(true);
    const hideSucess= () => setvisibleSucess(false);
    const [visibleCarrinhoVazio, setvisibleCarrinhoVazio] = React.useState(false);
    const ShowCarrinhoVazio= () => setvisibleCarrinhoVazio(true);
    const hideCarrinhoVazio= () => setvisibleCarrinhoVazio(false);

    {/* Recupera do BD lista de especie e colocar nesse vetor. 
    idTipoAnimal INTEGER PRIMARY KEY,
    especie TEXT NOT NULL*/}
    
    const especiesList = [
        {
            label:"especie1",
            value:1
        },
        {
            label: "especie2",
            value: 2
        },
        {
            label: "especie3",
            value: 3
        }
    ]

    {/*Recuperar do bd estoque do cliente e colcoar nesse vetor
    */}
    const estoque = [
        {
            idEstoque: 1,
            idCliente:1,
            idTipoAnimal:1,
            quantidade:4
        },
        {
            idEstoque: 2,
            idCliente:1,
            idTipoAnimal:2,
            quantidade:6
        },
        {
            idEstoque: 3,
            idCliente:1,
            idTipoAnimal:3,
            quantidade:9
        }
    ]

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

    const enviarPedido = () =>{
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
                dataPedido: `${month}-${day}-${year}`,
                status:"Enviado"
            }
            console.log(pedido)
            // enviar o objeto pedido para o banco de dados e esperar o retorno do idPedido
            carrinho.forEach(elementCarrinho => {
                const detalhesPedido ={
                    idPedido: "a Definir",
                    idTipoAnimal: elementCarrinho.idTipoAnimal,
                    quantidade: elementCarrinho.quantidade
                }
                console.log(detalhesPedido)
                //enviar para banco de dados
            });
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
