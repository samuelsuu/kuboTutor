// ContactForm.tsx
import React from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from "react-native";
import { Formik } from "formik";
import * as Yup from "yup";
import emailjs from "@emailjs/browser"; // works in Expo

// Validation schema
const ContactSchema = Yup.object().shape({
  name: Yup.string().required("Name is required"),
  email: Yup.string().email("Invalid email").required("Email is required"),
  message: Yup.string().min(5, "Message too short").required("Message is required"),
});

const ContactForm = () => {
  const handleSubmitForm = async (values: { name: string; email: string; message: string }) => {
    try {
      // Replace with your EmailJS credentials
      const serviceId = "your_service_id";
      const templateId = "your_template_id";
      const publicKey = "your_public_key";

      const response = await emailjs.send(
        serviceId,
        templateId,
        {
          from_name: values.name,
          from_email: values.email,
          message: values.message,
        },
        { publicKey }
      );

      if (response.status === 200) {
        Alert.alert("Success", "Your message has been sent!");
      } else {
        Alert.alert("Error", "Something went wrong. Try again.");
      }
    } catch (error) {
      console.error(error);
      Alert.alert("Error", "Failed to send message. Please try later.");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Contact Us</Text>

      <Formik
        initialValues={{ name: "", email: "", message: "" }}
        validationSchema={ContactSchema}
        onSubmit={handleSubmitForm}
      >
        {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
          <>
            {/* Name */}
            <TextInput
              style={styles.input}
              placeholder="Your Name"
              onChangeText={handleChange("name")}
              onBlur={handleBlur("name")}
              value={values.name}
            />
            {touched.name && errors.name && <Text style={styles.error}>{errors.name}</Text>}

            {/* Email */}
            <TextInput
              style={styles.input}
              placeholder="Your Email"
              keyboardType="email-address"
              onChangeText={handleChange("email")}
              onBlur={handleBlur("email")}
              value={values.email}
            />
            {touched.email && errors.email && <Text style={styles.error}>{errors.email}</Text>}

            {/* Message */}
            <TextInput
              style={[styles.input, styles.textArea]}
              placeholder="Your Message"
              multiline
              numberOfLines={4}
              onChangeText={handleChange("message")}
              onBlur={handleBlur("message")}
              value={values.message}
            />
            {touched.message && errors.message && <Text style={styles.error}>{errors.message}</Text>}

            {/* Submit */}
            <TouchableOpacity style={styles.button} onPress={() => handleSubmit()}>
              <Text style={styles.buttonText}>Send</Text>
            </TouchableOpacity>
          </>
        )}
      </Formik>
    </View>
  );
};

export default ContactForm;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff",
  },
  heading: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 12,
    marginBottom: 10,
    fontSize: 16,
  },
  textArea: {
    height: 100,
    textAlignVertical: "top",
  },
  button: {
    backgroundColor: "#007BFF",
    padding: 15,
    borderRadius: 8,
    marginTop: 10,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
    textAlign: "center",
    fontSize: 16,
  },
  error: {
    color: "red",
    marginBottom: 8,
    marginLeft: 4,
    fontSize: 14,
  },
});
