import React from "react";
import { useRouter } from "expo-router";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";

const activities = [
  {
    title: "Memory Games",
    subtitle: "Improve focus & recall",
    icon: "🧠",
    color: ["#E0E7FF", "#F4F6FF"] as const,
  },
  {
    title: "Music Therapy",
    subtitle: "Relax your mind",
    icon: "🎵",
    color: ["#FCE7F3", "#FFF1F2"] as const,
  },
  {
    title: "Light Exercises",
    subtitle: "Gentle movement",
    icon: "🤸",
    color: ["#ECFDF5", "#F0FDF4"] as const,
  },
  {
    title: "Daily Diary",
    subtitle: "Record today’s thoughts",
    icon: "📔",
    color: ["#FEF3C7", "#FFFBEB"] as const,
  },
  {
    title: "Memory Lane",
    subtitle: "Relive special moments",
    icon: "📸",
    color: ["#EDE9FE", "#F5F3FF"] as const,
  },
];

export default function ActivitiesScreen() {
  const router = useRouter();

  return (
    <LinearGradient
      colors={["#EAF2FF", "#F5F9FF", "#FFFFFF"] as const}
      style={{ flex: 1 }}
    >
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.header}>Activities 🌱</Text>
        <Text style={styles.subHeader}>
          Choose something that feels good today
        </Text>

        {activities.map((item, index) => (
          <TouchableOpacity
            key={index}
            activeOpacity={0.85}
            onPress={() => {
              if (item.title === "Memory Games") {
                router.push("/memory-game");
              }
               if (item.title === "Music Therapy") {
      router.push("/(tabs)/music-therapy");
    }
    if (item.title === "Light Exercises") {
  router.push("/light-exercises");
}

            }}
          >
            <LinearGradient colors={item.color} style={styles.card}>
              <Text style={styles.icon}>{item.icon}</Text>

              <View>
                <Text style={styles.title}>{item.title}</Text>
                <Text style={styles.subtitle}>{item.subtitle}</Text>
              </View>
            </LinearGradient>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    paddingBottom: 40,
  },

  header: {
    fontSize: 28,
    fontWeight: "700",
    color: "#111827",
    marginBottom: 6,
  },

  subHeader: {
    fontSize: 14,
    color: "#6B7280",
    marginBottom: 24,
  },

  card: {
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 24,
    padding: 20,
    marginBottom: 16,
    shadowColor: "#000",
    shadowOpacity: 0.15,
    shadowRadius: 10,
    elevation: 6,
  },

  icon: {
    fontSize: 40,
    marginRight: 18,
  },

  title: {
    fontSize: 18,
    fontWeight: "600",
    color: "#1F2937",
  },

  subtitle: {
    fontSize: 13,
    color: "#6B7280",
    marginTop: 4,
  },
});
