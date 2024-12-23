import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { ThemeProvider, useTheme } from 'next-themes';
import { Settings } from './pages/settings';
import { Memos } from './pages/memos';
import { Changelog } from './pages/changelog';
import { Home } from './pages/home';
import { Button } from './components/ui/button';
import { Moon, Sun, Languages } from 'lucide-react';
import { Logo } from './components/logo';
import { Card, CardHeader, CardTitle, CardDescription } from './components/ui/card';
import { SyncIcon, ManageIcon, AiIcon } from './components/icons/feature-icons';
import { cn } from './lib/utils';

function Layout({ children }) {
  const { t, i18n } = useTranslation();
  const { theme, setTheme } = useTheme();
  const [isOpen, setIsOpen] = useState(false);
  const pathname = window.location.pathname;

  return (
    <div className="min-h-screen bg-background font-sans antialiased">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-14 items-center">
          <Link to="/" className="flex items-center gap-2 font-bold">
            <Logo className="h-6 w-6" />
            <span>Smart Memo</span>
          </Link>

          <div className="flex flex-1 items-center justify-between space-x-2 md:justify-end">
            <nav className="flex items-center gap-6">
              <Link
                to="/memos"
                className={cn(
                  "text-sm font-medium transition-colors hover:text-primary",
                  pathname === "/memos" ? "text-primary" : "text-muted-foreground"
                )}
              >
                {t('memos')}
              </Link>
              <Link
                to="/settings"
                className={cn(
                  "text-sm font-medium transition-colors hover:text-primary",
                  pathname === "/settings" ? "text-primary" : "text-muted-foreground"
                )}
              >
                {t('settings')}
              </Link>
              <Link
                to="/changelog"
                className={cn(
                  "text-sm font-medium transition-colors hover:text-primary",
                  pathname === "/changelog" ? "text-primary" : "text-muted-foreground"
                )}
              >
                {t('changelog')}
              </Link>
            </nav>

            <div className="flex items-center gap-2">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => i18n.changeLanguage(i18n.language === 'en' ? 'zh' : 'en')}
              >
                <Languages className="h-5 w-5" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
              >
                <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
                <span className="sr-only">Toggle theme</span>
              </Button>
            </div>
          </div>
        </div>
      </header>

      <main>{children}</main>
    </div>
  );
}

export default function App() {
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <Router>
        <Layout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/memos" element={<Memos />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="/changelog" element={<Changelog />} />
          </Routes>
        </Layout>
      </Router>
    </ThemeProvider>
  );
}
