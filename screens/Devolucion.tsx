
//Importaciones
import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, ImageBackground, TouchableOpacity, Image, Button, FlatList } from 'react-native'
import { FontAwesome5 } from '@expo/vector-icons';
import { BarCodeScanner } from 'expo-barcode-scanner';
import { Divider } from 'react-native-paper';
import IconBar from "react-native-vector-icons/MaterialCommunityIcons";
import * as Animatable from "react-native-animatable";
import LottieView from 'lottie-react-native';




export default function DevolucionScreen({ navigation,route })
{

    const [visibleCodeBar, setVisibleCodeBar] = useState(false);

    //Estilos
    const styles = StyleSheet.create({

        viewTotal: {
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
            marginTop: "20%",
            alignItems: "center"
        },

        iconreturn: {
            width: "20%",

        },

        textDevoluciones: {
            width: "53%",
            color: "tomato",
            fontSize: 30,
            fontWeight: "bold",
            right: 20
        },
        containerBarCode: {

            flex: 1,
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
            top: 15,
            alignItems: 'center',
            justifyContent: 'center',
            width: 300,
            height: 160,
            overflow: 'hidden',
            borderRadius: 30,
            backgroundColor: 'white'
        },
    });

    //////////////Estilos /////////////////////////

    /////Estados/////
    const [arrayProducts, setArrayProducts] = useState([])

    console.log('esta', arrayProducts);


    ////Handle add products ////

    const [value, setValue] = React.useState(0);


    const handleAddProducts = () =>
    {

        setValue(value + 1);
        setScanned(false)
        console.log(value);
    }

    //////LECTOR CODE BAR ///////////////

    const [hasPermission, setHasPermission] = useState(null);
    const [scanned, setScanned] = useState(false);
    const [text, setText] = useState('')
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
        arrayProducts.push({ id: value, product: data })
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

    ///////handle escaner code-bar /////
    // const handleSetProduct = () =>
    // {
    //    // setArrayProducts([ ...arrayProducts,])


    //     arrayProducts.push({ id:value ,product: text} )

    // }
    //console.log(arrayProducts);



    return (
        <View style={styles.viewTotal}>
            <ImageBackground source={require('../Img/IMAGEN-1.jpg')} style={styles.fondo}>
                <View style={styles.containerBalance} >
                    <TouchableOpacity style={[styles.iconreturn]}>
                        <FontAwesome5 name="angle-double-left" size={30} color={"tomato"} onPress={() => navigation.navigate("Home")} />
                    </TouchableOpacity>
                    <Text style={styles.textDevoluciones}>Devoluciones</Text>
                    <Animatable.View animation="pulse"
                        duration={2000}
                        iterationCount={"infinite"}>

                        <TouchableOpacity style={{
                            width: 40,
                            height: 40,
                            borderWidth: 0,
                            borderRadius: 50,
                            justifyContent: 'center',
                            alignItems: 'center',
                            backgroundColor: 'tomato'
                        }}
                            onPress={() => setVisibleCodeBar(!visibleCodeBar)}
                        >
                            <View >
                                <IconBar
                                    name="barcode-scan"
                                    size={23}
                                    color="white"
                                />
                            </View>
                        </TouchableOpacity>
                    </Animatable.View>
                </View>
                {visibleCodeBar ?

                    <View>
                        <View>
                            <Animatable.View animation="pulse"
                                duration={2000}
                                iterationCount={"infinite"} style={[{ width: 250, height: 500, borderWidth: 5, borderColor: "tomato", borderRadius: 25, position: "relative" }, styles.barcodebox]}>
                                <BarCodeScanner
                                    onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
                                    type={'back'}
                                    focusable={true}
                                    style={{ height: 400, width: 450 }} />

                                <LottieView
                                    autoPlay
                                    speed={0.7}
                                    style={{
                                        width: "100%",
                                        height: 200,
                                        backgroundColor: 'transparent',
                                        position: "absolute"
                                    }}
                                    // Find more Lottie files at https://lottiefiles.com/featured
                                    source={require('../assets/lottie/scan.json')}
                                />



                            </Animatable.View>
                        </View>
                        <View>
                            <Text style={styles.maintext}>{text}</Text>
                        </View>

                        <View style={{ flexDirection: 'row', alignItems: "center", justifyContent: "center", }} >
                            <View>
                                {scanned &&
                                    <TouchableOpacity onPress={() => setScanned(false)}
                                        style={{
                                            width: 90,
                                            height: 40,
                                            alignItems: "center",
                                            justifyContent: "center",
                                            backgroundColor: "tomato",
                                            borderRadius: 18,
                                            right: 20

                                        }} >
                                        <Text style={{
                                            fontSize: 15,
                                            fontWeight: 'bold',
                                            color: "white"
                                        }}>Rescanear</Text>
                                    </TouchableOpacity>}
                            </View>
                            <View>
                                <TouchableOpacity
                                    onPress={() => handleAddProducts()}
                                    style={{
                                        width: 90,
                                        height: 40,
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
                                    }}>Añadir +</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View> :
                    <View>
                        <IconBar
                        
                            name="barcode-scan"
                            size={150}
                            color="tomato"
                        />
                    </View>
                }






                {/* /////Cajón de productos//////// */}
                <View style={{ paddingBottom: 2, borderWidth: 1, top: 10, width: 350, height: 420, borderRadius: 15, backgroundColor: 'white', marginBottom: 100 }}>

                    {/* /////Title/// */}
                    <View style={{ flexDirection: "row" }}>
                        <View style={{ width: "10%", alignItems: "center" }}>
                            <Text style={{ fontSize: 18, fontWeight: 'bold', color: 'tomato' }} >ID</Text>
                        </View >
                        <View style={{ width: "60%", alignItems: "center" }}>
                            <Text style={{ fontSize: 18, fontWeight: 'bold', color: 'tomato' }}>PRODUCTO</Text>
                        </View>
                    </View>
                    <Divider />
                    <FlatList

                        data={arrayProducts}
                        scrollEnabled={true}
                        //refreshing={refreshing}
                        //onRefresh={onRefresh}
                        //contentContainerStyle={{top:10,bottom:10}}
                        keyExtractor={({ id }, index) => id}
                        renderItem={({ item, index }) =>
                        {
                            return (
                                <View style={{ flexDirection: "row", marginTop: 15, margin: 3, }}>
                                    <View style={{ width: "10%", alignItems: "center" }}>
                                        <Text style={{ fontSize: 15, color: 'black' }} key={item.id} >{item.id}</Text>
                                    </View >
                                    <View style={{ width: "60%", alignItems: "center" }}>
                                        <Text style={{ fontSize: 15, color: 'black' }} key={item.product}>{item.product}</Text>
                                    </View>
                                    <View style={{ width: "30%", alignItems: "center" }}>
                                        <TouchableOpacity style={{
                                            width: 70,
                                            height: 35,
                                            alignItems: "center",
                                            justifyContent: "center",
                                            backgroundColor: "green",
                                            borderRadius: 18,

                                        }}><Text style={{
                                            fontSize: 13,
                                            fontWeight: 'bold',
                                            color: "white"
                                        }}>Enviar</Text></TouchableOpacity>
                                    </View>
                                </View>
                            );
                        }}></FlatList>
                    {/* <View>
                        {(arrayProducts.length < 1  ) ? (
                           
                            
                            <Text >......</Text>
                        

                        ) :
                            arrayProducts.map((item, index) => (
                                <View style={{ flexDirection: "row", top: 10, margin: 3 }}>
                                    <View style={{ left: 16 }}>
                                        <Text style={{ fontSize: 15, color: 'black' }} key={item.id} >{index}</Text>
                                    </View >
                                    <View style={{ left: 110 }}>
                                        <Text style={{ fontSize: 15, color: 'black' }} key={item.product}>{item.product}</Text>
                                    </View>
                                    <View style={{ left: 170, top: -8 }}>
                                        <TouchableOpacity style={{
                                            width: 70,
                                            height: 35,
                                            alignItems: "center",
                                            justifyContent: "center",
                                            backgroundColor: "green",
                                            borderRadius: 18,

                                        }}><Text style={{
                                            fontSize: 13,
                                            fontWeight: 'bold',
                                            color: "white"
                                        }}>Enviar</Text></TouchableOpacity>
                                    </View>
                                </View>
                            )

                            )}
                    </View> */}

                </View>
            </ImageBackground>
        </View>

    )
}


