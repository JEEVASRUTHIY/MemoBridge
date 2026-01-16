import { Text, StyleSheet, TouchableOpacity } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";

export default function Index() {
  const router = useRouter();

  return (
    <LinearGradient colors={["#4facfe", "#00f2fe"]} style={styles.container}>
      <Text style={styles.title}>MemoBridge</Text>
      <Text style={styles.sub}>Caring made gentle 💙</Text>

      <TouchableOpacity
        style={styles.user}
        onPress={() => router.replace("/(tabs)/home")}
      >
        <Text style={styles.icon}>👤</Text>
        <Text style={styles.text}>User</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.caregiver}>
        <Text style={styles.icon}>🧑‍⚕️</Text>
        <Text style={styles.text}>Caregiver</Text>
      </TouchableOpacity>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", padding: 24 },
  title: { fontSize: 42, color: "#FFF", fontWeight: "bold", textAlign: "center" },
  sub: { textAlign: "center", color: "#EAFBFF", marginBottom: 40 },
  user: {
    backgroundColor: "#6A5AE0",
    padding: 26,
    borderRadius: 22,
    marginBottom: 20,
    alignItems: "center",
  },
  caregiver: {
    backgroundColor: "#FF8C42",
    padding: 26,
    borderRadius: 22,
    alignItems: "center",
  },
  icon: { fontSize: 40 },
  text: { fontSize: 22, color: "#FFF", fontWeight: "bold", marginTop: 6 },
});
