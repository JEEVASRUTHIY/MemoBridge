import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Audio } from "expo-av";

const moods = [
  { label: "Calm", emoji: "😌", sound: require("../assets/audio/calm.mp3") },
  { label: "Happy", emoji: "😊", sound: require("../assets/audio/happy.mp3") },
  { label: "Sad", emoji: "😔", sound: require("../assets/audio/sad.mp3") },
];

export default function MusicTherapyScreen() {
  const [currentSound, setCurrentSound] = useState<Audio.Sound | null>(null);
  const [playingMood, setPlayingMood] = useState<string | null>(null);

  const playSound = async (mood: any) => {
    if (currentSound) {
      await currentSound.stopAsync();
      await currentSound.unloadAsync();
    }

    const { sound } = await Audio.Sound.createAsync(mood.sound);
    setCurrentSound(sound);
    setPlayingMood(mood.label);
    await sound.playAsync();
  };

  return (
    <LinearGradient
      colors={["#FCE7F3", "#FFF1F2", "#FFFFFF"] as const}
      style={styles.container}
    >
      <Text style={styles.title}>Music Therapy 🎵</Text>
      <Text style={styles.subtitle}>
        How are you feeling right now?
      </Text>

      {moods.map((mood, index) => (
        <TouchableOpacity
          key={index}
          style={styles.moodCard}
          onPress={() => playSound(mood)}
        >
          <Text style={styles.moodEmoji}>{mood.emoji}</Text>
          <Text style={styles.moodText}>{mood.label}</Text>
        </TouchableOpacity>
      ))}

      {playingMood && (
        <Text style={styles.playing}>
          Playing {playingMood} music 🎶
        </Text>
      )}
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    alignItems: "center",
  },

  title: {
    fontSize: 26,
    fontWeight: "700",
    marginBottom: 8,
  },

  subtitle: {
    color: "#6B7280",
    marginBottom: 30,
  },

  moodCard: {
    width: "90%",
    padding: 20,
    borderRadius: 20,
    backgroundColor: "#FFFFFF",
    marginBottom: 16,
    flexDirection: "row",
    alignItems: "center",
    elevation: 5,
  },

  moodEmoji: {
    fontSize: 36,
    marginRight: 16,
  },

  moodText: {
    fontSize: 18,
    fontWeight: "600",
  },

  playing: {
    marginTop: 30,
    fontSize: 14,
    color: "#4F46E5",
  },
});
