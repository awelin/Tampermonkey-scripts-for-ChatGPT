// ==UserScript==
// @name         Conversation_Exporter
// @namespace    http://tampermonkey.net/
// @version      0.3
// @description  Export ChatGPT conversation with styled light-theme HTML on Ctrl+M
// @author       Awelin
// @match        https://chatgpt.com/c/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    function getAllMessagesAsHTML() {
        const messageWrappers = document.querySelectorAll('div[class*="group"]');

        let htmlContent = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>ChatGPT Conversation</title>
    <style>
        body {
            font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", sans-serif;
            padding: 2em;
            background-color: #ffffff;
            color: #000;
            line-height: 1.6;
        }
        .message {
            margin-bottom: 2em;
            border-bottom: 1px solid #ddd;
            padding-bottom: 1em;
        }
        .user, .assistant {
            padding: 1em;
            border-radius: 6px;
            margin-top: 0.5em;
        }
        .user {
            background-color: #e8f0fe;
        }
        .assistant {
            background-color: #e6f4ea;
        }
        code {
            background-color: #f4f4f4;
            color: #333;
            padding: 2px 4px;
            border-radius: 4px;
            font-family: monospace;
        }
        pre {
            background-color: #f4f4f4;
            color: #000;
            padding: 1em;
            border-radius: 6px;
            overflow-x: auto;
            font-family: monospace;
            border: 1px solid #ccc;
        }
        table {
            width: 100%;
            border-collapse: collapse;
            margin-top: 1em;
        }
        th, td {
            border: 1px solid #ccc;
            padding: 0.5em;
            text-align: left;
        }
        blockquote {
            border-left: 4px solid #aaa;
            padding-left: 1em;
            color: #555;
            margin: 1em 0;
            background: #f9f9f9;
        }
        h1, h2, h3 {
            color: #222;
        }
    </style>
</head>
<body>
    <h1>ChatGPT Conversation Export</h1>
`;

        messageWrappers.forEach((group) => {
            const user = group.querySelector('.text-base:has(.whitespace-pre-wrap)');
            const assistant = group.querySelector('.markdown.prose');

            htmlContent += `<div class="message">\n`;

            if (user) {
                htmlContent += `<div class="user"><strong>User:</strong><br>${user.innerHTML}</div>\n`;
            }
            if (assistant) {
                htmlContent += `<div class="assistant"><strong>ChatGPT:</strong><br>${assistant.innerHTML}</div>\n`;
            }

            htmlContent += `</div>\n`;
        });

        htmlContent += `</body></html>`;
        return htmlContent;
    }

    function downloadHTML(content, filename = 'chatgpt_conversation.html') {
        const blob = new Blob([content], { type: 'text/html' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = filename;
        a.click();
        URL.revokeObjectURL(url);
    }

    document.addEventListener('keydown', function(e) {
        if (e.ctrlKey && e.key.toLowerCase() === 'm') {
            const html = getAllMessagesAsHTML();
            downloadHTML(html);
        }
    });

})();
