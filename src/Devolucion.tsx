//Importaciones
import React, { useState, useEffect, useRef } from "react";
import
{
  StyleSheet,
  Text,
  View,
  ImageBackground,
  TouchableOpacity,
  Image,
  Button,
  FlatList,
  BackHandler,

} from "react-native";
import { FontAwesome5 } from "@expo/vector-icons";
import { BarCodeScanner } from "expo-barcode-scanner";
import { Divider, TextInput } from "react-native-paper";
import IconBar from "react-native-vector-icons/MaterialCommunityIcons";
import * as Animatable from "react-native-animatable";
import LottieView from "lottie-react-native";
import { readToken, readIdUser, readId, readSupplierId } from "./storage/storage";
// expo add expo-file-system expo-sharing xlsx
import * as XLSX from "xlsx";
import * as FileSystem from "expo-file-system";
import * as Sharing from "expo-sharing";
import * as rutas from './routes/routes';
import ModalInfo from "./components/ModalInfo";
import Modal from "react-native-modal";
import RadioGroup from 'react-native-radio-buttons-group';
import ModalConfirmation from "./components/ModalConfirm";
import { useDispatch, useSelector } from "react-redux";
import { changeModalVisibility } from "./redux/slices/modal";
import { changeGuide } from "./redux/slices/guide";
import { resetByQuantity } from "./redux/slices/variableGlobal";
import { current } from "@reduxjs/toolkit";


