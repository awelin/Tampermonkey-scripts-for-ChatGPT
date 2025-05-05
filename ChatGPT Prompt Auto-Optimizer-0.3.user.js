// ==UserScript==
// @name         ChatGPT Prompt Auto-Optimizer
// @namespace    http://tampermonkey.net/
// @version      0.3
// @description  Automatically optimize prompts and send them for questioning
// @author       Awelin
// @match        https://chatgpt.com/*
// @grant        none
// ==/UserScript==

(function () {
    'use strict';

    // Change: Set the optimizer session ID (still requires manual setup)
    const optimizerChatId = 'any_one_of_your_chatgpt_session_ID';

    // Get the current page's main chat ID (used for returning to the chat)
    function getCurrentChatId() {
        const match = window.location.pathname.match(/\/c\/([a-f0-9-]+)/);
        return match ? match[1] : null;
    }

    const instructionPrefix = `You are an expert in crafting effective prompts for ChatGPT. Your task is to refine the message I provide to make it clearer, more structured, and optimized for generating a comprehensive and well-organized response from ChatGPT. Ensure that the refined prompt includes precise instructions, expected format, and key details necessary for an in-depth and informative reply. Just give me the refined prompt, without any introductory phrases or concluding questions.\n\n`;

    function addAutoOptimizeButton() {
        if (document.getElementById('auto-optimize-btn')) return;

        const inputArea = document.querySelector('#prompt-textarea');
        if (!inputArea) return;

        const btn = document.createElement('button');
        btn.textContent = '⚡ Auto Optimize and Ask';
        btn.id = 'auto-optimize-btn';
        Object.assign(btn.style, {
            position: 'absolute',
            bottom: '80px',
            right: '20px',
            zIndex: 1000,
            padding: '8px 12px',
            backgroundColor: '#10a37f',
            color: 'white',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer'
        });

        btn.onclick = async () => {
            const inputBox = document.querySelector('#prompt-textarea');
            const userPrompt = inputBox?.innerText.trim();
            if (!userPrompt) return alert('Please enter a prompt');

            const fullPrompt = instructionPrefix + userPrompt;

            localStorage.setItem('raw_prompt_for_optimization', fullPrompt);
            localStorage.setItem('pending_stage', 'optimize');

            // Get the current main chat ID and save it
            const currentChatId = getCurrentChatId();
            localStorage.setItem('main_chat_id', currentChatId || '');

            window.location.href = `https://chatgpt.com/c/${optimizerChatId}`;
        };

        document.body.appendChild(btn);
    }
    function extractCorePrompt(fullText) {
        // Extract the part after the Refined Prompt
        const refinedMatch = fullText.match(/Refined Prompt:\s*([\s\S]*?)(?:\n\n|$)/i);
        let coreText = refinedMatch ? refinedMatch[1].trim() : fullText.trim();

        // Remove common closing suggestion statements
        coreText = coreText.replace(/Would you like .*?(\n|$)/gi, '').trim();

        return coreText;
    }


    // Updated wait function
    async function waitForResponseText(timeout = 120000) {
        return new Promise((resolve, reject) => {
            const startTime = Date.now();
            let lastMessageLength = 0;  // Record the last message length

            const interval = setInterval(() => {
                const messages = Array.from(document.querySelectorAll('.markdown.prose'));
                if (messages.length > 0) {
                    const lastMessage = messages[messages.length - 1].innerText;

                    // If the message has changed and is longer than 20 characters, update the length and continue waiting
                    if (lastMessage.length > 20 && lastMessage.length !== lastMessageLength) {
                        lastMessageLength = lastMessage.length;
                    }
                    // If the message stops changing, assume the output is complete
                    else if (lastMessage.length === lastMessageLength) {
                        clearInterval(interval);
                        resolve(lastMessage);
                    }
                }

                // Timeout check
                if (Date.now() - startTime > timeout) {
                    clearInterval(interval);
                    reject(new Error('Timeout while waiting for optimization reply (2 minutes)'));
                }
            }, 3000);
        });
    }

    async function handleOptimizerChat() {
        const stage = localStorage.getItem('pending_stage');
        if (stage !== 'optimize') return;

        const rawPrompt = localStorage.getItem('raw_prompt_for_optimization');
        if (!rawPrompt) return;

        const inputBox = document.querySelector('#prompt-textarea');
        if (!inputBox) return;

        inputBox.innerText = rawPrompt;
        inputBox.dispatchEvent(new Event('input', { bubbles: true }));
        await new Promise(r => setTimeout(r, 1000));

        const enterEvent = new KeyboardEvent('keydown', {
            key: 'Enter',
            code: 'Enter',
            keyCode: 13,
            which: 13,
            bubbles: true
        });
        inputBox.dispatchEvent(enterEvent);

        const optimizedPrompt = await waitForResponseText();
        localStorage.setItem('optimized_prompt_result', optimizedPrompt);
        localStorage.setItem('pending_stage', 'ask');

        const returnChatId = localStorage.getItem('main_chat_id');
        window.location.href = `https://chatgpt.com/c/${returnChatId}`;
    }

    async function handleMainChat() {
        const stage = localStorage.getItem('pending_stage');
        if (stage !== 'ask') return;

        const optimizedPrompt = localStorage.getItem('optimized_prompt_result');
        if (!optimizedPrompt) return;

        const inputBox = document.querySelector('#prompt-textarea');
        if (!inputBox) return;

        inputBox.innerText = optimizedPrompt;
        inputBox.dispatchEvent(new Event('input', { bubbles: true }));
        await new Promise(r => setTimeout(r, 1000));

        const enterEvent = new KeyboardEvent('keydown', {
            key: 'Enter',
            code: 'Enter',
            keyCode: 13,
            which: 13,
            bubbles: true
        });
        inputBox.dispatchEvent(enterEvent);

        // Clear all states
        localStorage.removeItem('pending_stage');
        localStorage.removeItem('optimized_prompt_result');
        localStorage.removeItem('raw_prompt_for_optimization');
        localStorage.removeItem('main_chat_id');
    }

    window.addEventListener('load', () => {
        setTimeout(() => {
            addAutoOptimizeButton();
            handleOptimizerChat();
            handleMainChat();
        }, 2000);
    });
})();
