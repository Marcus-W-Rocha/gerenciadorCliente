import { StatusBar } from 'expo-status-bar';
import { StyleSheet} from 'react-native';
import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Login from './screens/Login';
import Perfil from './screens/Perfil';
import NovoPedido from './screens/NovoPedido';
import EditPerfil from './screens/EditPerfil';
import EditPedido from './screens/EditPedido';
import ConsulEst from './screens/ConsulEst';
import Relat from './screens/Relat';
import ListaPedidos from './screens/ListaPedidos';
import DetAbate from './screens/DetAbate';
import EditScreen from './screens/EditScreen';
import { pt, registerTranslation } from 'react-native-paper-dates'
import md5 from 'md5';
registerTranslation("pt",pt)

const Stack = createNativeStackNavigator();


export default function App() {
  return (
    <NavigationContainer>
    <Stack.Navigator initialRouteName='Perfil'>
      <Stack.Screen name = "Login" component={Login}/>
      <Stack.Screen name = "Perfil" component={Perfil} initialParams={{
          idCliente: 1,
          nomeEmpresa: "Empresa Teste",
          nomeRepresentante: "Representante Teste",
          contatoRepre: "86995157777",
          senha: md5("12345678")}
      }/>
      <Stack.Screen name = "NovoPedido" component={NovoPedido}/>
      <Stack.Screen name = "EditPerfil" component={EditPerfil}/>
      <Stack.Screen name = "EditPedido" component={EditPedido}/>
      <Stack.Screen name = "ConsulEst" component={ConsulEst}/>
      <Stack.Screen name = "Relat" component={Relat}/>
      <Stack.Screen name = "ListaPedidos" component={ListaPedidos}/>
      <Stack.Screen name = "DetAbate" component={DetAbate}/>
      <Stack.Screen name = "EditScreen" component={EditScreen}/>
    </Stack.Navigator>
    </NavigationContainer>
  );
}

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    margin: 1
  },
  ButtonGroup: {
    margin: 2
  }
});
