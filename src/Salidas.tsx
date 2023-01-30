

//Importaciones
import React from 'react'
import { StyleSheet, Text, View, ImageBackground, TouchableOpacity, Image } from 'react-native'
import { FontAwesome5 } from '@expo/vector-icons';


//Estilos
const styles = StyleSheet.create({

    view: {
        width: '100%',
        height: '100%',
        flex: 1,
    },

    fondo: {
        height: '100%',
        width: '100%',
        resizeMode: 'contain',
        alignItems: 'center',
    },

    containerSalidas: {
        flexDirection: "row",
    },

    iconreturn: {
        width: "20%",
        marginTop: "20%",
    },

    textSalida: {
        width: "53%",
        color: "green",
        marginTop: "18%",
        fontSize: 30,
        fontWeight: "bold"
    }
})


export default function Salidas({ navigation, route }: { navigation: any, route: any })
{

    //Front de Balance
    return (
        <View style={styles.view}>
            <ImageBackground source={require('../Img/IMAGEN-1.jpg')} style={styles.fondo}>
                <View style={styles.containerSalidas} >
                    <TouchableOpacity style={styles.iconreturn}>
                        <FontAwesome5 name="angle-double-left" size={30} color={"green"} onPress={() => navigation.goBack()} />
                    </TouchableOpacity>
                    <Text style={styles.textSalida}>Salidas</Text>
                </View>
            </ImageBackground>
        </View>
    )
}


