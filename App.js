import { StatusBar } from 'expo-status-bar';
import { StyleSheet, LogBox} from 'react-native';
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
LogBox.ignoreLogs(['Warning: ...'])
LogBox.ignoreAllLogs()

const Stack = createNativeStackNavigator();


export default function App() {
  return (
    <NavigationContainer>
    <Stack.Navigator initialRouteName='Login'>
      <Stack.Screen options={{headerTitle:""}} name = "Login" component={Login}/>
      <Stack.Screen options={{headerTitle:""}} name = "Perfil" component={Perfil}/>
      <Stack.Screen options={{headerTitle:""}} name = "NovoPedido" component={NovoPedido}/>
      <Stack.Screen options={{headerTitle:""}} name = "EditPerfil" component={EditPerfil}/>
      <Stack.Screen options={{headerTitle:""}} name = "EditPedido" component={EditPedido}/>
      <Stack.Screen options={{headerTitle:""}} name = "ConsulEst" component={ConsulEst}/>
      <Stack.Screen options={{headerTitle:""}} name = "Relat" component={Relat}/>
      <Stack.Screen options={{headerTitle:""}} name = "ListaPedidos" component={ListaPedidos}/>
      <Stack.Screen options={{headerTitle:""}} name = "DetAbate" component={DetAbate}/>
      <Stack.Screen options={{headerTitle:""}} name = "EditScreen" component={EditScreen}/>
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
