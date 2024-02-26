# React To-do List

## Description

這是一個使用 React、Redux、styled-components、TypeScript 和 i18next 技術構建的 TodoList 應用程序。該應用程序可以讓用戶註冊、登入，並使用五倍學院的 Todo API 來連接後端。

## Getting Started

Install the project

```bash
npm install
```

Run the project

```bash
npm start
```

Build the project

```bash
npm run build
```

Test the project

```bash
npm test
```

## Project structure description

```shell
├── public
├── src                          # 包含應用程式中的可重複使用元件。
│   ├── api/                     # 用於存放與後端API交互的代碼文件。
│   ├── assets/                  # 包含公共的圖像資源，如字體、圖像等。
│   ├── i18n/                    # 用於存放國際化相關的配置文件和語言翻譯資源。
│   ├── pages/                   # 存放應用程式的路由頁面組件。
│   ├── redux/                   # 包含 Redux 狀態管理相關的配置文件和代碼。
│   ├── App.css                  # 應用程式的全局 CSS 樣式文件。
│   ├── App.test.tsx             # 用於測試應用程式的測試文件。
│   ├── App.tsx                  # 應用程式的主組件。
│   ├── i18n.js                  # 國際化配置文件。
│   ├── images.d.ts              # TypeScript 宣告文件，用於聲明圖像模塊的類型。
│   ├── index.css                # 項目的全局 CSS 樣式文件。
│   ├── index.tsx                # 項目的入口文件，用於渲染主組件到 DOM 中。
│   ├── react-app-env.d.ts       # TypeScript 環境宣告文件。
│   ├── reportWebVitals.ts       # 用於報告 Web 性能的文件。
│   └── setupTests.ts            # 測試環境配置文件。
├── .gitignore                   # 指定哪些檔案或目錄不應該被Git版本控制系統追蹤或提交到版本儲存庫中。
├── package-lock.json            # 鎖定安裝的 npm package 版本的檔案。
├── package.json                 # 專案的 npm 套件設定文件，包含了專案依賴和腳本。
├── tsconfig.json                # TypeScript 的設定文件，用於指定專案的編譯選項。
└── README.md                    # 包含專案的簡要描述和使用說明的自述文件。
```

## Built With

- [React.js](https://reactjs.org/)
- [Redux](https://redux.js.org/)
- [styled-components](https://styled-components.com/)
- [TypeScript](https://www.typescriptlang.org/)
- [i18next](https://www.i18next.com/)

## 🔗 Link

- [TODO APIs](https://todoo.5xcamp.us/api-docs/index.html){:target="_blank"}