## Conversation Exporter

### 🔍 Introduction

The **Conversation Exporter** is a Tampermonkey userscript that allows you to **instantly download the entire ChatGPT conversation** as a beautifully formatted `.html` file — preserving all AI-rendered content and styles. It’s especially useful for researchers, students, and writers who want to archive AI responses for offline access or later review.

### ✨ Features

* **One-key export**: Press `Ctrl + M` to export the entire visible conversation.
* **Preserves formatting**: Includes headers, paragraphs, code blocks, and syntax highlighting.
* **Offline ready**: The exported HTML file is self-contained and viewable without an internet connection.
* **Auto-titled**: The file will use a timestamp as its filename, e.g., `chatgpt-convo-2025-05-05-20-13.html`.

---

### ⚙️ Setup Instructions

#### ✅ Prerequisites

Make sure you’ve installed Tampermonkey in your browser:

* [Chrome extension](https://chrome.google.com/webstore/detail/tampermonkey/dhdgffkkebhmkfjojejmpbldmpobfkfo)
* [Firefox add-on](https://addons.mozilla.org/en-US/firefox/addon/tampermonkey/)

#### 🚀 Installation

1. Click the **Tampermonkey icon** in your browser toolbar.
2. Select **Create a new script**.
3. Replace the default code with the contents of `Conversation-Exporter-0.3.user.js`.
4. Save the script (`Ctrl + S` or File > Save).
5. Make sure it's enabled and visit [https://chatgpt.com/c/\*](https://chatgpt.com/c/*).

#### ⌨️ How to Use

* Open a ChatGPT conversation.
* Press `Ctrl + M` (on macOS: `⌘ + M`).
* The script will:

  * Collect all AI-generated content from the page.
  * Format it using elegant HTML & CSS.
  * Trigger a download of the conversation as a `.html` file.

---

### 🧩 Notes

* The script targets elements rendered by ChatGPT (e.g., `.markdown.prose`), so make sure the conversation has finished loading before exporting.
* Code blocks are auto-formatted using basic CSS styles. You can customize the look by editing the `<style>` section in the script.
* If nothing downloads, try refreshing the page and waiting for all messages to appear before pressing `Ctrl + M`.

---
