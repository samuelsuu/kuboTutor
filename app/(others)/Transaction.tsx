import { StyleSheet, Text, View, Image, FlatList, TouchableOpacity } from "react-native";
import React from "react";
import TransactionHeader from "@/components/TransactionHeader";

interface Transaction {
  id: number;
  image: string;
  title: string;
  amount: number;
  date: string;
}

const transactions: Transaction[] = [
  {
    id: 1,
    image: "https://picsum.photos/200/300",
    title: "Credit",
    amount: 100,
    date: "2023-07-01",
  },
  {
    id: 2,
    image: "https://picsum.photos/200/300",
    title: "Transaction 1",
    amount: 100,
    date: "2023-07-01",
  },
  {
    id: 3,
    image: "https://picsum.photos/200/300",
    title: "Transaction 3",
    amount: 100,
    date: "2023-07-01",
  },
  {
    id: 4,
    image: "https://picsum.photos/200/300",
    title: "Transaction 4",
    amount: 100,
    date: "2023-07-01",
  },
];

const Transaction = () => {
  const renderTransaction = ({ item }: { item: Transaction }) => {
    return (
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          marginBottom: 16,
          justifyContent: "space-between",
        }}
      >


        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <Image
            source={{ uri: item.image }}
            style={{ width: 50, height: 50, marginRight: 12, borderRadius: 25 }}
          />
          <View>
            <Text style={{ fontWeight: "bold" }}>{item.title}</Text>
            <Text>{item.date}</Text>
          </View>
        </View>


        <View style={{ flexDirection: "column", alignItems: "center" }}>
          <Text> N{item.amount}</Text>
          <TouchableOpacity>
            <Text style={{ color: "blue", fontWeight: "bold" }}>View details</Text>
          </TouchableOpacity>
        </View>


      </View>
    );
  };
  return (
    <View>
      <TransactionHeader title="Transaction History" />

      <FlatList
        data={transactions}
        renderItem={renderTransaction}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={{ padding: 20 }}
      />
    </View>
  );
  /* styles removed as they were unused */
};

export default Transaction;

const styles = StyleSheet.create({});
