//@ts-nocheck
import { bn, en, hi, mr, ta } from "@/localization";
import * as Localization from "expo-localization";
import { I18n } from "i18n-js";
import React, { createContext, useContext, useEffect, useState } from "react";

type LanguageCode = "en" | "hi" | "bn" | "ta" | "mr";

interface LanguageContextType {
  language: LanguageCode;
  setLanguage: (lang: LanguageCode) => void;
  i18n: I18n;
}

const translations = {
  en,
  hi,
  bn,
  ta,
  mr,
};

const i18n = new I18n(translations);
i18n.enableFallback = true;
i18n.defaultLocale = "en";

const LanguageContext = createContext<LanguageContextType>({
  language: "en",
  setLanguage: () => {},
  i18n,
});

export const LanguageProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [language, setLanguageState] = useState<LanguageCode>("en");

  useEffect(() => {
    // Get device locale and set initial language
    const locale = Localization.getLocales()[0].languageCode;
    const initialLanguage = ["en", "hi", "bn", "ta", "mr"].includes(locale)
      ? (locale as LanguageCode)
      : "en";
    setLanguageState(initialLanguage);
  }, []);

  // Update i18n locale when language changes
  useEffect(() => {
    i18n.locale = language;
  }, [language]);

  const setLanguage = (lang: LanguageCode) => {
    setLanguageState(lang);
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, i18n }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => useContext(LanguageContext);
