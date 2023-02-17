
import React, { useState } from 'react'
import { Text, View, StyleSheet, ImageBackground, TouchableOpacity, Image } from "react-native"
import IconEye from "react-native-vector-icons/Ionicons";
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as rutas from './routes/routes';
import { saveToken, saveIdUser, saveSupplierId, readSupplierId } from './storage/storage';
import * as SecureStore from 'expo-secure-store';
import { TextInput } from 'react-native-paper';
import { Colors } from 'react-native/Libraries/NewAppScreen';



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


        },
        box_input: {

            top: 50,
            marginBottom:10,
            width: 310,
            height: 50,
            borderRadius: 4,
            alignContent: 'center',
            justifyContent: 'center',
            alignSelf: 'center',
            borderColor: '#4D1A70',
            borderWidth: 1.2,
            backgroundColor: '#FFFFFF',
         
        }
    });


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

   
    async function login()
    {
        try
        {
            var response = await fetch(rutas.urlBaseDevelomentLogin, {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ "email": email, "password": pass, "white_brand_id": 1 })
            })

            var res = await response.json();
            if (res.message == "La combinación de inicio de sesión / correo electrónico no es correcta, intente nuevamente.")
            {

                alert('La contraseña ó el correo electrónico no valida , intente nuevamente');
            }

            if (res.message == "Ha ingresado al sistema correctamente" && res.isSuccess === true && res.status === 200) 
            {

                var DropiToken = res.token;
                var idUser = JSON.stringify(res.objects.id);
                if (res.objects.roleNames[0] === "LOGISTIC")
                {
                    var supplierId = JSON.stringify(res.objects.logistic_user_provider[0].supplier_id)
                    saveSupplierId(supplierId)
                };

                saveIdUser(idUser);
                saveToken(DropiToken).then(navigation.navigate("Home"));

            }
        } catch (e)
        {
            console.log('ERROR :', e);
            alert(e)
        }
    }

    return <View style={styles.view}>
        <ImageBackground source={require('../Img/FONDO-3.png')} style={styles.fondo}>

            <View style={styles.logo}>
                <Image style={styles.Imagenlogo} source={require('../Img/dropiSettings.png')} />
            </View>

            <View style={{ flexDirection: 'column' }}>

                <View>

                </View>
                <TextInput
                    style={styles.box_input}
                    placeholder="Escriba aquí su correo."
                    onChangeText={(value) => setEmail(value)}
                    autoComplete={'email'}
                    editable={true}
                    placeholderTextColor="#CAC4D0"
                    underlineColorAndroid={'white'}
                    underlineColor={'white'}
                    activeOutlineColor={'white'}
                   

                    
                />
                


                <TextInput
                    style={[styles.box_input]}
                    placeholder="Escriba aquí su contraseña."
                    onChangeText={(value) => setPass(value)}
                    secureTextEntry={passwordVisibility}
                    autoComplete={'password'}
                    editable={true}
                    autoCorrect={false}
                    placeholderTextColor="#CAC4D0"
                    underlineColorAndroid={'white'}
                    underlineColor={'white'}
                    activeOutlineColor={'white'}
                    right={<TextInput.Icon icon={passwordVisibility ? "eye-off" : "eye"} onPress={() => setPasswordVisibility(!passwordVisibility)} />}
                />
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