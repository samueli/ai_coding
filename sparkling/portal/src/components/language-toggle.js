import React from 'react';
import { useTranslation } from 'react-i18next';
import { Button } from './ui/button';

export function LanguageToggle() {
  const { i18n, t } = useTranslation();

  const toggleLanguage = () => {
    const newLang = i18n.language === 'en' ? 'zh' : 'en';
    i18n.changeLanguage(newLang);
  };

  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={toggleLanguage}
    >
      {t('language')}
    </Button>
  );
}
