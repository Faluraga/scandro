
import React, { useState } from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import InicioScreen from "./screens/Inicio";
import LoginScreen from "./screens/Login";
import HomeScreen from "./screens/Home";
import Devolucion from './screens/Devolucion';
import DevolucionScreen from './screens/Devolucion';
import SalidasScreen from './screens/Salidas';





const Stack = createNativeStackNavigator();

function App() {

  const [isLoggedIn, setIsLoggedIn] = useState(false)

  
  return (
    <NavigationContainer>
   
        <Stack.Navigator> 
          {/* <Stack.Screen name = "Splash" component ={SplashScreen} options={{headerShown:false}}/> */}
          <Stack.Screen name = "Inicio" component ={InicioScreen} options={{headerShown:false}}/>
          <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
          <Stack.Screen name = "Home" component ={HomeScreen} options={{headerShown:false}}/>
          <Stack.Screen name = "Devolucion" component ={DevolucionScreen} options={{headerShown:false}}/>
          <Stack.Screen name = "Salidas" component ={SalidasScreen} options={{headerShown:false}}/>

          

        </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;