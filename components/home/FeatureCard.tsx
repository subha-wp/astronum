// @ts-nocheck
import { GlassmorphicCard } from "@/components/ui/GlassmorphicCard";
import { Briefcase, FileText, Heart, TrendingUp } from "lucide-react-native";
import { StyleSheet, Text, TouchableOpacity, ViewStyle } from "react-native";
import Animated, { FadeInUp } from "react-native-reanimated";

interface FeatureCardProps {
  title: string;
  description: string;
  icon: "file-text" | "heart" | "briefcase" | "trending-up";
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
        return <FileText size={24} color="#F5BD41" />;
      case "heart":
        return <Heart size={24} color="#F5BD41" />;
      case "briefcase":
        return <Briefcase size={24} color="#F5BD41" />;
      case "trending-up":
        return <TrendingUp size={24} color="#F5BD41" />;
      default:
        return <FileText size={24} color="#F5BD41" />;
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
    padding: 16,
    justifyContent: "space-between",
  },
  title: {
    fontFamily: "Poppins-SemiBold",
    fontSize: 16,
    color: "#FFFFFF",
    marginTop: 8,
  },
  description: {
    fontFamily: "Poppins-Regular",
    fontSize: 12,
    color: "rgba(255, 255, 255, 0.8)",
    marginTop: 4,
    lineHeight: 18,
  },
});
