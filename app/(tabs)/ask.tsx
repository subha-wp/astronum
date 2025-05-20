import { GlassmorphicCard } from "@/components/ui/GlassmorphicCard";
import { useTheme } from "@/contexts/ThemeContext";
import { useTranslation } from "@/hooks/useTranslation";
import { useUserStore } from "@/store/userStore";
import { mockAiResponse } from "@/utils/mockAiResponses";
import { LinearGradient } from "expo-linear-gradient";
import { AlertCircle, Send } from "lucide-react-native";
import { useEffect, useRef, useState } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import Animated, { FadeIn, SlideInUp } from "react-native-reanimated";
import { useSafeAreaInsets } from "react-native-safe-area-context";

interface Message {
  id: string;
  text: string;
  sender: "user" | "ai";
}

export default function AskAIScreen() {
  const { theme } = useTheme();
  const insets = useSafeAreaInsets();
  const { t } = useTranslation();
  const { user } = useUserStore();
  const [inputText, setInputText] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const scrollViewRef = useRef<ScrollView>(null);

  // Intro message from AI
  useEffect(() => {
    const initialMessage = {
      id: Date.now().toString(),
      text: t("aiGuru.welcomeMessage", {
        name: user?.name?.split(" ")[0] || t("greetings.user"),
      }),
      sender: "ai" as const,
    };
    setMessages([initialMessage]);
  }, [t, user]);

  const handleSend = async () => {
    if (!inputText.trim()) return;

    const userMessage = {
      id: Date.now().toString(),
      text: inputText,
      sender: "user" as const,
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputText("");
    setIsProcessing(true);

    // Scroll to bottom
    setTimeout(() => {
      scrollViewRef.current?.scrollToEnd({ animated: true });
    }, 100);

    // Mock AI response with delay
    setTimeout(() => {
      const aiResponse = {
        id: (Date.now() + 1).toString(),
        text: mockAiResponse(inputText, user),
        sender: "ai" as const,
      };
      setMessages((prev) => [...prev, aiResponse]);
      setIsProcessing(false);

      // Scroll to bottom again after response
      setTimeout(() => {
        scrollViewRef.current?.scrollToEnd({ animated: true });
      }, 100);
    }, 1500);
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
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
        <View style={styles.headerContent}>
          <Text style={styles.title}>{t("aiGuru.title")}</Text>
          <Text style={styles.subtitle}>{t("aiGuru.subtitle")}</Text>
        </View>
      </LinearGradient>

      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.keyboardAvoidView}
        keyboardVerticalOffset={Platform.OS === "ios" ? 90 : 0}
      >
        <ScrollView
          ref={scrollViewRef}
          style={styles.messagesContainer}
          contentContainerStyle={styles.messagesContent}
          showsVerticalScrollIndicator={false}
        >
          {messages.map((message, index) => (
            <Animated.View
              key={message.id}
              entering={FadeIn.duration(300)}
              style={[
                styles.messageWrapper,
                message.sender === "user"
                  ? styles.userMessageWrapper
                  : styles.aiMessageWrapper,
              ]}
            >
              {message.sender === "ai" ? (
                <GlassmorphicCard style={styles.aiMessage}>
                  <Text style={styles.messageText}>{message.text}</Text>
                </GlassmorphicCard>
              ) : (
                <View
                  style={[
                    styles.userMessage,
                    { backgroundColor: theme.primary },
                  ]}
                >
                  <Text style={styles.messageText}>{message.text}</Text>
                </View>
              )}
            </Animated.View>
          ))}

          {isProcessing && (
            <Animated.View
              entering={SlideInUp.duration(300)}
              style={styles.typingIndicatorWrapper}
            >
              <GlassmorphicCard style={styles.typingIndicator}>
                <Text style={styles.typingText}>{t("aiGuru.thinking")}</Text>
              </GlassmorphicCard>
            </Animated.View>
          )}
        </ScrollView>

        <View
          style={[
            styles.inputContainer,
            { backgroundColor: theme.backgroundSecondary },
          ]}
        >
          <TextInput
            style={[
              styles.input,
              { color: theme.text, backgroundColor: theme.backgroundTertiary },
            ]}
            placeholder={t("aiGuru.placeholder")}
            placeholderTextColor={theme.textSecondary}
            value={inputText}
            onChangeText={setInputText}
            multiline
          />
          <TouchableOpacity
            style={[
              styles.sendButton,
              {
                backgroundColor: inputText.trim()
                  ? theme.primary
                  : theme.backgroundTertiary,
              },
            ]}
            onPress={handleSend}
            disabled={!inputText.trim()}
          >
            <Send
              size={20}
              color={inputText.trim() ? "#FFFFFF" : theme.textSecondary}
            />
          </TouchableOpacity>
        </View>

        <View style={styles.premiumTagContainer}>
          <View style={styles.premiumTag}>
            <AlertCircle size={12} color="#ffffff" />
            <Text style={styles.premiumTagText}>{t("aiGuru.limitedFree")}</Text>
          </View>
        </View>
      </KeyboardAvoidingView>
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
  headerContent: {
    alignItems: "center",
    marginTop: 10,
  },
  title: {
    fontFamily: "Poppins-Bold",
    fontSize: 24,
    color: "#FFFFFF",
    textAlign: "center",
  },
  subtitle: {
    fontFamily: "Poppins-Regular",
    fontSize: 14,
    color: "rgba(255, 255, 255, 0.8)",
    textAlign: "center",
    marginTop: 5,
  },
  keyboardAvoidView: {
    flex: 1,
  },
  messagesContainer: {
    flex: 1,
    paddingHorizontal: 16,
  },
  messagesContent: {
    paddingTop: 20,
    paddingBottom: 10,
  },
  messageWrapper: {
    marginBottom: 16,
    maxWidth: "80%",
  },
  userMessageWrapper: {
    alignSelf: "flex-end",
  },
  aiMessageWrapper: {
    alignSelf: "flex-start",
  },
  userMessage: {
    padding: 12,
    borderRadius: 20,
    borderTopRightRadius: 4,
  },
  aiMessage: {
    borderTopLeftRadius: 4,
    padding: 12,
  },
  messageText: {
    fontFamily: "Poppins-Regular",
    fontSize: 14,
    color: "#FFFFFF",
  },
  typingIndicatorWrapper: {
    alignSelf: "flex-start",
    marginBottom: 16,
  },
  typingIndicator: {
    padding: 12,
    borderRadius: 20,
    borderTopLeftRadius: 4,
  },
  typingText: {
    fontFamily: "Poppins-Regular",
    fontSize: 14,
    color: "rgba(255, 255, 255, 0.8)",
  },
  inputContainer: {
    flexDirection: "row",
    paddingHorizontal: 16,
    paddingVertical: 12,
    alignItems: "flex-end",
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: "rgba(255, 255, 255, 0.1)",
  },
  input: {
    flex: 1,
    fontFamily: "Poppins-Regular",
    fontSize: 14,
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 20,
    maxHeight: 100,
  },
  sendButton: {
    marginLeft: 12,
    width: 44,
    height: 44,
    borderRadius: 22,
    justifyContent: "center",
    alignItems: "center",
  },
  premiumTagContainer: {
    alignItems: "center",
    marginBottom: 8,
  },
  premiumTag: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(245, 189, 65, 0.9)",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
  },
  premiumTagText: {
    marginLeft: 6,
    fontFamily: "Poppins-Regular",
    fontSize: 12,
    color: "#FFFFFF",
  },
});
