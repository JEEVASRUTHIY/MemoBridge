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

/** ✅ LOCK ROUTES AS LITERALS */
type AppRoute =
  | "/memory-game"
  | "/music-therapy"
  | "/light-exercises"
  | "/daily-diary"
  | "/memory-lane";

type Activity = {
  title: string;
  subtitle: string;
  icon: string;
  route: AppRoute;
  color: readonly [string, string];
};

const activities: Activity[] = [
  {
    title: "Memory Games",
    subtitle: "Improve focus & recall",
    icon: "🧠",
    route: "/memory-game",
    color: ["#E0E7FF", "#F4F6FF"],
  },
  {
    title: "Music Therapy",
    subtitle: "Relax your mind",
    icon: "🎵",
    route: "/music-therapy",
    color: ["#FCE7F3", "#FFF1F2"],
  },
  {
    title: "Light Exercises",
    subtitle: "Gentle movement",
    icon: "🤸",
    route: "/light-exercises",
    color: ["#ECFDF5", "#F0FDF4"],
  },
  {
    title: "Daily Diary",
    subtitle: "Record today’s thoughts",
    icon: "📔",
    route: "/daily-diary",
    color: ["#FEF3C7", "#FFFBEB"],
  },
  {
    title: "Memory Lane",
    subtitle: "Relive special moments",
    icon: "📸",
    route: "/memory-lane",
    color: ["#EDE9FE", "#F5F3FF"],
  },
];

export default function ActivitiesScreen() {
  const router = useRouter();

  return (
    <LinearGradient colors={["#EAF2FF", "#F5F9FF", "#FFFFFF"]} style={{ flex: 1 }}>
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.header}>Activities 🌱</Text>
        <Text style={styles.subHeader}>
          Choose something that feels good today
        </Text>

        {activities.map((item, index) => (
          <TouchableOpacity
            key={index}
            activeOpacity={0.85}
            onPress={() => router.push(item.route)} // ✅ NO ERROR
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
  container: { padding: 20, paddingBottom: 40 },
  header: { fontSize: 28, fontWeight: "700", marginBottom: 6 },
  subHeader: { fontSize: 14, color: "#6B7280", marginBottom: 24 },
  card: {
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 24,
    padding: 20,
    marginBottom: 16,
    elevation: 6,
  },
  icon: { fontSize: 40, marginRight: 18 },
  title: { fontSize: 18, fontWeight: "600" },
  subtitle: { fontSize: 13, color: "#6B7280", marginTop: 4 },
});
