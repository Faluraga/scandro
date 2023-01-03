
//Importaciones
import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TextInput, ImageBackground, TouchableOpacity, ScrollView, Image, Button } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';
import { Menu, Divider, Provider } from 'react-native-paper';
import SalidasScreen from './Salidas';
import DevolucionScreen from './Devolucion';
import Sidebar from './components/sidebar';
import { readToken,deleteToken,saveToken } from './storage/storage';






 const Home = ({ navigation, route }:{ navigation: any, route: any })=>
{


    /////Estados/////   
    const [visibleCodeBar, setVisibleCodeBar] = useState(true);
    const [visible, setVisible] = useState(false);
    const openMenu = () => setVisible(!visible);
    const closeMenu = () => setVisible(!visible);
    const [data, setData] = useState([{}]);
    const [token, setToken] = React.useState('');
    var urlBaseDevelomentOrders = 'https://bd43-179-32-16-224.ngrok.io/api/logout';





    /////Estilos//////
    const styles = StyleSheet.create({

        view: {
            width: '100%',
            height: '100%',
            flex: 1
        },

        fondo: {

            height: '100%',
            width: '100%',
            resizeMode: 'contain',
            alignItems: 'center'
        },

        IntroMoneda: {
            flexDirection: "row",
            paddingTop: "18%"
        },

        texCoin: {
            width: "60%",
            height: "30%",
            borderRadius: 25,
            borderColor: "#4D1A70",
            paddingLeft: 8,
            justifyContent: "center",
            alignContent: "center",
            alignItems: 'center',
            display: 'flex',
            borderWidth: 1,
            marginLeft: 6
        },

        iconsearch: {
            width: "22%",
            alignItems: "center",
            paddingRight: "10%",

            padding: "2%"
        },

        menuNav: {
            flex: 1,
            width: "100%",
            alignItems: 'flex-start',
            right:30,
            position: "absolute",
            top:80

        },

        titulos: {
            color: "#F2900B",
            bottom: '5%',
            flexDirection: 'row',
            width: '100%',
            height: '5%',
            marginTop: "-10%"
        },

        containerBarCode: {
            display: visibleCodeBar ? 'none' : 'flex',
            flex: 1,
            backgroundColor: '#fff',
            alignItems: 'center',
            justifyContent: 'center',
        },
        maintext: {
            fontSize: 18,
            color: 'tomato',
            margin: 20,
        },
        barcodebox: {
            alignItems: 'center',
            justifyContent: 'center',
            height: 200,
            width: 300,
            overflow: 'hidden',
            borderRadius: 30,
            backgroundColor: 'tomato'
        },
        btn_devolucion: {
            top: 290,
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: "orange",
            borderRadius: 20,

        },

        text_devolucion: {
            fontSize: 30,
            fontWeight: 'bold',
            color: "white"
        },
        btn_salidas: {
            top: 350,
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: "orange",
            borderRadius: 20
        },

        text_salidas: {
            fontSize: 30,
            fontWeight: 'bold',
            color: "white"
        },
    })

    useEffect(() =>
    {
        tokenUser();
  
    })


   /// Metodo para leer el token del usuario logueado , desde el local-storage
   async function tokenUser()
   {
       const data: any = readToken();

       data.then((value: any) =>
       {
           setToken(value);
           //console.log('TOKEN_HOME =>:',token);

       }).catch((error: any) =>
       {
           console.log(error);

       });
   }


    /// Metodo para cerrar sesion desde backend dropi 
  async function logout()
  {
    try
    {
      var response = await fetch(urlBaseDevelomentOrders, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        //body: JSON.stringify({  })
      }).then(res => res.json())

        .then(resData =>
        {
            
          if (resData.isSuccess == true)
          {

            const logout = resData.message;
            alert('Sesión cerrada exitosamente')
            console.log(logout);
          }


        });

    } catch (e)
    {
      console.log('ERROR :', e);
      //alert(e)
    }
  }

  async function sesionClose()
  {

    try
    {
     logout().then(()=>{
        setTimeout(() => {
            navigation.navigate('Login')
        }, 800);
     }).then(()=>{
        saveToken(''); 
     })
    
    } catch (error)
    {
      console.log(error);

    }

  }
 


    return (
        <View style={styles.view}>
            <ImageBackground source={require('../Img/fondo_blanco.png')} style={styles.fondo}>
                <View>
                    <View>
                        <Provider>
                            <View style={styles.menuNav}>
                                <Menu
                                    visible={visible}
                                    contentStyle={{backgroundColor:'#ea6e2d'}}
                                    onDismiss={closeMenu}
                                    anchorPosition ={'bottom'}
                                    anchor={
                                        <TouchableOpacity onPress={openMenu}>
                                            <FontAwesome5 name="bars" size={30} color="#ea6e2d"  FA5Style={{light:true}} />
                                        </TouchableOpacity>}>
                                    <Menu.Item title="Configuración" titleStyle={{color:'white'}} />
                                    <Divider />
                                    <Menu.Item onPress={() => sesionClose()} title="Cerrar sesion" titleStyle={{color:'white'}} />
                                </Menu>
                            </View>
                        

                        <TouchableOpacity style={styles.btn_devolucion} onPress={() => navigation.navigate("Devolucion")}>
                            {/* <Text style={styles.text_devolucion}>
                            DEVOLUCIÓN 
                            <FontAwesome5 name="angle-double-right" size={30} color={"white"} onPress={() => navigation.goBack()} />
                        </Text> */}
                            <Image
                                style={{ width: 250, height: 90 }}
                                source={require('../Img/BOTÓN-DEVOLUCIONES.png')}
                            />
                        </TouchableOpacity>

                        <TouchableOpacity onPress={() => navigation.navigate("Salidas")} style={styles.btn_salidas} >
                            {/* <Text style={styles.text_salidas}>
                            SALIDAS 
                            <FontAwesome5 name="angle-double-right" size={30} color={"white"} onPress={() => navigation.goBack()} />
                        </Text> */}
                            <Image
                                style={{ width: 250, height: 90 }}
                                source={require('../Img/BOTÓN-SALIDAS.png')}
                            />
                        </TouchableOpacity>
                        </Provider>
                    </View>
                </View>
            </ImageBackground>
            <Sidebar />
        </View>
    )
}

export default Home;
