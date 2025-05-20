import { useTheme } from "@/contexts/ThemeContext";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Animated, {
  useAnimatedStyle,
  withTiming,
} from "react-native-reanimated";

interface CalendarDayProps {
  day: Date;
  type: "good" | "bad" | "neutral";
  isSelected: boolean;
  isCurrentMonth: boolean;
  onSelect: () => void;
}

export const CalendarDay = ({
  day,
  type,
  isSelected,
  isCurrentMonth,
  onSelect,
}: CalendarDayProps) => {
  const { theme } = useTheme();

  const isToday =
    new Date().getDate() === day.getDate() &&
    new Date().getMonth() === day.getMonth() &&
    new Date().getFullYear() === day.getFullYear();

  const animatedStyle = useAnimatedStyle(() => {
    let backgroundColor;

    if (isSelected) {
      backgroundColor = withTiming(theme.primary, { duration: 200 });
    } else if (type === "good") {
      backgroundColor = withTiming("rgba(52, 211, 153, 0.3)", {
        duration: 200,
      });
    } else if (type === "bad") {
      backgroundColor = withTiming("rgba(255, 87, 87, 0.3)", { duration: 200 });
    } else {
      backgroundColor = withTiming("rgba(255, 255, 255, 0.1)", {
        duration: 200,
      });
    }

    return {
      backgroundColor,
    };
  });

  return (
    <TouchableOpacity
      activeOpacity={0.7}
      onPress={onSelect}
      style={styles.container}
    >
      <Animated.View
        style={[styles.dayContainer, animatedStyle, isToday && styles.today]}
      >
        <Text style={[styles.dayText, !isCurrentMonth && styles.otherMonthDay]}>
          {day.getDate()}
        </Text>

        {(type === "good" || type === "bad") && (
          <View
            style={[
              styles.indicator,
              type === "good" ? styles.goodIndicator : styles.badIndicator,
            ]}
          />
        )}
      </Animated.View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    width: 40,
    height: 40,
    marginBottom: 8,
  },
  dayContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 20,
    position: "relative",
  },
  dayText: {
    fontFamily: "Poppins-Medium",
    fontSize: 14,
    color: "#FFFFFF",
  },
  otherMonthDay: {
    opacity: 0.5,
  },
  today: {
    borderWidth: 2,
    borderColor: "#F5BD41",
  },
  indicator: {
    width: 4,
    height: 4,
    borderRadius: 2,
    position: "absolute",
    bottom: 6,
  },
  goodIndicator: {
    backgroundColor: "#34D399",
  },
  badIndicator: {
    backgroundColor: "#FF5757",
  },
});
