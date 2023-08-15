import React, { useState } from "react";
import { View, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { PaperProvider, Button, TextInput, HelperText, Text} from "react-native-paper";



const EditPerfil = () =>{ 
    const Navigation = useNavigation();
    const [user, setValue] = React.useState('')
    const [valueSenha, setValueSenha] = React.useState('')
    const [valueConfSenha, setValueConfSenha] = React.useState('')
    const [secureTextEntry,setSecureTextEntry] = React.useState(true)
    const toggleSecurity = () => {
        setSecureTextEntry(!secureTextEntry)
    }
    return (
        <View>
            <View style={{marginTop:10 }}>
                <Text variant="headlineMedium" 
                style={{textAlign:'center'}}>Editar Perfil</Text>
            </View>
            <View style={{ height:"2%", backgroundColor: "black",marginTop:10 }}/>
            <View><TextInput label={"Usuario"} value={user} onChangeText={user => setValue(user)}/>
                <HelperText type="error">Usuario Invalida</HelperText>
            <TextInput label={"Contato Representante"}/>
            <TextInput 
                label={"Senha"} 
                value={valueSenha} 
                onChangeText={valueSenha => setValueSenha(valueSenha)} 
                secureTextEntry = {secureTextEntry} 
                right={<TextInput.Icon icon="eye" onPress={()=> toggleSecurity()}/>}/>
                <HelperText type="error">Senha Invalida</HelperText>
            <TextInput 
                label={"Confirmar Senha"} value={valueConfSenha} 
                onChangeText={valueConfSenha => setValueConfSenha(valueConfSenha)} 
                secureTextEntry = {secureTextEntry} 
                right={<TextInput.Icon icon="eye" onPress={()=> toggleSecurity()}/>}/>
                <HelperText type="error">Senha Invalida</HelperText>
            </View>
            <View >
                <Button mode= "contained-tonal" Icon={"account-edit"} onPress={() => console.log("Confirmar")}>Confirmar Mudanças</Button>
            </View>
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
