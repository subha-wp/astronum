/* eslint-disable react/display-name */
import { LinearGradient } from "expo-linear-gradient";
import { Heart } from "lucide-react-native";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { GlassmorphicCard } from "../ui/GlassmorphicCard";

interface ShareableResultProps {
  percentage: number;
  description: string;
  strengths: string[];
  person1Name: string;
  person2Name: string;
}

export const ShareableResult = React.forwardRef<View, ShareableResultProps>(
  ({ percentage, description, strengths, person1Name, person2Name }, ref) => {
    return (
      <View ref={ref} style={styles.container}>
        <LinearGradient
          colors={[
            "rgba(255, 105, 180, 0.95)",
            "rgba(147, 112, 219, 0.9)",
            "rgba(138, 43, 226, 0.85)",
          ]}
          style={styles.gradient}
        >
          <View style={styles.content}>
            <View style={styles.header}>
              <Text style={styles.logo}>Love Match</Text>
              <Text style={styles.subtitle}>by AstroNum</Text>
            </View>

            <View style={styles.namesContainer}>
              <Text style={styles.name}>{person1Name}</Text>
              <View style={styles.heartContainer}>
                <Heart size={40} color="#FFFFFF" fill="#FFFFFF" />
                <Text style={styles.percentage}>{percentage}%</Text>
              </View>
              <Text style={styles.name}>{person2Name}</Text>
            </View>

            <GlassmorphicCard style={styles.resultCard}>
              <Text style={styles.matchText}>Soul Connection</Text>
              <Text style={styles.description}>{description}</Text>

              <View style={styles.strengthsContainer}>
                <Text style={styles.strengthsTitle}>Love Harmony</Text>
                {strengths.slice(0, 3).map((strength, index) => (
                  <View key={index} style={styles.strengthItem}>
                    <Heart size={16} color="#FF69B4" fill="#FF69B4" />
                    <Text style={styles.strengthText}>{strength}</Text>
                  </View>
                ))}
              </View>
            </GlassmorphicCard>

            <View style={styles.decorativeHearts}>
              {[...Array(5)].map((_, i) => (
                <Heart
                  key={i}
                  size={20 + i * 4}
                  color="#FFFFFF"
                  fill="#FFFFFF"
                  style={[
                    styles.decorativeHeart,
                    {
                      opacity: 0.2 + i * 0.1,
                      transform: [{ rotate: `${i * 15}deg` }],
                    },
                  ]}
                />
              ))}
            </View>

            <Text style={styles.footer}>Find your match at astronum.app</Text>
          </View>
        </LinearGradient>
      </View>
    );
  }
);

const styles = StyleSheet.create({
  container: {
    width: 600,
    height: 800,
    backgroundColor: "#1A1A1A",
  },
  gradient: {
    flex: 1,
    padding: 40,
  },
  content: {
    flex: 1,
    alignItems: "center",
  },
  header: {
    alignItems: "center",
    marginBottom: 40,
  },
  logo: {
    fontFamily: "Poppins-Bold",
    fontSize: 36,
    color: "#FFFFFF",
    textShadowColor: "rgba(0, 0, 0, 0.2)",
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 4,
  },
  subtitle: {
    fontFamily: "Poppins-Medium",
    fontSize: 16,
    color: "rgba(255, 255, 255, 0.8)",
    marginTop: 4,
  },
  namesContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 40,
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    padding: 20,
    borderRadius: 30,
  },
  name: {
    fontFamily: "Poppins-Bold",
    fontSize: 24,
    color: "#FFFFFF",
    marginHorizontal: 20,
    textShadowColor: "rgba(0, 0, 0, 0.2)",
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
  heartContainer: {
    alignItems: "center",
    justifyContent: "center",
    width: 80,
    height: 80,
    backgroundColor: "rgba(255, 105, 180, 0.3)",
    borderRadius: 40,
    borderWidth: 2,
    borderColor: "#FFFFFF",
  },
  percentage: {
    fontFamily: "Poppins-Bold",
    fontSize: 20,
    color: "#FFFFFF",
    position: "absolute",
  },
  resultCard: {
    marginBottom: 40,
    padding: 24,
    width: "100%",
    backgroundColor: "rgba(255, 255, 255, 0.15)",
  },
  matchText: {
    fontFamily: "Poppins-Bold",
    fontSize: 24,
    color: "#FFFFFF",
    textAlign: "center",
    marginBottom: 16,
  },
  description: {
    fontFamily: "Poppins-Regular",
    fontSize: 16,
    color: "#FFFFFF",
    textAlign: "center",
    lineHeight: 24,
    marginBottom: 24,
  },
  strengthsContainer: {
    alignItems: "center",
    width: "100%",
  },
  strengthsTitle: {
    fontFamily: "Poppins-SemiBold",
    fontSize: 20,
    color: "#FFFFFF",
    marginBottom: 16,
  },
  strengthItem: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    padding: 12,
    borderRadius: 12,
    marginBottom: 8,
    width: "100%",
  },
  strengthText: {
    fontFamily: "Poppins-Regular",
    fontSize: 16,
    color: "#FFFFFF",
    marginLeft: 12,
  },
  decorativeHearts: {
    position: "absolute",
    bottom: 80,
    right: 40,
    flexDirection: "row",
  },
  decorativeHeart: {
    marginHorizontal: 4,
  },
  footer: {
    fontFamily: "Poppins-Medium",
    fontSize: 16,
    color: "rgba(255, 255, 255, 0.8)",
    position: "absolute",
    bottom: 20,
  },
});
