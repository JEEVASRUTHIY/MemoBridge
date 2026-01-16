import React, { useState, useEffect, useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Animated,
  Dimensions,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";

const { width, height } = Dimensions.get("window");

const LEVELS: Record<number, string[]> = {
  1: ["🍎", "🍌"],
  2: ["🍎", "🍌", "🍇"],
  3: ["🍎", "🍌", "🍇", "🍓"],
};

const celebrationEmojis = [
  "🥳","🙌","🎇","🎆","🎉","🎊","🎁","🎀",
  "🌟","🏆","🥇","👑","😎","🏅","🎂","🍫"
];

function createDeck(level: number) {
  const base = LEVELS[level];
  return [...base, ...base].sort(() => Math.random() - 0.5);
}

export default function MemoryGame() {
  const [level, setLevel] = useState(1);
  const [cards, setCards] = useState(createDeck(1));
  const [flipped, setFlipped] = useState<number[]>([]);
  const [matched, setMatched] = useState<number[]>([]);
  const [celebrate, setCelebrate] = useState(false);

  const hasCelebrated = useRef(false);

  const EMOJI_COUNT = 14; // emojis can repeat

  const anims = useRef(
    Array.from({ length: EMOJI_COUNT }, () => ({
      x: new Animated.Value(0),
      y: new Animated.Value(0),
      scale: new Animated.Value(0),
      rotate: new Animated.Value(0),
      opacity: new Animated.Value(1),
    }))
  ).current;

  const onCardPress = (index: number) => {
    if (
      flipped.length === 2 ||
      flipped.includes(index) ||
      matched.includes(index)
    )
      return;

    const next = [...flipped, index];
    setFlipped(next);

    if (next.length === 2) {
      const [a, b] = next;
      if (cards[a] === cards[b]) {
        setMatched((prev) => [...prev, a, b]);
      }
      setTimeout(() => setFlipped([]), 600);
    }
  };

  const burstCelebration = () => {
    anims.forEach((anim) => {
      const randomX = Math.random() * width - width / 2;
      const randomY = Math.random() * -height * 0.7;
      const randomRotate = Math.random() * 360;

      anim.x.setValue(0);
      anim.y.setValue(0);
      anim.scale.setValue(0);
      anim.rotate.setValue(0);
      anim.opacity.setValue(1);

      Animated.parallel([
        Animated.timing(anim.x, {
          toValue: randomX,
          duration: 900,
          useNativeDriver: true,
        }),
        Animated.timing(anim.y, {
          toValue: randomY,
          duration: 900,
          useNativeDriver: true,
        }),
        Animated.timing(anim.scale, {
          toValue: 1,
          duration: 400,
          useNativeDriver: true,
        }),
        Animated.timing(anim.rotate, {
          toValue: randomRotate,
          duration: 900,
          useNativeDriver: true,
        }),
        Animated.timing(anim.opacity, {
          toValue: 0,
          duration: 900,
          useNativeDriver: true,
        }),
      ]).start();
    });
  };

  useEffect(() => {
    if (
      matched.length === cards.length &&
      cards.length > 0 &&
      !hasCelebrated.current
    ) {
      hasCelebrated.current = true;
      setCelebrate(true);
      burstCelebration(); // 🔥 ONLY ONCE
    }
  }, [matched]);

  const nextLevel = () => {
    const next = Math.min(level + 1, Object.keys(LEVELS).length);
    setLevel(next);
    setCards(createDeck(next));
    setFlipped([]);
    setMatched([]);
    setCelebrate(false);
    hasCelebrated.current = false;
  };

  const columns = cards.length <= 4 ? 2 : 3;
  const CARD_SIZE = width / (columns + 1.3);

  return (
    <LinearGradient colors={["#EEF2FF", "#FFFFFF"]} style={{ flex: 1 }}>
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.title}>
          Memory Game 🧠 (Level {level})
        </Text>

        <View style={styles.grid}>
          {cards.map((item, index) => {
            const open =
              flipped.includes(index) || matched.includes(index);

            return (
              <TouchableOpacity
                key={index}
                style={[
                  styles.card,
                  { width: CARD_SIZE, height: CARD_SIZE },
                ]}
                onPress={() => onCardPress(index)}
              >
                <Text style={styles.cardText}>
                  {open ? item : "❓"}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>

        {celebrate && (
          <TouchableOpacity style={styles.nextBtn} onPress={nextLevel}>
            <Text style={styles.nextText}>Next Level ➡️</Text>
          </TouchableOpacity>
        )}
      </ScrollView>

      {celebrate &&
        anims.map((anim, i) => (
          <Animated.Text
            key={i}
            style={{
              position: "absolute",
              bottom: 70,
              left: width / 2 - 18,
              fontSize: 38, // 🔽 REDUCED SIZE
              opacity: anim.opacity,
              transform: [
                { translateX: anim.x },
                { translateY: anim.y },
                { scale: anim.scale },
                {
                  rotate: anim.rotate.interpolate({
                    inputRange: [0, 360],
                    outputRange: ["0deg", "360deg"],
                  }),
                },
              ],
            }}
          >
            {celebrationEmojis[i % celebrationEmojis.length]}
          </Animated.Text>
        ))}
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    alignItems: "center",
    paddingBottom: 120,
  },
  title: {
    fontSize: 24,
    fontWeight: "700",
    marginBottom: 20,
  },
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
  },
  card: {
    margin: 10,
    borderRadius: 20,
    backgroundColor: "#E0E7FF",
    justifyContent: "center",
    alignItems: "center",
    elevation: 4,
  },
  cardText: {
    fontSize: 34,
  },
  nextBtn: {
    marginTop: 30,
    backgroundColor: "#4F46E5",
    paddingHorizontal: 40,
    paddingVertical: 14,
    borderRadius: 30,
  },
  nextText: {
    color: "#FFF",
    fontSize: 16,
    fontWeight: "600",
  },
});
