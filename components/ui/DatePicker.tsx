"use client";

/* eslint-disable react-hooks/exhaustive-deps */
import { useTranslation } from "@/hooks/useTranslation";
import { useEffect, useRef, useState } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  type GestureResponderEvent,
} from "react-native";
import Animated, { FadeIn } from "react-native-reanimated";
import { Button } from "./Button";

interface DatePickerProps {
  value: Date;
  onChange: (date: Date) => void;
  minYear?: number;
  maxYear?: number;
  onClose?: () => void;
}

export const DatePicker = ({
  value,
  onChange,
  minYear = 1930,
  maxYear = new Date().getFullYear(),
  onClose,
}: DatePickerProps) => {
  const { t } = useTranslation();
  const [selectedDay, setSelectedDay] = useState(value.getDate());
  const [selectedMonth, setSelectedMonth] = useState(value.getMonth());
  const [selectedYear, setSelectedYear] = useState(value.getFullYear());

  const dayRef = useRef<ScrollView>(null);
  const monthRef = useRef<ScrollView>(null);
  const yearRef = useRef<ScrollView>(null);

  const days = [...Array(31)].map((_, i) => i + 1);
  const months = [...Array(12)].map((_, i) => i);
  const years = [...Array(maxYear - minYear + 1)].map((_, i) => maxYear - i);

  // Get the last day of the current month
  const getLastDayOfMonth = (year: number, month: number) => {
    return new Date(year, month + 1, 0).getDate();
  };

  // Scroll to initial positions
  useEffect(() => {
    const initialScrollTimeout = setTimeout(() => {
      dayRef.current?.scrollTo({ y: (selectedDay - 3) * 50, animated: false });
      monthRef.current?.scrollTo({
        y: (selectedMonth - 1) * 50,
        animated: false,
      });
      const yearIndex = years.findIndex((year) => year === selectedYear);
      yearRef.current?.scrollTo({ y: (yearIndex - 2) * 50, animated: false });
    }, 100);

    return () => clearTimeout(initialScrollTimeout);
  }, []);

  // Prevent touch events from propagating to parent components
  const handleTouchStart = (e: GestureResponderEvent) => {
    e.stopPropagation();
  };

  const handleDayScroll = (offsetY: number) => {
    const index = Math.round(offsetY / 50);
    if (index >= 0 && index < days.length) {
      setSelectedDay(days[index]);
    }
  };

  const handleMonthScroll = (offsetY: number) => {
    const index = Math.round(offsetY / 50);
    if (index >= 0 && index < months.length) {
      const newMonth = months[index];
      setSelectedMonth(newMonth);

      // Adjust day if necessary
      const lastDay = getLastDayOfMonth(selectedYear, newMonth);
      if (selectedDay > lastDay) {
        setSelectedDay(lastDay);
        dayRef.current?.scrollTo({ y: (lastDay - 3) * 50, animated: true });
      }
    }
  };

  const handleYearScroll = (offsetY: number) => {
    const index = Math.round(offsetY / 50);
    if (index >= 0 && index < years.length) {
      const newYear = years[index];
      setSelectedYear(newYear);

      // Adjust day if necessary (for February in leap years)
      const lastDay = getLastDayOfMonth(newYear, selectedMonth);
      if (selectedDay > lastDay) {
        setSelectedDay(lastDay);
        dayRef.current?.scrollTo({ y: (lastDay - 3) * 50, animated: true });
      }
    }
  };

  const handleConfirm = () => {
    // Create a new date with the selected values
    const newDate = new Date(selectedYear, selectedMonth, selectedDay);
    onChange(newDate);
    if (onClose) onClose();
  };

  const renderPickerItem = (
    value: number,
    isSelected: boolean,
    label?: string
  ) => (
    <View style={[styles.pickerItem, isSelected && styles.selectedItem]}>
      <Text
        style={[styles.pickerItemText, isSelected && styles.selectedItemText]}
      >
        {label || value}
      </Text>
    </View>
  );

  const monthNames = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  return (
    <Animated.View entering={FadeIn.duration(300)}>
      <View style={styles.container} onTouchStart={handleTouchStart}>
        <View style={styles.pickerContainer}>
          <View style={styles.pickerColumn}>
            <Text style={styles.pickerLabel}>{t("datePicker.day")}</Text>
            <View style={styles.pickerWrapper}>
              <ScrollView
                ref={dayRef}
                style={styles.picker}
                showsVerticalScrollIndicator={false}
                snapToInterval={50}
                decelerationRate="fast"
                scrollEventThrottle={16}
                onScroll={(e) => {
                  handleDayScroll(e.nativeEvent.contentOffset.y);
                }}
                onTouchStart={(e) => {
                  e.stopPropagation();
                }}
              >
                <View style={styles.pickerPadding} />
                {days.map((day) => (
                  <TouchableOpacity
                    key={`day-${day}`}
                    onPress={() => {
                      setSelectedDay(day);
                      dayRef.current?.scrollTo({
                        y: (day - 3) * 50,
                        animated: true,
                      });
                    }}
                  >
                    {renderPickerItem(day, day === selectedDay)}
                  </TouchableOpacity>
                ))}
                <View style={styles.pickerPadding} />
              </ScrollView>
            </View>
          </View>

          <View style={styles.pickerColumn}>
            <Text style={styles.pickerLabel}>{t("datePicker.month")}</Text>
            <View style={styles.pickerWrapper}>
              <ScrollView
                ref={monthRef}
                style={styles.picker}
                showsVerticalScrollIndicator={false}
                snapToInterval={50}
                decelerationRate="fast"
                scrollEventThrottle={16}
                onScroll={(e) => {
                  handleMonthScroll(e.nativeEvent.contentOffset.y);
                }}
                onTouchStart={(e) => {
                  e.stopPropagation();
                }}
              >
                <View style={styles.pickerPadding} />
                {months.map((month) => (
                  <TouchableOpacity
                    key={`month-${month}`}
                    onPress={() => {
                      setSelectedMonth(month);
                      monthRef.current?.scrollTo({
                        y: (month - 1) * 50,
                        animated: true,
                      });

                      // Adjust day if necessary
                      const lastDay = getLastDayOfMonth(selectedYear, month);
                      if (selectedDay > lastDay) {
                        setSelectedDay(lastDay);
                        dayRef.current?.scrollTo({
                          y: (lastDay - 3) * 50,
                          animated: true,
                        });
                      }
                    }}
                  >
                    {renderPickerItem(
                      month + 1,
                      month === selectedMonth,
                      monthNames[month]
                    )}
                  </TouchableOpacity>
                ))}
                <View style={styles.pickerPadding} />
              </ScrollView>
            </View>
          </View>

          <View style={styles.pickerColumn}>
            <Text style={styles.pickerLabel}>{t("datePicker.year")}</Text>
            <View style={styles.pickerWrapper}>
              <ScrollView
                ref={yearRef}
                style={styles.picker}
                showsVerticalScrollIndicator={false}
                snapToInterval={50}
                decelerationRate="fast"
                scrollEventThrottle={16}
                onScroll={(e) => {
                  handleYearScroll(e.nativeEvent.contentOffset.y);
                }}
                onTouchStart={(e) => {
                  e.stopPropagation();
                }}
              >
                <View style={styles.pickerPadding} />
                {years.map((year) => (
                  <TouchableOpacity
                    key={`year-${year}`}
                    onPress={() => {
                      setSelectedYear(year);
                      const yearIndex = years.findIndex((y) => y === year);
                      yearRef.current?.scrollTo({
                        y: (yearIndex - 2) * 50,
                        animated: true,
                      });

                      // Adjust day if necessary (for February in leap years)
                      const lastDay = getLastDayOfMonth(year, selectedMonth);
                      if (selectedDay > lastDay) {
                        setSelectedDay(lastDay);
                        dayRef.current?.scrollTo({
                          y: (lastDay - 3) * 50,
                          animated: true,
                        });
                      }
                    }}
                  >
                    {renderPickerItem(year, year === selectedYear)}
                  </TouchableOpacity>
                ))}
                <View style={styles.pickerPadding} />
              </ScrollView>
            </View>
          </View>
        </View>

        <View pointerEvents="none" style={styles.selectionIndicator} />

        <View style={styles.buttonContainer}>
          <Button
            text={t("common.confirm")}
            onPress={handleConfirm}
            style={styles.button}
          />
        </View>
      </View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    alignItems: "center",
    zIndex: 40,
  },
  pickerContainer: {
    flexDirection: "row",
    width: "100%",
    height: 250,
    marginBottom: 30,
  },
  pickerColumn: {
    flex: 1,
    alignItems: "center",
  },
  pickerLabel: {
    fontFamily: "Poppins-Medium",
    fontSize: 14,
    color: "rgba(255, 255, 255, 0.7)",
    marginBottom: 15,
  },
  pickerWrapper: {
    height: 200,
    width: "100%",
  },
  picker: {
    width: "100%",
    height: 200,
  },
  pickerPadding: {
    height: 100,
  },
  pickerItem: {
    height: 50,
    justifyContent: "center",
    alignItems: "center",
  },
  selectedItem: {
    backgroundColor: "rgba(59, 71, 201, 0.3)",
    borderRadius: 8,
  },
  pickerItemText: {
    fontFamily: "Poppins-Regular",
    fontSize: 18,
    color: "rgba(255, 255, 255, 0.7)",
  },
  selectedItemText: {
    fontFamily: "Poppins-SemiBold",
    color: "#FFFFFF",
  },
  selectionIndicator: {
    position: "absolute",
    top: "50%",
    left: 0,
    right: 0,
    height: 50,
    marginTop: 25, // Adjusted to center in the picker area
    borderRadius: 8,
    borderWidth: 2,
    borderColor: "rgba(138, 79, 255, 0.5)",
    backgroundColor: "transparent",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    paddingHorizontal: 20,
    marginTop: 10,
  },
  button: {
    flex: 1,
    marginHorizontal: 10,
  },
});
