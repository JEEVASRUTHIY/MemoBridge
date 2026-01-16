import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  ScrollView,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { LineChart } from "react-native-chart-kit";
import VoiceGuideAvatar from "../../components/avatar/VoiceGuideAvatar";

const screenWidth = Dimensions.get("window").width;

export default function Home() {
  return (
    <LinearGradient
      colors={["#EEF2FF", "#F8FAFF", "#FFFFFF"]}
      style={{ flex: 1 }}
    >
      <ScrollView
        contentContainerStyle={styles.container}
        showsVerticalScrollIndicator={false}
      >
        {/* HEADER */}
        <View style={styles.header}>
          <View>
            <Text style={styles.greet}>Good Morning 😊</Text>
            <Text style={styles.subGreet}>
              🌱 Every small step is a memory worth keeping.
            </Text>
          </View>

          <View style={styles.profileCircle}>
            <Text style={{ fontSize: 18 }}>👤</Text>
          </View>
        </View>

        {/* AVATAR CENTER */}
        <View style={styles.avatarSection}>
          <VoiceGuideAvatar />
          <Text style={styles.tapText}>
            Tap me and I will guide you 💬
          </Text>
        </View>

        {/* MEMORY GRAPH CARD */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Memory Progress</Text>

          <LineChart
            data={{
              labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
              datasets: [
                {
                  data: [40, 55, 48, 70, 65, 75, 85],
                },
              ],
            }}
            width={screenWidth - 48}
            height={180}
            withDots={false}
            withInnerLines={false}
            withOuterLines={false}
            chartConfig={{
              backgroundGradientFrom: "#FFFFFF",
              backgroundGradientTo: "#FFFFFF",
              color: () => "#6A5AE0",
              strokeWidth: 3,
            }}
            bezier
            style={{ borderRadius: 16 }}
          />

          <Text style={styles.progressNote}>
            💜 You’re doing well today
          </Text>
        </View>
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
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 28,
  },

  greet: {
    fontSize: 26,
    fontWeight: "bold",
    color: "#1F2937",
  },

  subGreet: {
    fontSize: 14,
    color: "#6B7280",
    marginTop: 6,
    maxWidth: 260,
  },

  profileCircle: {
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: "#E0E7FF",
    alignItems: "center",
    justifyContent: "center",
  },

  avatarSection: {
    alignItems: "center",
    marginBottom: 32,
  },

  tapText: {
    marginTop: 14,
    fontSize: 15,
    color: "#6A5AE0",
  },

  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: 24,
    padding: 18,
    elevation: 4,
  },

  cardTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#1F2937",
    marginBottom: 12,
  },

  progressNote: {
    marginTop: 12,
    fontSize: 14,
    color: "#6A5AE0",
  },
});
