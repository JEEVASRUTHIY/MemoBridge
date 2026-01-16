import React, { useRef, useState } from "react";
import { View, Image, TouchableOpacity, StyleSheet, Animated } from "react-native";
import * as Speech from "expo-speech";
import { avatarMessages } from "./avatarTexts";

export default function VoiceGuideAvatar() {
  const scale = useRef(new Animated.Value(1)).current;
  const [speaking, setSpeaking] = useState(false);

  const pulse = () => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(scale, {
          toValue: 1.06,
          duration: 700,
          useNativeDriver: true,
        }),
        Animated.timing(scale, {
          toValue: 1,
          duration: 700,
          useNativeDriver: true,
        }),
      ])
    ).start();
  };

  const speak = () => {
    if (speaking) return;

    setSpeaking(true);
    pulse();

   Speech.speak(avatarMessages.morning, {
  rate: 0.9,
  pitch: 1.0,
  onDone: () => setSpeaking(false),
  onStopped: () => setSpeaking(false),
});

  };

  return (
    <TouchableOpacity onPress={speak} activeOpacity={0.9}>
      <Animated.View style={[styles.wrapper, { transform: [{ scale }] }]}>
        <Image
          source={require("../../assets/avatar/guide.png")}
          style={styles.image}
        />
      </Animated.View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    width: 190,
    height: 190,
    borderRadius: 95,
    backgroundColor: "#FFFFFF",
    justifyContent: "center",
    alignItems: "center",
    elevation: 10,
    shadowColor: "#7B61FF",
    shadowOpacity: 0.35,
    shadowRadius: 18,
    shadowOffset: { width: 0, height: 12 },
  },
  image: {
    width: 150,
    height: 150,
    resizeMode: "contain",
  },
});
