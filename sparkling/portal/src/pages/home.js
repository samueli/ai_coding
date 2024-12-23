import React from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { Button } from '../components/ui/button';
import { Card, CardHeader, CardTitle, CardDescription } from '../components/ui/card';
import { SyncIcon, ManageIcon, AiIcon } from '../components/icons/feature-icons';

export function Home() {
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
            {t('slogan')}
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
                  <a 
                    href="/" 
                    className="text-sm text-muted-foreground hover:text-primary"
                  >
                    Smart Memo
                  </a>
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
                    href="/policy" 
                    className="text-sm text-muted-foreground hover:text-primary"
                  >
                    {t('privacy')}
                  </a>
                </li>
                <li>
                  <a 
                    href="/policy" 
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

export default Home;
