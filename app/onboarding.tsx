//@ts-nocheck
import { Button } from "@/components/ui/Button";
import { DateInput } from "@/components/ui/DateInput";
import { GlassmorphicCard } from "@/components/ui/GlassmorphicCard";
import { Modal } from "@/components/ui/Modal";
import { useLanguage } from "@/contexts/LanguageContext";
import { useTranslation } from "@/hooks/useTranslation";
import { useUserStore } from "@/store/userStore";
import { LinearGradient } from "expo-linear-gradient";
import { router } from "expo-router";
import LottieView from "lottie-react-native";
import { useRef, useState } from "react";
import {
  Dimensions,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import Animated, {
  FadeIn,
  FadeOut,
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const { width } = Dimensions.get("window");

const OnboardingStep = ({
  title,
  subtitle,
  children,
  isActive,
}: {
  title: string;
  subtitle: string;
  children: React.ReactNode;
  isActive: boolean;
}) => {
  const animatedOpacity = useSharedValue(isActive ? 1 : 0);

  useAnimatedStyle(() => {
    animatedOpacity.value = withTiming(isActive ? 1 : 0, { duration: 300 });
    return {
      opacity: animatedOpacity.value,
      transform: [
        {
          translateX: interpolate(
            animatedOpacity.value,
            [0, 1],
            [width * 0.2, 0]
          ),
        },
      ],
    };
  });

  if (!isActive) return null;

  return (
    <Animated.View
      entering={FadeIn.duration(500)}
      exiting={FadeOut.duration(300)}
      style={styles.stepContainer}
    >
      <Text style={styles.stepTitle}>{title}</Text>
      <Text style={styles.stepSubtitle}>{subtitle}</Text>
      <View style={styles.stepContent}>{children}</View>
    </Animated.View>
  );
};

export default function OnboardingScreen() {
  const insets = useSafeAreaInsets();
  const { t } = useTranslation();
  const { language, setLanguage } = useLanguage();
  const { login } = useUserStore();

  const [currentStep, setCurrentStep] = useState(0);
  const [name, setName] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState<Date | null>(null);
  const [gender, setGender] = useState<"male" | "female" | "other" | null>(
    null
  );
  const [interests, setInterests] = useState<string[]>([]);

  const lottieRef = useRef<LottieView>(null);

  const languageOptions = [
    { code: "en", name: "English" },
    { code: "hi", name: "हिंदी (Hindi)" },
    { code: "bn", name: "বাংলা (Bengali)" },
    { code: "ta", name: "தமிழ் (Tamil)" },
    { code: "mr", name: "मराठी (Marathi)" },
  ];

  const interestOptions = [
    "career",
    "love",
    "business",
    "spirituality",
    "health",
    "family",
  ];

  const canContinue = () => {
    switch (currentStep) {
      case 0: // Language
        return true;
      case 1: // Name
        return name.trim().length > 0;
      case 2: // Date of Birth
        return dateOfBirth !== null;
      case 3: // Gender
        return gender !== null;
      case 4: // Interests
        return interests.length > 0;
      default:
        return false;
    }
  };

  const handleNext = () => {
    if (currentStep < 4) {
      setCurrentStep(currentStep + 1);
    } else {
      // Complete onboarding
      login({
        name,
        dateOfBirth: dateOfBirth?.toISOString(),
        gender,
        interests,
      });

      // Play animation then redirect
      lottieRef.current?.play();
      setTimeout(() => {
        router.replace("/(tabs)");
      }, 2000);
    }
  };

  const toggleInterest = (interest: string) => {
    if (interests.includes(interest)) {
      setInterests(interests.filter((i) => i !== interest));
    } else {
      setInterests([...interests, interest]);
    }
  };

  const formatDate = (date: Date | null) => {
    if (!date) return t("onboarding.selectDate");
    return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
  };

  return (
    <View style={[styles.container, { backgroundColor: "#121212" }]}>
      <LinearGradient
        colors={[
          "rgba(59, 71, 201, 0.8)",
          "rgba(138, 79, 255, 0.8)",
          "rgba(245, 189, 65, 0.2)",
        ]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={[styles.headerGradient, { paddingTop: insets.top }]}
      >
        <View style={styles.logoContainer}>
          <Text style={styles.logo}>AstroNum</Text>
        </View>
      </LinearGradient>

      <ScrollView
        style={styles.contentContainer}
        contentContainerStyle={styles.contentScroll}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.stepsContainer}>
          <OnboardingStep
            title={t("onboarding.languageTitle")}
            subtitle={t("onboarding.languageSubtitle")}
            isActive={currentStep === 0}
          >
            {languageOptions.map((option) => (
              <TouchableOpacity
                key={option.code}
                style={[
                  styles.languageOption,
                  language === option.code && styles.selectedLanguageOption,
                ]}
                onPress={() => setLanguage(option.code)}
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
          </OnboardingStep>

          <OnboardingStep
            title={t("onboarding.nameTitle")}
            subtitle={t("onboarding.nameSubtitle")}
            isActive={currentStep === 1}
          >
            <GlassmorphicCard style={styles.inputCard}>
              <TextInput
                style={styles.input}
                placeholder={t("onboarding.namePlaceholder")}
                placeholderTextColor="rgba(255, 255, 255, 0.6)"
                value={name}
                onChangeText={setName}
              />
            </GlassmorphicCard>
          </OnboardingStep>

          <OnboardingStep
            title={t("onboarding.dobTitle")}
            subtitle={t("onboarding.dobSubtitle")}
            isActive={currentStep === 2}
          >
            <DateInput
              value={dateOfBirth ? formatDate(dateOfBirth) : ""}
              onChange={(date) => {
                setDateOfBirth(date);
                console.log("Date selected:", date);
              }}
              placeholder={t("onboarding.selectDate")}
            />
          </OnboardingStep>

          <OnboardingStep
            title={t("onboarding.genderTitle")}
            subtitle={t("onboarding.genderSubtitle")}
            isActive={currentStep === 3}
          >
            <View style={styles.genderOptions}>
              {(["male", "female", "other"] as const).map((option) => (
                <TouchableOpacity
                  key={option}
                  style={[
                    styles.genderOption,
                    gender === option && styles.selectedGenderOption,
                  ]}
                  onPress={() => setGender(option)}
                >
                  <Text
                    style={[
                      styles.genderOptionText,
                      gender === option && styles.selectedGenderText,
                    ]}
                  >
                    {t(`onboarding.gender.${option}`)}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </OnboardingStep>

          <OnboardingStep
            title={t("onboarding.interestsTitle")}
            subtitle={t("onboarding.interestsSubtitle")}
            isActive={currentStep === 4}
          >
            <View style={styles.interestsContainer}>
              {interestOptions.map((interest) => (
                <TouchableOpacity
                  key={interest}
                  style={[
                    styles.interestOption,
                    interests.includes(interest) &&
                      styles.selectedInterestOption,
                  ]}
                  onPress={() => toggleInterest(interest)}
                >
                  <Text
                    style={[
                      styles.interestOptionText,
                      interests.includes(interest) &&
                        styles.selectedInterestText,
                    ]}
                  >
                    {t(`interests.${interest}`)}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </OnboardingStep>
        </View>
      </ScrollView>

      <View style={[styles.footer, { paddingBottom: insets.bottom + 16 }]}>
        <View style={styles.progressIndicator}>
          {[0, 1, 2, 3, 4].map((step) => (
            <View
              key={step}
              style={[
                styles.progressDot,
                step === currentStep ? styles.activeProgressDot : null,
              ]}
            />
          ))}
        </View>

        {currentStep > 0 && (
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => setCurrentStep(currentStep - 1)}
          >
            <Text style={styles.backButtonText}>{t("common.back")}</Text>
          </TouchableOpacity>
        )}

        <Button
          text={currentStep === 4 ? t("common.finish") : t("common.next")}
          disabled={!canContinue()}
          style={styles.nextButton}
          onPress={handleNext}
        />
      </View>

      <Modal visible={currentStep === 5} onClose={() => {}}>
        <View style={styles.completionContainer}>
          <LottieView
            ref={lottieRef}
            source={require("@/assets/animations/success.json")}
            style={styles.completionAnimation}
            autoPlay={false}
            loop={false}
          />
          <Text style={styles.completionText}>{t("onboarding.complete")}</Text>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  headerGradient: {
    height: 120,
    justifyContent: "center",
    alignItems: "center",
  },
  logoContainer: {
    alignItems: "center",
  },
  logo: {
    fontFamily: "Poppins-Bold",
    fontSize: 32,
    color: "#FFFFFF",
  },
  contentContainer: {
    flex: 1,
    marginTop: -20,
  },
  contentScroll: {
    paddingHorizontal: 20,
    paddingTop: 30,
    paddingBottom: 100,
  },
  stepsContainer: {
    flex: 1,
    minHeight: 400,
  },
  stepContainer: {
    flex: 1,
  },
  stepTitle: {
    fontFamily: "Poppins-Bold",
    fontSize: 24,
    color: "#FFFFFF",
    marginBottom: 10,
  },
  stepSubtitle: {
    fontFamily: "Poppins-Regular",
    fontSize: 16,
    color: "rgba(255, 255, 255, 0.8)",
    marginBottom: 30,
    lineHeight: 24,
  },
  stepContent: {
    flex: 1,
  },
  languageOption: {
    paddingVertical: 15,
    paddingHorizontal: 20,
    marginBottom: 12,
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    borderRadius: 15,
  },
  selectedLanguageOption: {
    backgroundColor: "rgba(245, 189, 65, 0.3)",
    borderWidth: 1,
    borderColor: "#F5BD41",
  },
  languageOptionText: {
    fontFamily: "Poppins-Medium",
    fontSize: 16,
    color: "rgba(255, 255, 255, 0.9)",
  },
  selectedLanguageText: {
    color: "#FFFFFF",
  },
  inputCard: {
    padding: 5,
  },
  input: {
    fontFamily: "Poppins-Regular",
    fontSize: 16,
    color: "#FFFFFF",
    height: 50,
    paddingHorizontal: 15,
  },
  dateButton: {
    alignSelf: "stretch",
  },
  dateButtonInner: {
    padding: 15,
    alignItems: "center",
  },
  dateButtonText: {
    fontFamily: "Poppins-Medium",
    fontSize: 16,
    color: "#FFFFFF",
  },
  genderOptions: {
    marginTop: 10,
  },
  genderOption: {
    paddingVertical: 15,
    paddingHorizontal: 20,
    marginBottom: 12,
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    borderRadius: 15,
    alignItems: "center",
  },
  selectedGenderOption: {
    backgroundColor: "rgba(138, 79, 255, 0.3)",
    borderWidth: 1,
    borderColor: "#8A4FFF",
  },
  genderOptionText: {
    fontFamily: "Poppins-Medium",
    fontSize: 16,
    color: "rgba(255, 255, 255, 0.9)",
  },
  selectedGenderText: {
    color: "#FFFFFF",
  },
  interestsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    marginTop: 10,
  },
  interestOption: {
    width: "48%",
    paddingVertical: 15,
    paddingHorizontal: 10,
    marginBottom: 15,
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    borderRadius: 15,
    alignItems: "center",
  },
  selectedInterestOption: {
    backgroundColor: "rgba(59, 71, 201, 0.3)",
    borderWidth: 1,
    borderColor: "#3B47C9",
  },
  interestOptionText: {
    fontFamily: "Poppins-Medium",
    fontSize: 14,
    color: "rgba(255, 255, 255, 0.9)",
    textAlign: "center",
  },
  selectedInterestText: {
    color: "#FFFFFF",
  },
  footer: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    paddingHorizontal: 20,
    paddingTop: 16,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.3)",
    borderTopWidth: StyleSheet.hairlineWidth,
    borderColor: "rgba(255, 255, 255, 0.1)",
  },
  progressIndicator: {
    position: "absolute",
    top: -25,
    left: 0,
    right: 0,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 10,
  },
  progressDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "rgba(255, 255, 255, 0.3)",
    marginHorizontal: 5,
  },
  activeProgressDot: {
    backgroundColor: "#FFFFFF",
    width: 10,
    height: 10,
    borderRadius: 5,
  },
  backButton: {
    padding: 10,
  },
  backButtonText: {
    fontFamily: "Poppins-Medium",
    fontSize: 16,
    color: "#FFFFFF",
  },
  nextButton: {
    width: 120,
  },
  completionContainer: {
    alignItems: "center",
    paddingVertical: 20,
  },
  completionAnimation: {
    width: 200,
    height: 200,
  },
  completionText: {
    fontFamily: "Poppins-Bold",
    fontSize: 20,
    color: "#FFFFFF",
    marginTop: 10,
  },
});
