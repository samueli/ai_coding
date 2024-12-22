import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { ThemeProvider, useTheme } from 'next-themes';
import { Settings } from './pages/settings';
import { Memos } from './pages/memos';
import { Button } from './components/ui/button';
import { Moon, Sun, Languages } from 'lucide-react';
import { Logo } from './components/logo';
import { Card, CardHeader, CardTitle, CardDescription } from './components/ui/card';
import { SyncIcon, ManageIcon, AiIcon } from './components/icons/feature-icons';

function Layout({ children }) {
  const { t, i18n } = useTranslation();
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  const toggleLanguage = () => {
    i18n.changeLanguage(i18n.language === 'en' ? 'zh' : 'en');
  };

  if (!mounted) {
    return null;
  }

  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <div className="min-h-screen bg-background">
        <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
          <div className="container flex items-center justify-between h-14">
            <Link 
              to="/" 
              className="flex items-center gap-2 font-semibold"
            >
              <Logo className="h-6 w-6" />
              <span className="whitespace-nowrap">Smart Memo</span>
            </Link>

            <nav className="hidden md:flex items-center gap-6 text-sm">
              <Link to="/memos" className="transition-colors hover:text-foreground/80">
                {t('memos')}
              </Link>
              <Link to="/settings" className="transition-colors hover:text-foreground/80">
                {t('settings')}
              </Link>
            </nav>

            <div className="flex items-center gap-2">
              <Button
                variant="ghost"
                size="icon"
                onClick={toggleLanguage}
                className="h-9 w-9"
              >
                <Languages className="h-4 w-4" />
              </Button>
              <ThemeToggle />
              <div className="md:hidden">
                <MobileMenu />
              </div>
            </div>
          </div>
        </header>
        <main>
          {children}
        </main>
      </div>
    </ThemeProvider>
  );
}

function MobileMenu() {
  const { t } = useTranslation();
  const [isOpen, setIsOpen] = React.useState(false);
  
  return (
    <div className="relative">
      <Button 
        variant="ghost" 
        size="icon" 
        className="h-9 w-9"
        onClick={() => setIsOpen(!isOpen)}
      >
        <svg
          className="h-4 w-4"
          fill="none"
          height="24"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          viewBox="0 0 24 24"
          width="24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <line x1="4" x2="20" y1="12" y2="12" />
          <line x1="4" x2="20" y1="6" y2="6" />
          <line x1="4" x2="20" y1="18" y2="18" />
        </svg>
      </Button>
      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 py-2 bg-background rounded-md shadow-lg border">
          <Link
            to="/memos"
            className="block px-4 py-2 text-sm hover:bg-accent"
            onClick={() => setIsOpen(false)}
          >
            {t('memos')}
          </Link>
          <Link
            to="/settings"
            className="block px-4 py-2 text-sm hover:bg-accent"
            onClick={() => setIsOpen(false)}
          >
            {t('settings')}
          </Link>
        </div>
      )}
    </div>
  );
}

function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  
  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={() => setTheme(theme === "light" ? "dark" : "light")}
      className="h-9 w-9"
    >
      <Sun className="h-4 w-4 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
      <Moon className="absolute h-4 w-4 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
      <span className="sr-only">Toggle theme</span>
    </Button>
  );
}

function Home() {
  const { t } = useTranslation();
  const navigate = useNavigate();

  return (
    <div className="flex flex-col">
      <section className="container grid items-center gap-6 pb-8 pt-6 md:py-10">
        <div className="flex max-w-[980px] flex-col items-start gap-2">
          <h1 className="text-3xl font-extrabold leading-tight tracking-tighter md:text-4xl">
            Smart Memo
          </h1>
          <p className="max-w-[700px] text-lg text-muted-foreground">
            {t('featureDescription')}
          </p>
        </div>
        <div className="flex gap-4">
          <Button size="lg" onClick={() => navigate('/memos')}>{t('getStarted')}</Button>
          <Button variant="outline" size="lg">{t('viewDocs')}</Button>
        </div>
      </section>

      <section id="features" className="w-full py-20 bg-muted/20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-4">{t('coreFeatures')}</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              {t('featureDescription')}
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="group hover:shadow-lg transition-all duration-300 hover:border-primary/20">
              <CardHeader>
                <div className="mb-4">
                  <SyncIcon className="w-24 h-24 text-primary mx-auto" />
                </div>
                <CardTitle className="group-hover:text-primary transition-colors">{t('crossPlatform')}</CardTitle>
                <CardDescription>
                  {t('crossPlatformDesc')}
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="group hover:shadow-lg transition-all duration-300 hover:border-primary/20">
              <CardHeader>
                <div className="mb-4">
                  <ManageIcon className="w-24 h-24 text-primary mx-auto" />
                </div>
                <CardTitle className="group-hover:text-primary transition-colors">{t('unifiedManagement')}</CardTitle>
                <CardDescription>
                  {t('unifiedManagementDesc')}
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="group hover:shadow-lg transition-all duration-300 hover:border-primary/20">
              <CardHeader>
                <div className="mb-4">
                  <AiIcon className="w-24 h-24 text-primary mx-auto" />
                </div>
                <CardTitle className="group-hover:text-primary transition-colors">{t('aiEnhanced')}</CardTitle>
                <CardDescription>
                  {t('aiEnhancedDesc')}
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>

      <footer className="border-t bg-muted/20">
        <div className="container mx-auto px-4 py-8 md:py-12">
          <div className="grid md:grid-cols-4 gap-8">
            <div className="space-y-3">
              <h3 className="text-lg font-semibold">Smart Memo</h3>
              <p className="text-sm text-muted-foreground">
                {t('buildingFutureOfIdeas')}
              </p>
            </div>
            <div className="space-y-3">
              <h3 className="text-lg font-semibold">{t('product')}</h3>
              <ul className="space-y-2">
                <li>
                  <Link 
                    to="/" 
                    className="text-sm text-muted-foreground hover:text-primary"
                  >
                    Smart Memo
                  </Link>
                </li>
                <li>
                  <a 
                    href="https://agent.playwithai.fun" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="text-sm text-muted-foreground hover:text-primary"
                  >
                    Agent Market
                  </a>
                </li>
              </ul>
            </div>
            <div className="space-y-3">
              <h3 className="text-lg font-semibold">{t('company')}</h3>
              <ul className="space-y-2">
                <li>
                  <a 
                    href="https://playwithai.fun/about" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-sm text-muted-foreground hover:text-primary"
                  >
                    {t('about')}
                  </a>
                </li>
                <li>
                  <a 
                    href="https://playwithai.fun" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-sm text-muted-foreground hover:text-primary"
                  >
                    {t('contact')}
                  </a>
                </li>
              </ul>
            </div>
            <div className="space-y-3">
              <h3 className="text-lg font-semibold">{t('legal')}</h3>
              <ul className="space-y-2">
                <li>
                  <Link 
                    to="/policy" 
                    className="text-sm text-muted-foreground hover:text-primary"
                  >
                    {t('privacy')}
                  </Link>
                </li>
                <li>
                  <Link 
                    to="/policy" 
                    className="text-sm text-muted-foreground hover:text-primary"
                  >
                    {t('terms')}
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t">
            <p className="text-center text-sm text-muted-foreground">
              {t('copyright')}
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/memos" element={<Memos />} />
          <Route path="/settings" element={<Settings />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
