import { Tabs } from "expo-router";
import React, { useEffect } from "react";
import { HapticTab } from "@/components/HapticTab";
import { IconSymbol } from "@/components/ui/IconSymbol";
import TabBarBackground from "@/components/ui/TabBarBackground";
import Ionicons from "@expo/vector-icons/Ionicons";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function TabLayout() {
  const defaultCodes = Array.from(
    { length: 10 },
    (_, i) => String.fromCharCode(65 + i) // Generate 'A' to 'J'
  );
  useEffect(() => {
    const initializeCodes = async () => {
      try {
        const savedCodes = await AsyncStorage.getItem("priceCodes");
        if (!savedCodes) {
          await AsyncStorage.setItem(
            "priceCodes",
            JSON.stringify(defaultCodes)
          );
        }
      } catch (error) {
        console.error("Failed to initialize codes in AsyncStorage", error);
      }
    };
    initializeCodes();
  }, []);

  return (
    <Tabs
      screenOptions={({ route }) => ({
        tabBarActiveTintColor: "skyblue",
        headerShown: false,
        tabBarButton: HapticTab,
        tabBarBackground: TabBarBackground,
        tabBarStyle: {
          position: "absolute",
          paddingBottom: 5,
          paddingTop: 5,
          borderTopWidth: 0,
          backgroundColor: "white",
        },
      })}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "",
          tabBarIcon: ({ color }) => (
            <IconSymbol size={28} name="house.fill" color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="explore"
        options={{
          title: "",
          tabBarIcon: ({ color }) => (
            <IconSymbol size={28} name="paperplane.fill" color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="setting"
        options={{
          title: "",
          tabBarIcon: ({ color }) => (
            <Ionicons name="settings" size={28} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="Calculator"
        options={{
          title: "",
          tabBarIcon: ({ color }) => (
            <Ionicons name="calculator" size={28} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
