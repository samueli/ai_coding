import React from 'react';
import { useTheme } from 'next-themes';
import { Button } from './ui/button';
import { useTranslation } from 'react-i18next';

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const { t } = useTranslation();

  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
    >
      {theme === 'light' ? t('darkMode') : t('lightMode')}
    </Button>
  );
}
