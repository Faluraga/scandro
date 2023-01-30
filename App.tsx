
import React, { useEffect, useState } from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Devolucion from './src/Devolucion';
import Home from './src/Home';
import Inicio from './src/Inicio';
import Login from './src/Login';
import Salidas from './src/Salidas';
import { readToken } from './src/storage/storage';
import { Provider } from 'react-redux';
import {store} from './src/redux/store'

const Stack = createNativeStackNavigator();


const App = ({ navigation, route }: { navigation: any, route: any }) =>
{


  const Stack = createNativeStackNavigator();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [token, setToken] = useState('');


  /// Metodo para leer el token del usuario logueado , desde el local-storage
  async function tokenUser()
  {
    const data: any = readToken();

    data.then((value: any) =>
    {
      setToken(value);
      console.log('TOKEN_INICIAL=>', token);


    }).catch((error: any) =>
    {
      console.log(error);

    });
  }
  useEffect(() =>
  {
    tokenUser();
    
    
  }, [])
  return (

    <Provider store={store}>
    <NavigationContainer>
      {token !== "" && token !== undefined ?
        <Stack.Navigator>
          <Stack.Screen name="Home" component={Home} options={{ headerShown: false }} />
          <Stack.Screen name="Login" component={Login} options={{ headerShown: false }} />
          <Stack.Screen name="Devolucion" component={Devolucion} options={{ headerShown: false }} />
          <Stack.Screen name="Salidas" component={Salidas} options={{ headerShown: false }} />
        </Stack.Navigator> :
         <Stack.Navigator>
         <Stack.Screen name="Inicio" component={Inicio} options={{ headerShown: false }} />
         <Stack.Screen name="Login" component={Login} options={{ headerShown: false }} />
         <Stack.Screen name="Home" component={Home} options={{ headerShown: false }} />
         <Stack.Screen name="Devolucion" component={Devolucion} options={{ headerShown: false }} />
         <Stack.Screen name="Salidas" component={Salidas} options={{ headerShown: false }} />
       </Stack.Navigator>
      }
    </NavigationContainer>
    </Provider>
  );
}

export default App;