import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import React from "react";
import images from "@/constants/images";
import { icons } from "@/constants/images";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { router } from "expo-router";

const routImg = () => {
  const handleDone = async () => {
    await AsyncStorage.setItem("onboarded", "true");
    router.replace("/home");
  };

  return (
    <View>
      <Text>routImg</Text>

      <Image source={images.tech} style={{ height: 200, width: 100 }} />
      <Image source={icons.active} style={{ height: 200, width: 100 }} />

      <TouchableOpacity onPress={handleDone}>
        <Text>Done</Text>
      </TouchableOpacity>
    </View>
  );
};

export default routImg;

const styles = StyleSheet.create({});