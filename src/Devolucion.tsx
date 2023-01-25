//Importaciones
import React, { useState, useEffect, useRef } from "react";
import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  TouchableOpacity,
  Image,
  Button,
  FlatList,
} from "react-native";
import { FontAwesome5 } from "@expo/vector-icons";
import { BarCodeScanner } from "expo-barcode-scanner";
import { Divider } from "react-native-paper";
import IconBar from "react-native-vector-icons/MaterialCommunityIcons";
import * as Animatable from "react-native-animatable";
import LottieView from "lottie-react-native";
import { readToken, readIdUser, readId } from "./storage/storage";
import * as XLSX from "xlsx";
import * as FileSystem from "expo-file-system";
import * as Sharing from "expo-sharing";
import * as rutas from './routes/routes'

export default function DevolucionScreen({
  navigation,
  route,
}: {
  navigation: any;
  route: any;
}) {
  /////Estados/////
  const [arrayProducts, setArrayProducts] = useState([]);
  const [value, setValue] = React.useState(0);
  const [token, setToken] = React.useState("");
  const [idProduct, setIdProduct] = useState(0);
  const [idUser, setIdUser] = useState(0);
  const [get_user_id, setGet_User_Id] = useState(Number);
  const [idOrder, setIdOrder] = useState(0);
  const [nameProduct, setNameProduct] = useState();
  const [guide, setGuide] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const [visibleCodeBar, setVisibleCodeBar] = useState(false);
  const [visibleAnimation, setVisibleAnimation] = useState(true);
  const [changeStatusView, setChangeStatusView] = useState([]);
  const [stockUpdate, setStockUpdate] = useState(0);
  const [quantity, setQuantity] = useState(0);
  const [stockPrevious, setStockPrevious] = useState(0);
  const [idWarehouse, setIdWarehouse] = useState(0);
  const [enableButtonExcel, setEnableButtonExcel] = useState(false);
  const [idDevolution, setIdDevolution] = useState();
  const [idHistoryInventories, setIdHistoryInventories] = useState();
  const [action, setAction] = useState(false);
 
  //Estilos
  const styles = StyleSheet.create({
    viewTotal: {
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

    containerBalance: {
      flexDirection: "row",
      marginTop: "20%",
      alignItems: "center",
    },

    iconreturn: {
      width: "20%",
    },

    textDevoluciones: {
      //backgroundColor:'tomato',
      borderRadius: 10,
      width: "55%",
      color: "tomato",
      fontSize: 30,
      fontWeight: "bold",
      right: 20,
      textAlign: "center",
    },
    containerBarCode: {
      flex: 1,
      alignSelf: "center",
      alignItems: "center",
      justifyContent: "center",
      width: 200,
      height: 50,
    },
    maintext: {
      fontSize: 25,
      color: "tomato",
      margin: 20,
      top: 20,
    },
    barcodebox: {
      //display: visibleCodeBar ? 'none' : 'flex',
      top: 15,
      alignItems: "center",
      justifyContent: "center",
      width: 300,
      height: 160,
      overflow: "hidden",
      borderRadius: 30,
      backgroundColor: "white",
    },
  });

  const onRefresh = React.useCallback(() => {
    (async () => {
      setRefreshing(true);
      setTimeout(() => {
        setRefreshing(false);
      }, 800);
    })();
    return () => {
      setRefreshing(false);
    };
  }, []);

  /// Metodo para leer el token del usuario logueado , desde el local-storage
  async function tokenUser() {
    const data: any = readToken();

    data
      .then((value: any) => {
        setToken(value);
      })
      .catch((error: any) => {
        console.log(error);
      });
  }

  /// Metodo para leer el token del usuario logueado , desde el local-storage
  async function getIdUser() {
    const data: any = readIdUser();

    data
      .then((value: any) => {
        let secureStoreVariable = parseInt(value);

        setGet_User_Id(value);
      })
      .catch((error: any) => {
        console.log(error);
      });
  }
  ////Funcion para listar ordenes de un usuario //////
  const getOrders = async (params: any) => {
    try {
      var response = await fetch(rutas.urlBaseDevelomentOrders, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          user_id: get_user_id,
          filter_by: "GUIA",
          value_filter_by: params,
          //supplier_id: 2,
        }),
      });

      var res = await response.json();

      if (res.isSuccess == true && res.status == 200) {
        const id_order: number = parseInt(res.objects[0].id);
        const id_user: number = parseInt(res.objects[0].user_id);
        const id_product: number = parseInt(
          res.objects[0].orderdetails[0].product.id
        );
        const name_product = res.objects[0].orderdetails[0].product.name;
        const guide: any = res.objects[0].shipping_guide;
        const stock_previous: any = parseInt(
          res.objects[0].orderdetails[0].product.stock
        );
        const quantity: any = parseInt(res.objects[0].orderdetails[0].quantity);
        const id_warehouse: number = parseInt(res.objects[0].warehouse_id);
        const name_warehouse: string = res.objects[0].warehouse.name;
        const stock_update: number = parseInt(stock_previous + quantity);

        //////LLenado de estados /////
        setIdOrder(id_order);
        setIdUser(id_user);
        setIdProduct(id_product);
        setQuantity(quantity);
        setStockPrevious(stock_previous);
        setStockUpdate(stock_update);
        setIdWarehouse(id_warehouse);
        setGuide((current) => current.concat(guide));
        setArrayProducts((current) =>
          current.concat({
            id_order: id_order,
            id_user: id_user,
            id_product: id_product,
            id_warehouse: id_warehouse,
            quantity: quantity,
            stock_previous: stock_previous,
            stock_update: stock_update,
            name_product: name_product,
            name_warehouse: name_warehouse,
            guide: guide,
          })
        );
      }
    } catch (e) {
      console.log("ERROR :", e);
      alert("ESTA GUIA NO TE PERTENECE");
    }
  };

  ////Funcion actualizar stock  //////
  const updateStock = async (
    index: any,
    id_product: any,
    stock_update: any,
    warehouse: any,
    quantity: any
  ) => {
    try {
      (async () => {
        var response = await fetch(
          `${rutas.urlBaseDevelomentProducts}/${id_product}`,
          {
            method: "PUT",
            headers: {
              Authorization: `Bearer ${token}`,
              Accept: "application/json",
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              active: true,
              supplier_id: 2,
              id: id_product,
              add_stock_in_return: true,
              stock: stock_update,
              user_id: get_user_id,
              warehouselected: warehouse,
              type: "SIMPLE",
              historyInventories: [
                {
                  concept: "Devoluciones-App-" + new Date().toLocaleDateString(),
                  type_movement: "ENTRADA",
                  quantity: quantity,
                  variation_id: null,
                },
              ],
            }),
          }
        );

        var res = await response.json();

        if (res.isSuccess == true && res.status == 200) {
          alert(res.message);
          var id_history_inventories = res.objects.id;

          setIdHistoryInventories(id_history_inventories);
          setChangeStatusView((current) => current.concat(index));
          if (action === false) {
            await devolution();
          } else if (action === true) {
            operationsDevoltions(id_history_inventories);
          }
        } else if (res.isSuccess === false) {
          alert(res.message);
        }
      })();
    } catch (e) {
      console.log("ERROR =>", e);
      alert("Error al actualizar");
    }
  };

  const devolution = async () => {
    try {
      (async () => {
        var devolucion = await fetch(rutas.urlBaseDevelomentDevolutions, {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            user_id: idUser,
          }),
        });
        var dev = await devolucion.json();

        if (dev.isSuccess == true && dev.status == 200) {
          var id_devolution = dev.objects.id;
          setIdDevolution(id_devolution);
          setAction(true);
        }
      })();
    } catch (e) {
      console.log("Error =>", e);
      alert(e);
    }
  };

  const historyDevolutions = async (
    id_devolution: any,
    id_hInventories: any
  ) => {
    try {
      (async () => {
        var response = await fetch(rutas.urlBaseDevelomentHistoryDevolutions, {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            id_devolutions: id_devolution,
            id_history_inventories: id_hInventories,
          }),
        });
        var res = await response.json();
      })();
    } catch (e) {
      console.log("Error =>", e);
      alert(e);
    }
  };

  const operationsDevoltions = (idHInventory: any) => {
    if (action === true) {
      historyDevolutions(idDevolution, idHInventory);
    }
  };

  useEffect(() => {
    historyDevolutions(idDevolution, idHistoryInventories);
  }, [action]);

  /////Lectura de  id y token usuario /////
  useEffect(() => {
    tokenUser();
    getIdUser();
  }, []);

  /////Renderizado en primera instancia arreglo de productos//////
  useEffect(() => {
    setArrayProducts(arrayProducts);
  }, [arrayProducts]);

  //// Request Camera Permission /////
  useEffect(() => {
    askForCameraPermission();
  }, []);

  ////Boton añadir ////
  const handleAddProducts = (params: any) => {
    setScanned(false);
    setVisibleAnimation(true);
  };

  //////LECTOR CODE BAR  PERMISSION ///////////////

  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);
  const [text, setText] = useState("");
  const askForCameraPermission = () => {
    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === "granted");
    })();
  };

  //////Handleo de scanner///////
  const handleBarCodeScanned = ({
    type,
    data,
  }: {
    type: any;
    data: string;
  }) => {
    try {
      var guia = data;
      if (
        data != "" &&
        arrayProducts.map((e) => e["guide"]).includes(data) !== true
      ) {
        setScanned(true);
        getOrders(data).catch(console.error);
      }
      if (arrayProducts.map((e) => e["guide"]).includes(data) === true) {
        alert("GUIA YA ESCANEADA");
        //setScanned(false);
        (async () => {
          setScanned(true);
          setTimeout(() => {
            setScanned(false);
          }, 3000);
        })();
        return () => {
          setRefreshing(false);
        };
      }
    } catch (error) {
      console.log(error);
    }
  };

  // Check permissions and return the screens
  if (hasPermission === null) {
    return (
      <View style={styles.containerBarCode}>
        <Text>Solicitando permiso de cámara</Text>
      </View>
    );
  }
  if (hasPermission === false) {
    return (
      <View style={styles.containerBarCode}>
        <Text style={{ margin: 10, fontSize: 17 }}>Sin acceso a la camara</Text>
        <Button
          title={"Permitir camara"}
          onPress={() => askForCameraPermission()}
        />
      </View>
    );
  }

  ///Añadir al stock///
  async function addStock(
    index: any,
    id_product: any,
    stock_update: any,
    warehouse: any,
    quantity: any
  ) {
    (async () => {
      await updateStock(
        index,
        id_product,
        stock_update,
        warehouse,
        quantity
      ).then(() => {
        setEnableButtonExcel(true);
      });
    })();
  }

  ///Eliminar producto de la lista ///
  async function deleteStock(index: any, guide: any) {
    const indice = arrayProducts.map((e) => e["guide"]).indexOf(guide);
    arrayProducts.splice(indice, 1);
    onRefresh();
    setArrayProducts(arrayProducts);
    setScanned(false);
  }

  //////Generate-download excel//////

  const generateExcel = () => {
    if (arrayProducts.length >= 1) {
      let wb = XLSX.utils.book_new();

      let items = arrayProducts.map((e: any) => {
        return [
          e["guide"],
          e["id_order"],
          e["id_product"],
          e["id_user"],
          e["id_warehouse"],
          e["name_product"],
          e["name_warehouse"],
          e["quantity"],
          e["stock_previous"],
          e["stock_update"],
        ];
      });

      let ws = XLSX.utils.aoa_to_sheet([
        [
          "GUIA",
          "ID-ORDEN",
          "ID-PRODUCTO",
          "ID-USER",
          "ID-BODEGA",
          "NOMBRE-PRODUCTO",
          "NOMBRE-BODEGA",
          "CANTIDAD-DEVOLUCION",
          "STOCK-PREVIO",
          "STOCK-ACTUALIZADO",
        ],
        ...items,
      ]);

      XLSX.utils.book_append_sheet(wb, ws, "Devoluciones-App", true);

      const base64 = XLSX.write(wb, { type: "base64" });
      //console.log('archivo-base64=>', base64);

      const filename = FileSystem.documentDirectory + "Devoluciones-App.xlsx";
      FileSystem.writeAsStringAsync(filename, base64, {
        encoding: FileSystem.EncodingType.Base64,
      })
        .then(() => {
          Sharing.shareAsync(filename);
        })
        .catch((e) => {
          console.log(e);
          alert(e);
        });
    } else {
      alert(
        "Debes escanear al menos una guia para generar un documento xlsx(Excel)"
      );
    }
  };

  return (
    <View style={styles.viewTotal}>
      <ImageBackground
        source={require("../Img/IMAGEN-1.jpg")}
        style={styles.fondo}
      >
        <View style={styles.containerBalance}>
          <TouchableOpacity style={[styles.iconreturn]}>
            <FontAwesome5
              name="angle-double-left"
              size={30}
              color={"tomato"}
              onPress={() => navigation.navigate("Home")}
            />
          </TouchableOpacity>
          <Text style={styles.textDevoluciones}>Devoluciones</Text>
          <Animatable.View
            animation="pulse"
            duration={1000}
            iterationCount={"infinite"}
          >
            <TouchableOpacity
              style={{
                width: 40,
                height: 40,
                borderWidth: 0,
                borderRadius: 50,
                justifyContent: "center",
                alignItems: "center",
                backgroundColor: "tomato",
              }}
              onPress={() => setVisibleCodeBar(!visibleCodeBar)}
            >
              <View>
                <IconBar name="barcode-scan" size={23} color="white" />
              </View>
            </TouchableOpacity>
          </Animatable.View>
        </View>

        {/* //////Escaner de codigo de barras ////////// */}
        {visibleCodeBar ? (
          <View>
            <View>
              <Animatable.View
                animation="pulse"
                duration={2000}
                iterationCount={"infinite"}
                style={[
                  {
                    width: 250,
                    height: 500,
                    borderWidth: 5,
                    borderColor: "tomato",
                    borderRadius: 25,
                    position: "relative",
                  },
                  styles.barcodebox,
                ]}
              >
                <BarCodeScanner
                  onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
                  type={"back"}
                  focusable={true}
                  style={{ height: 400, width: 450 }}
                />

                <LottieView
                  autoPlay
                  speed={0.7}
                  style={{
                    width: "100%",
                    height: 200,
                    backgroundColor: "transparent",
                    position: "absolute",
                  }}
                  source={require("../assets/lottie/scan.json")}
                />
              </Animatable.View>
            </View>

            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                alignSelf: "center",
                marginTop: 40,
              }}
            >
              <View style={{ width: "30%", alignItems: "center" }}>
                <TouchableOpacity
                  onPress={() => generateExcel()}
                  style={{
                    width: 50,
                    height: 50,
                    alignItems: "center",
                    justifyContent: "center",
                    backgroundColor: "#52C254",
                    borderRadius: 100,
                  }}
                >
                  <View>
                    <IconBar
                      name="content-save-all"
                      size={33}
                      color="white"
                      placeholder={"Crear manifiesto"}
                    />
                  </View>
                </TouchableOpacity>
              </View>
              <View style={{ width: "30%", alignItems: "center" }}>
                <TouchableOpacity
                  onPress={() => handleAddProducts({})}
                  style={{
                    width: 55,
                    height: 55,
                    alignItems: "center",
                    alignContent: "center",
                    alignSelf: "center",
                    justifyContent: "center",
                    //backgroundColor: "#0BA5F2",
                    borderRadius: 100,
                  }}
                >
                  <View>
                    <IconBar
                      name="plus-circle"
                      size={56}
                      color="#0BA5F2"
                      placeholder={"Agregar"}
                    />
                  </View>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        ) : (
          <TouchableOpacity onPress={() => setVisibleCodeBar(!visibleCodeBar)}>
            <View>
              <IconBar name="barcode-scan" size={150} color="tomato" />
            </View>
          </TouchableOpacity>
        )}

        {/* /////Cajón de productos//////// */}
        <View
          style={{
            paddingBottom: 2,
            borderWidth: 1,
            top: 10,
            width: 350,
            height: 420,
            borderRadius: 15,
            backgroundColor: "white",
            marginBottom: 100,
          }}
        >
          {/* /////Title/// */}
          <View style={{ flexDirection: "row" }}>
            <View style={{ width: "10%", alignItems: "center" }}>
              <Text
                style={{ fontSize: 18, fontWeight: "bold", color: "tomato" }}
              >
                ID
              </Text>
            </View>
            <View style={{ width: "60%", alignItems: "center" }}>
              <Text
                style={{ fontSize: 18, fontWeight: "bold", color: "tomato" }}
              >
                GUIA
              </Text>
            </View>
            <View style={{ width: "30%", alignItems: "center" }}>
              <Text
                style={{ fontSize: 18, fontWeight: "bold", color: "tomato" }}
              >
                ACCION
              </Text>
            </View>
          </View>
          <Divider />
          <FlatList
            data={arrayProducts}
            initialNumToRender={arrayProducts.length}
            scrollEnabled={true}
            refreshing={refreshing}
            onRefresh={onRefresh}
            keyExtractor={({ id }) => id}
            renderItem={({ item, index }) => {
              return (
                <View
                  style={{
                    flexDirection: "row",
                    marginTop: 15,
                    margin: 3,
                    backgroundColor:
                      changeStatusView.filter((e) => e == index).length > 0
                        ? "#52C254"
                        : "white",
                    borderRadius: 30,
                    justifyContent: "center",
                    alignContent: "center",
                    alignItems: "center",
                  }}
                  key={item["id"]}
                >
                  <View
                    style={{ width: "10%", alignItems: "center" }}
                    key={item["id"]}
                  >
                    <Text
                      style={
                        changeStatusView.filter((e) => e == index).length > 0
                          ? { color: "white", fontWeight: "bold", fontSize: 15 }
                          : { color: "black", fontWeight: null } && {
                              fontSize: 15,
                            }
                      }
                    >
                      {" "}
                      {item["id_order"]}{" "}
                    </Text>
                  </View>
                  <View style={{ width: "60%", alignItems: "center" }}>
                    <Text
                      style={
                        changeStatusView.filter((e) => e == index).length > 0
                          ? { color: "white", fontWeight: "bold", fontSize: 15 }
                          : { color: "black", fontWeight: null } && {
                              fontSize: 15,
                            }
                      }
                    >
                      {" "}
                      {item["guide"]}{" "}
                    </Text>
                  </View>
                  <View
                    style={{
                      width: "15%",
                      alignItems: "center",
                      display:
                        changeStatusView.filter((e) => e == index).length > 0
                          ? "none"
                          : "flex",
                    }}
                  >
                    <TouchableOpacity
                      style={{
                        width: 32,
                        height: 32,
                        alignItems: "center",
                        justifyContent: "center",
                        //backgroundColor: "#52C254",
                        borderRadius: 50,
                      }}
                      onPress={() =>
                        addStock(
                          index,
                          item["id_product"],
                          item["stock_update"],
                          item["id_warehouse"],
                          item["quantity"]
                        )
                      }
                    >
                      <View>
                        <IconBar
                          name="briefcase-check"
                          size={27}
                          color="#52C254"
                          placeholder={"Agregar"}
                        />
                      </View>
                    </TouchableOpacity>
                  </View>
                  <View
                    style={{
                      width: "15%",
                      alignItems: "center",
                      display:
                        changeStatusView.filter((e) => e == index).length > 0
                          ? "none"
                          : "flex",
                    }}
                  >
                    <TouchableOpacity
                      style={{
                        width: 32,
                        height: 32,
                        alignItems: "center",
                        justifyContent: "center",
                        //backgroundColor: "#F6505C",
                        borderRadius: 50,
                      }}
                      onPress={() => deleteStock(index, item["guide"])}
                    >
                      <View>
                        <IconBar
                          name="delete-forever"
                          size={30}
                          color="#F6505C"
                          placeholder={"Eliminar"}
                        />
                      </View>
                    </TouchableOpacity>
                  </View>
                </View>
              );
            }}
          ></FlatList>
        </View>
      </ImageBackground>
    </View>
  );
}
