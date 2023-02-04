import { current } from "@reduxjs/toolkit";
import { useEffect, useState } from "react";
import { FlatList, LogBox, Text, TextInput, TouchableOpacity, View } from "react-native";
import Modal from "react-native-modal";
import { Checkbox, Card, RadioButton, Divider } from 'react-native-paper';
import { useDispatch, useSelector } from "react-redux";
import { changeModalVisibility } from "../redux/slices/modal";

const ModalConfirmation = () => 
{
    const [valProduct, setValProducts] = useState(Number);
    const[products, setProducts] = useState([])
    const[productUpdates, setProductUpdates] = useState([])
    var isModalVisible = useSelector((state: any) => state.modal.visible);
    var guide = useSelector((state: any) => state.guide.visible);
    var newGuide = guide.products;
   


    useEffect(()=>{
        setProducts(newGuide)
        
    },[newGuide])

    useEffect(()=>{
        //setProductUpdates(productUpdates),
        console.log('PRODUCTOS AGREGADOS=>',productUpdates);
    },[productUpdates])
    
    console.log('valProduct=>',valProduct)


    const dispatch = useDispatch();

    const toggleModal = (visible: boolean) =>
    {
        dispatch(changeModalVisibility(visible));
    };


    async function handleUpdateValueProduct(val:any,index:any) {
    
        productUpdates[index].value = val;

        console.log('arreglo modificado=>',productUpdates)
      }
    
      const handleChangeCheck = async (item:object) =>
      {
        console.log(item)
        if(item){

            setProductUpdates((current)=>current.concat({
                id:item['id'],
                label: item['label'],
                value:valProduct
             }))
        }else{
            alert('seleccione un producto')
        }

        let temp = products.map((product) =>
        {
          if (item['id'] === product.id)
          {
            return { ...product, isChecked: !product.isChecked };
          }

          return product;
        });
        setProducts(temp);

       //return productUpdates;
      };

      function close (){
        toggleModal(false);
        setProductUpdates([]);
        setValProducts(null)

      }



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
                                keyExtractor={({ id }, item) => id}
                                renderItem={({ item, index }) =>
                                {
                                    return (

                                        <View style={{ flexDirection: 'row' }}>
                                            <View style={{ width: '30%', justifyContent: 'center' }}>
                                                <RadioButton
                                                    value="#FF8F15"
                                                    color="#FF8F15"
                                                    uncheckedColor="#FF8F15"
                                                    //disabled={stateCheck}
                                                    status={item.isChecked ? 'checked' : 'unchecked'}
                                                    onPress={() =>
                                                    {
                                                        handleChangeCheck(item);

                                                    }}
                                                />
                                            </View>
                                            <View style={{ width: '30%', justifyContent: 'center' }}>
                                                <Text style={{ fontSize: 14 }}>
                                                    {item['label']} x {item['value']}
                                                </Text>
                                            </View>
                                            <View style={{ width: '30%', justifyContent: 'center', alignItems: 'flex-end', alignSelf: 'center', backgroundColor: 'white', }}>
                                                <TextInput style={{ backgroundColor: 'white', width: 50, height: 30, borderWidth: 1,textAlign:'center' }}
                                                    keyboardType={'numeric'}
                                                    maxLength={2}
                                                    placeholder={item['value'].slice(0, item['value'].length - 3)}
                                                    //defaultValue={item['value'].slice(0, item['value'].length - 3)}
                                                    onChange={(val: any) => { handleUpdateValueProduct(val.nativeEvent.text,index) }}
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