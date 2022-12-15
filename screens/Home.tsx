
//Importaciones
import React, { useState, useEffect } from 'react'
import { StyleSheet, Text, View, TextInput, ImageBackground, TouchableOpacity, ScrollView, Image, Button } from 'react-native'
import { FontAwesome5 } from '@expo/vector-icons';
import { Menu, Divider, Provider } from 'react-native-paper';
import { BarCodeScanner } from 'expo-barcode-scanner';



export default function Home({ navigation , route })
{


    /////Estados/////   
    const [visibleCodeBar, setVisibleCodeBar] = useState(true);
    const [visible, setVisible] = React.useState(false);
    const openMenu = () => setVisible(true);
    const closeMenu = () => setVisible(false);
    const [data, setData] = useState([{}])


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
            width: "25%",
            alignItems: "center",
            position: "relative",
            zIndex: 3
        },

        contMoneda: {
            flex: 1,
            marginTop: "-8%",
            width: '100%'
        },

        titulos: {
            color: "#F2900B",
            bottom: '5%',
            flexDirection: 'row',
            width: '100%',
            height: '5%',
            marginTop: "-10%"
        },

        txtNmoneda: {

            width: '45%',
            marginLeft: '2%',
            fontWeight: 'bold',
            fontSize: 18

        },

        txtPmoneda: {

            width: '50%',
            fontWeight: 'bold',
            fontSize: 18
        },

        lista: {
            flexDirection: 'row'
        },

        txtMoneda: {
            width: "40%",
            fontSize: 15,
            margin: 10
        },

        txtPrecio: {
            width: "28%",
            fontSize: 15,
            margin: 10
        },

        ContainerOperar: {
            width: "33%",
            fontSize: 15,
            margin: 10,
            color: "blue"
        },

        textOperar: {
            color: "rgba(225, 177, 0, 1)",
            fontSize: 15
        },
        preview: {
            width: 300,
            height: 300,
            color: 'red'

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
            width: 250,
            height: 80,
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
            width: 250,
            height: 80,
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



    //UseEffect


    //// Metodo para cerrar sesion y eliminar token desde api dropi
    async function logout()
    {
        try
        {

            navigation.navigate("Inicio");

            //await logOut();

            return true;
        } catch (error)
        {
            console.log(error);
            alert(error)
            return false
        }

    }


    //////LECTOR CODE BAR ///////////////

    const [hasPermission, setHasPermission] = useState(null);
    const [scanned, setScanned] = useState(false);
    const [text, setText] = useState('NO ESCANEADO')
    const askForCameraPermission = () =>
    {
        (async () =>
        {
            const { status } = await BarCodeScanner.requestPermissionsAsync();
            setHasPermission(status === 'granted');
        })()
    }

    // Request Camera Permission
    useEffect(() =>
    {
        askForCameraPermission();
    }, []);

    // What happens when we scan the bar code
    const handleBarCodeScanned = ({ type, data }) =>
    {
        setScanned(true);
        setText(data)
        console.log('Type: ' + type + '\nData: ' + data)
    };

    // Check permissions and return the screens
    if (hasPermission === null)
    {
        return (
            <View style={styles.containerBarCode}>
                <Text>Requesting for camera permission</Text>
            </View>)
    }
    if (hasPermission === false)
    {
        return (
            <View style={styles.containerBarCode}>
                <Text style={{ margin: 10 }}>No access to camera</Text>
                <Button title={'Allow Camera'} onPress={() => askForCameraPermission()} />
            </View>)
    }


    return (
        <View style={styles.view}>
            <ImageBackground source={require('../Img/FONDO-2.png')} style={styles.fondo}>

                <View>
                    <TouchableOpacity style={styles.btn_devolucion} onPress={() => navigation.navigate("Devolucion")}>
                        <Text style={styles.text_devolucion}>
                            DEVOLUCIÓN 
                            <FontAwesome5 name="angle-double-right" size={30} color={"white"} onPress={() => navigation.goBack()} />
                        </Text>
                    </TouchableOpacity>
                </View>
                <View >
                    <TouchableOpacity style={styles.btn_salidas} onPress={() => navigation.navigate("Salidas")}>
                        <Text style={styles.text_salidas}>
                            SALIDAS 
                            <FontAwesome5 name="angle-double-right" size={30} color={"white"} onPress={() => navigation.goBack()} />
                        </Text>
                    </TouchableOpacity>
                </View>

                <View style={styles.containerBarCode}>
                    <View style={styles.barcodebox}>
                        <BarCodeScanner
                            onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
                            type={'back'}
                            focusable={true}
                            style={{ height: 400, width: 450 }} />
                    </View>
                    <Text style={styles.maintext}>{text}</Text>
                    <View>
                        {scanned &&
                            <TouchableOpacity onPress={() => setScanned(false)}
                                style={{
                                    width: 90,
                                    height: 45,
                                    alignItems: "center",
                                    justifyContent: "center",
                                    backgroundColor: "tomato",
                                    borderRadius: 18
                                }} >
                                <Text style={{
                                    fontSize: 15,
                                    fontWeight: 'bold',
                                    color: "white"
                                }}>Rescanear</Text>
                            </TouchableOpacity>}
                    </View>
                </View>
            </ImageBackground>
        </View>
    )
}



