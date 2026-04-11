import { Tabs } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { useColorScheme, View, StyleSheet, Platform } from "react-native";
import Colors from "@/constants/Colors";

export default function RootLayout() {
  const theme = useColorScheme() ?? "light";
  const colors = Colors[theme];
  const isDark = theme === "dark";

  return (
    <Tabs screenOptions={{ 
      headerShown: false,
      tabBarStyle: {
        position: 'absolute',
        bottom: 20,
        left: 20,
        right: 20,
        height: 64,
        elevation: 0,
        shadowOpacity: 0,
        borderTopWidth: 0,
        paddingBottom: 0,
        borderRadius: 32,
        backgroundColor: "transparent",
        overflow: "hidden",
        
        
      },
      tabBarBackground: () => (
        <View 
          style={{
            ...StyleSheet.absoluteFillObject,
            backgroundColor: isDark ? 'rgba(24, 24, 27, 0.95)' : 'rgba(255, 255, 255, 0.95)',
            borderColor: isDark ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)',
            borderWidth: 1,
            borderRadius: 32,
          }} 
        />
      ),
      tabBarActiveTintColor: colors.primary,
      tabBarInactiveTintColor: isDark ? 'rgba(255, 255, 255, 0.5)' : 'rgba(0, 0, 0, 0.5)',
      tabBarShowLabel: false,
    }}>
      <Tabs.Screen 
        name="index" 
        options={{ 
          title: "Home", 
          tabBarIcon: ({ color }) => <Ionicons name="home" size={24} color={color} /> 
        }} 
      />
      <Tabs.Screen 
        name="today" 
        options={{ 
          title: "Today", 
          tabBarIcon: ({ color }) => <Ionicons name="calendar" size={24} color={color} /> 
        }} 
      />
      <Tabs.Screen 
        name="create" 
        options={{ 
          title: "Create", 
          tabBarIcon: ({ color }) => <Ionicons name="add-circle" size={24} color={color} /> 
        }} 
      />
      <Tabs.Screen 
        name="manage" 
        options={{ 
          title: "Manage", 
          tabBarIcon: ({ color }) => <Ionicons name="settings" size={24} color={color} /> 
        }} 
      />
    </Tabs>
  );
}
