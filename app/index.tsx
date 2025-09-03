import {
  StyleSheet,
  Text,
  View,
  Image,
  SafeAreaView,
  ImageBackground,
  TouchableOpacity,
} from "react-native";
import React from "react";
import images from "@/constants/images";
import { icons } from "@/constants/images";
import { AntDesign, FontAwesome, Feather } from "@expo/vector-icons";
import { router } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { styles } from "@/styles/homeStyle";

const index = () => {
  const handleOnboarding = async () => {
    await AsyncStorage.setItem("onboarded", "true");
    router.replace("/signUp");
  };

  return (
    <SafeAreaView>
      <Image source={images.kuboLogo} style={{ alignSelf: "center" }} />

      <View
        style={{
          alignItems: "center",
          justifyContent: "center",
          height: "95%",
        }}
      >
        <Image source={images.bank} style={{}} />

        <Text style={{ fontSize: 24, fontWeight: "bold", marginTop: 20 }}>
          All your financial needs in one place{" "}
        </Text>
        <Text style={styles.first}>
          Get loans, transfer funds, pay bills and many more!
        </Text>

        <View style={{ flexDirection: "row", gap: 10, marginVertical: 100 }}>
          <Image source={icons.active} />
          <Image source={icons.inactive} />
          <Image source={icons.inactive} />
        </View>

        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            width: "100%",
            paddingHorizontal: 40,
          }}
        >
          <AntDesign name="left" size={24} color="transparent" />

          <TouchableOpacity onPress={handleOnboarding}>
            <Text
              style={{ color: "#003399", fontSize: 18, fontWeight: "bold" }}
            >
              Skip
            </Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => router.push("/onboarding")}>
            <AntDesign name="right" size={24} color="black" />
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default index;


