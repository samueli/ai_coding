import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { Button } from '../components/ui/button';

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
      <div className="max-w-md mx-auto">
        <h2 className="text-2xl font-bold mb-6">{t('settings')}</h2>
        
        <div className="mb-8 p-4 bg-muted/50 rounded-lg space-y-2 text-sm text-muted-foreground">
          <p className="font-medium text-foreground">令牌使用说明：</p>
          <ul className="list-disc list-inside space-y-1.5">
            <li>令牌只需要设置一次即可永久生效</li>
            <li>令牌将安全地保存在您的本地浏览器中</li>
            <li>请妥善保管您的令牌，不要泄露给他人</li>
            <li>清除浏览器数据可能会导致令牌丢失，需要重新设置</li>
          </ul>
        </div>

        <div className="space-y-4">
          <div className="space-y-2">
            <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
              {t('apiToken')}
            </label>
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
            <div className="text-sm text-green-500 animate-fade-in">
              {t('settingsSaved')}
            </div>
          )}
          <Button 
            onClick={handleSave} 
            className="w-full"
            disabled={isSaving}
          >
            {isSaving ? t('saving') : t('saveSettings')}
          </Button>
        </div>
      </div>
    </div>
  );
}