export default function DevolucionScreen({
  navigation,
  route,
}: {
  navigation: any;
  route: any;
})
{
  /////Estados/////
  const [arrayProducts, setArrayProducts] = useState([]);
  const [value, setValue] = React.useState(0);
  const [token, setToken] = React.useState("");
  const [idProduct, setIdProduct] = useState(0);
  const [idUser, setIdUser] = useState(0);
  const [get_user_id, setGet_User_Id] = useState();
  const [idOrder, setIdOrder] = useState(0);
  const [guide, setGuide] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const [visibleCodeBar, setVisibleCodeBar] = useState(false);
  const [visibleAnimation, setVisibleAnimation] = useState(true);
  const [changeStatusView, setChangeStatusView] = useState([]);
  const [stockUpdate, setStockUpdate] = useState(0);
  const [quantity, setQuantity] = useState(0);
  const [stockPrevious, setStockPrevious] = useState(0);
  const [idWarehouse, setIdWarehouse] = useState(0);
  const [idDevolution, setIdDevolution] = useState();
  const [idHistoryInventories, setIdHistoryInventories] = useState();
  const [action, setAction] = useState(false);
  const [supplierId, setSupplierId] = useState();
  const [visibleModalInfo, setVisibleModalInfo] = useState(false);
  const [modalInfo, setModalInfo] = useState("");
  const [guideSelection, setGuideSelection] = useState(Number);
  const [visibleModal, setVisibleModal] = useState(false);
  const [stateCheck, setStateCheck] = useState(false);
  const [products, setProducts] = useState([]);
  const [tempGuidesArray, setTempGuidesArray] = useState([]);

  var isModalVisible = useSelector((state: any) => state.modal.visible);
  var guideCurrent = useSelector((state: any) => state.guide.visible);


  type Test = []

  var orderUpdate: Test[] = []

  orderUpdate = useSelector((state: any) => state.var1.value);

  const dispatch = useDispatch();

  const toggleModal = (visible: boolean) =>
  {
    dispatch(changeModalVisibility(visible));
  };

  const GuideSelection = (params: object) =>
  {
    dispatch(changeGuide(params))
  };
  const resetByOrdersUpdates = (val) =>
  {
    dispatch(resetByQuantity(val))
  }



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



  const onRefresh = React.useCallback(() =>
  {
    (async () =>
    {
      setRefreshing(true);
      setTimeout(() =>
      {
        setRefreshing(false);
      }, 800);
    })();
    return () =>
    {
      setRefreshing(false);
    };
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

  /// Metodo para leer el token del usuario logueado , desde el local-storage
  async function getIdUser()
  {
    const data: any = readIdUser();
    data
      .then((value: any) =>
      {
        setGet_User_Id(value);

      })
      .catch((error: any) =>
      {
        console.log(error);
      });
    return data;
  }

  async function getSupplierId()
  {
    let result = await readSupplierId().then((value: any) =>
    {

      setSupplierId(value);
    })
      .catch((error: any) =>
      {
        console.log(error);
      });

    return result;
  }


  ////Funcion para listar ordenes de un usuario //////
  const getOrders = async (params: any) =>
  {

    setTempGuidesArray((current) => current.concat({
      guide: params
    }))

    if (arrayProducts.map((e) => e["guide"]).includes(params) === true || tempGuidesArray.map((e) => e["guide"]).includes(params) === true)
    {
      setVisibleModalInfo(true);
      setModalInfo(`GUIA YA INGRESADA`);
      setTimeout(() =>
      {
        setVisibleModalInfo(false);
      }, 2000);
    } else
    {
      try
      {
        var response = await fetch(rutas.urlBaseDevelomentOrders, {
          method: "POST",
          headers: {
            'Authorization': `Bearer ${token}`,
            'Accept': 'application/json, text/plain, */*',
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            //user_id: 2,//get_user_id,
            filter_by: "GUIA",
            value_filter_by: params,
            supplier_id: supplierId,
          }),
        });

        var res = await response.json();
        if (res.isSuccess == true && res.status == 200)
        {

          const id_order: number = parseInt(res.objects[0].id);
          const id_user: number = parseInt(res.objects[0].user_id);
          const id_product: number = parseInt(res.objects[0].orderdetails[0].product.id);
          const name_product: [] = res.objects[0].orderdetails;
          const guide: any = res.objects[0].shipping_guide;
          const stock_previous: any = parseInt(res.objects[0].orderdetails[0].product.stock);
          const quantity: any = parseInt(res.objects[0].orderdetails[0].quantity);
          const id_warehouse: number = parseInt(res.objects[0].warehouse_id);
          const name_warehouse: string = res.objects[0].warehouse.name;
          const stock_update: number = parseInt(stock_previous + quantity);

          var devolucion = await fetch(rutas.urlBaseDevelomentShowHistoryDevolutions, {
            method: "POST",
            headers: {
              'Authorization': `Bearer ${token}`,
              'Accept': 'application/json, text/plain, */*',
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              order_id: id_order
            }),
          });
          var responseDevolution = await devolucion.json();
          if (responseDevolution.status === 200 && responseDevolution.isSuccess === true)
          {
            setVisibleModalInfo(true);
            setModalInfo('LOS PRODUCTOS DE ESTA GUIA YA FUERON DEVUELTOS AL STOCK');
            setTimeout(() =>
            {
              setVisibleModalInfo(false);
            }, 2000);
          } else if (responseDevolution.status === 400 && responseDevolution.isSuccess === false)
          {
            type DataProduct = {
              id: number,
              name: String,
              quantity: String
              isChecked: boolean,
              stock: Number,
              variation: object,
              type: string,
              active: boolean,
              add_stock_in_return: boolean,
              user_id: Number,
              order_id: Number,
              warehouselected: Number,
              concept: String

            }
            let newProduct: DataProduct[] = [];

            name_product.forEach(element =>
            {
              const tempDataProduct: DataProduct = {

                id: element['product']['id'],
                name: element['product']['name'],
                quantity: element['quantity'],
                isChecked: false,
                stock: element['product']['stock'],
                variation: element['variation'],
                type: element['product']['type'],
                active: element['product']['active'],
                add_stock_in_return: element['product']['add_stock_in_return'],
                user_id: id_user,
                order_id: id_order,
                warehouselected: element['product']['warehouses'][0]['id'],
                concept: 'DEVOLUCION APP - ' + new Date().toLocaleDateString(),

              }
              newProduct.push(tempDataProduct);
            });

            ////LLenado de estados /////
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
                //stock_update: stock_update,
                name_warehouse: name_warehouse,
                guide: guide,
                products: newProduct
              })
            );

          }
        }



      } catch (e)
      {
        console.log("ERROR :", e);
        setVisibleModalInfo(true);
        setModalInfo(`GUIA #${params} NO ENCONTRADA`);
        setTimeout(() =>
        {
          setVisibleModalInfo(false);
        }, 2000);
      }
    }


  };

  /////Lectura de  id y token usuario /////
  useEffect(() =>
  {
    tokenUser();
    getIdUser();
    getSupplierId();
  }, []);

  ///Renderizado en primera instancia arreglo de productos//////
  useEffect(() =>
  {
    console.log(arrayProducts);
  }, [arrayProducts]);

  //// Request Camera Permission /////
  useEffect(() =>
  {
    askForCameraPermission();
  }, []);



  ////Boton añadir ////
  const handleAddProducts = (params: any) =>
  {
    setScanned(false);
    setVisibleAnimation(true);
  };

  //////LECTOR CODE BAR  PERMISSION ///////////////

  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);
  const [text, setText] = useState("");
  const askForCameraPermission = () =>
  {
    (async () =>
    {
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
    data: String;
  }) =>
  {
    let guideTemp = data.charAt(0);
    if (guideTemp === "7")
    {
      data = data.slice(18, data.length - 3)
    }
    try
    {

      if (
        data != "" &&
        arrayProducts.map((e) => e["guide"]).includes(data) !== true
      )
      {
        setScanned(true);
        getOrders(data).catch(console.error);
      }
      if (arrayProducts.map((e) => e["guide"]).includes(data) === true)
      {
        setVisibleModalInfo(true);
        setModalInfo(`GUIA YA INGRESADA`);
        setTimeout(() =>
        {
          setVisibleModalInfo(false);
        }, 2000);
        (async () =>
        {
          setScanned(true);
          setTimeout(() =>
          {
            setScanned(false);
          }, 3000);
        })();
        return () =>
        {
          setRefreshing(false);
        };
      }
    } catch (error)
    {
      console.log(error);
    }
  };

  // Check permissions and return the screens
  if (hasPermission === null)
  {
    return (
      <View style={styles.containerBarCode}>
        <Text>Solicitando permiso de cámara</Text>
      </View>
    );
  }
  if (hasPermission === false)
  {
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
    item: object,
    index: number
  )
  {
    toggleModal(true);
    GuideSelection(item);
  }

  ///Eliminar producto de la lista ///
  async function deleteStock(index: any, guide: any)
  {
    const indice1 = arrayProducts.map((e) => e["guide"]).indexOf(guide);
    const indice2 = tempGuidesArray.map((e) => e["guide"]).indexOf(guide);

    arrayProducts.splice(indice1, 1);
    tempGuidesArray.splice(indice2, 1);
    onRefresh();
    setArrayProducts(arrayProducts);
    setScanned(false);
  }

  //////Generate-download excel//////

  const generateExcel = () =>
  {
    

    if (arrayProducts.length >= 1)
    {
      let wb = XLSX.utils.book_new();

      let items = arrayProducts.map((e: any,i) =>
      {
        var products_id = '';
        var products_name = '';
        var warehouse_id = '';

        const newProduct =e['products'];
        newProduct.forEach((element,i)=>{
          products_id += element.id+',';
          products_name+=element.name+',';
          warehouse_id+=element.warehouselected+',';
        
        })
   
        return [

          e["guide"],
          e["id_order"],
          products_id.slice(0, products_id.length - 1),
          e["id_user"],
          products_name.slice(0, products_name.length - 1),
          warehouse_id.slice(0, warehouse_id.length - 1),
          new Date().toLocaleDateString(),
 
        ];
      });

      let ws = XLSX.utils.aoa_to_sheet([
        [
          "GUIA",
          "ID-ORDEN",
          "ID-PRODUCTO",
          "ID-USER",
          "NOMBRE-PRODUCTO",
          "ID-BODEGA",
          "FECHA DEVOLUCION"
      
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
        .then(() =>
        {
          Sharing.shareAsync(filename);
        })
        .catch((e) =>
        {
          console.log(e);
          alert(e);
        });
    } else
    {
      setVisibleModalInfo(true);
      setModalInfo("Debes escanear al menos una guia para generar un documento xlsx(Excel)");
      setTimeout(() =>
      {
        setVisibleModalInfo(false);
      }, 2000);
    }
  };


  function goBack()
  {
    resetByOrdersUpdates([null]);
    //console.log('ordenes actualizadas =>', orderUpdate);
    navigation.navigate('Home');
  }


  return (
    <View style={styles.viewTotal}>
      <ImageBackground
        source={require("../Img/IMAGEN-1.jpg")}
        style={styles.fondo}
      >
        <View style={styles.containerBalance}>

          <ModalInfo params={modalInfo} value={visibleModalInfo} />

          <TouchableOpacity style={[styles.iconreturn]}>
            <FontAwesome5
              name="angle-double-left"
              size={30}
              color={"tomato"}
              onPress={() => goBack()}
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

            <TextInput style={{
              top: 25,
              width: 250,
              height: 50,
              alignContent: 'center',
              justifyContent: 'center',
              alignSelf: 'center',
              textAlign: 'center',
              backgroundColor: "white",


            }} placeholder={'Digita numero de guia'}
              placeholderTextColor="#CAC4D0"
              keyboardType='numeric'
              maxLength={20}
              onSubmitEditing={(val: any) => { getOrders(val.nativeEvent.text) }} />

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
                    <Animatable.View
                      animation="pulse"
                      duration={1000}
                      iterationCount={"infinite"}
                    >
                      <IconBar
                        name="plus-circle"
                        size={56}
                        color="#0BA5F2"
                        placeholder={"Agregar"}
                      />
                    </Animatable.View>
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
            height: 330,
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
                #
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
            renderItem={({ item, index }) =>
            {
              return (
                <View
                  style={{
                    flexDirection: "row",
                    marginTop: 15,
                    margin: 3,
                    backgroundColor:
                      orderUpdate.filter(e => e == item['id_order']).length > 0
                        ? "#52C254"
                        : "#FFFF",
                    borderRadius: 30,
                    justifyContent: "center",
                    alignContent: "center",
                    alignItems: "center",
                  }}
                  key={parseInt(item['id_order']) || index }
                >
                  <View
                    style={{ width: "10%", alignItems: "center" }}
                  >

                    <Text
                      style={
                        orderUpdate.filter(e => e == item['id_order']).length > 0
                          ? { color: "white", fontWeight: "bold", fontSize: 15 }
                          : { color: "black", fontWeight: null } && {
                            fontSize: 15,
                          }
                      }
                    >
                      {" "}
                      {index + 1}
                    </Text>
                  </View>
                  <View style={{ width: "60%", alignItems: "center" }}>
                    <Text
                      style={
                        orderUpdate.filter(e => e === item['id_order']).length > 0
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
                        orderUpdate.filter(e => e == item['id_order']).length > 0
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
                        addStock(item, index)
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
                        orderUpdate.filter(e => e == item['id_order']).length > 0
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
          <ModalConfirmation />
        </View>
      </ImageBackground>
    </View>
  );
}
