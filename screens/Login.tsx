//Pantalla de Iniciar Sesion

//importaciones
import React, { useState } from 'react'
import { TextInput, Text, View, StyleSheet, ImageBackground, TouchableOpacity, Image } from "react-native"
import axios, { AxiosResponse } from 'axios';
import Moneda from './Home';


//Estilos
const styles = StyleSheet.create({
    view: {
        flex: 1,
        width: "100%",
        height: '100%',
        justifyContent: "center",
        alignItems: "center",
        alignContent: "center"
    },

    fondo: {
        flex: 2,
        height: '100%',
        width: '100%',
        resizeMode: 'contain',
        alignItems: 'center',
        justifyContent: "center",
        marginBottom: "-10%"
    },

    btn_login: {
        top: 60,
        width: "60%",
        height: '30%',
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "orange",
        borderRadius: 20
    },

    text_login: {
        fontSize: 20,
        fontWeight: 'bold',
        color: "white"
    },

    develop: {
        marginBottom: 20,
        textAlign: "center",
        top: '15%'
    },

    logo: {
        alignItems: "center",
        left: 24
        //top: '-5%',
        //marginBottom: '-20%'
    },

    Imagenlogo: {
        resizeMode: 'contain',
        width: 150,
        height: 150
    },

    textbox_input: {
        position: 'relative',
        top: 80,
        marginTop: 5,
        height: 42,
        width: "92%",
        borderRadius: 10,
        alignItems: "center",
        borderColor: '#4D1A70',
        borderWidth: 1,
        paddingLeft: 6,
        backgroundColor: '#fff'
    }
})

//Funcion principal del login
export default function LoginScreen({ navigation, route })
{

    const [email, setEmail] = useState({});
    const [pass, setPass] = useState("");
    const [token, setToken] = useState('');
    const [data, setData] = useState({});

    var urlBaseProductionLogin = 'https://api.dropi.co/api/login';
    var urlBaseDevelomentLogin = 'https://4653-161-18-229-214.ngrok.io/api/login';

    // funcion para validar si el correo tiene un formtao correcto
    function validadorCorreo(email :any) {

        const expReg = /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/;
        const esValido = expReg.test(email)
        return esValido

    }

    ////////Funcion de login ////////
    async function login()
    {

        try
        {
            var response = await fetch(urlBaseDevelomentLogin, {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ "email": email, "password": pass, "white_brand_id": 1 })
            }).then(res => res.json())

                .then(resData =>
                {

                    if (resData.message == "La combinación de inicio de sesión / correo electrónico no es correcta, intente nuevamente.")
                    {

                        alert('La contraseña ó el correo electrónico incorrecta , intente nuevamente');
                    }


                    if (resData.message == "Ha ingresado al sistema correctamente" && resData.isSuccess === true)
                    {

                        console.log('Ingreso exitoso');
                        alert('Ingreso existoso')

                        navigation.navigate("Home");


                    }
                });

        } catch (e)
        {
            console.log('ERROR :', e);
            alert(e)
        }
    }
    //Front
    return <View style={styles.view}>
        <ImageBackground source={require('../Img/FONDO-3.png')} style={styles.fondo}>

            <View style={styles.logo}>
                <Image style={styles.Imagenlogo} source={require('../Img/dropiSettings.png')} />
            </View>

            {/* <View style={{marginTop: 50, marginBottom:30}} >
                <Text style={{ fontSize: 30, fontWeight: "700", marginBottom: 20 , color: "#FBBA00" }}>
                    SCANNER DROPI
                </Text>
            </View> */}

            <View style={{ justifyContent: "center", alignItems: "center", width: "93%", marginTop: 20 }}>
                <TextInput style={styles.textbox_input} placeholder="Ingresa Email ... " onChangeText={(value) => setEmail(value)} autoComplete ={'email'} autoFocus={true} editable={true} />
            </View>
            <View style={{ justifyContent: "center", alignItems: "center", width: "93%",marginTop: 20 }}>
                <TextInput style={styles.textbox_input} placeholder="Ingresa Contraseña" onChangeText={(value) => setPass(value)} secureTextEntry={true}  autoComplete ={'password'} autoFocus editable={true}/>
            </View>
            <View style={{ flexDirection: "row", justifyContent: "center", alignItems: "center", width: "93%" }}>
                <TouchableOpacity style={styles.btn_login} onPress={() => login()}>
                    <Text style={styles.text_login}>
                        INGRESAR
                    </Text>
                </TouchableOpacity>
            </View>
        </ImageBackground>

    </View>
}