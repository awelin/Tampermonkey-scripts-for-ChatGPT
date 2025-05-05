## Prompt Optimizer

### Introduction

The **Prompt Optimizer** is a Tampermonkey userscript designed to streamline your workflow when using ChatGPT. Instead of manually copying and pasting prompts into a separate session for refinement, this script automates the entire process:

* You write a raw prompt in your current ChatGPT session.
* The script automatically redirects the prompt to a dedicated “optimizer” ChatGPT session.
* It waits for ChatGPT to refine the prompt (using a predefined instructional prefix).
* Then, it returns to the original session and asks the optimized prompt for you—completely hands-free.

This is especially useful for users who:

* Want more precise and structured responses from ChatGPT.
* Use a consistent prompt-optimization workflow.
* Seek a more productive, automated ChatGPT experience.

---

### Setup Instructions

#### 1. Install Tampermonkey

If you haven’t already:

* [Chrome Extension](https://chrome.google.com/webstore/detail/tampermonkey/dhdgffkkebhmkfjojejmpbldmpobfkfo)
* [Firefox Add-on](https://addons.mozilla.org/en-US/firefox/addon/tampermonkey/)

#### 2. Install the Prompt Optimizer Script

1. Click the **Tampermonkey icon** in your browser toolbar.
2. Select **Create a new script**.
3. Replace the default code with the contents of `Prompt_Optimizer-0.3.user.js`.
4. Save the script (`Ctrl + S` or File > Save).
5. Make sure it's enabled and visit [https://chatgpt.com/c/\*](https://chatgpt.com/c/*).

#### 3. Configure the Optimizer Session ID

Open ChatGPT and navigate to the chat thread you use for prompt optimization.
You’ll see a URL like:

```
https://chatgpt.com/c/62344c4-3708-800e-9e00-6e605f0d7784
```

Copy the last part after `/c/` — this is your **optimizer chat ID**.

Now open the installed script in Tampermonkey and find this line:

```js
const optimizerChatId = 'any_one_of_your_chatgpt_session_ID';
```

Replace the ID with your own.

> 💡 This step is **mandatory**. It would be good if you have a proprietary session for prompt optimization.

#### 4. How to Use

Once the script is installed and configured:

* Go to any ChatGPT conversation.
* Enter your raw prompt as usual.
* Click the new green button: **⚡ Auto Optimize and Ask**
* The script will:

  1. Add a professional instructional prefix to your prompt.
  2. Redirect it to the optimizer session.
  3. Wait for the full optimized response to finish rendering.
  4. Return to the initial session and send the refined prompt.

That’s it — the question is now automatically asked with a fully optimized prompt!

---

### 🧠 Default Instructional Prefix

The following system message is prepended to your raw prompt automatically for better results:

> You are an expert in crafting effective prompts for ChatGPT. Your task is to refine the message I provide to make it clearer, more structured, and optimized for generating a comprehensive and well-organized response from ChatGPT. Ensure that the refined prompt includes precise instructions, expected format, and key details necessary for an in-depth and informative reply. Just give me the refined prompt, without any introductory phrases or concluding questions.

You can customize this prefix in the script if needed.

---
