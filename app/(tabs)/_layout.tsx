import FontAwesome from "@expo/vector-icons/FontAwesome";
import { MaterialCommunityIcons, MaterialIcons } from "@expo/vector-icons";
import { Tabs } from "expo-router";

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: "blue",
        tabBarStyle: { height: 80 },
        tabBarLabelStyle: { fontSize: 14, marginBottom: 10 },
        tabBarItemStyle: {
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          marginVertical: 10,
        },
      }}
    >
      <Tabs.Screen
        name="home"
        options={{
          title: "Home",
          tabBarIcon: ({ color }) => (
            <FontAwesome size={28} name="home" color={color} />
          ),
          headerShown: false,
        }}
      />
      <Tabs.Screen
        name="finance"
        options={{
          title: "Finance",
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="finance" size={24} color={color} />
          ),
          headerShown: false,
        }}
      />

      <Tabs.Screen
        name="scan"
        options={{
          title: "Scan",
          tabBarIcon: ({ color }) => (
            <MaterialIcons name="qr-code-scanner" size={30} color={color} />
          ),
          tabBarItemStyle: {
            height: 400,
            borderRadius: 70,
            marginBottom: 20,
            marginTop: -20,
            backgroundColor: "white",
            shadowColor: "#000",
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.25,
            shadowRadius: 3.84,
            elevation: 5,
          },
          headerShown: false,
        }}
      />

      <Tabs.Screen
        name="cards"
        options={{
          title: "Cards",
          tabBarIcon: ({ color }) => (
            <FontAwesome name="id-card-o" size={24} color={color} />
          ),
          headerShown: false,
        }}
      />

      <Tabs.Screen
        name="profile"
        options={{
          title: "Profile",
          tabBarIcon: ({ color }) => (
            <MaterialIcons name="person-outline" size={24} color={color} />
          ),
          headerShown: false,
        }}
      />
    </Tabs>
  );
}
