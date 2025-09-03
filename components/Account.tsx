import { Button, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import { router } from "expo-router";

const Account = () => {
  return (
    <View
      style={{
        flexDirection: "row",
        marginVertical: 20,
        justifyContent: "space-between",
        backgroundColor: "#003399",
        padding: 30,
        borderRadius: 20,
      }}
    >
      <View>
        <Text style={{ color: "white", fontSize: 20, fontWeight: "bold" }}>
          Wallet balance
        </Text>

        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            gap: 30,
            marginTop: 40,
          }}
        >
          <Text style={{ fontSize: 30, fontWeight: "bold", color: "white" }}>
            ************
          </Text>
          <FontAwesome5 name="eye-slash" size={24} color="white" />
        </View>
      </View>

      <View>
        <TouchableOpacity onPress={() => router.push("/(others)/Transaction")}>
          <Text style={{ color: "white", fontSize: 20, fontWeight: "bold" }}>
            Transaction History
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Account;

const styles = StyleSheet.create({});
