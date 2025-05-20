import { useTranslation } from "@/hooks/useTranslation";
import { useState } from "react";
import { StyleSheet, Text, TextInput, View } from "react-native";
import { GlassmorphicCard } from "./GlassmorphicCard";

interface DateInputProps {
  value: string;
  onChange: (date: Date | null) => void;
  placeholder?: string;
  error?: string;
}

export const DateInput = ({
  value,
  onChange,
  placeholder,
  error,
}: DateInputProps) => {
  const { t } = useTranslation();
  const [inputValue, setInputValue] = useState(value || "");
  const [localError, setLocalError] = useState<string | undefined>(error);

  // Format the input as DD-MM-YYYY while typing
  const handleChangeText = (text: string) => {
    // Remove any non-digit characters
    const cleaned = text.replace(/[^0-9]/g, "");

    // Format with hyphens
    let formatted = "";

    if (cleaned.length > 0) {
      formatted = cleaned.substring(0, 2);

      if (cleaned.length > 2) {
        formatted += "-" + cleaned.substring(2, 4);

        if (cleaned.length > 4) {
          formatted += "-" + cleaned.substring(4, 8);
        }
      }
    }

    setInputValue(formatted);

    // Validate and convert to Date object if complete
    if (formatted.length === 10) {
      // DD-MM-YYYY = 10 chars
      const [day, month, year] = formatted.split("-").map(Number);

      // Check if date is valid
      const date = new Date(year, month - 1, day);
      const isValidDate =
        date.getFullYear() === year &&
        date.getMonth() === month - 1 &&
        date.getDate() === day;

      if (isValidDate) {
        setLocalError(undefined);
        onChange(date);
      } else {
        setLocalError(t("dateInput.invalidDate"));
        onChange(null);
      }
    } else if (formatted.length > 0) {
      // If input is not complete but has some content
      setLocalError(t("dateInput.incomplete"));
      onChange(null);
    } else {
      // Empty input
      setLocalError(undefined);
      onChange(null);
    }
  };

  return (
    <View style={styles.container}>
      <GlassmorphicCard style={styles.inputCard}>
        <TextInput
          style={styles.input}
          value={inputValue}
          onChangeText={handleChangeText}
          placeholder={placeholder || t("dateInput.placeholder")}
          placeholderTextColor="rgba(255, 255, 255, 0.6)"
          keyboardType="number-pad"
          maxLength={10} // DD-MM-YYYY = 10 chars
        />
      </GlassmorphicCard>

      {(localError || error) && (
        <Text style={styles.errorText}>{localError || error}</Text>
      )}

      <Text style={styles.helperText}>{t("dateInput.format")}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
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
  errorText: {
    fontFamily: "Poppins-Regular",
    fontSize: 12,
    color: "#FF6B6B",
    marginTop: 5,
    marginLeft: 5,
  },
  helperText: {
    fontFamily: "Poppins-Regular",
    fontSize: 12,
    color: "rgba(255, 255, 255, 0.6)",
    marginTop: 5,
    marginLeft: 5,
  },
});
