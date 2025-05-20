import { useLanguage } from "@/contexts/LanguageContext";

export const useTranslation = () => {
  const { i18n } = useLanguage();

  const t = (key: string, options?: Record<string, any>) => {
    return i18n.t(key, options);
  };

  return { t };
};
