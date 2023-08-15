import * as React from "react";
import { View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { PaperProvider, Text, List } from "react-native-paper";

const Perfil = () =>{
    const Navigation = useNavigation();
    return (
        <View style={{ height:"100%" }}>
            <View style={{ height:"40%", backgroundColor: "black", borderBottomLeftRadius: 20,borderBottomRightRadius: 20, 
            display: 'flex', justifyContent:'center', alignItems: 'center' }}>
                <Text variant="displaySmall"  style ={{color: 'white',textAlign:'center'}} adjustsFontSizeToFit = {true} numberOfLines = {2}
                >Olá, Nome_Empresa</Text>
                <Text variant="headlineSmall" style = {{color: "white",textAlign:'center'}}
                adjustsFontSizeToFit = {true} numberOfLines = {1}>Representante: Nome_Representante</Text>
                <Text variant="titleMedium" style = {{color: "white",textAlign:'center'}} adjustsFontSizeToFit = {true} 
                numberOfLines = {1}>Contato: Numero_Represente</Text>
            </View>
            <View>
            <List.Item
                title="Novo Pedido"
                description="Item description"
                left={props => <List.Icon {...props} icon="plus"/>}
                onPress={()=> Navigation.navigate("NovoPedido")}
            />
            <List.Item
                title="Editar Pedido"
                description="Item description"
                left={props => <List.Icon {...props} icon="file-edit" />}
                onPress={() => Navigation.navigate("EditPedido")}
            />
            <List.Item
                title="Relatorio de Pedidos"
                description="Item description"
                left={props => <List.Icon {...props} icon="file-chart" />}
                onPress={() => Navigation.navigate("Relat")}
            />
            <List.Item
                title="Consultar seu Estoque"
                description="Item description"
                left={props => <List.Icon {...props} icon="cow" />}
                onPress={()=> Navigation.navigate("ConsulEst")}
            />
            <List.Item
                title="Editar Perfil"
                description="Item description"
                left={props => <List.Icon {...props} icon="account-edit-outline" />}
                onPress={()=> Navigation.navigate("EditPerfil")}
            />
            <List.Item
                title="Sair"
                left={props => <List.Icon {...props} icon="logout-variant" />}
                onPress={()=> Navigation.goBack}
            />
            </View>
        </View>
    )
}

export default () => (
    <PaperProvider>
        <Perfil/>
    </PaperProvider>
)
