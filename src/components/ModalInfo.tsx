import React, { useState } from 'react'
import { Text, View } from 'react-native'
import Modal from "react-native-modal";

const ModalInfo = (params: any, value: boolean)=>
{
    const [modalVisible, setModalVisible] = useState(false);
    var message = params;
    setModalVisible(value)
    return (
        <View >
            <Modal
                animationIn='slideInUp'
                isVisible={modalVisible}
            >
                <View style={{
                    flex: 1,
                    justifyContent: "center",
                    alignItems: "center",
                    marginTop: 22
                }}>
                    <View style={{
                        margin: 20,
                        backgroundColor: "#dcf3fb",
                        borderRadius: 20,
                        padding: 35,
                        alignItems: "center",
                        shadowColor: "#000",
                        shadowOffset: {
                            width: 0,
                            height: 2
                        },
                        shadowOpacity: 0.25,
                        shadowRadius: 4,
                        elevation: 5
                    }}>
                        <Text style={{
                            fontWeight: 'bold',
                            fontSize: 20,
                            //marginTop: ,
                            color: "blue",
                        }}>Info</Text>
                        <Text style={{
                            fontWeight: 'bold',
                            fontSize: 20,
                            //marginTop: ,
                            color: "#FF6145",

                        }}>{message}</Text>
                    </View>
                </View>
            </Modal>
        </View>
    )
}

export default ModalInfo