import React, { useState } from "react";
import { View, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { PaperProvider, Button, TextInput, HelperText, Text} from "react-native-paper";
import md5 from "md5";

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

    const PerfilEditado = () => {
        if (represent.length<=5 || vericLetras(contato)||contato.length!=11 
        || valueSenha.length <5 || valueConfSenha!=valueSenha){
            return
        }
        const perfilEnviar ={//esse dado eh enviado ao banco de dados junto com o id de cliente para editar o perfil.
            nomeRepresentante: represent,
            contatoRepre: contato,
            senha: md5(valueSenha)
        }
        Navigation.navigate("Perfil",{
            idCliente: perfilAtual.idCliente,
            nomeEmpresa: perfilAtual.nomeEmpresa,
            nomeRepresentante: represent,
            contatoRepre: contato,
            senha: md5(valueSenha)}
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
                {/* <TextInput label={"Nome Empresa"} value={user} onChangeText={user => setValue(user)}/>
                <HelperText type="error">Nome Empresa Invalido</HelperText> */}
                <TextInput label={"Nome Representante"}  value={represent} onChangeText={represent => setRepresent(represent)}/>
                {(represent.length>0 && represent.length<=5) && <HelperText type="error" visible={true}>Nome Representante Invalido</HelperText>}
                <TextInput keyboardType='phone-pad' label={"Contato Representante"}  value={contato} onChangeText={contato => setContato(contato)}/>
                {vericLetras(contato)&&<HelperText type="error" visible= {true}>Caracter Invalido</HelperText>}
                {(contato.length!=0 && contato.length!=11) && <HelperText type="error" visible= {true}>Numero Invalido</HelperText>}
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
