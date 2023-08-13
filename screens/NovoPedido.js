import * as React from "react";
import { View, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { PaperProvider,Text, Button, TextInput, HelperText,Badge,FAB } from "react-native-paper";


const NovoPedido = () =>{
    const Navigation = useNavigation();
    return (
        
        <View>
            
            <View>
                <Text variant="displaySmall"  style ={{textAlign:'center'}}>Novo Pedido</Text>
            </View>
            <View >
                <TextInput label= "Quantidade"/>
            </View>
            <View>
                
            </View>
            <FAB style={styles.fab}
                    icon="cart-outline"
                    onPress={() => console.log('Pressed')}
                    mode = "elevated"
                    size="55"/>
                <Badge>3</Badge>
        </View>
    )
}

const styles = StyleSheet.create({
    fab:{ 
        alignItems: 'center',
        justifyContent: 'center',
        position: 'absolute',

    }
})

export default () => (
    <PaperProvider>
        <NovoPedido/>
    </PaperProvider>
)
