import images from "@/constants/images";
import React, { useState } from "react";
import {
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Alert,
} from "react-native";
import { Feather } from "@expo/vector-icons";
import { router } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Login = () => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // Validate phone number (basic validation)
  const validatePhoneNumber = (phone: string) => {
    const phoneRegex = /^[\+]?[1-9][\d]{3,14}$/;
    return phoneRegex.test(phone.replace(/\s/g, ""));
  };

  // Handle login
  const handleLogin = async () => {
    // Validate inputs
    if (!phoneNumber.trim()) {
      Alert.alert("Error", "Please enter your phone number");
      return;
    }

    if (!validatePhoneNumber(phoneNumber)) {
      Alert.alert("Error", "Please enter a valid phone number");
      return;
    }

    if (!password.trim()) {
      Alert.alert("Error", "Please enter a password");
      return;
    }

    

    setIsLoading(true);

    try {
      // Get existing users from storage
      const existingUsers = await AsyncStorage.getItem("users");
      
      type User = {
        id: string;
        phoneNumber: string;
        password: string;
        createdAt: string;
      };

      let users: User[] = existingUsers ? JSON.parse(existingUsers) : [];

      // Find user with matching phone number
      const user = users.find(
        (user: User) => user.phoneNumber === phoneNumber.trim()
      );

      if (!user) {
        Alert.alert(
          "Error",
          "No account found with this phone number. Please sign up first."
        );
        setIsLoading(false);
        return;
      }

      // Check password
      if (user.password !== password) {
        Alert.alert("Error", "Incorrect password. Please try again.");
        setIsLoading(false);
        return;
      }

      // Save current user session
      await AsyncStorage.setItem("currentUser", JSON.stringify(user));

      Alert.alert("Success", "Login successful!", [
        {
          text: "OK",
          onPress: () => {
            // Navigate to home page
            router.push("/(tabs)/home");
          },
        },
      ]);
    } catch (error) {
      console.error("Error logging in:", error);
      Alert.alert("Error", "Failed to login. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  // Handle sign up navigation
  const handleSignUpNavigation = () => {
    router.push("/signUp"); // Navigate to sign up screen
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
      <View style={{ alignItems: "center" }}>
        <Image source={images.kuboLogo} style={{ marginVertical: 60 }} />

        <TextInput
          placeholder="Phone Number"
          keyboardType="phone-pad"
          style={styles.input}
          value={phoneNumber}
          onChangeText={setPhoneNumber}
          editable={!isLoading}
        />

        <View style={styles.passwordContainer}>
          <TextInput
            placeholder="Password"
            keyboardType="default"
            secureTextEntry={!isPasswordVisible}
            style={styles.passwordInput}
            value={password}
            onChangeText={setPassword}
            editable={!isLoading}
          />
          <TouchableOpacity
            onPress={() => setIsPasswordVisible(!isPasswordVisible)}
            style={styles.eyeIcon}
          >
            <Feather
              name={isPasswordVisible ? "eye" : "eye-off"}
              size={24}
              color="black"
            />
          </TouchableOpacity>
        </View>

        <TouchableOpacity
          style={[
            {
              backgroundColor: "#003399",
              padding: 20,
              width: "80%",
              marginVertical: 40,
              borderRadius: 15,
            },
            isLoading && { opacity: 0.7 },
          ]}
          onPress={handleLogin}
          disabled={isLoading}
        >
          <Text
            style={{
              color: "white",
              textAlign: "center",
              fontSize: 20,
              fontWeight: "bold",
            }}
          >
            {isLoading ? "Logging in..." : "Login"}
          </Text>
        </TouchableOpacity>

        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "flex-end",
            height: "70%",
          }}
        >
          <Text style={{ fontWeight: "500" }}>Don't have an account? </Text>
          <TouchableOpacity onPress={handleSignUpNavigation}>
            <Text style={{ color: "blue" }}>Sign Up</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Login;

const styles = StyleSheet.create({
  input: {
    borderColor: "blue",
    borderWidth: 1,
    width: "80%",
    marginBottom: 40,
    padding: 20,
    borderRadius: 10,
  },
  passwordContainer: {
    flexDirection: "row",
    alignItems: "center",
    width: "80%",
    marginBottom: 40,
    borderColor: "blue",
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 20,
  },
  passwordInput: {
    flex: 1,
    paddingVertical: 20,
  },
  eyeIcon: {
    padding: 10,
  },
});