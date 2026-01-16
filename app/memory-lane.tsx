import React, { useState, useCallback } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter, useFocusEffect } from "expo-router";

type Memory = {
  id: string;
  date: string;
  location: string;
  description: string;
  imageUri: string | null;
};

export default function MemoryLane() {
  const router = useRouter();
  const [memories, setMemories] = useState<Memory[]>([]);

  const loadMemories = async () => {
    const data = await AsyncStorage.getItem("MEMORY_LANE_ENTRIES");
    if (data) setMemories(JSON.parse(data));
    else setMemories([]);
  };

  useFocusEffect(
    useCallback(() => {
      loadMemories();
    }, [])
  );

  return (
    <LinearGradient colors={["#F5F9FF", "#FFFFFF"]} style={styles.container}>
      <Text style={styles.title}>Memory Lane 📸</Text>

      <ScrollView>
        {memories.length === 0 && (
          <Text style={styles.emptyText}>
            No memories yet. Add your first happy moment 💙
          </Text>
        )}

        {memories.map((item) => (
          <View key={item.id} style={styles.card}>
            {item.imageUri && (
              <Image source={{ uri: item.imageUri }} style={styles.image} />
            )}

            <Text style={styles.date}>{item.date}</Text>

            {item.location ? (
              <Text style={styles.location}>📍 {item.location}</Text>
            ) : null}

            <Text style={styles.desc}>{item.description}</Text>
          </View>
        ))}
      </ScrollView>

      <TouchableOpacity
        style={styles.addBtn}
        onPress={() => router.push("/add-memory")}
      >
        <Text style={styles.addText}>➕ Add New Memory</Text>
      </TouchableOpacity>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  title: { fontSize: 26, fontWeight: "700", marginBottom: 15 },
  emptyText: {
    textAlign: "center",
    marginTop: 40,
    color: "#6B7280",
  },
  card: {
    backgroundColor: "#F3F4F6",
    borderRadius: 20,
    padding: 14,
    marginBottom: 20,
  },
  image: {
    width: "100%",
    height: 200,
    borderRadius: 16,
    marginBottom: 10,
  },
  date: { fontWeight: "600", marginBottom: 4 },
  location: { color: "#4B5563", marginBottom: 6 },
  desc: { fontSize: 15 },
  addBtn: {
    backgroundColor: "#4F46E5",
    padding: 16,
    borderRadius: 30,
    alignItems: "center",
    marginTop: 10,
  },
  addText: { color: "#FFF", fontSize: 16, fontWeight: "600" },
});
