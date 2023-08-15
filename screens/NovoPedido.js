import React, { useState } from "react";
import { View, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { PaperProvider,Text, Button, TextInput, Badge,FAB,  Portal,Modal,DataTable } from "react-native-paper";
import DropDown from "react-native-paper-dropdown";


const NovoPedido = () =>{
    const Navigation = useNavigation();
    const [showDropDown, setShowDropDown] = useState(false);
    const [especies, setEspecies] = useState ("");
    const showModal = () => setVisible(true);
    const hideModal = () => setVisible(false);
    const [visible, setVisible] = React.useState(false);
    
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
    const carrinho =[]
    
    return (
        
        <View>
            
            <View>
                <Text variant="displaySmall"  style ={{textAlign:'center'}}>Novo Pedido</Text>
            </View>
            <View style={{ height:"2%", backgroundColor: "black",marginTop:10 }}/>
            <View >
                <TextInput label= "Quantidade"/>
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
                <Button icon="cart-arrow-down" mode="contained-tonal" onPress={() => console.log("adicionar ao carrinho")}>Adicionar Ao Carrinho</Button>
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
                    <Button icon="cart-check" mode="contained-tonal" onPress={() => console.log("envio pedido")}>Confirmar Pedido</Button>
                </Modal>
            </Portal>
            </View>
            <View style={{marginTop: 50}} />
            <FAB style={styles.fab}
                    icon="cart-outline"
                    onPress={showModal}
                    mode = "elevated"
                    size="55"/>
                <Badge style={styles.badge}>3</Badge>
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
