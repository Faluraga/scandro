
//Importaciones
import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, ImageBackground, TouchableOpacity, Image, Button, FlatList } from 'react-native'
import { FontAwesome5 } from '@expo/vector-icons';
import { BarCodeScanner } from 'expo-barcode-scanner';
import { Divider } from 'react-native-paper';
import IconBar from "react-native-vector-icons/MaterialCommunityIcons";
import * as Animatable from "react-native-animatable";
import LottieView from 'lottie-react-native';
import { readToken } from './storage/storage';






export default function DevolucionScreen({ navigation, route }:{ navigation:any, route:any })
{
    /////Estados/////
    const [arrayProducts, setArrayProducts] = React.useState([]);
    const [zproducts, setProducts] = useState([]);
    const [value, setValue] = React.useState(0);
    const [token, setToken] = React.useState('');
    const [idProduct, setIdProduct] = useState('');
    const [nameProduct, setNameProduct] = useState();
    const [guide,setGuide]= useState([]);
    const [refreshing, setRefreshing] = useState(false);
    var urlBaseDevelomentOrders = 'https://e171-179-32-16-224.ngrok.io/api/orders/getmyorders';
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
            width: "55%",
            color: "tomato",
            fontSize: 30,
            fontWeight: "bold",
            right: 20,
            textAlign: 'center'

        },
        containerBarCode: {

            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
            width: 200,
            height: 50
        },
        maintext: {
            fontSize: 25,
            color: 'tomato',
            margin: 20,
            top:20,
            

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

    useEffect(() =>
    {
        tokenUser();

    })

    const onRefresh = React.useCallback(() =>
    {
        (async () =>
        {
            setRefreshing(true)
            setTimeout(() => {
                setRefreshing(false)
            }, 800);
        })();
        return () => { setRefreshing(false) }
    }, []);

    /// Metodo para leer el token del usuario logueado , desde el local-storage
    async function tokenUser()
    {

        const data: any = readToken();

        data.then((value: any) =>
        {
            setToken(value);
            //console.log('DEVOLUCIONES :',token);

        }).catch((error: any) =>
        {
            console.log(error);

        });
    }


    ////Funcion para listar ordenes de un usuario //////
    const getOrders = async (params: any) =>
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
                body: JSON.stringify({ "user_id": 2, 'filter_by': 'GUIA', 'value_filter_by': params })
            })

            var res = await response.json();
            
            if (res.isSuccess == true && res.status == 200)
            {

                var id_Product = res.objects[0].id;
                var name_Product = res.objects[0].orderdetails[0].product.name;
                var guide = res.objects[0].shipping_guide;
                setGuide(current => current.concat(guide));
                setArrayProducts(current => current.concat({id:id_Product,name:name_Product}));
                //arrayProducts.push({ id: res.objects[0].id, name: res.objects[0].orderdetails[0].product.name });
                //console.log(arrayProducts);

            } 
            


        } catch (e)
        {
            console.log('ERROR :', e);
            alert('GUIA NO ENCONTRADA')
            // var info = 'GUIA NO ENCONTRADA';
            // var visible = true
            // return(
            //    <ModalInfo isVisible = {true} >{info}</ModalInfo>
            // )
        }
    }

    ////Boton añadir ////
    const handleAddProducts = (params: any) =>
    {
        setScanned(false);
    }

    //////LECTOR CODE BAR  PERMISSION ///////////////

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

  

    const handleBarCodeScanned = ({ type, data }) =>
    {   
        try {
            var guia = data;
            if (data != "" && guide.includes(data) != true)
            {
                setScanned(true);
                getOrders(data).catch(console.error); 
                   
            }if(guide.includes(data) == true) {
               
                alert('GUIA YA ESCANEADA')
                setScanned(true)
            };
           
        } catch (error) {
            console.log(error);
            
            
        }

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

    async function addStock(index:any,id:any) {

        console.log('ID-PRODUCT =>',id);
        console.log('INDEX =>',index);
        arrayProducts.splice(index,1)
        onRefresh();
        console.log(arrayProducts);
          

    }

    return (
        <View style={styles.viewTotal}>
            <ImageBackground source={require('../Img/IMAGEN-1.jpg')} style={styles.fondo}>
                <View style={styles.containerBalance} >
                    <TouchableOpacity style={[styles.iconreturn]}>
                        <FontAwesome5 name="angle-double-left" size={30} color={"tomato"} onPress={() => navigation.navigate("Home")} />
                    </TouchableOpacity>
                    <Text style={styles.textDevoluciones}>Devoluciones</Text>
                    <Animatable.View animation="pulse"
                        duration={1000}
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

                {/* //////Escaner de codigo de barras ////////// */}
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
                                    source={require('../assets/lottie/scan.json')}
                                />

                            </Animatable.View>
                        </View>
                        <View >
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
                                    onPress={() => handleAddProducts({})}
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
                        refreshing={refreshing}
                        onRefresh={onRefresh}
                        keyExtractor={({ id }, index) => id}
                        renderItem={({ item, index }) =>
                        {
                            return (
                                <View style={{ flexDirection: "row", marginTop: 15, margin: 3, }}>
                                    <View style={{ width: "10%", alignItems: "center" }}>
                                        <Text style={{ fontSize: 15, color: 'black' }} key={item.id} > {item.id}  </Text>
                                    </View >
                                    <View style={{ width: "60%", alignItems: "center" }}>
                                        <Text style={{ fontSize: 15, color: 'black' }} >  {item.name} </Text>
                                    </View>
                                    <View style={{ width: "30%", alignItems: "center" }}>
                                        <TouchableOpacity style={{
                                            width: 70,
                                            height: 35,
                                            alignItems: "center",
                                            justifyContent: "center",
                                            backgroundColor: "green",
                                            borderRadius: 18,
                                        }}
                                        onPress={()=>addStock(index,item.id)}
                                        ><Text style={{
                                            fontSize: 10,
                                            fontWeight: 'bold',
                                            color: "white"
                                        }}>Add stock</Text></TouchableOpacity>
                                    </View>
                                </View>
                            );
                        }}></FlatList>
                </View>
            </ImageBackground>
        </View>

    )
}


