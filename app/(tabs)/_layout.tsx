import { Tabs } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarActiveTintColor: "#6A5AE0",
        tabBarStyle: { height: 60 },
        tabBarIcon: ({ color, size }) => {
          let iconName: any;

          if (route.name === "home") iconName = "home";
          else if (route.name === "activities") iconName = "game-controller";
          else if (route.name === "schedule") iconName = "alarm";
          else if (route.name === "profile") iconName = "person";

          return <Ionicons name={iconName} size={size} color={color} />;
        },
      })}
    >
      <Tabs.Screen name="home" options={{ title: "Home" }} />
      <Tabs.Screen name="activities" options={{ title: "Activities" }} />
      <Tabs.Screen name="schedule" options={{ title: "Schedule" }} />
      <Tabs.Screen name="profile" options={{ title: "Profile" }} />
    </Tabs>
  );
}
