//Importaciones
import React, { useState, useEffect } from "react";
import
  {
    StyleSheet,
    Text,
    View,
    TextInput,
    ImageBackground,
    TouchableOpacity,
    ScrollView,
    Image,
    Button,
    BackHandler,
  } from "react-native";
import { FontAwesome5 } from "@expo/vector-icons";
import { Menu, Divider, Provider } from "react-native-paper";
import Sidebar from "./components/sidebar";
import
  {
    readToken,
    deleteToken,
    saveToken,
    saveIdUser,
    saveSupplierId,
  } from "./storage/storage";
import Inicio from "./Inicio";
import Modal from "react-native-modal";
import ModalInfo from "./components/ModalInfo";
import BotonModal from "./components/BotonModal"
import {useDispatch , useSelector }from 'react-redux'

import * as rutas from './routes/routes'


export default function Home ({ navigation, route }: { navigation: any; route: any })
{
  /////Estados/////
  const [visibleCodeBar, setVisibleCodeBar] = useState(true);
  const [visible, setVisible] = useState(false);
  const [visibleModal, setVisibleModal] = useState(false);
  const [visibleModalInfo, setVisibleModalInfo] = useState(false);

  const [messageModal, setMessageModal] = useState("");
  const openMenu = () => setVisible(!visible);
  const closeMenu = () => setVisible(!visible);
  const [data, setData] = useState([{}]);
  const [token, setToken] = React.useState("");
  const [menuBar, setMenuBar] = useState(["Configuración", "notificaciones"]);
  
  /////Estilos//////
  const styles = StyleSheet.create({
    view: {
      width: "100%",
      height: "100%",
      flex: 1,
    },

    fondo: {
      height: "100%",
      width: "100%",
      resizeMode: "contain",
      alignItems: "center",
    },

    IntroMoneda: {
      flexDirection: "row",
      paddingTop: "18%",
    },

    texCoin: {
      width: "60%",
      height: "30%",
      borderRadius: 25,
      borderColor: "#4D1A70",
      paddingLeft: 8,
      justifyContent: "center",
      alignContent: "center",
      alignItems: "center",
      display: "flex",
      borderWidth: 1,
      marginLeft: 6,
    },

    iconsearch: {
      width: "22%",
      alignItems: "center",
      paddingRight: "10%",

      padding: "2%",
    },

    menuNav: {
      flex: 1,
      width: "100%",
      alignItems: "flex-start",
      right: 30,
      position: "absolute",
      top: 80,
    },

    titulos: {
      color: "#F2900B",
      bottom: "5%",
      flexDirection: "row",
      width: "100%",
      height: "5%",
      marginTop: "-10%",
    },

    containerBarCode: {
      display: visibleCodeBar ? "none" : "flex",
      flex: 1,
      backgroundColor: "#fff",
      alignItems: "center",
      justifyContent: "center",
    },
    maintext: {
      fontSize: 18,
      color: "tomato",
      margin: 20,
    },
    barcodebox: {
      alignItems: "center",
      justifyContent: "center",
      height: 200,
      width: 300,
      overflow: "hidden",
      borderRadius: 30,
      backgroundColor: "tomato",
    },
    btn_devolucion: {
      top: 290,
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: "orange",
      borderRadius: 20,
    },

    text_devolucion: {
      fontSize: 30,
      fontWeight: "bold",
      color: "white",
    },
    btn_salidas: {
      top: 350,
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: "orange",
      borderRadius: 20,
    },

    text_salidas: {
      fontSize: 30,
      fontWeight: "bold",
      color: "white",
    },
  });


  ////Deshabilitar retroceso de pantalla /////
  useEffect(() =>{

    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress", 
      ()=>true 
      ); 
      return () => backHandler.remove();
  },[]);

  useEffect(() =>
  {
    tokenUser();


  }, []);

  /// Metodo para leer el token del usuario logueado , desde el local-storage
  async function tokenUser()
  {
    const data: any = readToken();

    data
      .then((value: any) =>
      {
        setToken(value);
      })
      .catch((error: any) =>
      {
        console.log(error);
      });
  }

  /// Metodo para cerrar sesion desde backend dropi
  async function logout()
  {
    setVisibleModal(!visibleModal);
    setMessageModal("Seguro que desea cerrar la sesión ? ");
  }

  const sesionClose = async () =>
  {
    saveToken("");
    saveIdUser("");
    saveSupplierId("")
    try
    { 
      var response = await fetch(rutas.urlBaseDevelomentLogout, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ token: token }),
      });

      var res = await response.json();
      if (res.isSuccess === true && res.status === 200)
      {
        saveToken("");
        saveIdUser("");
        saveSupplierId("")
        
        setVisibleModalInfo(true);
        setTimeout(() =>
        {
          navigation.navigate("Login");
        }, 800)

        setVisibleModal(false);
       
        console.log('Sesion close');  
      } else if (res.isSuccess === false && res.status === 400 && res.message === "The token could not be parsed from the request")
      {
        alert("No se pudo analizar el token de la solicitud, Cierre la aplicación");
        saveToken("");
        saveIdUser("");
        saveSupplierId("")
        navigation.navigate("Login");
      }else if (res.isSuccess === false && res.code === 401 && res.status === "Token is Invalid"){
        alert("Token no valido para la solicitud")
        saveToken("");
        saveIdUser("");
        saveSupplierId("")
        navigation.navigate("Login");
      }
      console.log(res);
    } catch (e)
    {
      console.log("ERROR :", e);
      //alert(e)
      navigation.navigate("Login");
      saveToken("");
      saveIdUser("");
      saveSupplierId("")
    }
  };

  const ModalConfirmation = () =>
  {

    return (
      <View>
        <Modal
          animationIn="bounce"
          animationInTiming={1000}
          isVisible={visibleModal}
          onBackdropPress={() => setVisibleModal(!visibleModal)}
          onSwipeComplete={() => setVisibleModal(!visibleModal)}
        //onSwipeCancel={() => setVisible(!visibleModal)}

        >
          <View
            style={{
              flex: 1,
              justifyContent: "center",
              alignItems: "center",
              marginTop: 22,
            }}
          >
            <View
              style={{
                margin: 20,
                backgroundColor: "#dcf3fb",
                borderRadius: 20,
                padding: 35,
                alignItems: "center",
                shadowColor: "#000",
                shadowOffset: {
                  width: 0,
                  height: 2,
                },
                shadowOpacity: 0.25,
                shadowRadius: 4,
                elevation: 5,
              }}
            >
              <Text
                style={{
                  fontWeight: "bold",
                  fontSize: 20,
                  color: "#FF6145",
                }}
              >
                {messageModal}
              </Text>

              <View style={{ flexDirection: "row", marginTop: 20 }}>
                <View style={{ width: "50%" }}>
                  <TouchableOpacity
                    style={{
                      backgroundColor: "red",
                      width: 80,
                      height: 32,
                      borderRadius: 18,
                      alignItems: "center",
                      alignSelf: "center",
                    }}
                    onPress={() => setVisibleModal(!visibleModal)}
                  >
                    <Text
                      style={{
                        fontWeight: "bold",
                        fontSize: 16,
                        color: "#fff",
                        marginTop: 3,
                        justifyContent: "center",
                      }}
                    >
                      Cancelar
                    </Text>
                  </TouchableOpacity>
                </View>
                <View style={{ width: "50%" }}>
                  <TouchableOpacity
                    style={{
                      backgroundColor: "green",
                      width: 80,
                      height: 32,
                      borderRadius: 18,
                      alignItems: "center",
                      alignSelf: "center",
                    }}
                    onPress={() => sesionClose()}
                  >
                    <Text
                      style={{
                        fontWeight: "bold",
                        fontSize: 16,
                        color: "#fff",
                        marginTop: 3,
                        justifyContent: "center",
                      }}
                    >
                      Aceptar
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </View>
        </Modal>
      </View>
    )
  }

  return (
    <View style={styles.view}>
      <ImageBackground
        source={require("../Img/fondo_blanco.png")}
        style={styles.fondo}
      >
        <ModalConfirmation></ModalConfirmation>
        <ModalInfo value = {visibleModalInfo}  params={'Sesión Cerrada Exitosamente'}/>
        <View>
          <View>
            <Provider>
              <View style={styles.menuNav}>
                <Menu
                  visible={visible}
                  contentStyle={{ backgroundColor: "#ea6e2d" }}
                  onDismiss={closeMenu}
                  anchorPosition={"bottom"}
                  anchor={
                    <TouchableOpacity onPress={openMenu}>
                      <FontAwesome5 name="bars" size={30} color="#ea6e2d" />
                    </TouchableOpacity>
                  }
                >
                  <Menu.Item
                    title="Configuración"
                    titleStyle={{ color: "white" }}
                  />
                  <Divider />
                  <Menu.Item
                    onPress={() => logout()}
                    title="Cerrar sesion"
                    titleStyle={{ color: "white" }}
                  />
                </Menu>
              </View>

              <TouchableOpacity
                style={styles.btn_devolucion}
                onPress={() => navigation.navigate("Devolucion")}
              >
                <Image
                  style={{ width: 250, height: 90 }}
                  source={require("../Img/BOTÓN-DEVOLUCIONES.png")}
                />
              </TouchableOpacity>

              <TouchableOpacity
              
                style={styles.btn_salidas}
              >
                <Image
                  style={{ width: 250, height: 90 }}
                  source={require("../Img/BOTÓN-SALIDAS.png")}
                />
              </TouchableOpacity>
            </Provider>

          </View>
        </View>
      </ImageBackground>
      <Sidebar />
    </View>
  );
};


