/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/array-type */
import { CalendarDay } from "@/components/calendar/CalendarDay";
import { GlassmorphicCard } from "@/components/ui/GlassmorphicCard";
import { theme } from "@/constants/theme";

import { useTranslation } from "@/hooks/useTranslation";
import { calculateDayNumber } from "@/utils/numerologyCalculations";
import { LinearGradient } from "expo-linear-gradient";
import {
  Calendar as CalendarIcon,
  ChevronLeft,
  ChevronRight,
  Star,
} from "lucide-react-native";
import { useEffect, useState } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import Animated, { FadeInLeft, FadeInUp } from "react-native-reanimated";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function CalendarScreen() {
  const insets = useSafeAreaInsets();
  const { t } = useTranslation();
  const [currentDate, setCurrentDate] = useState(new Date());
  const [calendarDays, setCalendarDays] = useState<
    Array<{ date: Date; type: "good" | "bad" | "neutral" }>
  >([]);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  const weekdays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  useEffect(() => {
    generateCalendarDays(currentDate.getFullYear(), currentDate.getMonth());
  }, [currentDate]);

  const generateCalendarDays = (year: number, month: number) => {
    const firstDayOfMonth = new Date(year, month, 1);
    const lastDayOfMonth = new Date(year, month + 1, 0);
    const days: Array<{ date: Date; type: "good" | "bad" | "neutral" }> = [];

    // Add days from previous month to fill the first week
    const firstDayOfWeek = firstDayOfMonth.getDay();
    for (let i = firstDayOfWeek - 1; i >= 0; i--) {
      const day = new Date(year, month, -i);
      days.push({ date: day, type: getDayType(day) });
    }

    // Add days of current month
    for (let i = 1; i <= lastDayOfMonth.getDate(); i++) {
      const day = new Date(year, month, i);
      days.push({ date: day, type: getDayType(day) });
    }

    // Add days from next month to fill the last week
    const lastDayOfWeek = lastDayOfMonth.getDay();
    for (let i = 1; i < 7 - lastDayOfWeek; i++) {
      const day = new Date(year, month + 1, i);
      days.push({ date: day, type: getDayType(day) });
    }

    setCalendarDays(days);
  };

  // Placeholder function to determine day types
  const getDayType = (date: Date): "good" | "bad" | "neutral" => {
    // In a real app, this would use the user's personal numerology
    const dayNumber = calculateDayNumber(date);
    if ([1, 3, 5, 9].includes(dayNumber)) return "good";
    if ([4, 8].includes(dayNumber)) return "bad";
    return "neutral";
  };

  const goToPreviousMonth = () => {
    const newDate = new Date(currentDate);
    newDate.setMonth(newDate.getMonth() - 1);
    setCurrentDate(newDate);
  };

  const goToNextMonth = () => {
    const newDate = new Date(currentDate);
    newDate.setMonth(newDate.getMonth() + 1);
    setCurrentDate(newDate);
  };

  const getDayMessage = (type: "good" | "bad" | "neutral") => {
    switch (type) {
      case "good":
        return t("calendar.goodDayMessage");
      case "bad":
        return t("calendar.badDayMessage");
      default:
        return t("calendar.neutralDayMessage");
    }
  };

  return (
    <View style={[styles.container]}>
      <LinearGradient
        colors={[
          "rgba(138, 79, 255, 0.8)",
          "rgba(59, 71, 201, 0.5)",
          "rgba(245, 189, 65, 0.1)",
        ]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={[styles.headerGradient, { paddingTop: insets.top + 10 }]}
      >
        <View style={styles.headerContent}>
          <View style={styles.titleContainer}>
            <CalendarIcon color="#FFFFFF" size={24} />
            <Text style={styles.title}>{t("calendar.title")}</Text>
          </View>
          <Text style={styles.subtitle}>{t("calendar.subtitle")}</Text>
        </View>
      </LinearGradient>

      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
      >
        <Animated.View
          style={styles.calendarContainer}
          entering={FadeInUp.duration(800).delay(200)}
        >
          <View style={styles.monthSelector}>
            <TouchableOpacity onPress={goToPreviousMonth}>
              <ChevronLeft color={theme.colors.primary} size={24} />
            </TouchableOpacity>
            <Text style={[styles.monthTitle, { color: theme.colors.primary }]}>
              {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
            </Text>
            <TouchableOpacity onPress={goToNextMonth}>
              <ChevronRight color={theme.colors.primary} size={24} />
            </TouchableOpacity>
          </View>

          <View style={styles.weekdaysHeader}>
            {weekdays.map((weekday) => (
              <Text
                key={weekday}
                style={[styles.weekday, { color: theme.colors.secondary }]}
              >
                {weekday}
              </Text>
            ))}
          </View>

          <View style={styles.daysGrid}>
            {calendarDays.map((dayInfo, index) => (
              <CalendarDay
                key={`${dayInfo.date.getTime()}-${index}`}
                day={dayInfo.date}
                type={dayInfo.type}
                isSelected={selectedDate?.getTime() === dayInfo.date.getTime()}
                isCurrentMonth={
                  dayInfo.date.getMonth() === currentDate.getMonth()
                }
                onSelect={() => setSelectedDate(dayInfo.date)}
              />
            ))}
          </View>
        </Animated.View>

        {selectedDate && (
          <Animated.View entering={FadeInLeft.duration(600)}>
            <GlassmorphicCard style={styles.dayDetailCard}>
              <View style={styles.dayDetailHeader}>
                <Text style={styles.dayDetailDate}>
                  {selectedDate.getDate()} {monthNames[selectedDate.getMonth()]}{" "}
                  {selectedDate.getFullYear()}
                </Text>
                <View style={styles.dayTypeIndicator}>
                  <Star
                    size={16}
                    color="#FFFFFF"
                    fill={
                      calendarDays.find(
                        (d) => d.date.getTime() === selectedDate.getTime()
                      )?.type === "good"
                        ? "#FFFFFF"
                        : "transparent"
                    }
                  />
                </View>
              </View>
              <Text style={styles.dayDetailMessage}>
                {getDayMessage(
                  calendarDays.find(
                    (d) => d.date.getTime() === selectedDate.getTime()
                  )?.type || "neutral"
                )}
              </Text>
              <View style={styles.dayNumerologyInfo}>
                <View style={styles.numerologyItem}>
                  <Text style={styles.numerologyLabel}>
                    {t("calendar.dayNumber")}
                  </Text>
                  <Text style={styles.numerologyValue}>
                    {calculateDayNumber(selectedDate)}
                  </Text>
                </View>
                <View style={styles.numerologyItem}>
                  <Text style={styles.numerologyLabel}>
                    {t("calendar.universalDay")}
                  </Text>
                  <Text style={styles.numerologyValue}>
                    {calculateDayNumber(new Date())}
                  </Text>
                </View>
              </View>
            </GlassmorphicCard>
          </Animated.View>
        )}

        <View style={styles.premiumPromotionContainer}>
          <GlassmorphicCard style={styles.premiumPromoCard}>
            <View style={styles.premiumPromoContent}>
              <Text style={styles.premiumPromoTitle}>
                {t("premium.calendarTitle")}
              </Text>
              <Text style={styles.premiumPromoDescription}>
                {t("premium.calendarDescription")}
              </Text>
              <TouchableOpacity style={styles.premiumButton}>
                <Text style={styles.premiumButtonText}>
                  {t("premium.upgrade")}
                </Text>
              </TouchableOpacity>
            </View>
          </GlassmorphicCard>
        </View>
      </ScrollView>
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
  },
  scrollView: {
    flex: 1,
    marginTop: 20,
    paddingHorizontal: 20,
  },
  calendarContainer: {
    marginTop: 10,
    marginBottom: 20,
    padding: 15,
    borderRadius: 20,
    backgroundColor: theme.colors.onPrimary,
  },
  monthSelector: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 15,
    marginBottom: 15,
  },
  monthTitle: {
    fontFamily: "Poppins-SemiBold",
    fontSize: 16,
  },
  weekdaysHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  weekday: {
    fontFamily: "Poppins-Medium",
    fontSize: 14,
    width: 40,
    textAlign: "center",
  },
  daysGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  dayDetailCard: {
    padding: 20,
    marginBottom: 20,
  },
  dayDetailHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 15,
  },
  dayDetailDate: {
    fontFamily: "Poppins-SemiBold",
    fontSize: 16,
    color: "#FFFFFF",
  },
  dayTypeIndicator: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: "#F5BD41",
    justifyContent: "center",
    alignItems: "center",
  },
  dayDetailMessage: {
    fontFamily: "Poppins-Regular",
    fontSize: 14,
    color: theme.colors.primary,
    marginBottom: 15,
    lineHeight: 22,
  },
  dayNumerologyInfo: {
    flexDirection: "row",
    justifyContent: "space-between",
    // backgroundColor: "rgba(255, 255, 255, 0.1)",
    borderRadius: 15,
    padding: 15,
  },
  numerologyItem: {
    alignItems: "center",
  },
  numerologyLabel: {
    fontFamily: "Poppins-Regular",
    fontSize: 12,
    color: "rgba(255, 255, 255, 0.7)",
    marginBottom: 5,
  },
  numerologyValue: {
    fontFamily: "Poppins-Bold",
    fontSize: 20,
    color: "#FFFFFF",
  },
  premiumPromotionContainer: {
    marginBottom: 80,
  },
  premiumPromoCard: {
    padding: 0,
    overflow: "hidden",
  },
  premiumPromoContent: {
    padding: 20,
    alignItems: "center",
  },
  premiumPromoTitle: {
    fontFamily: "Poppins-Bold",
    fontSize: 18,
    color: theme.colors.primary,
    marginBottom: 10,
    textAlign: "center",
  },
  premiumPromoDescription: {
    fontFamily: "Poppins-Regular",
    fontSize: 14,
    color: theme.colors.secondary,
    marginBottom: 20,
    textAlign: "center",
    lineHeight: 20,
  },
  premiumButton: {
    backgroundColor: "#F5BD41",
    paddingHorizontal: 30,
    paddingVertical: 12,
    borderRadius: 30,
  },
  premiumButtonText: {
    fontFamily: "Poppins-SemiBold",
    fontSize: 14,
    color: "#1A1A1A",
  },
});
