import { NumerologyReport } from "@/components/NumerologyReport";
import { theme } from "@/constants/theme";
import { useTranslation } from "@/hooks/useTranslation";
import { useUserStore } from "@/store/userStore";
import {
  calculateDestinyNumber,
  calculateLifePathNumber,
} from "@/utils/numerologyCalculations";
import { LinearGradient } from "expo-linear-gradient";
import { router } from "expo-router";
import { ArrowLeft } from "lucide-react-native";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function NumerologyReportScreen() {
  const insets = useSafeAreaInsets();
  const { t } = useTranslation();
  const { user } = useUserStore();

  const lifePathNumber = user?.dateOfBirth
    ? calculateLifePathNumber(user.dateOfBirth)
    : null;

  const destinyNumber = user?.name ? calculateDestinyNumber(user.name) : null;

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
            <Text style={styles.title}>{t("numerology.title")}</Text>
          </View>
          <Text style={styles.subtitle}>{t("numerology.subtitle")}</Text>
        </View>
      </LinearGradient>

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {lifePathNumber && destinyNumber ? (
          <NumerologyReport
            lifePathNumber={lifePathNumber}
            destinyNumber={destinyNumber}
          />
        ) : (
          <View style={styles.noDataContainer}>
            <Text style={styles.noDataText}>{t("numerology.noData")}</Text>
          </View>
        )}
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
  noDataContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 40,
  },
  noDataText: {
    fontFamily: "Poppins-Medium",
    fontSize: 16,
    color: theme.colors.secondary,
    textAlign: "center",
  },
});
