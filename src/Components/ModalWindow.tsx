import React, { useState } from "react";
import {
  Alert,
  Button,
  Dimensions,
  Modal,
  TouchableHighlight,
} from "react-native";
import { Text, View, ViewAlt } from "./Styles";

interface ModalWindowProps {
  title: string;
  children: any;
  color?: string;
}

const ModalWindow = ({ title, children, color }) => {
  const { height } = Dimensions.get("window");
  const [modalVisible, setModalVisible] = useState(false);
  return (
    <>
      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert("Modal has been closed.");
        }}
      >
        <View
          style={{
            height: height,
            shadowColor: "grey",
            shadowRadius: 5,
            shadowOffset: {
              height: 0,
              width: 0,
            },
            shadowOpacity: 1,
            paddingTop: 40,
          }}
        >
          <ViewAlt
            style={{
              margin: 20,
              borderRadius: 20,
              padding: 35,
              alignItems: "center",
              shadowColor: "#000",
              shadowOffset: {
                width: 0,
                height: 2,
              },
              shadowOpacity: 0.25,
              shadowRadius: 3.84,
              elevation: 5,
            }}
          >
            <TouchableHighlight
              style={{
                marginRight: 0,
                borderRadius: 20,
                padding: 10,
                elevation: 2,
                position: "absolute",
                right: 10,
                top: 10,
              }}
              onPress={() => {
                setModalVisible(!modalVisible);
              }}
            >
              <Text
                style={{
                  fontWeight: "bold",
                  textAlign: "center",
                }}
              >
                X
              </Text>
            </TouchableHighlight>
            <Text style={{ fontSize: 18, fontWeight: "700" }}>{title}</Text>
            {children}
          </ViewAlt>
        </View>
      </Modal>

      <Button
        title={title}
        color={color}
        onPress={() => {
          setModalVisible(true);
        }}
      />
    </>
  );
};

export default ModalWindow;
