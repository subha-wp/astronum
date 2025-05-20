import { GlassmorphicCard } from "@/components/ui/GlassmorphicCard";
import * as Icon from "lucide-react-native";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, ViewStyle } from "react-native";
import Animated, { FadeInUp } from "react-native-reanimated";

type IconType = keyof typeof Icon;

interface FeatureCardProps {
  title: string;
  description: string;
  icon: IconType;
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
  const IconComponent = Icon[icon];

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
          <IconComponent size={24} color="#F5BD41" />
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
