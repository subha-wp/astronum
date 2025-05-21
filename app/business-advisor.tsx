// @ts-nocheck
import { GlassmorphicCard } from "@/components/ui/GlassmorphicCard";
import { theme } from "@/constants/theme";
import { useTranslation } from "@/hooks/useTranslation";
import { useUserStore } from "@/store/userStore";
import { calculateLifePathNumber } from "@/utils/numerologyCalculations";
import { LinearGradient } from "expo-linear-gradient";
import { router } from "expo-router";
import { ArrowLeft, Briefcase } from "lucide-react-native";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import Animated, { FadeInDown } from "react-native-reanimated";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function BusinessAdvisorScreen() {
  const insets = useSafeAreaInsets();
  const { t } = useTranslation();
  const { user } = useUserStore();

  const lifePathNumber = user?.dateOfBirth
    ? calculateLifePathNumber(user.dateOfBirth)
    : Math.floor(Math.random() * 9) + 1;

  const getBusinessAdvice = () => {
    const advice = {
      1: {
        industries: [
          "Technology",
          "Innovation",
          "Leadership Consulting",
          "Entrepreneurship",
        ],
        qualities: [
          "Leadership",
          "Innovation",
          "Independence",
          "Pioneering spirit",
        ],
        nameNumbers: [1, 8, 9],
        challenges: [
          "Delegating tasks",
          "Team collaboration",
          "Patience with growth",
        ],
      },
      2: {
        industries: [
          "Mediation",
          "Counseling",
          "Partnership Ventures",
          "Diplomatic Services",
        ],
        qualities: [
          "Cooperation",
          "Detail-oriented",
          "Diplomatic",
          "Support-focused",
        ],
        nameNumbers: [2, 6, 9],
        challenges: ["Decision-making", "Setting boundaries", "Self-promotion"],
      },
      3: {
        industries: [
          "Creative Arts",
          "Marketing",
          "Entertainment",
          "Communication",
        ],
        qualities: ["Creativity", "Expression", "Social skills", "Optimism"],
        nameNumbers: [3, 6, 9],
        challenges: ["Focus", "Financial management", "Project completion"],
      },
      4: {
        industries: [
          "Construction",
          "Financial Services",
          "Systems Development",
          "Property",
        ],
        qualities: ["Organization", "Reliability", "Practicality", "Structure"],
        nameNumbers: [4, 8, 1],
        challenges: ["Adaptability", "Innovation", "Risk-taking"],
      },
      5: {
        industries: ["Travel", "Sales", "Media", "Consulting"],
        qualities: ["Adaptability", "Communication", "Freedom", "Versatility"],
        nameNumbers: [5, 1, 7],
        challenges: ["Consistency", "Long-term commitment", "Routine"],
      },
      6: {
        industries: [
          "Healthcare",
          "Education",
          "Hospitality",
          "Beauty & Wellness",
        ],
        qualities: ["Service-oriented", "Responsibility", "Harmony", "Quality"],
        nameNumbers: [6, 2, 9],
        challenges: ["Work-life balance", "Perfectionism", "Setting limits"],
      },
      7: {
        industries: [
          "Research",
          "Technology",
          "Analysis",
          "Specialized Services",
        ],
        qualities: ["Analysis", "Expertise", "Investigation", "Specialization"],
        nameNumbers: [7, 4, 1],
        challenges: ["Marketing", "Networking", "Client relations"],
      },
      8: {
        industries: [
          "Finance",
          "Real Estate",
          "Executive Services",
          "Investment",
        ],
        qualities: ["Authority", "Management", "Vision", "Material success"],
        nameNumbers: [8, 1, 4],
        challenges: [
          "Work-life balance",
          "Delegation",
          "Personal relationships",
        ],
      },
      9: {
        industries: [
          "Non-profit",
          "Global Services",
          "Education",
          "Healing Arts",
        ],
        qualities: ["Universal appeal", "Inspiration", "Compassion", "Vision"],
        nameNumbers: [9, 3, 6],
        challenges: [
          "Business boundaries",
          "Practical matters",
          "Charging worth",
        ],
      },
    };

    return advice[lifePathNumber as keyof typeof advice];
  };

  const businessAdvice = getBusinessAdvice();

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
            <Briefcase color="#FFFFFF" size={24} />
            <Text style={styles.title}>{t("business.title")}</Text>
          </View>
          <Text style={styles.subtitle}>{t("business.subtitle")}</Text>
        </View>
      </LinearGradient>

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <Animated.View entering={FadeInDown.duration(600).delay(300)}>
          <GlassmorphicCard style={styles.infoCard}>
            <Text style={styles.sectionTitle}>
              {t("business.bestIndustries")}
            </Text>
            <View style={styles.tagContainer}>
              {businessAdvice.industries.map((industry, index) => (
                <View key={index} style={styles.tag}>
                  <Text style={styles.tagText}>{industry}</Text>
                </View>
              ))}
            </View>
          </GlassmorphicCard>

          <GlassmorphicCard style={[styles.infoCard, styles.marginTop]}>
            <Text style={styles.sectionTitle}>
              {t("business.businessQualities")}
            </Text>
            <View style={styles.qualitiesList}>
              {businessAdvice.qualities.map((quality, index) => (
                <Text key={index} style={styles.qualityText}>
                  • {quality}
                </Text>
              ))}
            </View>
          </GlassmorphicCard>

          <GlassmorphicCard style={[styles.infoCard, styles.marginTop]}>
            <Text style={styles.sectionTitle}>{t("business.nameNumbers")}</Text>
            <Text style={styles.descriptionText}>
              {t("business.nameNumbersDesc")}
            </Text>
            <View style={styles.numberContainer}>
              {businessAdvice.nameNumbers.map((number, index) => (
                <View key={index} style={styles.numberCircle}>
                  <Text style={styles.numberText}>{number}</Text>
                </View>
              ))}
            </View>
          </GlassmorphicCard>

          <GlassmorphicCard style={[styles.infoCard, styles.marginTop]}>
            <Text style={styles.sectionTitle}>{t("business.challenges")}</Text>
            <View style={styles.challengesList}>
              {businessAdvice.challenges.map((challenge, index) => (
                <Text key={index} style={styles.challengeText}>
                  • {challenge}
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
    paddingBottom: 40,
  },
  infoCard: {
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
  tagContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginHorizontal: -5,
  },
  tag: {
    backgroundColor: theme.colors.tertiaryContainer,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    margin: 5,
    borderWidth: 1,
    borderColor: theme.colors.tertiary,
  },
  tagText: {
    fontFamily: "Poppins-Medium",
    fontSize: 14,
    color: theme.colors.secondary,
  },
  qualitiesList: {
    marginTop: 5,
  },
  qualityText: {
    fontFamily: "Poppins-Regular",
    fontSize: 16,
    color: theme.colors.secondary,
    marginBottom: 10,
    lineHeight: 24,
  },
  descriptionText: {
    fontFamily: "Poppins-Regular",
    fontSize: 14,
    color: theme.colors.secondary,
    marginBottom: 15,
    lineHeight: 20,
  },
  numberContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 10,
  },
  numberCircle: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: theme.colors.firstGradient,
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: 10,
    borderWidth: 1,
    borderColor: theme.colors.secondary,
  },
  numberText: {
    fontFamily: "Poppins-Bold",
    fontSize: 20,
    color: theme.colors.secondary,
  },
  challengesList: {
    marginTop: 5,
  },
  challengeText: {
    fontFamily: "Poppins-Regular",
    fontSize: 16,
    color: theme.colors.secondary,
    marginBottom: 10,
    lineHeight: 24,
  },
});
