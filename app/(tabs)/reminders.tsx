import { View, Text, StyleSheet } from "react-native";

export default function Reminders() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Reminders ⏰</Text>

      <View style={styles.card}>💊 Medicine – 9:00 AM</View>
      <View style={styles.card}>🍽 Lunch – 1:00 PM</View>
      <View style={styles.card}>🚶 Walk – 5:30 PM</View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  title: { fontSize: 26, fontWeight: "bold", marginBottom: 20 },
  card: {
    backgroundColor: "#FFF",
    padding: 20,
    borderRadius: 18,
    marginBottom: 14,
    elevation: 3,
  },
});
