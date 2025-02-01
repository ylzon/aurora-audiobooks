# [WIP]极光听书 Aurora Audiobooks 📚

[![][license-badge]][license-url] 
[![][expoversion-badge]][expoversion-url]

[license-badge]: https://img.shields.io/github/license/ylzon/aurora-audiobooks?style=flat-square
[license-url]: LICENSE
[expoversion-badge]: https://img.shields.io/badge/Expo-52.0.28-blue.svg?style=flat-square
[expoversion-url]: https://expo.dev/

[English Version](README.en.md) | [中文版](README.md)

基于Audiobookshelf的第三方移动客户端，专注于提升有声书收听体验。使用React Native + Expo构建，支持iOS和Android。

## ✨ 核心功能
- 🚀 优化离线下载功能，使用并行下载，添加下载管理
- ⏭️ 添加自定义片头/片尾跳过功能
- ⏸️ 添加睡眠定时器按集关闭功能
- 🌗 添加主题切换功能
- 🌩 优化使用体验，提高加载速度
- 📚 移除多余功能，保持简洁

## 🛠️ 技术栈
- React Native
- Expo
- SQLite

## 🚀 快速开始

1. 安装依赖
```bash
npm install
```
2. 运行项目
```bash
npm run start
```
3. 选择运行平台
```bash
npm run android
```
```bash
npm run ios
```
```bash
npm run web
```

## 📦 项目结构
```bash
├── app
│ ├── (tabs) # 底部导航页
│ ├── +html.tsx # Web回退页面
│ ├── layout.tsx # 根布局
│ └── play.tsx # 播放器页面
├── components
│ ├── audio # 音频组件
│ └── ui # 通用UI组件
├── constants # 配置常量
├── hooks # 自定义Hooks
├── lib # 核心逻辑
│ ├── api # API客户端
│ └── db # 数据库模块
└── types # 类型定义
```

## 🤝 贡献
欢迎提交PR，一起完善这个项目！

## 📝 许可证
[MIT](LICENSE)
