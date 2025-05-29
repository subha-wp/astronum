import { GlassmorphicCard } from "@/components/ui/GlassmorphicCard";
import { theme } from "@/constants/theme";
import { useTranslation } from "@/hooks/useTranslation";
import { calculateNumberValue } from "@/utils/numerologyCalculations";
import { LinearGradient } from "expo-linear-gradient";
import { Phone, RefreshCw } from "lucide-react-native";
import { useState } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import Animated, { FadeInDown } from "react-native-reanimated";
import { useSafeAreaInsets } from "react-native-safe-area-context";

interface NumberAnalysis {
  value: number;
  quality: "excellent" | "good" | "neutral" | "challenging";
  description: string;
  suggestions: string[];
  luckyNumbers: number[];
  unluckyNumbers: number[];
}

export default function MobileScreen() {
  const insets = useSafeAreaInsets();
  const { t } = useTranslation();
  const [phoneNumber, setPhoneNumber] = useState("");
  const [analysis, setAnalysis] = useState<NumberAnalysis | null>(null);

  const analyzeNumber = (number: string) => {
    const numericValue = calculateNumberValue(number);

    const getQuality = (value: number): NumberAnalysis["quality"] => {
      if ([1, 3, 5, 8].includes(value)) return "excellent";
      if ([2, 6, 9].includes(value)) return "good";
      if (value === 7) return "neutral";
      return "challenging";
    };

    const qualities: Record<NumberAnalysis["quality"], string> = {
      excellent:
        "This number has very positive vibrations and aligns well with success and prosperity.",
      good: "This number carries positive energy and supports personal growth.",
      neutral:
        "This number has balanced energy that can be influenced by your intentions.",
      challenging:
        "This number may present some obstacles but can be balanced with modifications.",
    };

    const getLuckyNumbers = (value: number): number[] => {
      switch (value) {
        case 1:
          return [1, 3, 5, 9];
        case 2:
          return [2, 3, 6, 9];
        case 3:
          return [1, 3, 5, 9];
        case 4:
          return [1, 4, 7, 8];
        case 5:
          return [1, 3, 5, 7];
        case 6:
          return [2, 3, 6, 9];
        case 7:
          return [2, 4, 7];
        case 8:
          return [1, 4, 6, 8];
        case 9:
          return [2, 3, 6, 9];
        default:
          return [1, 3, 5, 8];
      }
    };

    const getUnluckyNumbers = (value: number): number[] => {
      const allNumbers = [1, 2, 3, 4, 5, 6, 7, 8, 9];
      const lucky = getLuckyNumbers(value);
      return allNumbers.filter((n) => !lucky.includes(n));
    };

    const getSuggestions = (
      value: number,
      quality: NumberAnalysis["quality"]
    ): string[] => {
      if (quality === "excellent")
        return [
          "Keep this number as it's highly favorable",
          "Use this number for important communications",
          "Share this number confidently for business purposes",
        ];

      if (quality === "good")
        return [
          "This number serves you well",
          "Consider minor modifications to enhance its energy",
          "Add lucky numbers in sequence when possible",
        ];

      if (quality === "neutral")
        return [
          "Add more favorable digits when possible",
          "Consider alternative numbers with stronger vibrations",
          "Use this number primarily for personal matters",
        ];

      return [
        "Consider changing to a more favorable number",
        "Add balancing digits to improve the vibration",
        "Use an alternative number for important matters",
      ];
    };

    const quality = getQuality(numericValue);

    setAnalysis({
      value: numericValue,
      quality,
      description: qualities[quality],
      suggestions: getSuggestions(numericValue, quality),
      luckyNumbers: getLuckyNumbers(numericValue),
      unluckyNumbers: getUnluckyNumbers(numericValue),
    });
  };

  const getQualityColor = (quality: NumberAnalysis["quality"]) => {
    switch (quality) {
      case "excellent":
        return "#34D399";
      case "good":
        return "#60A5FA";
      case "neutral":
        return "#F59E0B";
      case "challenging":
        return "#EF4444";
      default:
        return "#6B7280";
    }
  };

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={[
          "rgba(59, 71, 201, 0.8)",
          "rgba(138, 79, 255, 0.6)",
          "rgba(245, 189, 65, 0.1)",
        ]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={[styles.headerGradient, { paddingTop: insets.top + 10 }]}
      >
        <View style={styles.headerContent}>
          <View style={styles.titleContainer}>
            <Phone color="#FFFFFF" size={24} />
            <Text style={styles.title}>{t("mobile.title")}</Text>
          </View>
          <Text style={styles.subtitle}>{t("mobile.subtitle")}</Text>
        </View>
      </LinearGradient>

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <Animated.View entering={FadeInDown.duration(600).delay(300)}>
          <GlassmorphicCard style={styles.inputCard}>
            <TextInput
              style={styles.input}
              placeholder={t("mobile.numberPlaceholder")}
              value={phoneNumber}
              onChangeText={setPhoneNumber}
              keyboardType="phone-pad"
              maxLength={15}
            />
            <TouchableOpacity
              style={styles.analyzeButton}
              onPress={() => analyzeNumber(phoneNumber)}
            >
              <Text style={styles.analyzeButtonText}>
                {t("mobile.analyze")}
              </Text>
              <RefreshCw size={20} color="#FFFFFF" />
            </TouchableOpacity>
          </GlassmorphicCard>

          {analysis && (
            <Animated.View entering={FadeInDown.duration(600)}>
              <GlassmorphicCard style={styles.resultCard}>
                <View style={styles.resultHeader}>
                  <Text style={styles.resultTitle}>
                    {t("mobile.numerologyValue")}
                  </Text>
                  <View
                    style={[
                      styles.qualityBadge,
                      { backgroundColor: getQualityColor(analysis.quality) },
                    ]}
                  >
                    <Text style={styles.qualityText}>
                      {analysis.quality.toUpperCase()}
                    </Text>
                  </View>
                </View>

                <Text style={styles.valueNumber}>{analysis.value}</Text>
                <Text style={styles.description}>{analysis.description}</Text>

                <View style={styles.section}>
                  <Text style={styles.sectionTitle}>
                    {t("mobile.suggestions")}
                  </Text>
                  {analysis.suggestions.map((suggestion, index) => (
                    <Text key={index} style={styles.suggestionText}>
                      • {suggestion}
                    </Text>
                  ))}
                </View>

                <View style={styles.numberSection}>
                  <View style={styles.numberColumn}>
                    <Text style={styles.numberTitle}>
                      {t("mobile.luckyNumbers")}
                    </Text>
                    <View style={styles.numberGrid}>
                      {analysis.luckyNumbers.map((num) => (
                        <View key={num} style={styles.numberBadge}>
                          <Text style={styles.numberText}>{num}</Text>
                        </View>
                      ))}
                    </View>
                  </View>

                  <View style={styles.numberColumn}>
                    <Text style={styles.numberTitle}>
                      {t("mobile.unluckyNumbers")}
                    </Text>
                    <View style={styles.numberGrid}>
                      {analysis.unluckyNumbers.map((num) => (
                        <View
                          key={num}
                          style={[
                            styles.numberBadge,
                            styles.unluckyNumberBadge,
                          ]}
                        >
                          <Text style={styles.numberText}>{num}</Text>
                        </View>
                      ))}
                    </View>
                  </View>
                </View>
              </GlassmorphicCard>
            </Animated.View>
          )}
        </Animated.View>
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
    paddingBottom: 30,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
  },
  headerContent: {
    marginTop: 10,
  },
  titleContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  title: {
    fontFamily: "Poppins-Bold",
    fontSize: 24,
    color: "#FFFFFF",
    marginLeft: 10,
  },
  subtitle: {
    fontFamily: "Poppins-Regular",
    fontSize: 14,
    color: theme.colors.secondary,
    marginTop: 5,
    marginLeft: 34,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    padding: 20,
    paddingBottom: 40,
  },
  inputCard: {
    padding: 20,
  },
  input: {
    fontFamily: "Poppins-Regular",
    fontSize: 18,
    color: theme.colors.primary,
    height: 50,
    backgroundColor: theme.colors.tertiaryContainer,
    borderRadius: 12,
    paddingHorizontal: 15,
    marginBottom: 15,
  },
  analyzeButton: {
    backgroundColor: theme.colors.primary,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 12,
    borderRadius: 12,
    gap: 10,
  },
  analyzeButtonText: {
    fontFamily: "Poppins-SemiBold",
    fontSize: 16,
    color: "#FFFFFF",
  },
  resultCard: {
    marginTop: 20,
    padding: 20,
  },
  resultHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 15,
  },
  resultTitle: {
    fontFamily: "Poppins-SemiBold",
    fontSize: 18,
    color: theme.colors.primary,
  },
  qualityBadge: {
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
  },
  qualityText: {
    fontFamily: "Poppins-Medium",
    fontSize: 12,
    color: "#FFFFFF",
  },
  valueNumber: {
    fontFamily: "Poppins-Bold",
    fontSize: 48,
    color: theme.colors.primary,
    textAlign: "center",
    marginBottom: 15,
  },
  description: {
    fontFamily: "Poppins-Regular",
    fontSize: 16,
    color: theme.colors.secondary,
    lineHeight: 24,
    marginBottom: 20,
  },
  section: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontFamily: "Poppins-SemiBold",
    fontSize: 18,
    color: theme.colors.primary,
    marginBottom: 10,
  },
  suggestionText: {
    fontFamily: "Poppins-Regular",
    fontSize: 14,
    color: theme.colors.secondary,
    marginBottom: 8,
    lineHeight: 20,
  },
  numberSection: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
  },
  numberColumn: {
    flex: 1,
  },
  numberTitle: {
    fontFamily: "Poppins-Medium",
    fontSize: 14,
    color: theme.colors.primary,
    marginBottom: 10,
  },
  numberGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
  },
  numberBadge: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: "#34D399",
    justifyContent: "center",
    alignItems: "center",
  },
  unluckyNumberBadge: {
    backgroundColor: "#EF4444",
  },
  numberText: {
    fontFamily: "Poppins-SemiBold",
    fontSize: 16,
    color: "#FFFFFF",
  },
});
