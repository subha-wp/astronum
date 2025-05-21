// @ts-nocheck
import { GlassmorphicCard } from "@/components/ui/GlassmorphicCard";
import { theme } from "@/constants/theme";
import {
  Briefcase,
  FileText,
  Heart,
  HeartPulse,
  IndianRupee,
  Infinity,
  TrendingUp,
} from "lucide-react-native";
import { StyleSheet, Text, TouchableOpacity, ViewStyle } from "react-native";
import Animated, { FadeInUp } from "react-native-reanimated";

interface FeatureCardProps {
  title: string;
  description: string;
  icon:
    | "file-text"
    | "heart"
    | "briefcase"
    | "trending-up"
    | "heart-pulse"
    | "indian-rupee";
  onPress: () => void;
  style?: ViewStyle;
  delay?: number;
}

export const FeatureCard = ({
  title,
  description,
  icon,
  onPress,
  style,
  delay = 0,
}: FeatureCardProps) => {
  const getIcon = () => {
    switch (icon) {
      case "file-text":
        return <Infinity size={24} color={theme.colors.primary} />;
      case "heart":
        return <Heart size={24} fill="#FF0000" color="#FF0000" />;
      case "briefcase":
        return <Briefcase size={24} color={theme.colors.secondary} />;
      case "trending-up":
        return <TrendingUp size={24} color="#00FF00" />;
      case "heart-pulse":
        return <HeartPulse size={24} color="#93C572" />;
      case "indian-rupee":
        return <IndianRupee size={24} color="#157811" />;
      default:
        return <FileText size={24} color={theme.colors.primary} />;
    }
  };

  return (
    <Animated.View
      entering={FadeInUp.duration(600).delay(delay)}
      style={styles.container}
    >
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={onPress}
        style={styles.touchable}
      >
        <GlassmorphicCard style={[styles.card, style]}>
          {getIcon()}
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.description} numberOfLines={3}>
            {description}
          </Text>
        </GlassmorphicCard>
      </TouchableOpacity>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "48%",
    marginBottom: 16,
  },
  touchable: {
    flex: 1,
  },
  card: {
    height: 160,
    padding: 2,
    justifyContent: "space-between",
  },
  title: {
    fontFamily: "Poppins-SemiBold",
    fontSize: 14,
    color: theme.colors.primary,
    marginTop: 8,
  },
  description: {
    fontFamily: "Poppins-Regular",
    fontSize: 12,
    color: theme.colors.secondary,
    marginTop: 4,
    lineHeight: 18,
  },
});
