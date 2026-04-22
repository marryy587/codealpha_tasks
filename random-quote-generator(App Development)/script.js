const quoteText = document.getElementById("quote");
const authorText = document.getElementById("author");
const newQuoteBtn = document.getElementById("newQuoteBtn");

async function getQuote() {
  try {
    quoteText.textContent = "Loading quote...";
    authorText.textContent = "- Please wait";

    const response = await fetch("https://dummyjson.com/quotes/random");

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();

    quoteText.textContent = `"${data.quote}"`;
    authorText.textContent = `- ${data.author}`;
  } catch (error) {
    quoteText.textContent = "Failed to load quote.";
    authorText.textContent = "- Try again";
    console.error("Error fetching quote:", error);
  }
}

newQuoteBtn.addEventListener("click", getQuote);

window.addEventListener("DOMContentLoaded", getQuote);