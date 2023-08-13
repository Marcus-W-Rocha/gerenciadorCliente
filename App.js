import { StatusBar } from 'expo-status-bar';
import { StyleSheet} from 'react-native';
import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Login from './screens/Login';
import Perfil from './screens/Perfil';
import NovoPedido from './screens/NovoPedido';


const Stack = createNativeStackNavigator();


export default function App() {
  return (
    <NavigationContainer>
    <Stack.Navigator initialRouteName='NovoPedido'>
      <Stack.Screen name = "Login" component={Login}/>
      <Stack.Screen name = "Perfil" component={Perfil}/>
      <Stack.Screen name = "NovoPedido" component={NovoPedido}/>
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
