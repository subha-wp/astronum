// @ts-nocheck
import { ShareableResult } from "@/components/compatibility/ShareableResult";
import { Button } from "@/components/ui/Button";
import { DateInput } from "@/components/ui/DateInput";
import { GlassmorphicCard } from "@/components/ui/GlassmorphicCard";
import { theme } from "@/constants/theme";
import { useTranslation } from "@/hooks/useTranslation";
import { useCompatibilityStore } from "@/store/compatibilityStore";
import { calculateLifePathNumber } from "@/utils/numerologyCalculations";
import { LinearGradient } from "expo-linear-gradient";
import * as MediaLibrary from "expo-media-library";
import { router } from "expo-router";
import { ArrowLeft, Download, Heart, Share2 } from "lucide-react-native";
import { useRef, useState } from "react";
import {
  Share,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import Animated, { FadeInDown } from "react-native-reanimated";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import ViewShot from "react-native-view-shot";

export default function CompatibilityScreen() {
  const insets = useSafeAreaInsets();
  const { t } = useTranslation();
  const { getCompatibility } = useCompatibilityStore();

  const [partnerName, setPartnerName] = useState("");
  const [partnerDOB, setPartnerDOB] = useState<Date | null>(null);
  const [showResults, setShowResults] = useState(false);
  const resultRef = useRef<View>(null);
  const viewShotRef = useRef<ViewShot>(null);

  const calculateCompatibility = () => {
    if (!partnerName.trim() || !partnerDOB) return;
    setShowResults(true);
  };

  const partnerLifePath = partnerDOB
    ? calculateLifePathNumber(partnerDOB.toISOString())
    : null;
  const userLifePath = 1; // This should come from user's profile

  const compatibility = partnerLifePath
    ? getCompatibility(userLifePath, partnerLifePath)
    : null;

  const handleDownload = async () => {
    if (!compatibility || !viewShotRef.current) return;

    try {
      // Request permissions first
      const { status } = await MediaLibrary.requestPermissionsAsync();
      if (status !== "granted") {
        alert("Sorry, we need media library permissions to save the image!");
        return;
      }

      // Capture the view as an image
      const uri = await viewShotRef.current.capture();

      // Save to media library
      const asset = await MediaLibrary.createAssetAsync(uri);
      await MediaLibrary.createAlbumAsync("AstroNum", asset, false);

      alert("Image saved to your gallery!");
    } catch (error) {
      console.error("Error saving image:", error);
      alert("Failed to save image. Please try again.");
    }
  };

  const handleShare = async () => {
    if (!compatibility || !viewShotRef.current) return;

    try {
      // Capture the view as an image
      const uri = await viewShotRef.current.capture();

      // Share the image
      const result = await Share.share({
        url: uri, // iOS
        message: `Check out our love compatibility! 💖\n\nOur match score: ${compatibility.percentage}%\n\nastronum.app`, // Android
        title: "Love Compatibility Results",
      });

      if (result.action === Share.sharedAction) {
        console.log("Shared successfully");
      }
    } catch (error) {
      console.error("Error sharing:", error);
      alert("Failed to share. Please try again.");
    }
  };

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
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => router.back()}
        >
          <ArrowLeft color="#FFFFFF" size={24} />
        </TouchableOpacity>

        <View style={styles.headerContent}>
          <View style={styles.titleContainer}>
            <Text style={styles.title}>{t("compatibility.title")}</Text>
          </View>
          <Text style={styles.subtitle}>{t("compatibility.subtitle")}</Text>
        </View>
      </LinearGradient>

      <Animated.ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <Animated.View entering={FadeInDown.duration(600).delay(300)}>
          <GlassmorphicCard style={styles.inputCard}>
            <Text style={styles.inputLabel}>
              {t("compatibility.partnerName")}
            </Text>
            <TextInput
              style={styles.input}
              value={partnerName}
              onChangeText={setPartnerName}
              placeholder={t("compatibility.namePlaceholder")}
            />

            <Text style={[styles.inputLabel, styles.marginTop]}>
              {t("compatibility.partnerDOB")}
            </Text>
            <DateInput
              value={partnerDOB ? partnerDOB.toLocaleDateString() : ""}
              onChange={setPartnerDOB}
              placeholder={t("compatibility.dobPlaceholder")}
            />

            <Button
              text={t("compatibility.calculate")}
              onPress={calculateCompatibility}
              style={styles.calculateButton}
              disabled={!partnerName.trim() || !partnerDOB}
            />
          </GlassmorphicCard>

          {showResults && compatibility && (
            <Animated.View entering={FadeInDown.duration(600)}>
              {/* Hidden view for capturing */}
              <ViewShot
                ref={viewShotRef}
                options={{
                  format: "jpg",
                  quality: 0.9,
                  width: 600,
                  height: 800,
                }}
                style={[styles.hiddenView]}
              >
                <ShareableResult
                  ref={resultRef}
                  percentage={compatibility.percentage}
                  description={compatibility.description}
                  strengths={compatibility.strengths}
                  person1Name="Your Name"
                  person2Name={partnerName}
                />
              </ViewShot>

              {/* Visible result card */}
              <GlassmorphicCard style={styles.resultsCard}>
                <View style={styles.heartContainer}>
                  <Heart
                    size={40}
                    color="#FF69B4"
                    fill="#FF69B4"
                    style={styles.heartIcon}
                  />
                  <View style={styles.percentageCircle}>
                    <Text style={styles.percentageText}>
                      {compatibility.percentage}%
                    </Text>
                    <Text style={styles.matchText}>
                      {t("compatibility.match")}
                    </Text>
                  </View>
                </View>

                <Text style={styles.description}>
                  {compatibility.description}
                </Text>

                <View style={styles.section}>
                  <Text style={styles.sectionTitle}>
                    {t("compatibility.strengths")}
                  </Text>
                  <View style={styles.strengthsList}>
                    {compatibility.strengths.map((strength, index) => (
                      <View key={index} style={styles.strengthItem}>
                        <Heart size={16} color="#FF69B4" fill="#FF69B4" />
                        <Text style={styles.strengthText}>{strength}</Text>
                      </View>
                    ))}
                  </View>
                </View>

                <View style={styles.actionButtons}>
                  <TouchableOpacity
                    style={[styles.actionButton, styles.downloadButton]}
                    onPress={handleDownload}
                  >
                    <Download size={20} color="#FFFFFF" />
                    <Text style={styles.actionButtonText}>Save</Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    style={[styles.actionButton, styles.shareButton]}
                    onPress={handleShare}
                  >
                    <Share2 size={20} color="#FFFFFF" />
                    <Text style={styles.actionButtonText}>
                      {t("compatibility.share")}
                    </Text>
                  </TouchableOpacity>
                </View>
              </GlassmorphicCard>
            </Animated.View>
          )}
        </Animated.View>
      </Animated.ScrollView>
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
  inputCard: {
    padding: 20,
    backgroundColor: theme.colors.error,
  },
  inputLabel: {
    fontFamily: "Poppins-Medium",
    fontSize: 16,
    color: theme.colors.secondary,
    marginBottom: 10,
  },
  input: {
    fontFamily: "Poppins-Regular",
    fontSize: 16,
    color: theme.colors.secondary,
    height: 50,
    backgroundColor: theme.colors.secondaryContainer,
    paddingHorizontal: 15,
    borderRadius: 10,
  },
  marginTop: {
    marginTop: 20,
  },
  calculateButton: {
    marginTop: 30,
  },
  hiddenView: {
    position: "absolute",
    width: 600,
    height: 800,
    opacity: 1,
    left: -9999,
  },
  resultsCard: {
    marginTop: 20,
    padding: 20,
  },
  heartContainer: {
    alignItems: "center",
    marginBottom: 20,
  },
  heartIcon: {
    marginBottom: 10,
  },
  percentageCircle: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: "rgba(255, 105, 180, 0.2)",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 2,
    borderColor: "#FF69B4",
  },
  percentageText: {
    fontFamily: "Poppins-Bold",
    fontSize: 32,
    color: "#FF69B4",
  },
  matchText: {
    fontFamily: "Poppins-Medium",
    fontSize: 14,
    color: "#FF69B4",
  },
  description: {
    fontFamily: "Poppins-Regular",
    fontSize: 16,
    color: theme.colors.secondary,
    lineHeight: 24,
    marginBottom: 20,
    textAlign: "center",
  },
  section: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontFamily: "Poppins-SemiBold",
    fontSize: 18,
    color: "#FF69B4",
    marginBottom: 10,
  },
  strengthsList: {
    marginTop: 10,
  },
  strengthItem: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
    backgroundColor: "rgba(255, 105, 180, 0.1)",
    padding: 12,
    borderRadius: 10,
  },
  strengthText: {
    fontFamily: "Poppins-Regular",
    fontSize: 14,
    color: theme.colors.secondary,
    marginLeft: 10,
    flex: 1,
  },
  actionButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 20,
  },
  actionButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 25,
    flex: 1,
    marginHorizontal: 5,
  },
  downloadButton: {
    backgroundColor: "#8A4FFF",
  },
  shareButton: {
    backgroundColor: "#FF69B4",
  },
  actionButtonText: {
    fontFamily: "Poppins-SemiBold",
    fontSize: 16,
    color: "#FFFFFF",
    marginLeft: 8,
  },
});
