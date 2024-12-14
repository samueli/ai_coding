# Sparkling

## 简介 (Introduction)
Sparkling 是一个网页剪藏工具，包含一个 Chrome 浏览器扩展插件和剪藏内容查看的 Portal 网页。该工具基于 bolt.new 开发，并使用 windsurf 优化。

## 功能特点 (Features)

### 网页门户 (Web Portal)
- 查看剪藏内容列表
- 添加、删除、分享剪藏内容 (TODO)
- 基于剪藏内容进行 AI 搜索 (TODO)

### Chrome 插件 (Chrome Extension)
- 设置插件
- 收藏网页
- 选中文字收藏

## 开始使用 (Getting Started)

### 环境要求 (Prerequisites)
- Node.js 14+
- Python 3.8+
- Chrome 浏览器最新版本

### 安装步骤 (Installation)
1. 克隆项目仓库
```bash
git clone https://github.com/samueli/ai_coding/sparkling.git
cd sparkling
```

2. 安装依赖
```bash
# 网页门户
cd portal
npm install

# Chrome 插件
cd ../chrome-extension
npm install
```

## 使用说明 (Usage)

### 网页门户
1. 启动开发服务器
```bash
cd portal
npm run dev
```

### Chrome 插件
1. 打开 Chrome 浏览器
2. 访问 `chrome://extensions/`
3. 开启开发者模式
4. 点击"加载已解压的扩展程序"
5. 选择 `chrome-extension` 目录

## 项目结构 (Project Structure)
```
sparkling/
├── README.md
├── portal/
│   ├── src/
│   ├── public/
│   └── package.json
├── chrome-extension/
│   ├── src/
│   ├── manifest.json
│   └── package.json
└── docs/
    └── ...
```

## 贡献指南 (Contributing)
欢迎提交 Pull Requests 来帮助改进这个项目。对于重大变更，请先开 issue 讨论您想要改变的内容。

## 版本历史 (Version History)
- v0.1.0 (2024-12-14)
  - 初始项目设置
  - 网页门户基础框架搭建
  - Chrome 插件基础功能实现

## 许可证 (License)
本项目采用 Apache License 2.0 许可证 - 查看 [LICENSE](LICENSE) 文件了解详情

## 致谢 (Acknowledgments)
- 感谢所有项目贡献者
- 特别感谢开源社区的支持