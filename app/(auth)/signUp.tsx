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

const signUp = () => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // Validate phone number (basic validation)
  const validatePhoneNumber = (phone: string) => {
    const phoneRegex = /^[\+]?[1-9][\d]{3,14}$/;
    return phoneRegex.test(phone.replace(/\s/g, ""));
  };

  // Validate password (minimum 6 characters)
  const validatePassword = (pass: string) => {
    return pass.length >= 6;
  };

  // Handle sign up
  const handleSignUp = async () => {
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

    if (!validatePassword(password)) {
      Alert.alert("Error", "Password must be at least 6 characters long");
      return;
    }

    setIsLoading(true);

    try {
      // Check if user already exists
      const existingUsers = await AsyncStorage.getItem("users");
      type User = {
        id: string;
        phoneNumber: string;
        password: string;
        createdAt: string;
      };

      let users: User[] = existingUsers ? JSON.parse(existingUsers) : [];

      // Check if phone number is already registered
      const userExists = users.find(
        (user: User) => user.phoneNumber === phoneNumber.trim()
      );

      if (userExists) {
        Alert.alert(
          "Error",
          "An account with this phone number already exists pls try another"
        );
        setIsLoading(false);
        return;
      }

      // Create new user object
      const newUser = {
        id: Date.now().toString(), // Simple ID generation
        phoneNumber: phoneNumber.trim(),
        password: password, // In production, you should hash this
        createdAt: new Date().toISOString(),
      };

      // Add new user to users array
      users.push(newUser);

      // Save updated users array to AsyncStorage
      await AsyncStorage.setItem("users", JSON.stringify(users));

      // Save current user session
      await AsyncStorage.setItem("currentUser", JSON.stringify(newUser));

      Alert.alert("Success", "Account created successfully!", [
        {
          text: "OK",
          onPress: () => {
            // Navigate to home page
            router.push("/(tabs)/home");
          },
        },
      ]);
    } catch (error) {
      console.error("Error creating account:", error);
      Alert.alert("Error", "Failed to create account. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  // Handle login navigation
  const handleLoginNavigation = () => {
    router.push("/login"); // Assuming you have a login screen
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
          onPress={handleSignUp}
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
            {isLoading ? "Creating Account..." : "Sign Up"}
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
          <Text style={{ fontWeight: "500" }}>Already have an account? </Text>
          <TouchableOpacity onPress={handleLoginNavigation}>
            <Text style={{ color: "blue" }}>Login</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default signUp;

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
