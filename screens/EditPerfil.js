import React, { useState } from "react";
import { View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { PaperProvider, Button, TextInput, HelperText, Text} from "react-native-paper";
import md5 from "md5";
import axios from "axios";
import {URLBase} from "../const"

const EditPerfil = () =>{ 
    const Navigation = useNavigation();
    const perfilAtual = Navigation.getState()["routes"][Navigation.getState()["index"]]["params"]
    const [user, setValue] = React.useState(perfilAtual.nomeEmpresa)
    const [represent, setRepresent] = React.useState(perfilAtual.nomeRepresentante)
    const [contato, setContato] = React.useState(perfilAtual.contatoRepre)
    const [valueSenha, setValueSenha] = React.useState('')
    const [valueConfSenha, setValueConfSenha] = React.useState('')
    const [secureTextEntry,setSecureTextEntry] = React.useState(true)
    const [secureTextEntryConf,setSecureTextEntryConfirm] = React.useState(true)
    const config = {
        headers: { 'token':perfilAtual.token }
    };
    
    const toggleSecurity = () => {
        setSecureTextEntry(!secureTextEntry)
    }
    const toggleSecurityConfirm = () => {
        setSecureTextEntryConfirm(!secureTextEntryConf)
    }

    var listVerifi = ["0",'1','2','3','4','5','6','7','8','9']
    const vericLetras = (contato) =>{
        for(const number of contato){
            if(!listVerifi.includes(number)){
                return true
            }
        }
        return false
    }

    const PerfilEditado = async () => {
        if (represent.length<=5 || vericLetras(contato)||contato.length!=11 
        || valueSenha.length <5 || valueConfSenha!=valueSenha){
            return
        }
        const perfilEnviar ={
            nomeRepresentante: represent,
            contatoRepre: contato,
            senha: md5(valueSenha)
        }
        let response = await axios.put(`${URLBase}/clientes/idc/${perfilAtual.idCliente}`,perfilEnviar,config)
        response = response.data
        Navigation.navigate("Perfil",{
            idCliente: perfilAtual.idCliente,
            nomeEmpresa: perfilAtual.nomeEmpresa,
            nomeRepresentante: perfilEnviar.nomeRepresentante,
            contatoRepre: perfilEnviar.contatoRepre}
        )

    }

    return (
        <View>
            <View style={{marginTop:10 }}>
                <Text variant="headlineMedium" 
                style={{textAlign:'center'}}>Editar Perfil</Text>
            </View>
            <View style={{ height:"2%", backgroundColor: "black",marginTop:10 }}/>
            <View>
                <TextInput label={"Nome Representante"}  value={represent} onChangeText={represent => setRepresent(represent)}/>
                {(represent.length>0 && represent.length<=5) && <HelperText type="error" visible={true}>Nome Representante Invalido</HelperText>}
                <TextInput keyboardType='text' label={"Contato Representante"}  value={contato} onChangeText={contato => setContato(contato)}/>
                <TextInput 
                label={"Nova Senha"} 
                value={valueSenha} 
                onChangeText={valueSenha => setValueSenha(valueSenha)} 
                secureTextEntry = {secureTextEntry} 
                right={<TextInput.Icon icon="eye" onPress={()=> toggleSecurity()}/>}/>
                {(valueSenha.length <5 && valueSenha.length>0) && <HelperText type="error">Senha Invalida</HelperText>}
                <TextInput 
                label={"Confirmar Senha"} value={valueConfSenha} 
                onChangeText={valueConfSenha => setValueConfSenha(valueConfSenha)} 
                secureTextEntry = {secureTextEntryConf} 
                right={<TextInput.Icon icon="eye" onPress={()=> toggleSecurityConfirm()}/>}/>
                {(valueConfSenha!=valueSenha && valueConfSenha.length!=0) && <HelperText type="error">Senhas não Correspodem</HelperText>}
            </View>
            <View >
                <Button mode= "contained-tonal" icon={"account-edit"} onPress={() => PerfilEditado()}>Confirmar Mudanças</Button>
            </View>
        </View>
    )
}

export default () => (
    <PaperProvider>
        <EditPerfil/>
    </PaperProvider>
)
