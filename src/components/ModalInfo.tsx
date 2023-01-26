import React, { useEffect, useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import Modal from "react-native-modal";
import Home from "../Home";

const ModalInfo = ({
  value,
  params,
}: {
  value: boolean;
  params: any;
}) => {
  const [visible, setVisible] = useState(value);


    useEffect(() => {
      setVisible(value);
      return () => {
        () => setVisible(false);
      };
    }, [value]);

    return (
      <View>
        <Modal
          animationIn="bounce"
          animationInTiming={1000}
          isVisible={visible}
          onBackdropPress={() => setVisible(!visible)}
          //onSwipeComplete={() => setVisible(!visible)}
          //onSwipeCancel={() => setVisible(!visible)}
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
                {params}
              </Text>
            </View>
          </View>
        </Modal>
      </View>
    );
  };


export default ModalInfo;
