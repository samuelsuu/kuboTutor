import { SafeAreaView, StyleSheet, Text, View, Image } from "react-native";
import React from "react";
import images from "@/constants/images";
import Ionicons from "@expo/vector-icons/Ionicons";

const HomeHeader = () => {
  return (
    <SafeAreaView
      style={{
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        padding: 10,
      }}
    >
      <View style={{ flexDirection: "row", alignItems: "center", gap: 30 }}>
        <Image
          source={images.profile}
          style={{ width: 50, height: 50, borderRadius: 25 }}
        />
        <Text style={{ fontSize: 25, fontWeight: "bold" }}>HI, HAPPINESS</Text>
      </View>

      <View>
        <Ionicons name="notifications-outline" size={30} color="black" />
      </View>
    </SafeAreaView>
  );
};

export default HomeHeader;

const styles = StyleSheet.create({});
