import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import AntDesign from "@expo/vector-icons/AntDesign";
import { router } from "expo-router";

interface TransactionHeaderProps {
    title: string;
}

const TransactionHeader: React.FC<TransactionHeaderProps> = ({title}) => {
  return (
    <View
      style={{
        flexDirection: "row",
        alignItems: "center",
        padding: 20,
        justifyContent: "space-between",
      }}
    >
      <TouchableOpacity onPress={() => router.back()}>
        <AntDesign name="arrowleft" size={30} color="black" />
      </TouchableOpacity>

      <Text
        style={{
          fontSize: 27,
          fontWeight: "bold",
          marginVertical: 10,
          textAlign: "center",
        }}
      >
        {title}
      </Text>

      <AntDesign name="arrowleft" size={24} color="transparent" />
    </View>
  );
};

export default TransactionHeader;

const styles = StyleSheet.create({});
