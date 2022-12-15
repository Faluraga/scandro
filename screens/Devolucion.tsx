
//Importaciones
import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, ImageBackground, TouchableOpacity, Image, SafeAreaView, Button } from 'react-native'
import { FontAwesome5 } from '@expo/vector-icons';
import { BarCodeScanner } from 'expo-barcode-scanner';






export default function DevolucionScreen({ navigation, route })
{

    /////Estados/////
    const [visibleCodeBar, setVisibleCodeBar] = useState(true);


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

        containerBalance: {
            flexDirection: "row",
        },

        iconreturn: {
            width: "20%",
            marginTop: "20%",
        },

        textDevoluciones: {
            width: "53%",
            color: "tomato",
            marginTop: "18%",
            fontSize: 30,
            fontWeight: "bold"
        },
        containerBarCode: {

            flex: 1,
            //backgroundColor: 'red',
            alignItems: 'center',
            justifyContent: 'center',
            width: 200,
            height: 50
        },
        maintext: {
            fontSize: 18,
            color: 'tomato',
            margin: 20,
        },
        barcodebox: {
            //display: visibleCodeBar ? 'none' : 'flex',
            top:15,
            alignItems: 'center',
            justifyContent: 'center',
            height: 200,
            width: 300,
            overflow: 'hidden',
            borderRadius: 30,
            backgroundColor: 'white'
        },
    });

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
                <Text>Solicitando permiso de cámara</Text>
            </View>)
    }
    if (hasPermission === false)
    {
        return (
            <View style={styles.containerBarCode}>
                <Text style={{ margin: 10 }}>Sin acceso a la camara</Text>
                <Button title={'Permitir camara'} onPress={() => askForCameraPermission()} />
            </View>)
    }

   
    return (
        <View style={styles.view}>
            <ImageBackground source={require('../Img/IMAGEN-1.jpg')} style={styles.fondo}>
                <View style={styles.containerBalance} >
                    <TouchableOpacity style={styles.iconreturn}>
                        <FontAwesome5 name="angle-double-left" size={30} color={"#FBBA00"} onPress={() => navigation.goBack()} />
                    </TouchableOpacity>
                    <Text style={styles.textDevoluciones}>Devoluciones</Text>
                </View>

                <View style={styles.barcodebox}>
                    <BarCodeScanner
                        onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
                        type={'back'}
                        focusable={true}
                        style={{ height: 400, width: 450 }} />
                </View>
                <Text style={styles.maintext}>{text}</Text>
                <View style={{ flexDirection: 'row',alignItems: "center",justifyContent: "center", }} >
                    <View>
                        {scanned &&
                            <TouchableOpacity onPress={() => setScanned(false)}
                                style={{
                                    width: 90,
                                    height: 45,
                                    alignItems: "center",
                                    justifyContent: "center",
                                    backgroundColor: "tomato",
                                    borderRadius: 18,
                                    right:20

                                }} >
                                <Text style={{
                                    fontSize: 15,
                                    fontWeight: 'bold',
                                    color: "white"
                                }}>Rescanear</Text>
                            </TouchableOpacity>}
                    </View>
                    <View>
                        <TouchableOpacity onPress={() => setScanned(false)}
                            style={{
                                width: 90,
                                height: 45,
                                alignItems: "center",
                                justifyContent: "center",
                                backgroundColor: "tomato",
                                borderRadius: 18, 
                                left: 20,
                                

                            }} >
                            <Text style={{
                                fontSize: 15,
                                fontWeight: 'bold',
                                color: "white"
                            }}>Añadir</Text>
                        </TouchableOpacity>
                    </View>
                </View>

            </ImageBackground>
        </View>
    )
}


