// @ts-nocheck
import { GlassmorphicCard } from "@/components/ui/GlassmorphicCard";
import { theme } from "@/constants/theme";
import { useTranslation } from "@/hooks/useTranslation";
import { LinearGradient } from "expo-linear-gradient";
import { router } from "expo-router";
import {
  Compass,
  Heart,
  HeartPulse,
  IndianRupee,
  Infinity,
  TrendingUp,
} from "lucide-react-native";
import { useState } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import Animated, { FadeInDown } from "react-native-reanimated";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function ExploreScreen() {
  const insets = useSafeAreaInsets();
  const { t } = useTranslation();
  const [activeTab, setActiveTab] = useState<"features" | "remedy">("features");

  const features = [
    {
      title: t("features.compatibility"),
      description: t("features.compatibilityDesc"),
      icon: Heart,
      route: "/compatibility",
      color: "#FF0000",
    },
    {
      title: t("features.business"),
      description: t("features.businessDesc"),
      icon: TrendingUp,
      route: "/business-advisor",
      color: "#00FF00",
    },
    {
      title: t("features.career"),
      description: t("features.careerDesc"),
      icon: Infinity,
      route: "/career-guide",
      color: "#0000FF",
    },
    {
      title: t("features.health"),
      description: t("features.healthDesc"),
      icon: HeartPulse,
      route: "/health",
      color: "#93C572",
    },
    {
      title: t("features.wealth"),
      description: t("features.wealthDesc"),
      icon: IndianRupee,
      route: "/wealth",
      color: "#157811",
    },
  ];

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
        <View style={styles.headerContent}>
          <View style={styles.titleContainer}>
            <Compass color="#FFFFFF" size={24} />
            <Text style={styles.title}>{t("explore.title")}</Text>
          </View>
          <Text style={styles.subtitle}>{t("explore.subtitle")}</Text>
        </View>
      </LinearGradient>

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.tabs}>
          <TouchableOpacity
            style={[styles.tab, activeTab === "features" && styles.activeTab]}
            onPress={() => setActiveTab("features")}
          >
            <Text style={styles.tabText}>Check Yourself</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.tab, activeTab === "remedy" && styles.activeTab]}
            onPress={() => setActiveTab("remedy")}
          >
            <Text style={styles.tabText}>Remedies</Text>
          </TouchableOpacity>
        </View>

        <Animated.View
          entering={FadeInDown.duration(600).delay(300)}
          style={styles.featuresWrapper}
        >
          {activeTab === "features" ? (
            <View style={styles.featuresWrapper}>
              {features.map((feature, index) => (
                <TouchableOpacity
                  key={index}
                  onPress={() => router.push(feature.route)}
                  style={styles.featureWrapper}
                >
                  <GlassmorphicCard style={styles.featureCard}>
                    <View style={styles.featureIcon}>
                      <feature.icon size={24} color={feature.color} />
                    </View>
                    <View style={styles.featureContent}>
                      <Text style={styles.featureTitle}>{feature.title}</Text>
                      <Text style={styles.featureDescription}>
                        {feature.description}
                      </Text>
                    </View>
                  </GlassmorphicCard>
                </TouchableOpacity>
              ))}
            </View>
          ) : (
            <View style={styles.featuresWrapper}>
              {[
                {
                  title: "Attract Anyone to You",
                  description:
                    "Discover how to draw love, attention, and companionship through personalized numerology remedies.",
                  icon: Heart,
                  color: "#FF69B4",
                },
                {
                  title: "Business Success",
                  description:
                    "Boost your business using proven numerology strategies and name balancing.",
                  icon: TrendingUp,
                  color: "#00C897",
                },
                {
                  title: "Manifest Your Goals",
                  description:
                    "Tap into numerological remedies to achieve your life dreams and intentions.",
                  icon: Infinity,
                  color: "#8A2BE2",
                },
              ].map((item, index) => (
                <GlassmorphicCard
                  key={index}
                  style={[styles.featureCard, { marginBottom: 16 }]}
                >
                  <View style={styles.featureIcon}>
                    <item.icon size={24} color={item.color} />
                  </View>
                  <View style={styles.featureContent}>
                    <Text style={styles.featureTitle}>{item.title}</Text>
                    <Text style={styles.featureDescription}>
                      {item.description}
                    </Text>
                  </View>
                </GlassmorphicCard>
              ))}
            </View>
          )}
        </Animated.View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingBottom: 24,
  },
  headerGradient: {
    paddingHorizontal: 20,
    paddingBottom: 30,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
  },
  tabs: {
    flexDirection: "row",
    justifyContent: "space-around",
    backgroundColor: theme.colors.secondaryContainer,
    borderRadius: 12,
    padding: 6,
    marginBottom: 20,
  },

  tab: {
    flex: 1,
    alignItems: "center",
    paddingVertical: 10,
    borderRadius: 10,
    // backgroundColor: theme.colors.primaryContainer,
  },

  activeTab: {
    backgroundColor: theme.colors.primary,
  },

  tabText: {
    fontFamily: "Poppins-Medium",
    fontSize: 14,
    color: theme.colors.secondary,
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
  featureButton: {
    marginBottom: 16,
  },
  featureCard: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
  },
  featureIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 16,
  },
  featureContent: {
    flex: 1,
  },
  featureTitle: {
    fontFamily: "Poppins-SemiBold",
    fontSize: 18,
    color: theme.colors.primary,
    marginBottom: 4,
  },
  featureDescription: {
    fontFamily: "Poppins-Regular",
    fontSize: 14,
    color: theme.colors.secondary,
    lineHeight: 20,
  },
  featuresWrapper: {
    flexWrap: "wrap",
  },
  featureWrapper: {
    marginBottom: 16,
  },
});
