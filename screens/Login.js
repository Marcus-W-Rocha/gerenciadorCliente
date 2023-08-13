import * as React from "react";
import { View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { PaperProvider,Text, Button, TextInput, HelperText } from "react-native-paper";

const Login =() => {
    const Navigation = useNavigation();
    const [user, setValue] = React.useState('')
    const [valueSenha, setValueSenha] = React.useState('')
    const [secureTextEntry,setSecureTextEntry] = React.useState(true)

    const renderCaptionUser = () =>{
        return (
            <View>
                <Text>tamanho minimo de 8 caracteres</Text>
            </View>
        )
    }
    const toggleSecurity = () => {
        setSecureTextEntry(!secureTextEntry)
    }
    const renderCaptionSenha = () =>{
        return (
            <View>
                <Text category="label"></Text>
            </View>
        )
    }

    return (
        <View>
            <View>
                <Text variant = 'displayLarge' style ={{textAlign:'center', fontWeight: "bold"}}>Login</Text>
            </View>
            <View>
                <TextInput 
                label= "Usuario" 
                value={user} 
                onChangeText={user => setValue(user)}/>
                <HelperText type="error">Usuario Invalida</HelperText>
            </View>
            <View>
                <TextInput 
                    label= "Senha" 
                    value={valueSenha} 
                    onChangeText={valueSenha => setValueSenha(valueSenha)} 
                    secureTextEntry = {secureTextEntry} 
                    right={<TextInput.Icon icon="eye" onPress={()=> toggleSecurity()}/>}
                />
                <HelperText type="error">Senha Invalida</HelperText>
            </View>
            <View>
            <Button icon="login-variant" mode="contained-tonal" onPress={() => Navigation.navigate("Perfil")}>Entrar</Button>
            </View>
        </View>
    )
}

export default () =>(
    <PaperProvider>
        <Login/>
    </PaperProvider>
)
