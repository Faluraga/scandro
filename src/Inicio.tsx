
import {
    stylesB,
    stylesL,
    stylesM,
    stylesO,
    stylesS,
  } from "./../src/appTheme/styles/styles";
import React from 'react'
import { Text, View, StyleSheet, ImageBackground, TouchableOpacity, Image } from "react-native"


const Inicio = ({ navigation , route }:{ navigation:any , route:any })=>
{

///Estilos 
const styles = StyleSheet.create({
    view: {
        width: '100%',
        height: '100%',
        flex: 1,
    },
    fondo: {
        flex: 1,
        height: '100%',
        width: '100%',
        resizeMode: 'contain',
        alignItems: 'center',
    },
    btn1: {
        marginTop: '135%',

    },
    txtbtn1: {
        color: 'white',
        fontSize: 18,
        fontWeight: 'bold'
    },
  
    Imagenlogo: {
        resizeMode: 'contain',
        width: 180,
        height: 120
    },
    logo: {
        alignItems: "center",
        top: 360,
        //marginBottom: '-20%'
    }
})

   
    return (
        <View style={stylesM.view}>
            <ImageBackground
                source={require('../Img/FONDO-1.png')}
                style={stylesM.fondo}
            >
                <View style={styles.logo}>
                    <Image style={styles.Imagenlogo} source={require('../Img/dropiWhite.png')} />
                </View>
                <TouchableOpacity style={styles.btn1} onPress={() => navigation.navigate("Login")}>
                    <Text style={styles.txtbtn1}>
                        INICIAR SESION
                    </Text>
                </TouchableOpacity>
            </ImageBackground>
        </View>
    )
}
export default Inicio;





