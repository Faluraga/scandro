import { current } from "@reduxjs/toolkit";
import React, { useEffect, useState } from "react";
import { FlatList, LogBox, Text, TextInput, TouchableOpacity, View } from "react-native";
import Modal from "react-native-modal";
import { Checkbox, Card, RadioButton, Divider } from 'react-native-paper';
import { useDispatch, useSelector } from "react-redux";
import { changeModalVisibility } from "../redux/slices/modal";
import * as rutas from '../routes/routes';
import { readToken, readIdUser, readId, readSupplierId } from "../storage/storage";
import BotonModal from "./BotonModal";





const ModalConfirmation = () => 
{
  const [valProducts, setValProducts] = useState([]);
  const [products, setProducts] = useState([])
  const [productUpdates, setProductUpdates] = useState([])
  const [productsCurrent, setProductsCurrent] = useState([])
  const [enableInput, setEnableInput] = useState([false, false, false])
  const [refreshing, setRefreshing] = useState(false);
  const [token, setToken] = React.useState("");
  const [supplierId, setSupplierId] = useState();
  const [get_user_id, setGet_User_Id] = useState(Number);
  const [idHistoryInventories, setIdHistoryInventories] = useState([]);
  const [changeStatusView, setChangeStatusView] = useState([]);
  const [action, setAction] = useState(false);
  const [idUser, setIdUser] = useState(0);
  const [idDevolution, setIdDevolution] = useState();
  const [changeButtons, setChangeButtons] = useState()
  const atributesValues = []


  var isModalVisible = useSelector((state: any) => state.modal.visible);
  var guide = useSelector((state: any) => state.guide.visible);
  var newGuide = guide.products;


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

  useEffect(() =>
  {
    console.log('PRODUCTOS AGREGADOS=>', productUpdates);

  }, [productUpdates])

  const dispatch = useDispatch();

  const toggleModal = (visible: boolean) =>
  {
    dispatch(changeModalVisibility(visible));
  };


  const handleChangeCheck = (item: object, index: any) =>
  {


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

    if(item['type'] === 'SIMPLE' ){
   
      let temp = products.map((product) =>
      {
        if (item['id'] === product.id)
        {
          return { ...product, isChecked: !product.isChecked };
        }
  
        return product;
      });
      setProducts(temp);
    }else if (item['type'] === 'VARIABLE'){
      let indice = products.findIndex(e => e.variation.id == item['variation']['id'] ); 
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

  async function handleUpdateValueProduct(val: any, index: any, item: object)
  {

    var indice: number;
    let value = parseInt(val);
    valProducts[index] = val;
    let typeProduct = products[index].type;
    if (item['type'] === 'SIMPLE')
    {
      indice = productUpdates.findIndex(e => e['id'] == item['id']);//productUpdates.map((e) => e["id"]).indexOf({id,});
      //console.log('INDICE simple=>', indice);
    }
    else if (item['type'] === 'VARIABLE')
    {
      indice = productUpdates.findIndex(e => e['variations'][0].id == item['variation'].id)
      //console.log('INDICE - variable=>', indice);
    }

    let valCurrent = [];
    valCurrent[index] = products[index].quantity;

    if (valProducts[index] > valCurrent[index])  
    {
      alert('El valor no puede superar la cantidad actual del producto');
      valProducts[index] = valCurrent[index];
      onRefresh();
    } else if (valProducts[index] == null)
    {
      alert('El valor no puede ser nulo');
      valProducts[index] = valCurrent[index];
    } else if (valProducts[index] == undefined)
    {
      alert('El valor no puede ser nulo');
      valProducts[index] = valCurrent[index];
    }
    else if (valProducts[index] <= 0)
    {
      alert('El valor no puede ser cero')
      valProducts[index] = valCurrent[index];
    }
    else
    {

      if (productUpdates[indice].type === 'SIMPLE')
      {

        let quantityStockSimpleCurrency = parseInt(productUpdates[indice].stock)
        productUpdates[indice].stock = quantityStockSimpleCurrency + value;
      
        console.log('Cantidad modificada ===>', productUpdates[indice])
      }


      if (productUpdates[indice].type === 'VARIABLE')
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
    setProductUpdates([]);
    setValProducts([])
    onRefresh();

  }
  async function sendInfo()
  {
    console.log('Información enviada ===>', productUpdates)
    updateStock();
  }

  ////Funcion actualizar stock  ////// esto es lo nuevo
  const updateStock = async (
    // index: any,
    // id_product: any,
    // stock_update: any,
    // warehouse: any,
    // quantity: any
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
      console.log('respuesta del consulta =>',res)
      if (res.isSuccess == true && res.status == 200)
      {
        alert(res.message);
       var id_history_inventories = [] = res.historyInvetories;
        id_history_inventories.map((e)=> console.log(e['id']) )
        
   
        if (action === false)
        {
          devolution();
          // for (var i = 0; i < id_history_inventories.length ; i++){
          //   await  operationsDevolutions(id_history_inventories[i])
          // }
  
        } 
        // else if (action === true)
        // {
        //   operationsDevolutions(id_history_inventories);
        // }
      } else if (res.isSuccess === false)
      {
        alert(res.message);
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
            user_id: idUser,
          }),
        });
        var dev = await devolucion.json();

        if (dev.isSuccess == true && dev.status == 200)
        {
          var id_devolution = dev.objects.id;
          setIdDevolution(id_devolution);
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
    id_devolution: any,
    id_hInventories: any
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
            id_devolutions: id_devolution,
            id_history_inventories: id_hInventories,
          }),
        });
        var res = await response.json();
      })();
    } catch (e)
    {
      console.log("Error =>", e);
      alert(e);
    }
  };

  const operationsDevolutions = (idHInventory: any) =>
  {
    if (action === true)
    {
      historyDevolutions(idDevolution, idHInventory);
    }
  };



  // useEffect(() =>
  // {
  //   historyDevolutions(idDevolution, idHistoryInventories);
  // }, [action]);



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

  /////Lectura de  id y token usuario /////
  useEffect(() =>
  {
    tokenUser();
    getIdUser();
    getSupplierId();
  }, []);

  return (
    <View>
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
                //keyExtractor={({ id }, item) => id}
                renderItem={({ item, index }) =>
                {
                  return (

                    <View style={{ flexDirection: 'row' }} key={item} >
                      <View style={{ width: '30%', justifyContent: 'center' }}>
                        <RadioButton
                          value="#FF8F15"
                          color="#FF8F15"
                          uncheckedColor="#FF8F15"
                          //disabled={stateCheck}
                          status={item.isChecked ? 'checked' : 'unchecked'}
                          onPress={() =>
                          {
                            handleChangeCheck(item, index);

                          }}
                        />
                        {/* <BotonModal onPress = {()=>handleChangeCheck(item, index)}>
                                              
                                                </BotonModal> */}

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
                        <TextInput style={{ backgroundColor: 'white', width: 50, height: 30, borderWidth: 1, textAlign: 'center' }}
                          keyboardType={'numeric'}
                          maxLength={2}
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
                    width: 80,
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

export default ModalConfirmation;