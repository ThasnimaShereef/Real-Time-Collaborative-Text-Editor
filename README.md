# 📝 Real-Time Collaborative Text Editor

This is a web-based **real-time collaborative text editor** built using **React**, **TipTap**, **Yjs**, and **WebRTC**. Multiple users can edit a shared document simultaneously and see each other's cursors and names live.

## Live Link : https://thasnima-shereef-wasserstoff-front-iota.vercel.app/

## 🚀 Features

* 🧑‍🤝‍🧑 Real-time collaboration with multiple users
* ✍️ Rich text editing powered by [TipTap](https://tiptap.dev/)
* 🌐 Peer-to-peer communication using [Yjs](https://yjs.dev/) and [y-webrtc](https://github.com/yjs/y-webrtc)
* 👤 User identification with color-coded cursors
* 🧠 Awareness of online users
* ⚡ Fast and serverless (no backend needed!)

---

## 📸 Preview

![screenshot](./screenshot.png) 

---

## 🛠️ Tech Stack

* **React** — UI framework
* **TipTap** — Headless rich text editor
* **Yjs** — CRDT-based collaboration framework
* **y-webrtc** — WebRTC provider for Yjs
* **TypeScript / JavaScript**
* **CSS** — Basic styling

---

## 📦 Installation & Running Locally

### Prerequisites

* npm or yarn

### Steps

1. **Clone the repository:**

   ```bash
   git clone https://github.com/your-username/real-time-editor.git
   cd realtime-editor
   ```

2. **Install dependencies:**

   ```bash
   npm install
   ```

   or

   ```bash
   yarn install
   ```

3. **Start the development server:**

   ```bash
   npm start
   ```

   or

   ```bash
   yarn start
   ```

4. **Open in browser:**

   Navigate to `http://localhost:3000` in your browser.

5. **Try it out with others:**

   * Open the app in multiple browser tabs or devices.
   * Enter different usernames to see real-time editing and cursor presence.

---

## 📁 Project Structure

```
src/
├── App.css           # Styling for editor and user UI
├── App.tsx / App.jsx # Main app component
├── index.tsx         # Entry point
└── ...
```

---

## 🧠 How It Works

* When a user joins, a **Yjs document (`Y.Doc`)** is created and synced with others via **WebRTC** using `y-webrtc`.
* **TipTap** is initialized with:

  * `Collaboration`: syncs document content.
  * `CollaborationCursor`: shows real-time cursor positions with user names and colors.
* The **awareness protocol** tracks connected users and updates the sidebar with their names and colors.

---
