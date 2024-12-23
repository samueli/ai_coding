import React from 'react';
import { useTranslation } from 'react-i18next';

const changelogData = [
  {
    date: '2024-12-23',
    version: 'v0.2.0',
    changes: [
      '添加标签管理功能',
      '优化 AI 摘要显示',
      '改进笔记编辑界面',
      '添加多语言支持',
      '优化移动端适配'
    ]
  },
  {
    date: '2024-12-22',
    version: 'v0.1.1',
    changes: [
      '修复重复加载问题',
      '优化加载性能',
      '改进 UI 交互',
      '支持 Markdown 编辑'
    ]
  },
  {
    date: '2024-12-21',
    version: 'v0.1.0',
    changes: [
      '首次发布',
      '基础笔记功能',
      'AI 摘要生成',
      '新增 Chrome 插件'
    ]
  }
];

export function Changelog() {
  const { t } = useTranslation();

  return (
    <div className="container max-w-2xl mx-auto py-8 px-4">
      <h1 className="text-2xl font-bold mb-8">{t('changelog')}</h1>
      <div className="relative">
        {/* 中心竖线 */}
        <div className="absolute left-5 top-0 bottom-0 w-px bg-border" />
        
        {/* 版本列表 */}
        <div className="space-y-8">
          {changelogData.map((release) => (
            <div key={release.version} className="relative">
              {/* 绿点 */}
              <div className="absolute left-[10px] top-[10px] w-5 h-5 rounded-full border-4 border-background bg-primary z-20" />
              
              {/* 内容区域 */}
              <div className="pl-16">
                <div className="mb-4">
                  <div className="text-lg font-semibold">
                    {release.version}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    {release.date}
                  </div>
                </div>
                <ul className="space-y-2 text-muted-foreground">
                  {release.changes.map((change, index) => (
                    <li key={index} className="flex items-start">
                      <span className="mr-2">•</span>
                      <span>{t('changelog.' + release.version + '.' + index) || change}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Changelog;
