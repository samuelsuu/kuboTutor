// app/CryptoList.tsx
import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  TextInput,
  RefreshControl,
  StyleSheet,
  Image,
  ScrollView,
} from "react-native";
import axios from "axios";

interface Coin {
  id: string;
  name: string;
  symbol: string;
  current_price: number;
  price_change_percentage_24h: number;
  image: string;
}

const CryptoList = () => {
  const [coins, setCoins] = useState<Coin[]>([]);
  const [filteredCoins, setFilteredCoins] = useState<Coin[]>([]);
  const [search, setSearch] = useState("");
  const [refreshing, setRefreshing] = useState(false);

  // Fetch coins from CoinGecko API
  const fetchCoins = async () => {
    try {
      const response = await axios.get(
        "https://api.coingecko.com/api/v3/coins/markets",
        {
          params: {
            vs_currency: "usd",
            order: "market_cap_desc",
            per_page: 20,
            page: 1,
            sparkline: false,
          },
        }
      );
      setCoins(response.data);
      setFilteredCoins(response.data);
    } catch (error) {
      console.error("Error fetching coins:", error);
    }
  };

  useEffect(() => {
    fetchCoins();
  }, []);

  // Search filter
  const handleSearch = (text: string) => {
    setSearch(text);
    const results = coins.filter((coin) =>
      coin.name.toLowerCase().includes(text.toLowerCase())
    );
    setFilteredCoins(results);
  };

  // Pull-to-refresh
  const onRefresh = async () => {
    setRefreshing(true);
    await fetchCoins();
    setRefreshing(false);
  };

  // Render each coin row
  const renderItem = ({ item }: { item: Coin }) => {
    const priceChange = item.price_change_percentage_24h;
    const priceColor = priceChange > 0 ? "green" : "red";

    return (
      <View style={styles.coinRow}>
        <Image source={{ uri: item.image }} style={styles.coinImage} />
        <View style={{ flex: 1 }}>
          <Text style={styles.coinName}>{item.name}</Text>
          <Text style={styles.coinSymbol}>{item.symbol.toUpperCase()}</Text>
        </View>
        <View style={{ alignItems: "flex-end" }}>
          <Text style={styles.coinPrice}>${item.current_price}</Text>
          <Text style={{ color: priceColor }}>{priceChange.toFixed(2)}%</Text>
        </View>
      </View>
    );
  };

  return (
    <ScrollView style={styles.container}>
      {/* Search bar */}
      <TextInput
        style={styles.searchInput}
        placeholder="Search coin..."
        value={search}
        onChangeText={handleSearch}
      />

      {/* Coin list */}
      
        <FlatList
          data={filteredCoins}
          keyExtractor={(item) => item.id}
          renderItem={renderItem}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
        />
      </ScrollView>
  );
};

export default CryptoList;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#fff",
  },
  searchInput: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 8,
    marginBottom: 12,
  },
  coinRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  coinImage: {
    width: 40,
    height: 40,
    marginRight: 12,
  },
  coinName: {
    fontSize: 16,
    fontWeight: "bold",
  },
  coinSymbol: {
    color: "gray",
    fontSize: 12,
  },
  coinPrice: {
    fontSize: 16,
    fontWeight: "600",
  },
});
