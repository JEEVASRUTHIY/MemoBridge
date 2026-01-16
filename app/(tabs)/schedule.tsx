import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Modal,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import AsyncStorage from "@react-native-async-storage/async-storage";
import DateTimePicker from "@react-native-community/datetimepicker";

type Reminder = {
  id: string;
  time: string;
  title: string;
  type: "Medicine" | "Water" | "Break" | "Walk";
  details?: string;
  repeat: boolean;
};

export default function Schedule() {
  const [reminders, setReminders] = useState<Reminder[]>([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [title, setTitle] = useState("");
  const [details, setDetails] = useState("");
  const [type, setType] = useState<Reminder["type"]>("Medicine");
  const [repeat, setRepeat] = useState(false);
  const [time, setTime] = useState(new Date());
  const [showPicker, setShowPicker] = useState(false);

  useEffect(() => {
    loadReminders();
  }, []);

  const loadReminders = async () => {
    const data = await AsyncStorage.getItem("REMINDERS");
    if (data) setReminders(JSON.parse(data));
  };

  const saveReminder = async () => {
    const newReminder: Reminder = {
      id: Date.now().toString(),
      time: time.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      title,
      type,
      details,
      repeat,
    };

    const updated = [...reminders, newReminder];
    setReminders(updated);
    await AsyncStorage.setItem("REMINDERS", JSON.stringify(updated));

    setModalVisible(false);
    setTitle("");
    setDetails("");
    setRepeat(false);
  };

  return (
    <LinearGradient colors={["#0F172A", "#020617"]} style={styles.container}>
      <Text style={styles.header}>Schedule ⏰</Text>

      <ScrollView>
        {reminders.map((item) => (
          <View key={item.id} style={styles.card}>
            <Text style={styles.cardTitle}>
              {item.type === "Medicine" && "💊"}
              {item.type === "Water" && "💧"}
              {item.type === "Break" && "🛑"}
              {item.type === "Walk" && "🚶"}{" "}
              {item.title}
            </Text>

            <Text style={styles.time}>{item.time}</Text>

            {item.details ? (
              <Text style={styles.details}>{item.details}</Text>
            ) : null}

            {item.repeat && <Text style={styles.repeat}>🔁 Daily</Text>}
          </View>
        ))}
      </ScrollView>

      <TouchableOpacity
        style={styles.addBtn}
        onPress={() => setModalVisible(true)}
      >
        <Text style={styles.addText}>➕ Add Reminder</Text>
      </TouchableOpacity>

      {/* ADD MODAL */}
      <Modal visible={modalVisible} animationType="slide">
        <LinearGradient colors={["#F8FAFC", "#E5E7EB"]} style={styles.modal}>
          <Text style={styles.modalTitle}>New Reminder</Text>

          <TouchableOpacity onPress={() => setShowPicker(true)}>
            <Text style={styles.timePick}>⏰ Pick Time</Text>
          </TouchableOpacity>

          {showPicker && (
            <DateTimePicker
              value={time}
              mode="time"
              onChange={(e, selected) => {
                setShowPicker(false);
                if (selected) setTime(selected);
              }}
            />
          )}

          <TextInput
            placeholder="Reminder title (Medicine / Water / Walk)"
            style={styles.input}
            value={title}
            onChangeText={setTitle}
          />

          <TextInput
            placeholder="Details (Tablet name, location, etc.)"
            style={styles.input}
            value={details}
            onChangeText={setDetails}
          />

          <TouchableOpacity
            style={styles.repeatBtn}
            onPress={() => setRepeat(!repeat)}
          >
            <Text>🔁 Repeat Daily: {repeat ? "Yes" : "No"}</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.saveBtn} onPress={saveReminder}>
            <Text style={styles.saveText}>Save Reminder</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => setModalVisible(false)}>
            <Text style={{ textAlign: "center", marginTop: 10 }}>Cancel</Text>
          </TouchableOpacity>
        </LinearGradient>
      </Modal>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  header: { fontSize: 28, fontWeight: "700", color: "#FFF", marginBottom: 14 },

  card: {
    backgroundColor: "#FFF",
    borderRadius: 20,
    padding: 16,
    marginBottom: 12,
  },

  cardTitle: { fontSize: 18, fontWeight: "600" },
  time: { fontSize: 16, color: "#2563EB", marginTop: 4 },
  details: { fontSize: 14, color: "#374151", marginTop: 4 },
  repeat: { marginTop: 6, fontSize: 12, color: "#16A34A" },

  addBtn: {
    backgroundColor: "#4F46E5",
    padding: 16,
    borderRadius: 30,
    alignItems: "center",
    marginTop: 10,
  },
  addText: { color: "#FFF", fontSize: 16, fontWeight: "600" },

  modal: { flex: 1, padding: 20 },
  modalTitle: { fontSize: 24, fontWeight: "700", marginBottom: 20 },

  timePick: {
    backgroundColor: "#E0E7FF",
    padding: 14,
    borderRadius: 16,
    marginBottom: 12,
    textAlign: "center",
  },

  input: {
    backgroundColor: "#F3F4F6",
    padding: 14,
    borderRadius: 16,
    marginBottom: 10,
  },

  repeatBtn: {
    backgroundColor: "#DBEAFE",
    padding: 12,
    borderRadius: 14,
    marginBottom: 12,
  },

  saveBtn: {
    backgroundColor: "#16A34A",
    padding: 16,
    borderRadius: 30,
    alignItems: "center",
  },
  saveText: { color: "#FFF", fontWeight: "600", fontSize: 16 },
});
