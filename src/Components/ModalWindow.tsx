import React, { useState } from "react";
import { Alert, Modal, TouchableHighlight } from "react-native";
import { Text, TouchableOpacity, View } from "./Styles";

const ModalWindow = ({ title, children, size, space, color }) => {
  const [modalVisible, setModalVisible] = useState(false);
  return (
    <View style={{ backgroundColor: "transparent" }}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert("Modal has been closed.");
        }}
      >
        <View style={{ backgroundColor: "transparent", marginTop: 20 }}>
          <View
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
          </View>
        </View>
      </Modal>

      <TouchableOpacity
        style={{ backgroundColor: "transparent" }}
        onPress={() => {
          setModalVisible(true);
        }}
      >
        <Text style={{ fontSize: size, padding: space, color: color }}>
          {title}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default ModalWindow;
