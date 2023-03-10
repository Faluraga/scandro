
import React, { useState } from 'react'
import { TextInput, Text, View, StyleSheet, ImageBackground, TouchableOpacity, Image } from "react-native"
import IconEye from "react-native-vector-icons/Ionicons";
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as rutas from './routes/routes';
import { saveToken, saveIdUser, saveSupplierId, readSupplierId } from './storage/storage';
import * as SecureStore from 'expo-secure-store';



export default function Login({ navigation, route }: { navigation: any, route: any })
{

    ///////Estilos/////////

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
            top: 80,
            width: 120,
            height: 48,
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: "white",
            borderRadius: 20
        },

        text_login: {
            fontSize: 20,
            fontWeight: 'bold',
            color: "orange"
        },

        develop: {
            marginBottom: 20,
            textAlign: "center",
            top: '15%'
        },

        logo: {
            alignItems: "center",
            left: 24

        },

        Imagenlogo: {
            resizeMode: 'contain',
            width: 150,
            height: 150
        },

        textbox_input: {
            position: 'relative',
            top: 40,
            marginTop: 10,
            height: 42,
            width: 350,
            borderRadius: 10,
            alignItems: "center",
            borderColor: '#4D1A70',
            borderWidth: 1,
            paddingLeft: 8,
            backgroundColor: '#fff',
            fontSize: 17

        },
        box_input: {

            top: 40,
            marginTop: 15,
            width: '93%',
            height: 42,
            borderRadius: 10,
            alignContent: 'center',
            justifyContent: 'center',
            alignSelf: 'center',
            borderColor: '#4D1A70',
            borderWidth: 1,
            paddingLeft: 8,
            backgroundColor: '#fff',
            fontSize: 17

        }
    });

    ////////////////////////////

    const [email, setEmail] = useState({});
    const [pass, setPass] = useState("");
    const [data, setData] = useState({});
    const [passwordVisibility, setPasswordVisibility] = useState(true);

    const password = () =>
    {
        setPasswordVisibility(!passwordVisibility)
    };

    // funcion para validar si el correo tiene un formtao correcto
    function validadorCorreo(email: any)
    {

        const expReg = /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/;
        const esValido = expReg.test(email)
        return esValido

    }

    ///Funcion de login 

    async function login()
{
        try
        {
            var response = await fetch(rutas.urlBaseTestLogin, {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ "email": email, "password": pass, "white_brand_id": 1 })
            }).then(res => res.json())

                .then(resData =>
                {

                    
                    if (resData.message == "La combinaci??n de inicio de sesi??n / correo electr??nico no es correcta, intente nuevamente.")
                    {

                        alert('La contrase??a ?? el correo electr??nico no valida , intente nuevamente');
                    }

                    if (resData.message == "Ha ingresado al sistema correctamente" && resData.isSuccess === true)
                    {
                        
                        const status = "login"
                        var DropiToken = resData.token;
                        var idUser = resData.objects.id;
                   
                        if (resData.objects.roleNames[0] === "LOGISTIC") { 
                           
                            var supplierId = JSON.stringify(resData.objects.logistic_user_provider[0].supplier_id)
                          
                            saveSupplierId(supplierId)
                        };

                        saveIdUser(idUser + '');
                        saveToken(DropiToken).then(navigation.navigate("Home"));

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


            <View style={{ width: '90%' }}>

                <View style={styles.box_input}>
                    <TextInput style={{ fontSize: 16 }} placeholder="Escriba aqu?? su correo." onChangeText={(value) => setEmail(value)} autoComplete={'email'} editable={true} autoCorrect={false} placeholderTextColor="#CAC4D0" />
                </View>

            </View>


            <View style={{ flexDirection: 'row', alignItems: 'center', width: '90%', left: 12 }} >

                <View style={styles.box_input}>
                    <TextInput style={{ fontSize: 16 }} placeholder="Escriba aqu?? su contrase??a." onChangeText={(value) => setPass(value)} secureTextEntry={passwordVisibility} autoComplete={'password'} editable={true} autoCorrect={false} placeholderTextColor="#CAC4D0" />
                </View>

                <TouchableOpacity
                    activeOpacity={0.8}
                    style={{ top: 48, right: 33, width: '10%' }}
                    onPress={() => password()}
                >
                    {passwordVisibility ? (
                        <IconEye
                            name="eye-off-outline"
                            size={23}
                            color="black"
                        />
                    ) : (
                        <IconEye
                            name="eye-outline"
                            size={23}
                            color="black"
                        />
                    )}
                </TouchableOpacity>
            </View>
            <View style={styles.btn_login}>
                <TouchableOpacity onPress={() => login()}>
                    <Text style={styles.text_login}>
                        INGRESAR
                    </Text>
                </TouchableOpacity>
            </View>
        </ImageBackground>

    </View>
}