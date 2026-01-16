import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import * as Speech from "expo-speech";

type ExerciseType = "count" | "breathing";

const exercises = [
  {
    title: "Neck Stretch",
    icon: "🙆‍♂️",
    type: "count" as ExerciseType,
    instruction:
      "Turn your neck slowly to the left and right. Do it gently.",
  },
  {
    title: "Shoulder Roll",
    icon: "🤷‍♀️",
    type: "count" as ExerciseType,
    instruction:
      "Roll your shoulders slowly forward and backward.",
  },
  {
    title: "Arm Raise",
    icon: "🙋‍♂️",
    type: "count" as ExerciseType,
    instruction:
      "Raise your arms up and bring them down slowly.",
  },
  {
    title: "Deep Breathing",
    icon: "🌬️",
    type: "breathing" as ExerciseType,
    instruction:
      "Take deep breaths. Breathe in through your nose and out through your mouth.",
  },
];

export default function LightExercises() {
  const [index, setIndex] = useState(0);

  const speakCount = async () => {
    for (let i = 1; i <= 5; i++) {
      await new Promise((resolve) => {
        Speech.speak(i.toString(), { rate: 0.55 });
        setTimeout(resolve, 1500);
      });
    }
  };

  const speakBreathing = async () => {
    for (let i = 1; i <= 5; i++) {
      await new Promise((resolve) => {
        Speech.speak("Breathe in", { rate: 0.55 });
        setTimeout(() => {
          Speech.speak("Breathe out", { rate: 0.55 });
        }, 2500);
        setTimeout(resolve, 5000);
      });
    }
  };

  const startExercise = async () => {
    Speech.stop();
    const current = exercises[index];

    // 1️⃣ Speak instruction first
    Speech.speak(current.instruction, { rate: 0.6 });

    // 2️⃣ Pause before counting/breathing
    setTimeout(() => {
      if (current.type === "count") {
        speakCount();
      } else {
        speakBreathing();
      }
    }, 2500);
  };

  const nextExercise = () => {
    Speech.stop();
    if (index < exercises.length - 1) {
      setIndex(index + 1);
    }
  };

  return (
    <LinearGradient
      colors={["#ECFDF5", "#FFFFFF"] as const}
      style={styles.container}
    >
      <Text style={styles.header}>Light Exercises 🧘</Text>

      <View style={styles.card}>
        <Text style={styles.icon}>
          {exercises[index].icon}
        </Text>

        <Text style={styles.title}>
          {exercises[index].title}
        </Text>

        <Text style={styles.text}>
          {exercises[index].instruction}
        </Text>
      </View>

      <TouchableOpacity
        style={styles.startBtn}
        onPress={startExercise}
      >
        <Text style={styles.startText}>▶ Start Exercise</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.nextBtn}
        onPress={nextExercise}
      >
        <Text style={styles.nextText}>Next ➡️</Text>
      </TouchableOpacity>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    alignItems: "center",
  },

  header: {
    fontSize: 26,
    fontWeight: "700",
    marginBottom: 20,
    color: "#065F46",
  },

  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: 24,
    padding: 24,
    width: "100%",
    alignItems: "center",
    elevation: 6,
    marginBottom: 30,
  },

  icon: {
    fontSize: 170,
    marginBottom: 10,
  },

  title: {
    fontSize: 20,
    fontWeight: "600",
    marginBottom: 12,
  },

  text: {
    fontSize: 16,
    textAlign: "center",
    color: "#374151",
    lineHeight: 24,
  },

  startBtn: {
    backgroundColor: "#059669",
    paddingVertical: 14,
    paddingHorizontal: 40,
    borderRadius: 30,
    marginBottom: 16,
  },

  startText: {
    color: "#FFF",
    fontSize: 16,
    fontWeight: "600",
  },

  nextBtn: {
    backgroundColor: "#D1FAE5",
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 24,
  },

  nextText: {
    color: "#065F46",
    fontSize: 15,
    fontWeight: "600",
  },
});
