import React, { useEffect } from 'react';
import { ThemeProvider } from 'next-themes';
import { useTranslation } from 'react-i18next';
import { BrowserRouter as Router, Routes, Route, Link, useNavigate } from 'react-router-dom';
import './i18n/config';
import { ThemeToggle } from './components/theme-toggle';
import { LanguageToggle } from './components/language-toggle';
import { Button } from './components/ui/button';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from './components/ui/card';
import { SyncIcon, ManageIcon, AiIcon } from './components/icons/feature-icons';
import { Logo } from './components/logo';
import { Settings } from './pages/settings';
import { Memos } from './pages/memos';

function Layout({ children }) {
  const { t } = useTranslation();
  
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-14 items-center">
          <div className="mr-4 flex">
            <Link to="/" className="mr-6 flex items-center space-x-2">
              <Logo className="h-8 w-8" />
              <span className="font-bold">{t('smartMemo')}</span>
              <span className="text-sm text-muted-foreground">{t('slogan')}</span>
            </Link>
            <nav className="flex items-center gap-6">
              <Link to="/memos" className="text-sm font-medium hover:text-primary">
                {t('memos')}
              </Link>
              <Link to="/settings" className="text-sm font-medium hover:text-primary">
                {t('settings')}
              </Link>
            </nav>
          </div>
          <div className="flex flex-1 items-center justify-end space-x-2">
            <nav className="flex items-center space-x-2">
              <ThemeToggle />
              <LanguageToggle />
              <Button variant="ghost" size="sm">{t('login')}</Button>
              <Button>{t('signup')}</Button>
            </nav>
          </div>
        </div>
      </header>
      <main className="flex-1 overflow-auto">
        {children}
      </main>
    </div>
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
            {t('smartMemo')} - <span className="text-primary">{t('slogan')}</span>
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
              <h3 className="text-lg font-semibold">{t('smartMemo')}</h3>
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
                  <a 
                    href="#" 
                    className="text-sm text-muted-foreground hover:text-primary"
                  >
                    {t('privacy')}
                  </a>
                </li>
                <li>
                  <a 
                    href="#" 
                    className="text-sm text-muted-foreground hover:text-primary"
                  >
                    {t('terms')}
                  </a>
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

function Policy() {
  useEffect(() => {
    document.title = '隐私政策 - Smart Memo';
  }, []);

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold text-center text-primary mb-8">隐私政策</h1>
        
        <p className="text-muted-foreground mb-8">最后更新日期：2024年12月22日</p>

        <div className="space-y-8">
          <section>
            <h2 className="text-xl font-semibold mb-4">1. 信息收集</h2>
            <p className="text-foreground/90">我们收集的信息类型包括：</p>
            <ul className="list-disc pl-6 mt-2 space-y-2">
              <li>您创建的笔记内容</li>
              <li>基本的使用数据（如访问时间、使用频率等）</li>
              <li>设备信息（浏览器类型、操作系统等）</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-4">2. 信息使用</h2>
            <p className="text-foreground/90">我们使用收集的信息用于：</p>
            <ul className="list-disc pl-6 mt-2 space-y-2">
              <li>提供和改进我们的服务</li>
              <li>个性化您的使用体验</li>
              <li>发送服务相关通知</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-4">3. 信息安全</h2>
            <p className="text-foreground/90">
              我们采取适当的技术和组织措施来保护您的个人信息，防止未经授权的访问、使用或披露。
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-4">4. 信息共享</h2>
            <p className="text-foreground/90">我们不会出售、出租或以其他方式与第三方共享您的个人信息，除非：</p>
            <ul className="list-disc pl-6 mt-2 space-y-2">
              <li>获得您的明确同意</li>
              <li>法律要求我们这样做</li>
              <li>保护我们的合法权益</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-4">5. 您的权利</h2>
            <p className="text-foreground/90">您有权：</p>
            <ul className="list-disc pl-6 mt-2 space-y-2">
              <li>访问您的个人信息</li>
              <li>更正不准确的信息</li>
              <li>删除您的账户和数据</li>
              <li>限制或反对我们处理您的信息</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-4">6. 联系我们</h2>
            <p className="text-foreground/90">如果您对我们的隐私政策有任何疑问，请通过以下方式联系我们：</p>
            <p className="mt-2">邮箱：contact@playwithai.fun</p>
          </section>
        </div>
      </div>
    </div>
  );
}

function App() {
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <Router>
        <Layout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/memos" element={<Memos />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="/policy" element={<Policy />} />
            <Route path="/policy.html" element={<Policy />} />
          </Routes>
        </Layout>
      </Router>
    </ThemeProvider>
  );
}

export default App;
