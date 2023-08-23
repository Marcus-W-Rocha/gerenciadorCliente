import * as React from "react";
import { View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { PaperProvider,Text, Button, TextInput, HelperText } from "react-native-paper";
import md5 from "md5";
import { Alert } from "react-native";
import axios from "axios";
import {URLBase} from "../const"

const Login =() => {
    const Navigation = useNavigation();
    const [user, setValue] = React.useState('')
    const [valueSenha, setValueSenha] = React.useState('')
    const [secureTextEntry,setSecureTextEntry] = React.useState(true)

    

    const toggleSecurity = () => {
        setSecureTextEntry(!secureTextEntry)
    }

    const LoginAuth = async () =>{
        log = {
            user:user,
            senha:md5(valueSenha)
        }
        const response = await axios.post(`${URLBase}/clientes/login`,log)
       if (response.data != "Credenciais Invalidas"){
            const PerfilAtual = {
                idCliente: response.data[0],
                nomeEmpresa: response.data[1],
                nomeRepresentante: response.data[2],
                contatoRepre: response.data[3],
                user: response.data[4],
                token: response.data[5]
            }
            Navigation.navigate("Perfil",PerfilAtual)
       }       
       else{
        Alert.alert(
            'Error',
            'Login Invalido',
            [
              { text: 'Ok' }
            ],
          );
       }

    }

    return (
        <View>
            <View>
                <Text variant = 'displayLarge' style ={{textAlign:'center', fontWeight: "bold"}}>Login</Text>
            </View>
            <View style={{ height:"2%", backgroundColor: "black",marginTop:10 }}/>
            <View>
                <TextInput 
                label= "Usuario" 
                value={user} 
                onChangeText={user => setValue(user)}/>
                {(user.length!=0 && user.length<6) && <HelperText type="error">Usuario Invalido</HelperText>}
            </View>
            <View>
                <TextInput 
                    label= "Senha" 
                    value={valueSenha} 
                    onChangeText={valueSenha => setValueSenha(valueSenha)} 
                    secureTextEntry = {secureTextEntry} 
                    right={<TextInput.Icon icon="eye" onPress={()=> toggleSecurity()}/>}
                />
                {(valueSenha.length!=0 && valueSenha.length<6) && <HelperText type="error">Senha Invalida</HelperText>}
            </View>
            <View>
            <Button icon="login-variant" mode="contained-tonal" onPress={() => LoginAuth()}>Entrar</Button>
            </View>
        </View>
    )
}

export default () =>(
    <PaperProvider>
        <Login/>
    </PaperProvider>
)
