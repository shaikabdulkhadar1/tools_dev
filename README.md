# 🛠️ tools.dev — Dev Tools Hub & API Tester (MERN Stack)

Welcome to **tools.dev**, a comprehensive, developer-focused web application built with the MERN stack. This project combines a suite of essential **micro-dev tools** and a powerful **API Testing & Monitoring Dashboard**, all in a single, minimal and efficient interface.

---

## 🚀 Project Overview

- **Frontend:** React.js + Tailwind CSS
- **Backend:** Node.js + Express.js
- **Database:** MongoDB + Mongoose
- **Domain:** `tools.dev`
- **Stack:** MERN (MongoDB, Express, React, Node)

---

## 🔧 Features

### 1. 📦 Dev Tools Hub

A set of small but powerful developer utilities accessible from a single UI. Each tool is independently accessible and optimized for speed and UX.

#### Included Micro Tools:

| Tool                       | Description                                                                  |
| -------------------------- | ---------------------------------------------------------------------------- |
| ✅ JSON Formatter          | Format and validate JSON data with real-time error highlighting              |
| ✅ JWT Decoder             | Decode and inspect JSON Web Tokens, including header, payload, and signature |
| ✅ Regex Tester            | Test regular expressions with flags and live match results                   |
| ✅ Base64 Encoder/Decoder  | Encode and decode text with Base64                                           |
| ✅ UUID Generator          | Generate random UUID v4 values                                               |
| ✅ Lorem Ipsum Generator   | Generate dummy text for UI design and dev purposes                           |
| ✅ Color Picker            | Select and preview HEX, RGB, and HSL color formats                           |
| ✅ Markdown Previewer      | Convert markdown to rendered HTML in real-time                               |
| ✅ Cron Expression Tester  | Parse cron syntax and preview upcoming execution times                       |
| ✅ Text Encoder/Decoder    | URL encode/decode, HTML entities, ASCII, UTF-8 etc.                          |
| ✅ Number System Converter | Convert between binary, decimal, octal, and hexadecimal                      |
| ✅ Case Converter          | Convert text to UPPER, lower, camelCase, snake_case, etc.                    |
| ✅ Diff Checker            | Highlight differences between two blocks of code/text                        |
| ✅ Minifier/Beautifier     | Minify or beautify HTML, CSS, and JS                                         |
| ✅ Timestamp Converter     | Convert between UNIX timestamps and human-readable formats                   |
| ✅ Hash Generator          | Generate MD5, SHA1, SHA256, SHA512 hashes                                    |
| ✅ Word/Char Counter       | Count words, characters, and remove whitespace/duplicates                    |
| ✅ Password Generator      | Generate strong random passwords with customizable options                   |

---

### 2. 🌐 API Testing & Monitoring Dashboard

A lightweight and user-friendly alternative to Postman, built for REST API developers.

#### Features:

- **Request Builder:** Supports GET, POST, PUT, DELETE, PATCH
- **Custom Headers & Params:** Full control over request data
- **Body Input:** Raw JSON or x-www-form-urlencoded support
- **Response Viewer:** View response body, status, and headers
- **Collections:** Save and manage request groups
- **Environment Variables:** Easily switch between environments (dev, staging, prod)
- **History Logs:** Auto-save request history
- **API Monitoring (Optional):**
  - Background polling
  - Email/popup alerts for downtime
  - Status codes + response time analytics

---

## 🧭 Routes Overview

### 📍 Frontend Routes (React Router)

| Path                      | Component           | Description                    |
| ------------------------- | ------------------- | ------------------------------ |
| `/`                       | `HomePage`          | Welcome page or dashboard      |
| `/tools`                  | `ToolsIndex`        | Directory of available tools   |
| `/tools/json-formatter`   | `JsonFormatter`     | JSON formatter and validator   |
| `/tools/jwt-decoder`      | `JwtDecoder`        | Decode JSON Web Tokens         |
| `/tools/regex-tester`     | `RegexTester`       | Regular expression tester      |
| `/tools/base64`           | `Base64Tool`        | Encode/decode Base64           |
| `/tools/text-encoder`     | `TextEncoderTool`   | Text encode/decode utility     |
| `/tools/number-converter` | `BaseConverterTool` | Binary/Decimal/Hex converter   |
| `/tools/case-converter`   | `CaseConverter`     | Change text case formats       |
| `/api-tester`             | `ApiTester`         | Core interface for API testing |
| `/api-monitor`            | `ApiMonitor`        | Configure API monitoring jobs  |

---

### 🛠 Backend Routes (Express.js)

| Method | Route                     | Description                                  |
| ------ | ------------------------- | -------------------------------------------- |
| `POST` | `/api/test`               | Send a test API request (used in API Tester) |
| `POST` | `/api/monitor`            | Register an API monitoring job               |
| `GET`  | `/api/monitor/:id/status` | Check the status of a monitored API          |
| `GET`  | `/api/history`            | Get API request history                      |
| `POST` | `/api/collections`        | Save an API request collection               |
| `GET`  | `/api/collections/:id`    | Fetch a saved collection                     |
| `POST` | `/api/tools/hash`         | Generate hash values                         |
| `POST` | `/api/tools/cron`         | Parse cron expression                        |

> 💡 Most dev tools are implemented on the frontend using JS libraries, so backend routes are used primarily for API Tester, persistent storage, and cron jobs.

---

## 💻 Getting Started

### 📦 Prerequisites

- Node.js
- MongoDB (local or Atlas)

### 🔧 Installation

```bash
git clone https://github.com/your-username/tools.dev.git
cd tools.dev
```

#### 1. Setup Backend

```bash
cd server
npm install
npm run dev
```

#### 2. Setup Frontend

```bash
cd client
npm install
npm run dev
```

> Use a tool like `concurrently` to run both servers together in development.

---

## ✨ Future Plans

- Auth & User Profiles (OAuth + JWT)
- Shareable tool links
- Browser extension
- VS Code extension
- Add AI assistant (Gemini/GPT) for payload validation, error explanation

---

## 🤝 Contributing

Pull requests and suggestions are welcome! Open an issue first to discuss major changes.

---

## 📄 License

MIT License

---

## 🌐 Live Demo

Coming Soon at [https://tools.dev](https://tools.dev)
