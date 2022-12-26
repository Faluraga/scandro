import React, { useState } from 'react'
import { Modal, Text, View } from 'react-native'

function modalAlert(params: any,value:boolean)
{
    const [modalVisible, setModalVisible] = useState(value);
    var message = params;
    var visible = value
    return (
        <View >
            <Modal
                animationType='slide'
                transparent={true}
                visible={visible}
                onRequestClose={() =>
                {
                    //Alert.alert("Modal has been closed.");
                    setModalVisible(!modalVisible);
                }}
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

export default modalAlert