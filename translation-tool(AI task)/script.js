console.log("JavaScript loaded successfully");

const inputText = document.getElementById("inputText");
const sourceLang = document.getElementById("sourceLang");
const targetLang = document.getElementById("targetLang");
const translateBtn = document.getElementById("translateBtn");
const copyBtn = document.getElementById("copyBtn");
const outputText = document.getElementById("outputText");

async function translateText() {
  const text = inputText.value.trim();
  const source = sourceLang.value;
  const target = targetLang.value;

  if (text === "") {
    outputText.textContent = "Please enter some text.";
    return;
  }

  if (source === target) {
    outputText.textContent = "Source and target languages must be different.";
    return;
  }

  outputText.textContent = "Translating...";

  try {
    const url = `https://api.mymemory.translated.net/get?q=${encodeURIComponent(text)}&langpair=${source}|${target}`;

    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`HTTP Error: ${response.status}`);
    }

    const data = await response.json();
    console.log("API Response:", data);

    if (data.responseData && data.responseData.translatedText) {
      outputText.textContent = data.responseData.translatedText;
    } else {
      outputText.textContent = "Translation not found.";
    }
  } catch (error) {
    console.error("Translation error:", error);
    outputText.textContent = "Failed to translate text. Please try again.";
  }
}

async function copyTranslatedText() {
  const translated = outputText.textContent.trim();

  if (
    translated === "" ||
    translated === "Your translated text will appear here." ||
    translated === "Please enter some text." ||
    translated === "Translating..." ||
    translated === "Translation not found." ||
    translated === "Failed to translate text. Please try again."
  ) {
    return;
  }

  try {
    await navigator.clipboard.writeText(translated);
    copyBtn.textContent = "Copied!";

    setTimeout(() => {
      copyBtn.textContent = "Copy";
    }, 1500);
  } catch (error) {
    console.error("Copy failed:", error);
  }
}

translateBtn.addEventListener("click", translateText);
copyBtn.addEventListener("click", copyTranslatedText);
