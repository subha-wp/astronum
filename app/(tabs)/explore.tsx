/* eslint-disable react/no-unescaped-entities */
// @ts-nocheck
import { GlassmorphicCard } from "@/components/ui/GlassmorphicCard";
import { theme } from "@/constants/theme";
import { useTranslation } from "@/hooks/useTranslation";
import { useUserStore } from "@/store/userStore";
import { calculateLifePathNumber } from "@/utils/numerologyCalculations";
import { LinearGradient } from "expo-linear-gradient";
import { router } from "expo-router";
import {
  Compass,
  Heart,
  HeartPulse,
  IndianRupee,
  Infinity,
  Smartphone,
  Sparkles,
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

type TabType = "features" | "remedy";
type RemedyCategory = "love" | "wealth" | "career" | "health";

export default function ExploreScreen() {
  const insets = useSafeAreaInsets();
  const { t } = useTranslation();
  const { user } = useUserStore();
  const [activeTab, setActiveTab] = useState<TabType>("features");
  const [selectedCategory, setSelectedCategory] =
    useState<RemedyCategory>("love");

  const lifePathNumber = user?.dateOfBirth
    ? calculateLifePathNumber(user.dateOfBirth)
    : 1;

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
    {
      title: t("mobile.title"),
      description: t("mobile.subtitle"),
      icon: Smartphone,
      route: "/mobile",
      color: "#157811",
    },
  ];

  const remedyCategories: { id: RemedyCategory; title: string; icon: any }[] = [
    { id: "love", title: t("categories.love"), icon: Heart },
    { id: "wealth", title: t("categories.wealth"), icon: IndianRupee },
    { id: "career", title: t("categories.career"), icon: TrendingUp },
    { id: "health", title: t("categories.health"), icon: HeartPulse },
  ];

  const getPersonalizedRemedies = (category: RemedyCategory) => {
    const remedies = t(`explore.remedies.categories.${category}.remedies`);
    const personalizedRemedies = remedies.map((remedy: any) => ({
      ...remedy,
      description: remedy.description.replace(
        "{number}",
        lifePathNumber.toString()
      ),
      items: [...remedy.items, `Life Path ${lifePathNumber} specific crystals`],
    }));

    // Add personalized elements based on life path number
    switch (lifePathNumber) {
      case 1:
        return personalizedRemedies.map((r: any) => ({
          ...r,
          powerDay: "Sunday",
          element: "Fire",
        }));
      case 2:
        return personalizedRemedies.map((r: any) => ({
          ...r,
          powerDay: "Monday",
          element: "Water",
        }));
      case 3:
        return personalizedRemedies.map((r: any) => ({
          ...r,
          powerDay: "Wednesday",
          element: "Air",
        }));
      case 4:
        return personalizedRemedies.map((r: any) => ({
          ...r,
          powerDay: "Saturday",
          element: "Earth",
        }));
      case 5:
        return personalizedRemedies.map((r: any) => ({
          ...r,
          powerDay: "Wednesday",
          element: "Air",
        }));
      case 6:
        return personalizedRemedies.map((r: any) => ({
          ...r,
          powerDay: "Friday",
          element: "Earth",
        }));
      case 7:
        return personalizedRemedies.map((r: any) => ({
          ...r,
          powerDay: "Monday",
          element: "Water",
        }));
      case 8:
        return personalizedRemedies.map((r: any) => ({
          ...r,
          powerDay: "Thursday",
          element: "Fire",
        }));
      case 9:
        return personalizedRemedies.map((r: any) => ({
          ...r,
          powerDay: "Tuesday",
          element: "Fire",
        }));
      default:
        return personalizedRemedies;
    }
  };

  const renderRemedyCard = (remedy: any) => (
    <GlassmorphicCard key={remedy.title} style={styles.remedyCard}>
      <View style={styles.remedyHeader}>
        <Sparkles size={20} color={theme.colors.accent} />
        <Text style={styles.remedyTitle}>{remedy.title}</Text>
      </View>
      <Text style={styles.remedyDescription}>{remedy.description}</Text>

      <View style={styles.remedyPowerInfo}>
        <View style={styles.powerInfoItem}>
          <Text style={styles.powerInfoLabel}>Power Day:</Text>
          <Text style={styles.powerInfoValue}>{remedy.powerDay}</Text>
        </View>
        <View style={styles.powerInfoItem}>
          <Text style={styles.powerInfoLabel}>Element:</Text>
          <Text style={styles.powerInfoValue}>{remedy.element}</Text>
        </View>
      </View>

      <View style={styles.remedyItems}>
        <Text style={styles.remedyItemsTitle}>You'll need:</Text>
        {remedy.items.map((item: string, index: number) => (
          <Text key={index} style={styles.remedyItem}>
            • {item}
          </Text>
        ))}
      </View>
    </GlassmorphicCard>
  );

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

        <View style={styles.tabs}>
          <TouchableOpacity
            style={[styles.tab, activeTab === "features" && styles.activeTab]}
            onPress={() => setActiveTab("features")}
          >
            <Text
              style={[
                styles.tabText,
                activeTab === "features" && styles.activeTabText,
              ]}
            >
              Check Yourself
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.tab, activeTab === "remedy" && styles.activeTab]}
            onPress={() => setActiveTab("remedy")}
          >
            <Text
              style={[
                styles.tabText,
                activeTab === "remedy" && styles.activeTabText,
              ]}
            >
              Remedies
            </Text>
          </TouchableOpacity>
        </View>
      </LinearGradient>

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
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
            <View style={styles.remediesContainer}>
              <View style={styles.lifePathInfo}>
                <Text style={styles.lifePathTitle}>
                  Life Path {lifePathNumber} Remedies
                </Text>
                <Text style={styles.lifePathDescription}>
                  These remedies are specifically aligned with your
                  numerological profile
                </Text>
              </View>

              <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                style={styles.categoryScroll}
                contentContainerStyle={styles.categoryScrollContent}
              >
                {remedyCategories.map((category) => (
                  <TouchableOpacity
                    key={category.id}
                    style={[
                      styles.categoryButton,
                      selectedCategory === category.id &&
                        styles.selectedCategory,
                    ]}
                    onPress={() => setSelectedCategory(category.id)}
                  >
                    <category.icon
                      size={20}
                      color={
                        selectedCategory === category.id
                          ? "#FFFFFF"
                          : theme.colors.secondary
                      }
                    />
                    <Text
                      style={[
                        styles.categoryText,
                        selectedCategory === category.id &&
                          styles.selectedCategoryText,
                      ]}
                    >
                      {category.title}
                    </Text>
                  </TouchableOpacity>
                ))}
              </ScrollView>

              <View style={styles.remediesList}>
                {getPersonalizedRemedies(selectedCategory).map((remedy: any) =>
                  renderRemedyCard(remedy)
                )}
              </View>
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
  tabs: {
    flexDirection: "row",
    justifyContent: "space-around",
    backgroundColor: theme.colors.secondaryContainer,
    borderRadius: 12,
    padding: 6,
    marginTop: 20,
  },
  tab: {
    flex: 1,
    alignItems: "center",
    paddingVertical: 10,
    borderRadius: 10,
  },
  activeTab: {
    backgroundColor: theme.colors.primary,
  },
  tabText: {
    fontFamily: "Poppins-Medium",
    fontSize: 14,
    color: theme.colors.secondary,
  },
  activeTabText: {
    color: "#FFFFFF",
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    padding: 20,
  },
  featuresWrapper: {
    flexWrap: "wrap",
  },
  featureWrapper: {
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
  remediesContainer: {
    flex: 1,
  },
  lifePathInfo: {
    marginBottom: 20,
    padding: 16,
    backgroundColor: "rgba(255, 255, 255, 0.05)",
    borderRadius: 12,
  },
  lifePathTitle: {
    fontFamily: "Poppins-Bold",
    fontSize: 18,
    color: theme.colors.primary,
    marginBottom: 4,
  },
  lifePathDescription: {
    fontFamily: "Poppins-Regular",
    fontSize: 14,
    color: theme.colors.secondary,
  },
  categoryScroll: {
    marginBottom: 20,
  },
  categoryScrollContent: {
    paddingRight: 20,
  },
  categoryButton: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    marginRight: 12,
    backgroundColor: theme.colors.secondaryContainer,
  },
  selectedCategory: {
    backgroundColor: theme.colors.primary,
  },
  categoryText: {
    fontFamily: "Poppins-Medium",
    fontSize: 14,
    color: theme.colors.secondary,
    marginLeft: 8,
  },
  selectedCategoryText: {
    color: "#FFFFFF",
  },
  remediesList: {
    flex: 1,
  },
  remedyCard: {
    marginBottom: 16,
    padding: 16,
  },
  remedyHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
  },
  remedyTitle: {
    fontFamily: "Poppins-SemiBold",
    fontSize: 16,
    color: theme.colors.primary,
    marginLeft: 8,
  },
  remedyDescription: {
    fontFamily: "Poppins-Regular",
    fontSize: 14,
    color: theme.colors.secondary,
    lineHeight: 20,
    marginBottom: 16,
  },
  remedyPowerInfo: {
    flexDirection: "row",
    justifyContent: "space-around",
    backgroundColor: "rgba(255, 255, 255, 0.05)",
    borderRadius: 12,
    padding: 12,
    marginBottom: 16,
  },
  powerInfoItem: {
    alignItems: "center",
  },
  powerInfoLabel: {
    fontFamily: "Poppins-Regular",
    fontSize: 12,
    color: theme.colors.secondary,
    marginBottom: 4,
  },
  powerInfoValue: {
    fontFamily: "Poppins-SemiBold",
    fontSize: 14,
    color: theme.colors.primary,
  },
  remedyItems: {
    backgroundColor: "rgba(255, 255, 255, 0.05)",
    padding: 12,
    borderRadius: 12,
  },
  remedyItemsTitle: {
    fontFamily: "Poppins-Medium",
    fontSize: 14,
    color: theme.colors.primary,
    marginBottom: 8,
  },
  remedyItem: {
    fontFamily: "Poppins-Regular",
    fontSize: 14,
    color: theme.colors.secondary,
    marginBottom: 4,
  },
});
