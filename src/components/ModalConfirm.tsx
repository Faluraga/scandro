import { current } from "@reduxjs/toolkit";
import React, { useEffect, useState } from "react";
import { FlatList, LogBox, Text, TextInput, TouchableOpacity, View } from "react-native";
import Modal from "react-native-modal";
import { Checkbox, Card, RadioButton, Divider } from 'react-native-paper';
import AnimatedText from "react-native-paper/lib/typescript/components/Typography/AnimatedText";
import { useDispatch, useSelector } from "react-redux";
import { changeModalVisibility } from "../redux/slices/modal";
import { addOrdersUpdate } from "../redux/slices/variableGlobal";
import * as rutas from '../routes/routes';
import { readToken, readIdUser, readId, readSupplierId } from "../storage/storage";
import ModalInfo from "./ModalInfo";
import NumericInput from 'react-native-numeric-input'






const ModalConfirmation = () => 
{
  const [valProducts, setValProducts] = useState([]);
  const [products, setProducts] = useState([])
  const [productUpdates, setProductUpdates] = useState([])
  const [productsCurrent, setProductsCurrent] = useState([])
  const [enableInput, setEnableInput] = useState([false, false, false, false, false])
  const [refreshing, setRefreshing] = useState(false);
  const [token, setToken] = React.useState("");
  const [supplierId, setSupplierId] = useState();
  const [_user_id, set_User_Id] = useState();
  const [idHistoryInventories, setIdHistoryInventories] = useState([]);
  const [changeStatusView, setChangeStatusView] = useState([]);
  const [action, setAction] = useState(false);
  const [idUser, setIdUser] = useState(0);
  const [idDevolution, setIdDevolution] = useState();
  const [changeButtons, setChangeButtons] = useState()
  const [visibleModalInfo, setVisibleModalInfo] = useState(false);
  const [modalInfo, setModalInfo] = useState("");
  const atributesValues = [];



  var isModalVisible = useSelector((state: any) => state.modal.visible);
  var guide = useSelector((state: any) => state.guide.visible);
  var newGuide = guide.products;
  var ordersUpdates = useSelector((state: any) => state.var1.value);

  const onRefresh = React.useCallback(() =>
  {
    (async () =>
    {
      setRefreshing(true);
      setTimeout(() =>
      {
        setRefreshing(false);
      }, 500);
    })();
    return () =>
    {
      setRefreshing(false);
    };
  }, []);

  useEffect(() =>
  {
    setProducts(newGuide)

  }, [newGuide])

  // useEffect(() =>
  // {
  //   console.log('PRODUCTOS AGREGADOS=>', productUpdates);

  // }, [productUpdates])

  const dispatch = useDispatch();

  const toggleModal = (visible: boolean) =>
  {
    dispatch(changeModalVisibility(visible));
  };
  const addOrders = (val: []) =>
  {
    dispatch(addOrdersUpdate(val))
  }


  const handleChangeCheck = (item: object, index: any) =>
  {

    console.log('Product Selected =>', item);

    if (item['isChecked'] === false) 
    {
      if (item['type'] === "VARIABLE")
      {

        setProductUpdates((current) => current.concat({
          active: item['active'],
          id: item['id'],
          add_stock_in_return: item['add_stock_in_return'],
          user_id: item['user_id'],
          warehouselected: item['warehouselected'],
          concept: item['concept'],
          order_id: item['order_id'],
          isChecked: item['isChecked'],
          name: item['name'],
          //stock: item['stock'],
          type: item['type'],
          variations: [{
            id: item['variation']['id'],
            stock: parseInt(item['variation']['stock']),
            product_id: item['variation']['product_id'],
            suggested_price: item['variation']['suggested_price'],
            sale_price: item['variation']['sale_price'],
          }]
        }))
      } else if (item['type'] === 'SIMPLE')
      {
        setProductUpdates((current) => current.concat({
          active: item['active'],
          id: item['id'],
          add_stock_in_return: item['add_stock_in_return'],
          user_id: item['user_id'],
          warehouselected: item['warehouselected'],
          concept: item['concept'],
          order_id: item['order_id'],
          isChecked: item['isChecked'],
          name: item['name'],
          stock: parseInt(item['stock']),
          type: item['type'],

        }))
      }
      enableInput[index] = true;

    } else if (item['isChecked'] === true)
    {
      let newIndex = productUpdates.findIndex(e => e.id = item['id']);
      productUpdates.splice(newIndex, 1);
      enableInput[index] = false;

    }
    const indice = products.map((e) => e["id"]).indexOf(item["id"]);

    if (item['type'] === 'SIMPLE')
    {

      let temp = products.map((product) =>
      {
        if (item['id'] === product.id)
        {
          return { ...product, isChecked: !product.isChecked };
        }

        return product;
      });
      setProducts(temp);
    } else if (item['type'] === 'VARIABLE')
    {
      let indice = products.findIndex(e => e.variation.id == item['variation']['id']);
      let temp = products.map((product) =>
      {
        if (product.variation != null && product.variation.id === item['variation']['id'])
        {
          return { ...product, isChecked: !product.isChecked };
        }

        return product;
      });
      setProducts(temp);
    }

  };

  function handleUpdateValueProduct(val: any, index: any, item: object)
  {
    console.log('Item =>',item);

    var indice: number;
    var value = parseInt(val);
    valProducts[index] = val;
    let valCurrent = [];
    valCurrent[index] = item['quantity'];


    if (item['type'] === 'SIMPLE')
    {
      indice = productUpdates.findIndex(e => e['id'] == item['id']);
    }
    else if (item['type'] === 'VARIABLE')
    {
      indice = productUpdates.findIndex(e => e['variations'][0].id == item['variation'].id)
    }


    if (

      valProducts[index] > valCurrent[index] ||
      valProducts[index] == null ||
      valProducts[index] == undefined ||
      valProducts[index] <= 0 || valProducts[index] === "" ||
      valProducts[index].trim() === true ||
      valProducts[index].trim() === ""
    )  
    {
      alert('VALOR NO ADMITIDO');
      
      if (productUpdates[indice].type === 'SIMPLE' && productUpdates[indice].stock != item['stock'])
      {
        
        const tempQuantity = parseInt(item['stock'])
        console.log('valor a restablecer=>', tempQuantity);
        productUpdates[indice].stock = tempQuantity;
        console.log('Cantidad modificada ===>', productUpdates[indice])  
        onRefresh();
      }


      if (productUpdates[indice].type === 'VARIABLE' && productUpdates[indice]['variations'][0]['stock'] != item['variation'].stock)
      {
        
        const tempQuantity = parseInt(item['variation'].stock);
        console.log('valor a restablecer=>', tempQuantity);
        productUpdates[indice]['variations'][0]['stock'] = tempQuantity;
        console.log('Cantidad variable modificada =>', productUpdates[indice]['variations'][0]['stock']);
        onRefresh();
      }

    }
    else
    {
      if (productUpdates[indice].type === 'SIMPLE')
      {

        let quantityStockSimpleCurrency = parseInt(productUpdates[indice].stock)
        productUpdates[indice].stock = quantityStockSimpleCurrency + value;
        console.log('Cantidad modificada ===>', productUpdates[indice])
      }


      else if (productUpdates[indice].type === 'VARIABLE')
      {

        let quantitystockVariableCurrency = productUpdates[indice]['variations'][0]['stock']
        productUpdates[indice]['variations'][0]['stock'] = quantitystockVariableCurrency + value;
        console.log('Cantidad variable modificada =>', productUpdates[indice]['variations'][0]['stock']);
      }
    }
  }

  async function close()
  {
    toggleModal(false);
    setEnableInput([false, false, false, false, false])
    setProductUpdates([]);
    setValProducts([])
    onRefresh();
  }

  async function sendInfo()
  {

    if (productUpdates.length !== 0 && productUpdates !== null && productUpdates !== undefined)
    {
      if (valProducts.length === 0)
      {
        setVisibleModalInfo(true);
        setModalInfo('Ingresa una cantidad');
        setTimeout(() =>
        {
          setVisibleModalInfo(false);
        }, 2000);
      } else
      {
        productUpdates.forEach(e =>
          addOrders(e['order_id'])

        )
        console.log('Información enviada ===>', productUpdates)

        await updateStock().then(() =>
        {
          toggleModal(false);
          setEnableInput([false, false, false, false, false])
          setProductUpdates([]);
          setValProducts([])
          onRefresh();
        });
      }
    }
    else
    {
      setVisibleModalInfo(true);
      setModalInfo('Selecciona un producto para actualizar stock');
      setTimeout(() =>
      {
        setVisibleModalInfo(false);
      }, 2000);
    }
  }

  const operationsDevolutions = async () =>
  {
    if (action === false && action !== null)
    {
      devolution();
    }
    else if (action === true && action !== null)
    {
      idHistoryInventories.map(id =>
      {
        historyDevolutions(id, idDevolution);
      })
    }
  };


  ////Funcion actualizar stock  ////// esto es lo nuevo
  const updateStock = async (

  ) =>
  {
    try
    {

      var response = await fetch(
        rutas.urlBaseDevelomentProductsAll,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify(productUpdates),
        }
      );

      var res = await response.json();

      if (res.isSuccess == true && res.status == 200)
      {
        //alert(res.message);
        var id_history_inventories = [] = res.historyInvetories;
        id_history_inventories.map((e) =>
          idHistoryInventories.push(e['id'])
        )
        operationsDevolutions();
        setVisibleModalInfo(true);
        setModalInfo(res.message);
        setTimeout(() =>
        {
          setVisibleModalInfo(false);
        }, 2000);

      } else if (res.isSuccess === false)
      {
        setVisibleModalInfo(true);
        setModalInfo(res.message);
        setTimeout(() =>
        {
          setVisibleModalInfo(false);
        }, 2000);
        //alert(res.message);
      }

    } catch (e)
    {
      console.log("ERROR =>", e);
      alert("Error al actualizar");
    }
  }

  const devolution = () =>
  {
    try
    {
      (async () =>
      {
        var devolucion = await fetch(rutas.urlBaseDevelomentDevolutions, {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            user_id: supplierId,
          }),
        });
        var dev = await devolucion.json();

        if (dev.isSuccess == true && dev.status == 200)
        {

          var id_devolution = dev.objects.id;
          setIdDevolution(id_devolution);

          idHistoryInventories.map(id =>
          {
            historyDevolutions(id, id_devolution);
          });
          setAction(true);
        }
      })();
    } catch (e)
    {
      console.log("Error =>", e);
      alert(e);
    }
  };

  const historyDevolutions = async (
    _id,
    _id_devolution
  ) =>
  {
    try
    {
      (async () =>
      {
        var response = await fetch(rutas.urlBaseDevelomentHistoryDevolutions, {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            id_devolutions: _id_devolution,
            id_history_inventories: _id,
          }),
        });
        var res = await response.json();

        if (res.status === 200 && res.isSuccess === true)
        {

          setIdHistoryInventories([]);
        }

      })();
    } catch (e)
    {
      console.log("Error =>", e);
      alert(e);
    }
  };

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
        set_User_Id(value);

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

  /////Lectura de  id y token usuario /////
  useEffect(() =>
  {
    tokenUser();
    getIdUser();
    getSupplierId();
  }, []);
  useEffect(() =>
  {
    console.log(idDevolution);
  }, [idDevolution])

  return (
    <View>
      <ModalInfo params={modalInfo} value={visibleModalInfo} />
      <Modal
        animationIn="bounce"
        animationInTiming={1000}
        isVisible={isModalVisible}
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
              backgroundColor: "white",
              borderRadius: 20,
              padding: 25,
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
            <View style={{

              borderWidth: 1,
              width: 320,
              height: 320,
              borderRadius: 15,
              borderColor: 'tomato',
              backgroundColor: "white",
            }}>
              {/* /////Title/// */}
              <View style={{ flexDirection: "row" }}>
                <View style={{ width: "60%", alignItems: "center" }}>
                  <Text
                    style={{ fontSize: 18, fontWeight: "bold", color: "tomato" }}
                  >
                    PRODUCTO
                  </Text>
                </View>
                <View style={{ width: "40%", alignItems: "center" }}>
                  <Text
                    style={{ fontSize: 18, fontWeight: "bold", color: "tomato" }}
                  >
                    CANTIDAD
                  </Text>
                </View>
              </View>
              <Divider />

              <FlatList
                data={products}
                scrollEnabled={true}
                refreshing={refreshing}
                onRefresh={onRefresh}
                keyExtractor={({ item }, id) => item}
                renderItem={({ item, index }) =>
                {
                  return (

                    <View style={{ flexDirection: 'row' }} key={item['variation']? item['variation'].id:item['id']} >
                      <View style={{ width: '30%', justifyContent: 'center' }}>
                        <RadioButton
                          value="#FF8F15"
                          color="#FF8F15"
                          uncheckedColor="#FF8F15"
                          status={item.isChecked ? 'checked' : 'unchecked'}
                          onPress={() =>
                          {
                            handleChangeCheck(item, index);
                          }}
                        />

                      </View>
                      <View style={{ width: '40%', justifyContent: 'center' }} >

                        {item['variation'] ?
                          <Text style={{ fontSize: 14 }}>
                            {item['variation']['attribute_values'].forEach(element =>
                            {
                              atributesValues.push(element.value, ",");
                            })}
                            {item['name']} {'('}{atributesValues.slice(0, atributesValues.length - 1)}{')'}
                          </Text> :
                          <Text style={{ fontSize: 14 }}>
                            {item['name']}
                          </Text>
                        }
                      </View>
                      <View style={{ width: '20%', justifyContent: 'center', alignItems: 'flex-end', alignSelf: 'center', alignContent: 'center', backgroundColor: 'white', }}>
                        <TextInput style={{ backgroundColor: 'white', width: 50, height: 30, borderWidth: 1, textAlign: 'center', color: 'tomato' }}
                          keyboardType={'numeric'}
                          maxLength={parseInt(item['quantity'])}
                          editable={enableInput[index]}
                          placeholder={item['quantity'].slice(0, item['quantity'].length - 3)}
                          //defaultValue={item['value'].slice(0, item['value'].length - 3)}
                          defaultValue={valProducts[index]}
                          onChange={(val: any) => { handleUpdateValueProduct(val.nativeEvent.text, index, item) }}
                        />
                      </View>
                    </View>
                  );
                }}></FlatList>
            </View>
            <View style={{
              alignContent: 'flex-start',
              alignItems: 'flex-start',
              alignSelf: 'flex-start'
            }} >
              <Text style={{ color: '#C3C1BE' }}>
                *Debes chequear un producto para actualizar su cantidad.
              </Text>

              <Text style={{ color: '#C3C1BE' }}>
                *No puedes ingresar una cantidad que sea mayor a la actual.
              </Text>
              <Text style={{ color: '#C3C1BE' }}>
                *La cantidad que se muestra en la casilla es la actual del pedido.
              </Text>

            </View>

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
                  onPress={() => close()}
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
                    width: 87,
                    height: 32,
                    borderRadius: 18,
                    alignItems: "center",
                    alignSelf: "center",
                  }}
                  onPress={() => sendInfo()}
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
                    Actualizar
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

export default ModalConfirmation;