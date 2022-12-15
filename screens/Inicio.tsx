//Pantalla Inicio

//Importaciones
import React from 'react'
import { Text, View, StyleSheet, ImageBackground, TouchableOpacity, Image } from "react-native"



//Estilos 
const styles = StyleSheet.create({
    view: {
        width: '100%',
        height: '100%',
        flex: 1,
    },
    fondo: {
        flex: 2,
        height: '100%',
        width: '100%',
        resizeMode: 'contain',
        alignItems: 'center',
    },
    btn1: {
        marginTop: '170%',

    },
    txtbtn1: {
        color: 'white',
        fontSize: 18,
        fontWeight: 'bold'
    },
    btn2: {
        fontWeight: "bold",
        color: '#FBBA00',
        marginTop: '3%'
    },
    Imagenlogo: {
        resizeMode: 'contain',
        width: 180,
        height: 120
    },
    logo: {
        alignItems: "center",
        top: '48%',
        marginBottom: '-20%'
    }
})



export default function InicioScreen({ navigation })
{

   
    return (
        <View style={styles.view}>
            <ImageBackground
                source={require('../Img/FONDO-1.png')}
                style={styles.fondo}
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






