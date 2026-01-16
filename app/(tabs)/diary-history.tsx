import React, { useCallback, useState } from "react";
import {
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  View,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Audio } from "expo-av";
import { useFocusEffect } from "expo-router";

export default function DiaryHistory() {
  const [entries, setEntries] = useState<any[]>([]);

  useFocusEffect(
    useCallback(() => {
      loadEntries();
    }, [])
  );

  const loadEntries = async () => {
    try {
      const data = await AsyncStorage.getItem("DIARY_ENTRIES");
      setEntries(data ? JSON.parse(data) : []);
    } catch {
      console.log("Failed to load diary");
    }
  };

  const playAudio = async (uri: string) => {
    const { sound } = await Audio.Sound.createAsync({ uri });
    await sound.playAsync();
  };

  return (
    <LinearGradient colors={["#FFFFFF", "#F5F9FF"]} style={styles.container}>
      <Text style={styles.title}>Diary History 📖</Text>

      <ScrollView>
        {entries.length === 0 && (
          <Text style={styles.empty}>No diary entries yet 🌱</Text>
        )}

        {entries.map((item, index) => (
          <View key={index} style={styles.card}>
            <Text style={styles.date}>{item.date}</Text>

            {item.text ? (
              <Text style={styles.text}>{item.text}</Text>
            ) : null}

            {item.audioUri ? (
              <TouchableOpacity
                style={styles.playBtn}
                onPress={() => playAudio(item.audioUri)}
              >
                <Text>▶️ Play Voice</Text>
              </TouchableOpacity>
            ) : null}
          </View>
        ))}
      </ScrollView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },

  title: {
    fontSize: 26,
    fontWeight: "700",
    marginBottom: 20,
  },

  empty: {
    textAlign: "center",
    marginTop: 40,
    fontSize: 16,
  },

  card: {
    backgroundColor: "#F3F4F6",
    borderRadius: 18,
    padding: 16,
    marginBottom: 16,
  },

  date: {
    fontWeight: "600",
    marginBottom: 6,
  },

  text: {
    marginBottom: 10,
  },

  playBtn: {
    marginTop: 8,
  },
});
