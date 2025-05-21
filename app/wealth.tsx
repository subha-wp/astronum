// @ts-nocheck
import { GlassmorphicCard } from "@/components/ui/GlassmorphicCard";
import { theme } from "@/constants/theme";
import { useTranslation } from "@/hooks/useTranslation";
import { useUserStore } from "@/store/userStore";
import { useWealthStore } from "@/store/wealthStore";
import { calculateLifePathNumber } from "@/utils/numerologyCalculations";
import { LinearGradient } from "expo-linear-gradient";
import { router } from "expo-router";
import { ArrowLeft, DollarSign } from "lucide-react-native";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import Animated, { FadeInDown } from "react-native-reanimated";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function WealthScreen() {
  const insets = useSafeAreaInsets();
  const { t } = useTranslation();
  const { user } = useUserStore();
  const { getWealthInfo } = useWealthStore();

  const lifePathNumber = user?.dateOfBirth
    ? calculateLifePathNumber(user.dateOfBirth)
    : 1;

  const wealthInfo = getWealthInfo(lifePathNumber);

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={[
          "rgba(245, 189, 65, 0.8)",
          "rgba(138, 79, 255, 0.6)",
          "rgba(59, 71, 201, 0.1)",
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
            <DollarSign color="#FFFFFF" size={24} />
            <Text style={styles.title}>{wealthInfo.title}</Text>
          </View>
          <Text style={styles.subtitle}>{t("wealth.subtitle")}</Text>
        </View>
      </LinearGradient>

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <Animated.View entering={FadeInDown.duration(600).delay(300)}>
          <GlassmorphicCard style={styles.descriptionCard}>
            <Text style={styles.descriptionText}>{wealthInfo.description}</Text>
          </GlassmorphicCard>

          <GlassmorphicCard style={[styles.sectionCard, styles.marginTop]}>
            <Text style={styles.sectionTitle}>{t("wealth.strengths")}</Text>
            <View style={styles.listContainer}>
              {wealthInfo.strengths.map((strength, index) => (
                <Text key={index} style={styles.listItem}>
                  • {strength}
                </Text>
              ))}
            </View>
          </GlassmorphicCard>

          <GlassmorphicCard style={[styles.sectionCard, styles.marginTop]}>
            <Text style={styles.sectionTitle}>{t("wealth.challenges")}</Text>
            <View style={styles.listContainer}>
              {wealthInfo.challenges.map((challenge, index) => (
                <Text key={index} style={styles.listItem}>
                  • {challenge}
                </Text>
              ))}
            </View>
          </GlassmorphicCard>

          <GlassmorphicCard style={[styles.sectionCard, styles.marginTop]}>
            <Text style={styles.sectionTitle}>{t("wealth.opportunities")}</Text>
            <View style={styles.listContainer}>
              {wealthInfo.opportunities.map((opportunity, index) => (
                <Text key={index} style={styles.listItem}>
                  • {opportunity}
                </Text>
              ))}
            </View>
          </GlassmorphicCard>

          <GlassmorphicCard style={[styles.sectionCard, styles.marginTop]}>
            <Text style={styles.sectionTitle}>
              {t("wealth.bestInvestments")}
            </Text>
            <View style={styles.listContainer}>
              {wealthInfo.bestInvestments.map((investment, index) => (
                <Text key={index} style={styles.listItem}>
                  • {investment}
                </Text>
              ))}
            </View>
          </GlassmorphicCard>

          <GlassmorphicCard style={[styles.sectionCard, styles.marginTop]}>
            <Text style={styles.sectionTitle}>{t("wealth.careerPaths")}</Text>
            <View style={styles.listContainer}>
              {wealthInfo.careerPaths.map((path, index) => (
                <Text key={index} style={styles.listItem}>
                  • {path}
                </Text>
              ))}
            </View>
          </GlassmorphicCard>

          <GlassmorphicCard style={[styles.sectionCard, styles.marginTop]}>
            <Text style={styles.sectionTitle}>{t("wealth.luckyDays")}</Text>
            <View style={styles.listContainer}>
              {wealthInfo.luckyDays.map((day, index) => (
                <Text key={index} style={styles.listItem}>
                  • {day}
                </Text>
              ))}
            </View>
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
});
