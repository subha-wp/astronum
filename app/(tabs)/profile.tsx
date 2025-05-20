import { Divider } from "@/components/ui/Divider";
import { GlassmorphicCard } from "@/components/ui/GlassmorphicCard";
import { useLanguage } from "@/contexts/LanguageContext";
import { useTheme } from "@/contexts/ThemeContext";
import { useTranslation } from "@/hooks/useTranslation";
import { useUserStore } from "@/store/userStore";
import {
  calculateDestinyNumber,
  calculateLifePathNumber,
} from "@/utils/numerologyCalculations";
import { LinearGradient } from "expo-linear-gradient";
import {
  Bell,
  ChevronRight,
  CreditCard,
  Globe,
  Heart,
  LogOut,
  Moon,
  Shield,
  Sun,
} from "lucide-react-native";
import { useState } from "react";
import {
  Alert,
  ScrollView,
  StyleSheet,
  Switch,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import Animated, { FadeIn } from "react-native-reanimated";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function ProfileScreen() {
  const { theme, isDark, toggleTheme } = useTheme();
  const insets = useSafeAreaInsets();
  const { t } = useTranslation();
  const { user, logout } = useUserStore();
  const { language, setLanguage } = useLanguage();
  const [showLanguages, setShowLanguages] = useState(false);

  const languageOptions = [
    { code: "en", name: "English" },
    { code: "hi", name: "हिंदी (Hindi)" },
    { code: "bn", name: "বাংলা (Bengali)" },
    { code: "ta", name: "தமிழ் (Tamil)" },
    { code: "mr", name: "मराठी (Marathi)" },
  ];

  const lifePathNumber = user?.dateOfBirth
    ? calculateLifePathNumber(user.dateOfBirth)
    : null;

  const destinyNumber = user?.name ? calculateDestinyNumber(user.name) : null;

  const handleLogout = () => {
    Alert.alert(t("profile.logoutTitle"), t("profile.logoutConfirm"), [
      {
        text: t("common.cancel"),
        style: "cancel",
      },
      {
        text: t("common.logout"),
        onPress: () => {
          logout();
          Router.replace("/onboarding");
        },
        style: "destructive",
      },
    ]);
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <LinearGradient
        colors={[
          "rgba(138, 79, 255, 0.8)",
          "rgba(59, 71, 201, 0.5)",
          "rgba(245, 189, 65, 0.1)",
        ]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={[styles.headerGradient, { paddingTop: insets.top + 10 }]}
      >
        <View style={styles.headerContent}>
          <View style={styles.avatarContainer}>
            <Text style={styles.avatarText}>
              {user?.name?.charAt(0) || "N"}
            </Text>
          </View>
          <Text style={styles.userName}>{user?.name || "Numora User"}</Text>
          <Text style={styles.userEmail}>{user?.email || ""}</Text>

          {(lifePathNumber || destinyNumber) && (
            <View style={styles.numerologyContainer}>
              {lifePathNumber && (
                <View style={styles.numberBadge}>
                  <Text style={styles.numberBadgeLabel}>
                    {t("profile.lifePath")}
                  </Text>
                  <Text style={styles.numberBadgeValue}>{lifePathNumber}</Text>
                </View>
              )}
              {destinyNumber && (
                <View style={styles.numberBadge}>
                  <Text style={styles.numberBadgeLabel}>
                    {t("profile.destiny")}
                  </Text>
                  <Text style={styles.numberBadgeValue}>{destinyNumber}</Text>
                </View>
              )}
            </View>
          )}
        </View>
      </LinearGradient>

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <Animated.View entering={FadeIn.duration(600).delay(300)}>
          <GlassmorphicCard style={styles.settingsCard}>
            <View style={styles.settingRow}>
              <View style={styles.settingLabelContainer}>
                {isDark ? (
                  <Moon size={20} color="#FFFFFF" />
                ) : (
                  <Sun size={20} color="#FFFFFF" />
                )}
                <Text style={styles.settingLabel}>
                  {t("settings.darkMode")}
                </Text>
              </View>
              <Switch
                value={isDark}
                onValueChange={toggleTheme}
                trackColor={{
                  false: "rgba(255, 255, 255, 0.3)",
                  true: "rgba(245, 189, 65, 0.5)",
                }}
                thumbColor={isDark ? "#F5BD41" : "#FFFFFF"}
              />
            </View>

            <TouchableOpacity
              style={styles.settingRow}
              onPress={() => setShowLanguages(!showLanguages)}
            >
              <View style={styles.settingLabelContainer}>
                <Globe size={20} color="#FFFFFF" />
                <Text style={styles.settingLabel}>
                  {t("settings.language")}
                </Text>
              </View>
              <View style={styles.settingValueContainer}>
                <Text style={styles.settingValue}>
                  {languageOptions.find((option) => option.code === language)
                    ?.name || "English"}
                </Text>
                <ChevronRight size={16} color="#FFFFFF" />
              </View>
            </TouchableOpacity>

            {showLanguages && (
              <View style={styles.languageOptions}>
                {languageOptions.map((option) => (
                  <TouchableOpacity
                    key={option.code}
                    style={[
                      styles.languageOption,
                      language === option.code && styles.selectedLanguageOption,
                    ]}
                    onPress={() => {
                      setLanguage(option.code);
                      setShowLanguages(false);
                    }}
                  >
                    <Text
                      style={[
                        styles.languageOptionText,
                        language === option.code && styles.selectedLanguageText,
                      ]}
                    >
                      {option.name}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            )}
          </GlassmorphicCard>

          <Text style={[styles.sectionTitle, { color: theme.text }]}>
            {t("profile.subscriptions")}
          </Text>

          <GlassmorphicCard style={styles.subscriptionCard}>
            <LinearGradient
              colors={["#F5BD41", "#8A4FFF"]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={styles.premiumBadge}
            >
              <Text style={styles.premiumBadgeText}>PREMIUM</Text>
            </LinearGradient>

            <Text style={styles.subscriptionTitle}>{t("premium.title")}</Text>
            <Text style={styles.subscriptionDescription}>
              {t("premium.fullAccess")}
            </Text>

            <View style={styles.subscriptionPrice}>
              <Text style={styles.priceAmount}>₹499</Text>
              <Text style={styles.pricePeriod}>
                {t("premium.yearlyBilling")}
              </Text>
            </View>

            <TouchableOpacity style={styles.upgradeButton}>
              <Text style={styles.upgradeButtonText}>
                {t("premium.upgrade")}
              </Text>
            </TouchableOpacity>
          </GlassmorphicCard>

          <Text style={[styles.sectionTitle, { color: theme.text }]}>
            {t("profile.account")}
          </Text>

          <GlassmorphicCard style={styles.menuCard}>
            <TouchableOpacity style={styles.menuItem}>
              <View style={styles.menuItemContent}>
                <CreditCard size={20} color="#FFFFFF" />
                <Text style={styles.menuItemText}>{t("profile.payments")}</Text>
              </View>
              <ChevronRight size={16} color="#FFFFFF" />
            </TouchableOpacity>

            <Divider />

            <TouchableOpacity style={styles.menuItem}>
              <View style={styles.menuItemContent}>
                <Bell size={20} color="#FFFFFF" />
                <Text style={styles.menuItemText}>
                  {t("profile.notifications")}
                </Text>
              </View>
              <ChevronRight size={16} color="#FFFFFF" />
            </TouchableOpacity>

            <Divider />

            <TouchableOpacity style={styles.menuItem}>
              <View style={styles.menuItemContent}>
                <Shield size={20} color="#FFFFFF" />
                <Text style={styles.menuItemText}>{t("profile.privacy")}</Text>
              </View>
              <ChevronRight size={16} color="#FFFFFF" />
            </TouchableOpacity>

            <Divider />

            <TouchableOpacity style={styles.menuItem}>
              <View style={styles.menuItemContent}>
                <Heart size={20} color="#FFFFFF" />
                <Text style={styles.menuItemText}>
                  {t("profile.favorites")}
                </Text>
              </View>
              <ChevronRight size={16} color="#FFFFFF" />
            </TouchableOpacity>

            <Divider />

            <TouchableOpacity style={styles.menuItem} onPress={handleLogout}>
              <View style={styles.menuItemContent}>
                <LogOut size={20} color="#FF5757" />
                <Text style={[styles.menuItemText, styles.logoutText]}>
                  {t("profile.logout")}
                </Text>
              </View>
            </TouchableOpacity>
          </GlassmorphicCard>

          <View style={styles.versionContainer}>
            <Text style={styles.versionText}>Numora v1.0.0</Text>
          </View>
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
    alignItems: "center",
    marginTop: 10,
  },
  avatarContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 10,
  },
  avatarText: {
    fontFamily: "Poppins-Bold",
    fontSize: 36,
    color: "#FFFFFF",
  },
  userName: {
    fontFamily: "Poppins-Bold",
    fontSize: 20,
    color: "#FFFFFF",
    marginTop: 5,
  },
  userEmail: {
    fontFamily: "Poppins-Regular",
    fontSize: 14,
    color: "rgba(255, 255, 255, 0.8)",
    marginTop: 2,
  },
  numerologyContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 15,
  },
  numberBadge: {
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    paddingVertical: 6,
    paddingHorizontal: 15,
    borderRadius: 20,
    marginHorizontal: 5,
    alignItems: "center",
  },
  numberBadgeLabel: {
    fontFamily: "Poppins-Regular",
    fontSize: 12,
    color: "rgba(255, 255, 255, 0.8)",
  },
  numberBadgeValue: {
    fontFamily: "Poppins-Bold",
    fontSize: 18,
    color: "#FFFFFF",
  },
  scrollView: {
    flex: 1,
    marginTop: -20,
  },
  scrollContent: {
    padding: 20,
    paddingBottom: 100,
  },
  settingsCard: {
    padding: 15,
    marginBottom: 20,
  },
  settingRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 10,
  },
  settingLabelContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  settingLabel: {
    fontFamily: "Poppins-Medium",
    fontSize: 16,
    color: "#FFFFFF",
    marginLeft: 12,
  },
  settingValueContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  settingValue: {
    fontFamily: "Poppins-Regular",
    fontSize: 14,
    color: "rgba(255, 255, 255, 0.8)",
    marginRight: 5,
  },
  languageOptions: {
    marginTop: 5,
    marginBottom: 10,
    paddingLeft: 32,
  },
  languageOption: {
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 8,
    marginBottom: 5,
  },
  selectedLanguageOption: {
    backgroundColor: "rgba(245, 189, 65, 0.3)",
  },
  languageOptionText: {
    fontFamily: "Poppins-Regular",
    fontSize: 14,
    color: "rgba(255, 255, 255, 0.8)",
  },
  selectedLanguageText: {
    fontFamily: "Poppins-Medium",
    color: "#FFFFFF",
  },
  sectionTitle: {
    fontFamily: "Poppins-SemiBold",
    fontSize: 18,
    marginTop: 10,
    marginBottom: 15,
    paddingLeft: 5,
  },
  subscriptionCard: {
    padding: 20,
    marginBottom: 20,
    position: "relative",
    overflow: "hidden",
  },
  premiumBadge: {
    position: "absolute",
    top: 15,
    right: -30,
    paddingHorizontal: 40,
    paddingVertical: 6,
    transform: [{ rotate: "45deg" }],
  },
  premiumBadgeText: {
    fontFamily: "Poppins-SemiBold",
    fontSize: 12,
    color: "#FFFFFF",
  },
  subscriptionTitle: {
    fontFamily: "Poppins-Bold",
    fontSize: 22,
    color: "#FFFFFF",
    marginBottom: 8,
  },
  subscriptionDescription: {
    fontFamily: "Poppins-Regular",
    fontSize: 14,
    color: "rgba(255, 255, 255, 0.8)",
    marginBottom: 15,
    lineHeight: 22,
  },
  subscriptionPrice: {
    flexDirection: "row",
    alignItems: "baseline",
    marginBottom: 20,
  },
  priceAmount: {
    fontFamily: "Poppins-Bold",
    fontSize: 28,
    color: "#F5BD41",
    marginRight: 6,
  },
  pricePeriod: {
    fontFamily: "Poppins-Regular",
    fontSize: 14,
    color: "rgba(255, 255, 255, 0.8)",
  },
  upgradeButton: {
    backgroundColor: "#F5BD41",
    paddingVertical: 12,
    borderRadius: 30,
    alignItems: "center",
  },
  upgradeButtonText: {
    fontFamily: "Poppins-SemiBold",
    fontSize: 16,
    color: "#1A1A1A",
  },
  menuCard: {
    padding: 0,
    marginBottom: 20,
    overflow: "hidden",
  },
  menuItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 16,
    paddingHorizontal: 20,
  },
  menuItemContent: {
    flexDirection: "row",
    alignItems: "center",
  },
  menuItemText: {
    fontFamily: "Poppins-Medium",
    fontSize: 16,
    color: "#FFFFFF",
    marginLeft: 12,
  },
  logoutText: {
    color: "#FF5757",
  },
  versionContainer: {
    alignItems: "center",
    marginVertical: 20,
  },
  versionText: {
    fontFamily: "Poppins-Regular",
    fontSize: 14,
    color: "rgba(255, 255, 255, 0.6)",
  },
});
