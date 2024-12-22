import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { Button } from '../components/ui/button';
import { 
  KeyRound, 
  Shield, 
  RefreshCw, 
  Chrome, 
  ArrowRight,
  Save,
  AlertCircle
} from 'lucide-react';

const CHROME_EXTENSION_URL = 'https://chromewebstore.google.com/detail/sparkling-%E5%89%AA%E5%AD%98%E4%BD%A0%E7%9A%84%E5%88%9B%E6%84%8F/ioikbeofkpoclcmelegaeefkejifbpnm';

function generateUUID() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    const r = Math.random() * 16 | 0;
    const v = c === 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });
}

export function Settings() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [token, setToken] = useState('');
  const [isSaving, setIsSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);

  useEffect(() => {
    const savedToken = localStorage.getItem('apiToken');
    if (savedToken) {
      setToken(savedToken);
    }
  }, []);

  const handleGenerateToken = () => {
    const uuid = generateUUID();
    setToken(uuid);
  };

  const handleSave = () => {
    if (!token.trim()) {
      alert(t('pleaseEnterToken'));
      return;
    }

    setIsSaving(true);
    try {
      localStorage.setItem('apiToken', token.trim());
      setSaveSuccess(true);
      
      // 显示成功消息后跳转到备忘录列表
      setTimeout(() => {
        navigate('/memos');
      }, 1500);
    } catch (error) {
      console.error('Error saving token:', error);
      alert(t('errorSavingToken'));
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="container mx-auto py-8">
      <div className="max-w-xl mx-auto">
        <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
          <KeyRound className="w-6 h-6" />
          {t('settings')}
        </h2>
        
        <div className="mb-8 p-6 bg-muted/50 rounded-lg space-y-3 text-sm text-muted-foreground">
          <p className="font-medium text-foreground flex items-center gap-2 pb-2">
            <Shield className="w-4 h-4" />
            {t('tokenInstructions')}
          </p>
          <ul className="grid grid-cols-1 md:grid-cols-2 gap-3 ml-1">
            <li className="flex items-center gap-2">
              <KeyRound className="w-4 h-4 shrink-0" />
              {t('tokenInstructionOnce')}
            </li>
            <li className="flex items-center gap-2">
              <Shield className="w-4 h-4 shrink-0" />
              {t('tokenInstructionStorage')}
            </li>
            <li className="flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0" />
              {t('tokenInstructionSafety')}
            </li>
            <li className="flex items-center gap-2">
              <RefreshCw className="w-4 h-4 shrink-0" />
              {t('tokenInstructionClear')}
            </li>
          </ul>
          <div className="mt-6 pt-4 border-t">
            <p className="flex items-center gap-2 text-foreground">
              <Chrome className="w-4 h-4" />
              {t('tokenInstructionChromePlugin')}
            </p>
            <a 
              href={CHROME_EXTENSION_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 mt-3 px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors"
            >
              <Chrome className="w-4 h-4" />
              {t('chromePluginInstall')}
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </div>

        <div className="space-y-4">
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 flex items-center gap-2">
                <KeyRound className="w-4 h-4" />
                {t('apiToken')}
              </label>
              <Button
                variant="outline"
                size="sm"
                onClick={handleGenerateToken}
                disabled={isSaving}
                className="flex items-center gap-2"
              >
                <RefreshCw className="w-4 h-4" />
                {t('generateRandomToken')}
              </Button>
            </div>
            <input
              type="text"
              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
              value={token}
              onChange={(e) => setToken(e.target.value)}
              placeholder={t('enterApiToken')}
              disabled={isSaving}
            />
          </div>
          {saveSuccess && (
            <div className="text-sm text-green-500 animate-fade-in flex items-center gap-2">
              <Save className="w-4 h-4" />
              {t('settingsSaved')}
            </div>
          )}
          <Button 
            onClick={handleSave} 
            className="w-full flex items-center gap-2 justify-center"
            disabled={isSaving}
          >
            <Save className="w-4 h-4" />
            {isSaving ? t('saving') : t('saveSettings')}
          </Button>
        </div>
      </div>
    </div>
  );
}
