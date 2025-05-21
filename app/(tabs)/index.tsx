/* eslint-disable @typescript-eslint/no-unused-vars */
import { DailyPredictionCard } from "@/components/home/DailyPredictionCard";
import { FeatureCard } from "@/components/home/FeatureCard";
import { theme } from "@/constants/theme";
import { useTranslation } from "@/hooks/useTranslation";
import { useUserStore } from "@/store/userStore";
import {
  calculateDestinyNumber,
  calculateLifePathNumber,
} from "@/utils/numerologyCalculations";
import { BlurView } from "expo-blur";
import { LinearGradient } from "expo-linear-gradient";
import { router } from "expo-router";
import { useEffect, useState } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import Animated, { FadeInDown } from "react-native-reanimated";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function HomeScreen() {
  const insets = useSafeAreaInsets();
  const { user } = useUserStore();
  const { t } = useTranslation();
  const [greeting, setGreeting] = useState("");
  const [dailyNumbers, setDailyNumbers] = useState({
    lucky: Math.floor(Math.random() * 9) + 1,
    color: getRandomColor(),
    vibe: getRandomVibe(),
  });

  useEffect(() => {
    const hour = new Date().getHours();
    if (hour < 12) setGreeting(t("greetings.morning"));
    else if (hour < 18) setGreeting(t("greetings.afternoon"));
    else setGreeting(t("greetings.evening"));
  }, [t]);

  function getRandomColor() {
    const colors = [
      { name: "Royal Blue", hex: "#3B47C9" },
      { name: "Purple", hex: "#8A4FFF" },
      { name: "Gold", hex: "#F5BD41" },
      { name: "Emerald", hex: "#34D399" },
      { name: "Ruby Red", hex: "#EF4444" },
    ];
    return colors[Math.floor(Math.random() * colors.length)];
  }

  function getRandomVibe() {
    const vibes = [
      t("vibes.creative"),
      t("vibes.productive"),
      t("vibes.reflective"),
      t("vibes.energetic"),
      t("vibes.social"),
    ];
    return vibes[Math.floor(Math.random() * vibes.length)];
  }

  const lifePathNumber = user?.dateOfBirth
    ? calculateLifePathNumber(user.dateOfBirth)
    : null;

  const destinyNumber = user?.name ? calculateDestinyNumber(user.name) : null;

  return (
    <View style={[styles.container]}>
      <LinearGradient
        colors={[
          "rgba(59, 71, 201, 0.8)",
          "rgba(138, 79, 255, 0.5)",
          "rgba(245, 189, 65, 0.1)",
        ]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={[styles.headerGradient, { paddingTop: insets.top + 10 }]}
      >
        <Animated.View entering={FadeInDown.duration(800).delay(200)}>
          <Text style={styles.greeting}>
            {greeting}, {user?.name?.split(" ")[0] || t("greetings.user")}
          </Text>
          <Text style={styles.subGreeting}>{t("home.dailyReading")}</Text>
        </Animated.View>
      </LinearGradient>

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <Animated.View entering={FadeInDown.duration(800).delay(400)}>
          <DailyPredictionCard
            luckyNumber={dailyNumbers.lucky}
            luckyColor={dailyNumbers.color}
            vibe={dailyNumbers.vibe}
          />
        </Animated.View>

        <View style={styles.sectionHeader}>
          <Text style={[styles.sectionTitle, { color: theme.colors.primary }]}>
            {t("home.explore")}
          </Text>
        </View>

        <View style={styles.featuresGrid}>
          <FeatureCard
            title={t("features.report")}
            description={
              lifePathNumber
                ? t("features.reportDesc", { number: lifePathNumber })
                : t("features.reportDescGeneric")
            }
            icon="file-text"
            delay={900}
            onPress={() => {
              router.push("/numerology-report");
            }}
          />
          <FeatureCard
            title={t("features.compatibility")}
            description={t("features.compatibilityDesc")}
            icon="heart"
            delay={1000}
            onPress={() => {
              router.push("/compatibility");
            }}
          />
          <FeatureCard
            title={t("features.business")}
            description={t("features.businessDesc")}
            icon="briefcase"
            delay={1100}
            onPress={() => router.push("/business-advisor")}
          />
          <FeatureCard
            title={t("features.career")}
            description={t("features.careerDesc")}
            icon="trending-up"
            delay={1200}
            onPress={() => router.push("/career-guide")}
          />
        </View>

        <TouchableOpacity style={styles.aiGuru}>
          <BlurView
            intensity={70}
            style={StyleSheet.absoluteFill}
            tint="light"
          />
          <View style={styles.aiGuru}>
            <Text style={styles.aiGuruText}>{t("features.askAiGuru")}</Text>
          </View>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  headerGradient: {
    paddingHorizontal: 20,
    paddingBottom: 20,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
  },
  greeting: {
    fontFamily: "Poppins-Bold",
    fontSize: 24,
    color: "#FFFFFF",
    marginTop: 10,
  },
  subGreeting: {
    fontFamily: "Poppins-Regular",
    fontSize: 16,
    color: "rgba(255, 255, 255, 0.8)",
    marginTop: 5,
  },
  scrollView: {
    flex: 1,
    marginTop: -20,
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingBottom: 100,
  },
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 20,
    marginBottom: 15,
  },
  sectionTitle: {
    fontFamily: "Poppins-SemiBold",
    fontSize: 18,
  },

  featuresGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  aiGuru: {
    height: 60,
    borderRadius: 30,
    marginVertical: 20,
    justifyContent: "center",
    alignItems: "center",
    overflow: "hidden",
    backgroundColor: theme.colors.primaryContainer,
  },
  aiGuruText: {
    fontFamily: "Poppins-SemiBold",
    fontSize: 16,
    color: theme.colors.primary,
  },
});
