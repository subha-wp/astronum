import { Button } from "@/components/ui/Button";
import { DateInput } from "@/components/ui/DateInput";
import { GlassmorphicCard } from "@/components/ui/GlassmorphicCard";
import { theme } from "@/constants/theme";
import { useTranslation } from "@/hooks/useTranslation";
import { useCompatibilityStore } from "@/store/compatibilityStore";
import { calculateLifePathNumber } from "@/utils/numerologyCalculations";
import { LinearGradient } from "expo-linear-gradient";
import { router } from "expo-router";
import { ArrowLeft } from "lucide-react-native";
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

export default function CompatibilityScreen() {
  const insets = useSafeAreaInsets();
  const { t } = useTranslation();
  const { getCompatibility } = useCompatibilityStore();

  const [partnerName, setPartnerName] = useState("");
  const [partnerDOB, setPartnerDOB] = useState<Date | null>(null);
  const [showResults, setShowResults] = useState(false);

  const calculateCompatibility = () => {
    if (!partnerName.trim() || !partnerDOB) return;
    setShowResults(true);
  };

  const partnerLifePath = partnerDOB
    ? calculateLifePathNumber(partnerDOB.toISOString())
    : null;
  const userLifePath = 1; // This should come from user's profile

  const compatibility = partnerLifePath
    ? getCompatibility(userLifePath, partnerLifePath)
    : null;

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={[
          "rgba(138, 79, 255, 0.8)",
          "rgba(59, 71, 201, 0.6)",
          "rgba(245, 189, 65, 0.1)",
        ]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={[styles.headerGradient, { paddingTop: insets.top + 10 }]}
      >
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => router.back()}
        >
          <ArrowLeft color="#FFFFFF" size={24} />
        </TouchableOpacity>

        <View style={styles.headerContent}>
          <View style={styles.titleContainer}>
            <Text style={styles.title}>{t("compatibility.title")}</Text>
          </View>
          <Text style={styles.subtitle}>{t("compatibility.subtitle")}</Text>
        </View>
      </LinearGradient>

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <Animated.View entering={FadeInDown.duration(600).delay(300)}>
          <GlassmorphicCard style={styles.inputCard}>
            <Text style={styles.inputLabel}>
              {t("compatibility.partnerName")}
            </Text>
            <TextInput
              style={styles.input}
              value={partnerName}
              onChangeText={setPartnerName}
              placeholder={t("compatibility.namePlaceholder")}
            />

            <Text style={[styles.inputLabel, styles.marginTop]}>
              {t("compatibility.partnerDOB")}
            </Text>
            <DateInput
              value={partnerDOB ? partnerDOB.toLocaleDateString() : ""}
              onChange={setPartnerDOB}
              placeholder={t("compatibility.dobPlaceholder")}
            />

            <Button
              text={t("compatibility.calculate")}
              onPress={calculateCompatibility}
              style={styles.calculateButton}
              disabled={!partnerName.trim() || !partnerDOB}
            />
          </GlassmorphicCard>

          {showResults && compatibility && (
            <Animated.View entering={FadeInDown.duration(600)}>
              <GlassmorphicCard style={styles.resultsCard}>
                <View style={styles.percentageContainer}>
                  <Text style={styles.percentageText}>
                    {compatibility.percentage}%
                  </Text>
                  <Text style={styles.matchText}>
                    {t("compatibility.match")}
                  </Text>
                </View>

                <Text style={styles.description}>
                  {compatibility.description}
                </Text>

                <View style={styles.section}>
                  <Text style={styles.sectionTitle}>
                    {t("compatibility.strengths")}
                  </Text>
                  {compatibility.strengths.map((strength, index) => (
                    <Text key={index} style={styles.bulletPoint}>
                      • {strength}
                    </Text>
                  ))}
                </View>

                <View style={styles.section}>
                  <Text style={styles.sectionTitle}>
                    {t("compatibility.challenges")}
                  </Text>
                  {compatibility.challenges.map((challenge, index) => (
                    <Text key={index} style={styles.bulletPoint}>
                      • {challenge}
                    </Text>
                  ))}
                </View>

                <View style={styles.section}>
                  <Text style={styles.sectionTitle}>
                    {t("compatibility.remedies")}
                  </Text>
                  {compatibility.remedies.map((remedy, index) => (
                    <Text key={index} style={styles.bulletPoint}>
                      • {remedy}
                    </Text>
                  ))}
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
  backButton: {
    width: 40,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
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
    marginLeft: 12,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    padding: 20,
  },
  inputCard: {
    padding: 20,
    backgroundColor: theme.colors.error,
  },
  inputLabel: {
    fontFamily: "Poppins-Medium",
    fontSize: 16,
    color: theme.colors.secondary,
    marginBottom: 10,
  },
  input: {
    fontFamily: "Poppins-Regular",
    fontSize: 16,
    color: theme.colors.secondary,
    height: 50,
    backgroundColor: theme.colors.secondaryContainer,
    paddingHorizontal: 15,
    borderRadius: 10,
  },
  marginTop: {
    marginTop: 20,
  },
  calculateButton: {
    marginTop: 30,
  },
  resultsCard: {
    marginTop: 20,
    padding: 20,
  },
  percentageContainer: {
    alignItems: "center",
    marginBottom: 20,
  },
  percentageText: {
    fontFamily: "Poppins-Bold",
    fontSize: 48,
    color: theme.colors.primary,
  },
  matchText: {
    fontFamily: "Poppins-Medium",
    fontSize: 18,
    color: theme.colors.primary,
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
    color: "#F5BD41",
    marginBottom: 10,
  },
  bulletPoint: {
    fontFamily: "Poppins-Regular",
    fontSize: 14,
    color: theme.colors.tertiary,
    marginBottom: 5,
    paddingLeft: 10,
  },
});
