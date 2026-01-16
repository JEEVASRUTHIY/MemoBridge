import { View, Text, StyleSheet } from "react-native";

export default function Profile() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Profile 👤</Text>

      <View style={styles.card}>Name: User</View>
      <View style={styles.card}>Age: —</View>
      <View style={styles.card}>Linked Caregiver</View>
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
