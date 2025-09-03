import { SafeAreaView, StyleSheet, Text, View } from "react-native";
import React from "react";
import HomeHeader from "@/components/HomeHeader";
import Account from "@/components/Account";
import Card from "@/components/Card";

const home = () => {
  return (
    <SafeAreaView style={{marginHorizontal: 30, marginVertical: 30}}>
      <View>
        <HomeHeader />
        <Account />
        <Card />
      </View>
    </SafeAreaView>
  );
};

export default home;

const styles = StyleSheet.create({});
