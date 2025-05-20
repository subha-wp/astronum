//@ts-nocheck
import { Button } from "@/components/ui/Button";
import { GlassmorphicCard } from "@/components/ui/GlassmorphicCard";
import { useTranslation } from "@/hooks/useTranslation";
import { useUserStore } from "@/store/userStore";
import { LinearGradient } from "expo-linear-gradient";
import { Link, router } from "expo-router";
import { ArrowLeft, Eye, EyeOff, Lock, Mail, User } from "lucide-react-native";
import { useState } from "react";
import {
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import Animated, { FadeInDown } from "react-native-reanimated";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function RegisterScreen() {
  const insets = useSafeAreaInsets();
  const { t } = useTranslation();
  const { login } = useUserStore();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");

  const handleRegister = () => {
    if (
      !name.trim() ||
      !email.trim() ||
      !password.trim() ||
      !confirmPassword.trim()
    ) {
      setError(t("auth.allFieldsRequired"));
      return;
    }

    if (password !== confirmPassword) {
      setError(t("auth.passwordsDontMatch"));
      return;
    }

    // Mock registration - in a real app, this would create an account
    login({
      name,
      email,
      // We'd store auth tokens, not passwords
    });

    router.replace("/onboarding");
  };

  const handleGoogleRegister = () => {
    // In a real app, this would integrate with Google Auth
    login({
      name: "Google User",
      email: "google@example.com",
    });

    router.replace("/onboarding");
  };

  return (
    <View style={[styles.container]}>
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
          <Text style={styles.title}>{t("auth.signup")}</Text>
          <Text style={styles.subtitle}>{t("auth.signupSubtitle")}</Text>
        </View>
      </LinearGradient>

      <View style={styles.formContainer}>
        <Animated.View entering={FadeInDown.duration(600).delay(300)}>
          {error ? (
            <View style={styles.errorContainer}>
              <Text style={styles.errorText}>{error}</Text>
            </View>
          ) : null}

          <GlassmorphicCard style={styles.inputCard}>
            <View style={styles.inputRow}>
              <User size={20} color="rgba(255, 255, 255, 0.7)" />
              <TextInput
                style={styles.input}
                placeholder={t("auth.fullNamePlaceholder")}
                placeholderTextColor="rgba(255, 255, 255, 0.6)"
                value={name}
                onChangeText={setName}
              />
            </View>
          </GlassmorphicCard>

          <GlassmorphicCard style={[styles.inputCard, styles.marginTop]}>
            <View style={styles.inputRow}>
              <Mail size={20} color="rgba(255, 255, 255, 0.7)" />
              <TextInput
                style={styles.input}
                placeholder={t("auth.emailPlaceholder")}
                placeholderTextColor="rgba(255, 255, 255, 0.6)"
                keyboardType="email-address"
                value={email}
                onChangeText={setEmail}
                autoCapitalize="none"
              />
            </View>
          </GlassmorphicCard>

          <GlassmorphicCard style={[styles.inputCard, styles.marginTop]}>
            <View style={styles.inputRow}>
              <Lock size={20} color="rgba(255, 255, 255, 0.7)" />
              <TextInput
                style={styles.input}
                placeholder={t("auth.passwordPlaceholder")}
                placeholderTextColor="rgba(255, 255, 255, 0.6)"
                secureTextEntry={!showPassword}
                value={password}
                onChangeText={setPassword}
              />
              <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
                {showPassword ? (
                  <EyeOff size={20} color="rgba(255, 255, 255, 0.7)" />
                ) : (
                  <Eye size={20} color="rgba(255, 255, 255, 0.7)" />
                )}
              </TouchableOpacity>
            </View>
          </GlassmorphicCard>

          <GlassmorphicCard style={[styles.inputCard, styles.marginTop]}>
            <View style={styles.inputRow}>
              <Lock size={20} color="rgba(255, 255, 255, 0.7)" />
              <TextInput
                style={styles.input}
                placeholder={t("auth.confirmPasswordPlaceholder")}
                placeholderTextColor="rgba(255, 255, 255, 0.6)"
                secureTextEntry={!showPassword}
                value={confirmPassword}
                onChangeText={setConfirmPassword}
              />
            </View>
          </GlassmorphicCard>

          <Text style={styles.termsText}>
            {t("auth.termsText")}{" "}
            <Text style={styles.termsLink}>{t("auth.termsLink")}</Text>
          </Text>

          <Button
            text={t("auth.createAccount")}
            onPress={handleRegister}
            style={styles.registerButton}
          />

          <View style={styles.dividerContainer}>
            <View style={styles.divider} />
            <Text style={styles.dividerText}>{t("auth.orSignupWith")}</Text>
            <View style={styles.divider} />
          </View>

          <TouchableOpacity
            style={styles.socialButton}
            onPress={handleGoogleRegister}
          >
            <GlassmorphicCard style={styles.socialButtonInner}>
              <Image
                source={{
                  uri: "https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg",
                }}
                style={styles.socialIcon}
                resizeMode="contain"
              />
              <Text style={styles.socialButtonText}>
                {t("auth.continueWithGoogle")}
              </Text>
            </GlassmorphicCard>
          </TouchableOpacity>
        </Animated.View>
      </View>

      <View style={[styles.footer, { paddingBottom: insets.bottom + 16 }]}>
        <Text style={styles.footerText}>{t("auth.alreadyHaveAccount")} </Text>
        <Link href="/auth/login" asChild>
          <TouchableOpacity>
            <Text style={styles.loginText}>{t("auth.login")}</Text>
          </TouchableOpacity>
        </Link>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  headerGradient: {
    paddingHorizontal: 20,
    paddingBottom: 40,
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
    marginTop: 20,
  },
  title: {
    fontFamily: "Poppins-Bold",
    fontSize: 28,
    color: "#FFFFFF",
    marginBottom: 10,
  },
  subtitle: {
    fontFamily: "Poppins-Regular",
    fontSize: 16,
    color: "rgba(255, 255, 255, 0.8)",
    lineHeight: 24,
  },
  formContainer: {
    flex: 1,
    padding: 20,
    marginTop: 20,
  },
  errorContainer: {
    padding: 12,
    backgroundColor: "rgba(255, 87, 87, 0.2)",
    borderRadius: 12,
    marginBottom: 16,
  },
  errorText: {
    fontFamily: "Poppins-Medium",
    fontSize: 14,
    color: "#FF5757",
  },
  inputCard: {
    padding: 5,
  },
  marginTop: {
    marginTop: 16,
  },
  inputRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 15,
  },
  input: {
    flex: 1,
    fontFamily: "Poppins-Regular",
    fontSize: 16,
    color: "#FFFFFF",
    height: 50,
    paddingHorizontal: 15,
  },
  termsText: {
    fontFamily: "Poppins-Regular",
    fontSize: 14,
    color: "rgba(255, 255, 255, 0.7)",
    textAlign: "center",
    marginTop: 20,
    marginBottom: 30,
    lineHeight: 20,
  },
  termsLink: {
    fontFamily: "Poppins-SemiBold",
    color: "#F5BD41",
  },
  registerButton: {
    marginBottom: 30,
  },
  dividerContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  divider: {
    flex: 1,
    height: StyleSheet.hairlineWidth,
    backgroundColor: "rgba(255, 255, 255, 0.3)",
  },
  dividerText: {
    fontFamily: "Poppins-Regular",
    fontSize: 14,
    color: "rgba(255, 255, 255, 0.6)",
    marginHorizontal: 10,
  },
  socialButton: {
    marginBottom: 10,
  },
  socialButtonInner: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 12,
  },
  socialIcon: {
    width: 24,
    height: 24,
    marginRight: 10,
  },
  socialButtonText: {
    fontFamily: "Poppins-Medium",
    fontSize: 16,
    color: "#FFFFFF",
  },
  footer: {
    flexDirection: "row",
    justifyContent: "center",
    padding: 20,
  },
  footerText: {
    fontFamily: "Poppins-Regular",
    fontSize: 14,
    color: "rgba(255, 255, 255, 0.7)",
  },
  loginText: {
    fontFamily: "Poppins-SemiBold",
    fontSize: 14,
    color: "#F5BD41",
  },
});
