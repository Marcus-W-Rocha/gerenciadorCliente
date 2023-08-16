import * as React from "react";
import { View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { PaperProvider,Text, Button, TextInput, HelperText } from "react-native-paper";
import md5 from "md5";
import Perfil from "./Perfil";
import { Alert } from "react-native";

const Login =() => {
    const Navigation = useNavigation();
    const [user, setValue] = React.useState('')
    const [valueSenha, setValueSenha] = React.useState('')
    const [secureTextEntry,setSecureTextEntry] = React.useState(true)

    const toggleSecurity = () => {
        setSecureTextEntry(!secureTextEntry)
    }

    const Login = () =>{
        log = {
            user:user,
            senha:md5(valueSenha)
        }
        //esses dados devem ser enviados para o banco de dados e seu retorno deve ser colocado numa variavel token,
       //caso o token seja valido devera fazer-se
       const token = true
       const PerfilAtual = {//deve-se recuperar os dados do cliente de acordo com o token (e seu id)
            idCliente: 1,
            nomeEmpresa: "Empresa Teste",
            nomeRepresentante: "Representante Teste",
            contatoRepre: "86995157777",
            senha: md5("12345678")}
       
       
       if (token){
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
            <Button icon="login-variant" mode="contained-tonal" onPress={() => Login()}>Entrar</Button>
            </View>
        </View>
    )
}

export default () =>(
    <PaperProvider>
        <Login/>
    </PaperProvider>
)
