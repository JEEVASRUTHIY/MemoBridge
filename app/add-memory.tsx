import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Image,
  Alert,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import * as ImagePicker from "expo-image-picker";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";

export default function AddMemory() {
  const router = useRouter();
  const [imageUri, setImageUri] = useState<string | null>(null);
  const [description, setDescription] = useState("");
  const [location, setLocation] = useState("");

  const pickImage = async () => {
    const permission =
      await ImagePicker.requestCameraPermissionsAsync();

    if (!permission.granted) {
      Alert.alert("Permission required", "Camera access is needed");
      return;
    }

    const result = await ImagePicker.launchCameraAsync({
      quality: 0.7,
    });

    if (!result.canceled) {
      setImageUri(result.assets[0].uri);
    }
  };

  const saveMemory = async () => {
    if (!imageUri && !description) {
      Alert.alert("Add something", "Please add a photo or description");
      return;
    }

    const newMemory = {
      id: Date.now().toString(),
      date: new Date().toDateString(),
      location,
      description,
      imageUri,
    };

    const existing =
      await AsyncStorage.getItem("MEMORY_LANE_ENTRIES");
    const memories = existing ? JSON.parse(existing) : [];

    memories.unshift(newMemory);

    await AsyncStorage.setItem(
      "MEMORY_LANE_ENTRIES",
      JSON.stringify(memories)
    );

    Alert.alert("Saved 💙", "Memory added successfully");
    router.back();
  };

  return (
    <LinearGradient
      colors={["#EAF2FF", "#FFFFFF"]}
      style={styles.container}
    >
      <Text style={styles.title}>Add Memory 💫</Text>

      <TouchableOpacity style={styles.photoBtn} onPress={pickImage}>
        <Text style={styles.photoText}>📸 Take Photo</Text>
      </TouchableOpacity>

      {imageUri && (
        <Image source={{ uri: imageUri }} style={styles.preview} />
      )}

      <TextInput
        style={styles.input}
        placeholder="Describe this memory..."
        multiline
        value={description}
        onChangeText={setDescription}
      />

      <TextInput
        style={styles.input}
        placeholder="Location (optional)"
        value={location}
        onChangeText={setLocation}
      />

      <TouchableOpacity style={styles.saveBtn} onPress={saveMemory}>
        <Text style={styles.saveText}>💾 Save Memory</Text>
      </TouchableOpacity>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },

  title: {
    fontSize: 26,
    fontWeight: "700",
    marginBottom: 20,
  },

  photoBtn: {
    backgroundColor: "#E0E7FF",
    padding: 14,
    borderRadius: 30,
    alignItems: "center",
    marginBottom: 10,
  },

  photoText: { fontSize: 16, fontWeight: "600" },

  preview: {
    width: "100%",
    height: 220,
    borderRadius: 18,
    marginVertical: 10,
  },

  input: {
    backgroundColor: "#F3F4F6",
    borderRadius: 16,
    padding: 14,
    marginTop: 12,
    fontSize: 15,
  },

  saveBtn: {
    backgroundColor: "#4F46E5",
    padding: 16,
    borderRadius: 30,
    alignItems: "center",
    marginTop: 20,
  },

  saveText: {
    color: "#FFF",
    fontSize: 16,
    fontWeight: "600",
  },
});
