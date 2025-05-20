import { useTranslation } from "@/hooks/useTranslation";
import { LinearGradient } from "expo-linear-gradient";
import { Sparkles, Star } from "lucide-react-native";
import { StyleSheet, Text, View } from "react-native";
import Animated, { FadeIn } from "react-native-reanimated";

interface DailyPredictionCardProps {
  luckyNumber: number;
  luckyColor: { name: string; hex: string };
  vibe: string;
}

export const DailyPredictionCard = ({
  luckyNumber,
  luckyColor,
  vibe,
}: DailyPredictionCardProps) => {
  const { t } = useTranslation();

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={["rgba(59, 71, 201, 0.5)", "rgba(138, 79, 255, 0.5)"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.gradientBg}
      />

      <View style={styles.header}>
        <Text style={styles.title}>{t("dailyPrediction.title")}</Text>
        <Sparkles size={20} color="#F5BD41" />
      </View>

      <View style={styles.content}>
        <View style={styles.column}>
          <View style={styles.numberContainer}>
            <Text style={styles.label}>{t("dailyPrediction.luckyNumber")}</Text>
            <Animated.View
              entering={FadeIn.duration(800)}
              style={styles.numberCircle}
            >
              <Text style={styles.number}>{luckyNumber}</Text>
            </Animated.View>
          </View>
        </View>

        <View style={styles.column}>
          <View style={styles.colorContainer}>
            <Text style={styles.label}>{t("dailyPrediction.luckyColor")}</Text>
            <View style={styles.colorInfo}>
              <View
                style={[
                  styles.colorSwatch,
                  { backgroundColor: luckyColor.hex },
                ]}
              />
              <Text style={styles.colorName}>{luckyColor.name}</Text>
            </View>
          </View>

          <View style={styles.vibeContainer}>
            <Text style={styles.label}>{t("dailyPrediction.vibe")}</Text>
            <Text style={styles.vibe}>{vibe}</Text>
          </View>
        </View>
      </View>

      <View style={styles.starsContainer}>
        <Star size={14} color="#F5BD41" fill="#F5BD41" />
        <Star size={16} color="#F5BD41" fill="#F5BD41" />
        <Star size={14} color="#F5BD41" fill="#F5BD41" />
      </View>

      <Text style={styles.predictionText}>{t("dailyPrediction.message")}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 24,
    padding: 0,
    position: "relative",
    overflow: "hidden",
    zIndex: 20,
    borderRadius: 10,
  },
  gradientBg: {
    position: "absolute",
    width: "100%",
    height: "100%",
    // opacity: 0.7,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingTop: 15,
    paddingBottom: 10,
  },
  title: {
    fontFamily: "Poppins-Bold",
    fontSize: 18,
    color: "#FFFFFF",
  },
  content: {
    flexDirection: "row",
    padding: 10,
  },
  column: {
    flex: 1,
    padding: 5,
  },
  numberContainer: {
    alignItems: "center",
    marginBottom: 15,
  },
  label: {
    fontFamily: "Poppins-Medium",
    fontSize: 14,
    color: "rgba(255, 255, 255, 0.8)",
    marginBottom: 10,
    textAlign: "center",
  },
  numberCircle: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: "rgba(245, 189, 65, 0.2)",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 2,
    borderColor: "#F5BD41",
  },
  number: {
    fontFamily: "Poppins-Bold",
    fontSize: 36,
    color: "#F5BD41",
  },
  colorContainer: {
    alignItems: "center",
    marginBottom: 15,
  },
  colorInfo: {
    flexDirection: "row",
    alignItems: "center",
  },
  colorSwatch: {
    width: 24,
    height: 24,
    borderRadius: 12,
    marginRight: 8,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.3)",
  },
  colorName: {
    fontFamily: "Poppins-SemiBold",
    fontSize: 16,
    color: "#FFFFFF",
  },
  vibeContainer: {
    alignItems: "center",
  },
  vibe: {
    fontFamily: "Poppins-SemiBold",
    fontSize: 16,
    color: "#FFFFFF",
  },
  starsContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 5,
  },
  predictionText: {
    fontFamily: "Poppins-Regular",
    fontSize: 14,
    color: "#FFFFFF",
    lineHeight: 22,
    paddingHorizontal: 20,
    paddingVertical: 15,
    textAlign: "center",
  },
});
