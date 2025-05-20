import { theme } from "@/constants/theme";
import { useTranslation } from "@/hooks/useTranslation";
import { useNumerologyStore } from "@/store/numerologyStore";
import { StyleSheet, Text, View } from "react-native";
import Animated, { FadeInDown } from "react-native-reanimated";
import { GlassmorphicCard } from "./ui/GlassmorphicCard";

interface NumerologyReportProps {
  lifePathNumber: number;
  destinyNumber: number;
}

export const NumerologyReport = ({
  lifePathNumber,
  destinyNumber,
}: NumerologyReportProps) => {
  const { getLifePathInfo, getDestinyInfo } = useNumerologyStore();
  const { t } = useTranslation();

  const lifePathInfo = getLifePathInfo(lifePathNumber);
  const destinyInfo = getDestinyInfo(destinyNumber);

  if (!lifePathInfo || !destinyInfo) return null;

  return (
    <Animated.View entering={FadeInDown.duration(600).delay(300)}>
      <GlassmorphicCard style={styles.container}>
        <View style={styles.section}>
          <Text style={styles.title}>
            {t("numerology.lifePath")} {lifePathNumber}: {lifePathInfo.title}
          </Text>
          <Text style={styles.description}>{lifePathInfo.description}</Text>

          <View style={styles.listContainer}>
            <Text style={styles.subtitle}>{t("numerology.strengths")}</Text>
            {lifePathInfo.strengths.slice(0, 3).map((strength, index) => (
              <Text key={index} style={styles.listItem}>
                • {strength}
              </Text>
            ))}
          </View>
        </View>

        <View style={styles.divider} />

        <View style={styles.section}>
          <Text style={styles.title}>
            {t("numerology.destiny")} {destinyNumber}: {destinyInfo.title}
          </Text>
          <Text style={styles.description}>{destinyInfo.description}</Text>

          <View style={styles.listContainer}>
            <Text style={styles.subtitle}>{t("numerology.purpose")}</Text>
            <Text style={styles.purposeText}>{destinyInfo.purpose}</Text>
          </View>
        </View>
      </GlassmorphicCard>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 10,
    padding: 20,
  },
  section: {
    marginBottom: 15,
  },
  title: {
    fontFamily: "Poppins-Bold",
    fontSize: 20,
    color: theme.colors.primary,
    marginBottom: 8,
  },
  description: {
    fontFamily: "Poppins-Regular",
    fontSize: 16,
    color: theme.colors.secondary,
    lineHeight: 22,
    marginBottom: 15,
  },
  subtitle: {
    fontFamily: "Poppins-SemiBold",
    fontSize: 18,
    color: theme.colors.tertiary,
    marginBottom: 8,
  },
  listContainer: {
    marginTop: 10,
  },
  listItem: {
    fontFamily: "Poppins-Regular",
    fontSize: 16,
    color: theme.colors.onPrimary,
    marginBottom: 5,
    paddingLeft: 10,
  },
  purposeText: {
    fontFamily: "Poppins-Regular",
    fontSize: 16,
    color: theme.colors.tertiary,
    fontStyle: "italic",
    lineHeight: 22,
    paddingLeft: 5,
  },
  divider: {
    height: 1,
    backgroundColor: theme.colors.firstGradient,
    marginVertical: 20,
  },
});
