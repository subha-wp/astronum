import { BlurView } from "expo-blur";
import { X as CloseIcon } from "lucide-react-native";
import {
  Dimensions,
  Modal as RNModal,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import Animated, {
  FadeIn,
  FadeOut,
  SlideInUp,
  SlideOutDown,
} from "react-native-reanimated";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { GlassmorphicCard } from "./GlassmorphicCard";

interface ModalProps {
  visible: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
}

const { height } = Dimensions.get("window");

export const Modal = ({ visible, onClose, title, children }: ModalProps) => {
  const insets = useSafeAreaInsets();

  if (!visible) return null;

  return (
    <RNModal transparent animationType="none" visible={visible}>
      <Animated.View
        style={StyleSheet.absoluteFill}
        entering={FadeIn.duration(200)}
        exiting={FadeOut.duration(200)}
      >
        <BlurView intensity={30} style={StyleSheet.absoluteFill} tint="dark" />

        {/* Backdrop - only close when tapping outside the modal content */}
        <TouchableWithoutFeedback onPress={onClose}>
          <View style={styles.backdrop} />
        </TouchableWithoutFeedback>

        <Animated.View
          style={[styles.modalContainer, { paddingBottom: insets.bottom }]}
          entering={SlideInUp.springify().damping(15)}
          exiting={SlideOutDown.duration(200)}
        >
          {/* Stop propagation of touch events to prevent closing when interacting with content */}
          <TouchableWithoutFeedback>
            <GlassmorphicCard style={styles.contentContainer}>
              <View style={styles.header}>
                <Text style={styles.title}>{title}</Text>
                <TouchableOpacity onPress={onClose} style={styles.closeButton}>
                  <CloseIcon size={24} color="#FFFFFF" />
                </TouchableOpacity>
              </View>

              <View style={styles.content}>{children}</View>
            </GlassmorphicCard>
          </TouchableWithoutFeedback>
        </Animated.View>
      </Animated.View>
    </RNModal>
  );
};

const styles = StyleSheet.create({
  backdrop: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0, 0, 0, 0.4)",
  },
  modalContainer: {
    flex: 1,
    justifyContent: "flex-end",
    paddingHorizontal: 16,
  },
  contentContainer: {
    maxHeight: height * 0.8,
    padding: 0,
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
    overflow: "visible", // Allow content to overflow for proper touch handling
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: "rgba(255, 255, 255, 0.15)",
  },
  title: {
    fontFamily: "Poppins-SemiBold",
    fontSize: 18,
    color: "#FFFFFF",
  },
  closeButton: {
    padding: 4,
  },
  content: {
    padding: 20,
    overflow: "visible", // Allow content to overflow for proper touch handling
  },
});
