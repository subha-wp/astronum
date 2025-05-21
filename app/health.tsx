// @ts-nocheck
import { GlassmorphicCard } from "@/components/ui/GlassmorphicCard";
import { theme } from "@/constants/theme";
import { useTranslation } from "@/hooks/useTranslation";
import { useHealthStore } from "@/store/healthStore";
import { useUserStore } from "@/store/userStore";
import { calculateLifePathNumber } from "@/utils/numerologyCalculations";
import { LinearGradient } from "expo-linear-gradient";
import { router } from "expo-router";
import { ArrowLeft, Heart } from "lucide-react-native";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import Animated, { FadeInDown } from "react-native-reanimated";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function HealthScreen() {
  const insets = useSafeAreaInsets();
  const { t } = useTranslation();
  const { user } = useUserStore();
  const { getHealthInfo } = useHealthStore();

  const lifePathNumber = user?.dateOfBirth
    ? calculateLifePathNumber(user.dateOfBirth)
    : 1;

  const healthInfo = getHealthInfo(lifePathNumber);

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
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => router.back()}
        >
          <ArrowLeft color="#FFFFFF" size={24} />
        </TouchableOpacity>

        <View style={styles.headerContent}>
          <View style={styles.titleContainer}>
            <Heart color="#FFFFFF" size={24} />
            <Text style={styles.title}>{healthInfo.title}</Text>
          </View>
          <Text style={styles.subtitle}>{t("health.subtitle")}</Text>
        </View>
      </LinearGradient>

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <Animated.View entering={FadeInDown.duration(600).delay(300)}>
          <GlassmorphicCard style={styles.descriptionCard}>
            <Text style={styles.descriptionText}>{healthInfo.description}</Text>
          </GlassmorphicCard>

          <GlassmorphicCard style={[styles.sectionCard, styles.marginTop]}>
            <Text style={styles.sectionTitle}>{t("health.strengths")}</Text>
            <View style={styles.listContainer}>
              {healthInfo.strengths.map((strength, index) => (
                <Text key={index} style={styles.listItem}>
                  • {strength}
                </Text>
              ))}
            </View>
          </GlassmorphicCard>

          <GlassmorphicCard style={[styles.sectionCard, styles.marginTop]}>
            <Text style={styles.sectionTitle}>{t("health.challenges")}</Text>
            <View style={styles.listContainer}>
              {healthInfo.challenges.map((challenge, index) => (
                <Text key={index} style={styles.listItem}>
                  • {challenge}
                </Text>
              ))}
            </View>
          </GlassmorphicCard>

          <GlassmorphicCard style={[styles.sectionCard, styles.marginTop]}>
            <Text style={styles.sectionTitle}>
              {t("health.recommendations")}
            </Text>
            <View style={styles.listContainer}>
              {healthInfo.recommendations.map((recommendation, index) => (
                <Text key={index} style={styles.listItem}>
                  • {recommendation}
                </Text>
              ))}
            </View>
          </GlassmorphicCard>

          <GlassmorphicCard style={[styles.sectionCard, styles.marginTop]}>
            <Text style={styles.sectionTitle}>{t("health.wellnessAreas")}</Text>
            <View style={styles.listContainer}>
              {healthInfo.wellnessAreas.map((area, index) => (
                <Text key={index} style={styles.listItem}>
                  • {area}
                </Text>
              ))}
            </View>
          </GlassmorphicCard>

          <GlassmorphicCard style={[styles.sectionCard, styles.marginTop]}>
            <Text style={styles.sectionTitle}>
              {t("health.elementalBalance")}
            </Text>
            <Text style={styles.elementalText}>
              {healthInfo.elementalBalance}
            </Text>
          </GlassmorphicCard>
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
    fontSize: 16,
    color: "rgba(255, 255, 255, 0.8)",
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
  descriptionCard: {
    padding: 20,
  },
  descriptionText: {
    fontFamily: "Poppins-Regular",
    fontSize: 16,
    color: theme.colors.primary,
    lineHeight: 24,
  },
  sectionCard: {
    padding: 20,
  },
  marginTop: {
    marginTop: 20,
  },
  sectionTitle: {
    fontFamily: "Poppins-SemiBold",
    fontSize: 18,
    color: theme.colors.primary,
    marginBottom: 15,
  },
  listContainer: {
    marginTop: 5,
  },
  listItem: {
    fontFamily: "Poppins-Regular",
    fontSize: 16,
    color: theme.colors.secondary,
    marginBottom: 10,
    lineHeight: 24,
  },
  elementalText: {
    fontFamily: "Poppins-Medium",
    fontSize: 16,
    color: theme.colors.secondary,
    fontStyle: "italic",
  },
});
