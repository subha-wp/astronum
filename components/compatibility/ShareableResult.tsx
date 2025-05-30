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
            "rgba(255, 105, 180, 0.9)",
            "rgba(138, 79, 255, 0.8)",
            "rgba(59, 71, 201, 0.6)",
          ]}
          style={styles.gradient}
        >
          <View style={styles.content}>
            <View style={styles.header}>
              <Text style={styles.logo}>AstroNum</Text>
              <Text style={styles.title}>Love Compatibility</Text>
            </View>

            <View style={styles.namesContainer}>
              <Text style={styles.name}>{person1Name}</Text>
              <Heart size={32} color="#FFFFFF" fill="#FFFFFF" />
              <Text style={styles.name}>{person2Name}</Text>
            </View>

            <View style={styles.percentageContainer}>
              <Text style={styles.percentage}>{percentage}%</Text>
              <Text style={styles.match}>Soul Match</Text>
            </View>

            <GlassmorphicCard style={styles.descriptionCard}>
              <Text style={styles.description}>{description}</Text>
            </GlassmorphicCard>

            <View style={styles.strengthsContainer}>
              <Text style={styles.strengthsTitle}>Love Strengths</Text>
              {strengths.slice(0, 3).map((strength, index) => (
                <View key={index} style={styles.strengthItem}>
                  <Heart size={16} color="#FF69B4" fill="#FF69B4" />
                  <Text style={styles.strengthText}>{strength}</Text>
                </View>
              ))}
            </View>

            <Text style={styles.footer}>astronum.app</Text>
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
    fontSize: 32,
    color: "#FFFFFF",
    marginBottom: 8,
  },
  title: {
    fontFamily: "Poppins-SemiBold",
    fontSize: 24,
    color: "#FFFFFF",
  },
  namesContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 40,
  },
  name: {
    fontFamily: "Poppins-Bold",
    fontSize: 28,
    color: "#FFFFFF",
    marginHorizontal: 20,
  },
  percentageContainer: {
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    borderRadius: 100,
    width: 160,
    height: 160,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 40,
    borderWidth: 2,
    borderColor: "#FFFFFF",
  },
  percentage: {
    fontFamily: "Poppins-Bold",
    fontSize: 48,
    color: "#FFFFFF",
  },
  match: {
    fontFamily: "Poppins-Medium",
    fontSize: 18,
    color: "#FFFFFF",
  },
  descriptionCard: {
    marginBottom: 40,
    padding: 20,
  },
  description: {
    fontFamily: "Poppins-Regular",
    fontSize: 16,
    color: "#FFFFFF",
    textAlign: "center",
    lineHeight: 24,
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
  footer: {
    fontFamily: "Poppins-Medium",
    fontSize: 16,
    color: "rgba(255, 255, 255, 0.8)",
    position: "absolute",
    bottom: 0,
  },
});
