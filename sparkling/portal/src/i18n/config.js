import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    fallbackLng: 'en',
    resources: {
      en: {
        translation: {
          features: 'Features',
          about: 'About',
          contact: 'Contact',
          login: 'Log In',
          signup: 'Sign Up',
          getStarted: 'Get Started',
          viewDocs: 'View Documentation',
          darkMode: 'Dark Mode',
          lightMode: 'Light Mode',
          language: 'Language',
          slogan: 'sparkling your ideas',
          coreFeatures: 'Core Features',
          featureDescription: 'Smart tools to capture, organize, and enhance your ideas',
          
          // Features
          crossPlatform: 'Cross-Platform Sync',
          crossPlatformDesc: 'Capture and sync your inspirations across all devices seamlessly',
          
          unifiedManagement: 'Unified Management',
          unifiedManagementDesc: 'Organize and manage all your ideas in one central place',
          
          aiEnhanced: 'AI Enhancement',
          aiEnhancedDesc: 'Leverage AI for summarization, tagging, and smart search',
          
          // Settings
          settings: 'Settings',
          apiToken: 'API Token',
          enterApiToken: 'Enter your API token',
          saveSettings: 'Save Settings',
          saving: 'Saving...',
          settingsSaved: 'Settings saved successfully!',
          pleaseEnterToken: 'Please enter your API token',
          errorSavingToken: 'Error saving token. Please try again.',
          tokenInstructions: 'Token Instructions:',
          tokenInstructionOnce: 'Set once for permanent use',
          tokenInstructionStorage: 'Securely stored in browser',
          tokenInstructionSafety: 'Keep token private and secure',
          tokenInstructionClear: 'Reset needed if browser data cleared',
          tokenInstructionGenerate: 'Click to generate random token',
          tokenInstructionChromePlugin: 'Use with Chrome extension:',
          chromePluginInstall: 'Install Extension',
          generateRandomToken: 'Generate Random Token',
          
          // Memos
          memos: 'Memos',
          loading: 'Loading...',
          noMoreMemos: 'No more Memos',
          shareMemo: 'Share Memo',
          deleteMemo: 'Delete Memo',
          editMemo: 'Edit Memo',
          viewOriginal: 'View Original',
          reset: 'Reset',
          save: 'Save',
          saving: 'Saving...',
          addTags: 'Add Tags',
          editTags: 'Edit Tags',
          enterTagsHint: 'Press Enter to add tag',
          tagsLimit: 'Maximum 3 tags allowed',
          cancel: 'Cancel',
          summary: 'Summary',
          
          // Footer
          smartMemo: 'Smart Memo',
          buildingFutureOfIdeas: 'Empowering creativity with smart note-taking',
          product: 'Product',
          documentation: 'Documentation',
          guides: 'Guides',
          company: 'Company',
          blog: 'Blog',
          careers: 'Careers',
          legal: 'Legal',
          privacy: 'Privacy',
          terms: 'Terms',
          copyright: '2024 Smart Memo by @PlayWithAI. All rights reserved.',
        },
      },
      zh: {
        translation: {
          features: '功能',
          about: '关于',
          contact: '联系',
          login: '登录',
          signup: '注册',
          getStarted: '开始使用',
          viewDocs: '查看文档',
          darkMode: '暗色模式',
          lightMode: '亮色模式',
          language: '语言',
          slogan: '激发你的创意灵感',
          coreFeatures: '核心功能',
          featureDescription: '智能工具，助你捕捉、整理和提升创意',
          
          // Features
          crossPlatform: '多端同步',
          crossPlatformDesc: '支持浏览器插件、网页应用和移动端，随时随地记录灵感。支持一键导入网页内容，自动同步所有设备，离线可用，确保你永不错过任何灵感时刻',
          
          unifiedManagement: '统一管理',
          unifiedManagementDesc: '强大的编辑器支持 Markdown 格式，支持标签分类、全文检索。支持编辑、补充、合并灵感，让创意井然有序。支持导出多种格式，方便分享和备份',
          
          aiEnhanced: 'AI 增强',
          aiEnhancedDesc: '智能 AI 助手自动生成摘要和标签，提供相关内容推荐。支持智能搜索和内容聚合，帮你发现灵感之间的联系。支持多语言翻译和智能改写，让灵感更有价值',
          
          // 设置
          settings: '设置',
          apiToken: 'API 令牌',
          enterApiToken: '请输入您的 API 令牌',
          saveSettings: '保存设置',
          saving: '保存中...',
          settingsSaved: '设置保存成功！',
          pleaseEnterToken: '请输入 API 令牌',
          errorSavingToken: '保存令牌时出错，请重试。',
          tokenInstructions: '令牌说明',
          tokenInstructionOnce: '设置一次永久有效',
          tokenInstructionStorage: '安全存储在浏览器中',
          tokenInstructionSafety: '请勿泄露给他人',
          tokenInstructionClear: '清除浏览器数据需重置',
          tokenInstructionGenerate: '点击生成随机令牌',
          tokenInstructionChromePlugin: '配置到 Chrome 插件：',
          chromePluginInstall: '安装插件',
          generateRandomToken: '生成随机令牌',
          
          // Memos
          memos: '笔记',
          loading: '加载中...',
          noMoreMemos: '没有更多笔记',
          shareMemo: '分享笔记',
          deleteMemo: '删除笔记',
          editMemo: '编辑笔记',
          viewOriginal: '查看原文',
          reset: '重置',
          save: '保存',
          saving: '保存中...',
          addTags: '添加标签',
          editTags: '编辑标签',
          enterTagsHint: '按回车添加标签',
          tagsLimit: '最多可添加3个标签',
          cancel: '取消',
          summary: '摘要',
          
          // Footer
          smartMemo: 'Smart Memo',
          buildingFutureOfIdeas: '用智能笔记激发创造力',
          product: '产品',
          documentation: '文档',
          guides: '指南',
          company: '公司',
          blog: '博客',
          careers: '招聘',
          legal: '法律',
          privacy: '隐私',
          terms: '条款',
          copyright: '2024 Smart Memo by @PlayWithAI. 保留所有权利。',
        },
      },
    },
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
