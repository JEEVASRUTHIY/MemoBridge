import React, { useState } from "react";
import {
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Alert,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Audio } from "expo-av";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";

export default function DailyDiary() {
  const router = useRouter();
  const [text, setText] = useState("");
  const [recording, setRecording] = useState<Audio.Recording | null>(null);
  const [audioUri, setAudioUri] = useState<string | null>(null);

  const startRecording = async () => {
    try {
      await Audio.requestPermissionsAsync();
      await Audio.setAudioModeAsync({
        allowsRecordingIOS: true,
        playsInSilentModeIOS: true,
      });

      const rec = new Audio.Recording();
      await rec.prepareToRecordAsync(
        Audio.RecordingOptionsPresets.HIGH_QUALITY
      );
      await rec.startAsync();
      setRecording(rec);
    } catch {
      Alert.alert("Error", "Could not start recording");
    }
  };

  const stopRecording = async () => {
    if (!recording) return;

    await recording.stopAndUnloadAsync();
    const uri = recording.getURI();
    setAudioUri(uri || null);
    setRecording(null);
  };

  const saveDiary = async () => {
    if (!text && !audioUri) {
      Alert.alert("Empty Diary", "Please type or record something");
      return;
    }

    try {
      const newEntry = {
        date: new Date().toDateString(),
        text,
        audioUri,
      };

      const existing = await AsyncStorage.getItem("DIARY_ENTRIES");
      const entries = existing ? JSON.parse(existing) : [];

      entries.unshift(newEntry);
      await AsyncStorage.setItem(
        "DIARY_ENTRIES",
        JSON.stringify(entries)
      );

      setText("");
      setAudioUri(null);

      Alert.alert("Saved", "Your diary is saved 💙");
    } catch {
      Alert.alert("Error", "Could not save diary");
    }
  };

  return (
    <LinearGradient colors={["#EAF2FF", "#FFFFFF"]} style={styles.container}>
      <Text style={styles.title}>Daily Diary 📔</Text>

      <TextInput
        style={styles.input}
        placeholder="Type today’s thoughts..."
        multiline
        value={text}
        onChangeText={setText}
      />

      <TouchableOpacity
        style={styles.recordBtn}
        onPress={recording ? stopRecording : startRecording}
      >
        <Text style={styles.recordText}>
          {recording ? "⏹ Stop Recording" : "🎙 Start Recording"}
        </Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.saveBtn} onPress={saveDiary}>
        <Text style={styles.saveText}>💾 Save Today’s Diary</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.historyBtn}
        onPress={() => router.push("/diary-history")}
      >
        <Text style={styles.historyText}>📖 View History</Text>
      </TouchableOpacity>
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

  input: {
    backgroundColor: "#F3F4F6",
    borderRadius: 16,
    padding: 16,
    height: 150,
    textAlignVertical: "top",
    fontSize: 16,
  },

  recordBtn: {
    marginTop: 20,
    backgroundColor: "#E0E7FF",
    padding: 14,
    borderRadius: 30,
    alignItems: "center",
  },

  recordText: {
    fontSize: 16,
    fontWeight: "600",
  },

  saveBtn: {
    marginTop: 20,
    backgroundColor: "#4F46E5",
    padding: 16,
    borderRadius: 30,
    alignItems: "center",
  },

  saveText: {
    color: "#FFF",
    fontSize: 16,
    fontWeight: "600",
  },

  historyBtn: {
    marginTop: 20,
    alignItems: "center",
  },

  historyText: {
    color: "#2563EB",
    fontSize: 15,
    fontWeight: "600",
  },
});
