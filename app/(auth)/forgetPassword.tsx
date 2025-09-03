import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  TouchableOpacity,
} from "react-native";
import React from "react";
import images from "@/constants/images";
import { icons } from "@/constants/images";
import AntDesign from "@expo/vector-icons/AntDesign";

const forgetPassword = () => {
  return (
    <SafeAreaView>
      <View style={{ alignItems: "center" }}>
        <Image source={images.kuboLogo} style={{ marginVertical: 100 }} />

        <Text style={{ fontSize: 25, fontWeight: 700, paddingBottom: 25 }}>
          Forgot your password?
        </Text>

        <Text style={styles.retrive}>Enter your email address to </Text>
        <Text style={styles.retrive}>retrieve your password</Text>

        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            gap: 10,
            marginVertical: 70,
            borderColor: "blue",
            borderWidth: 1,
            paddingHorizontal: 10,
            borderRadius: 10,
            width: "80%",
            height: 60,
          }}
        >
          <Image source={icons.gmail} />

          <TextInput placeholder="E-mail" keyboardType="email-address" />
        </View>

        <TouchableOpacity
          style={{
            backgroundColor: "#003399",
            padding: 20,
            width: "80%",
            borderRadius: 15,
            alignItems: "center",
            marginTop: 20,
          }}
        >
          <Text style={{color: "#FFFFFF", fontWeight: "bold"}}>RESET PASSWORD</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default forgetPassword;

const styles = StyleSheet.create({
  retrive: {
    fontSize: 15,
  },
});
