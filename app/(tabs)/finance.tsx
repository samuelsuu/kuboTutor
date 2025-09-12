import axios from "axios";
import React, { useEffect, useState } from 'react';
import { FlatList, Image, StyleSheet, Text, TextInput, View, RefreshControl } from 'react-native';
import {  } from "react-native-gesture-handler";

interface Coin{
  id: string;
  name: string;
  symbol: string;
  current_price: number;
  price_change_pencentage_24h: number;
  image: string;
}

const Finance = () => {
  const [coin, setCoin] = useState<Coin[]>([]);
  const [filteredCoins, setFilteredCoins] =  useState<Coin[]>([]);
  const [search, setSearch] = useState("");
  const [refreshing, setRefreshing] = useState(false);


  //fetch coin from coingecko api
  const fetchCoins = async() => {
    try{
    const response = await axios.get(
      " http://api.coingecko.com/api/v3/coins/markets",

      {
        params: {
          vs_currency: "usd",
          order: "market_cap_desc",
          per_page: 100,
          page: 1,
          sparkline: false,
          price_change_percentage: "24h",
      },
      }
    );

     setCoin(response.data);
     setFilteredCoins(response.data);
    }catch(error){
      console.log("error fetching coins", error);
    }
  };

  useEffect(() => {
    fetchCoins();
  }, []);

  // search filter
  const handleSearch = (text: string) => {
    setSearch(text);
    const results = coin.filter((c) =>
      c.name.toLowerCase().includes(text.toLowerCase()) ||
      c.symbol.toLowerCase().includes(text.toLowerCase())
    );
    setFilteredCoins(results);
  };

  // pull to refresh
  const onRrefresh = async () => {
    setRefreshing(true);
    await fetchCoins();
    setRefreshing(false);
  };

  // Render each coin item
  const renderCoin = ({item}: {item: Coin}) => {
    const priceChange = item.price_change_pencentage_24h;
    const priceColor = priceChange > 0 ? "green" : "red";

    return (
      <View>
        <Image source={{ uri: item.image }} style={{ width: 32, height: 32 }} />

        <View>
          <Text>{item.name}</Text>
          <Text>{item.symbol.toUpperCase()}</Text>
        </View>

        <View>
          <Text>${item.current_price}</Text>
          <Text style={{ color: priceColor }}>{priceChange.toFixed(2)}%</Text>
        </View>
      </View>
    );
  };

  return (
    <View>
      <Text>finance</Text>

      <TextInput
        placeholder="Search by name or symbol"
        value={search}
        onChangeText={handleSearch}
      />

      {/* coin list */}
      <FlatList
        data={filteredCoins}
        keyExtractor={(item) => item.id}
        renderItem={renderCoin}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRrefresh} />
        }
      />
    </View>
  );
}

export default Finance

const styles = StyleSheet.create({})