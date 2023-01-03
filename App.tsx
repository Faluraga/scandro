
import React, { useEffect, useState } from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import InicioScreen from "./src/Inicio";
import LoginScreen from "./src/Login";
import HomeScreen from "./src/Home";
import Devolucion from './src/Devolucion';
import DevolucionScreen from './src/Devolucion';
import SalidasScreen from './src/Salidas';
import Home from './src/Home';
import { readToken } from './src/storage/storage';


const App = ({ navigation, route }: { navigation: any, route: any }) =>
{


  const Stack = createNativeStackNavigator();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [token, setToken] = React.useState('');


  /// Metodo para leer el token del usuario logueado , desde el local-storage
  async function tokenUser()
  {
    const data: any = readToken();

    data.then((value: any) =>
    {
      setToken(value);
      //console.log('TOKEN_INICIAL=>', token);


    }).catch((error: any) =>
    {
      console.log(error);

    });
  }
  useEffect(() =>
  {
    tokenUser();
    console.log(token);
    
  }, [])
  return (
    <NavigationContainer>

      {token !== "" ?

        <Stack.Navigator>
          <Stack.Screen name="Home" component={HomeScreen} options={{ headerShown: false }} />
          <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
          <Stack.Screen name="Devolucion" component={DevolucionScreen} options={{ headerShown: false }} />
          <Stack.Screen name="Salidas" component={SalidasScreen} options={{ headerShown: false }} />
        </Stack.Navigator> :
         <Stack.Navigator>
         <Stack.Screen name="Inicio" component={InicioScreen} options={{ headerShown: false }} />
         <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
         <Stack.Screen name="Home" component={HomeScreen} options={{ headerShown: false }} />
         <Stack.Screen name="Devolucion" component={DevolucionScreen} options={{ headerShown: false }} />
         <Stack.Screen name="Salidas" component={SalidasScreen} options={{ headerShown: false }} />
       </Stack.Navigator>
      }
    </NavigationContainer>
  );
}

export default App;