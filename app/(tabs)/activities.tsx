import { View, Text, StyleSheet } from "react-native";

export default function Activities() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Activities 🎮</Text>

      <View style={styles.card}>🧠 Memory Games</View>
      <View style={styles.card}>🎵 Music Therapy</View>
      <View style={styles.card}>🏃 Light Exercises</View>
      <View style={styles.card}>📔 Daily Diary</View>
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
