function getBotResponse(input) {
  input = input.toLowerCase().trim();

  const exactResponses = {
    "hello": "Hello! How can I assist you today?",
    "hi": "Hello! How can I assist you today?",
    "hii": "Hello! How can I assist you today?",
    "hey": "Hello! How can I assist you today?",
    "bye": "Goodbye! Have a great day.",
    "contact": "You can contact us at support@company.com.",
    "email": "Our support email is support@company.com.",
    "location": "We provide services online for customers worldwide.",
    "hours": "Our support team is available from 9 AM to 6 PM.",
    "services": "We offer website development, mobile app solutions, and cloud services.",
    "price": "Our pricing depends on the package and service selected.",
    "payment": "We support online payment methods including cards and bank transfers."
  };

  if (exactResponses[input]) {
    return exactResponses[input];
  }

  // Greeting variations
  if (
    input.includes("hi") ||
    input.includes("hello") ||
    input.includes("hey") ||
    input.includes("assalam") ||
    input.includes("salam")
  ) {
    return "Hello! How can I assist you today?";
  }

  if (input.includes("service")) {
    return "We provide web development, app development, chatbot integration, and cloud support services.";
  }

  if (
    input.includes("price") ||
    input.includes("cost") ||
    input.includes("fee") ||
    input.includes("charges")
  ) {
    return "Pricing varies by service type. Please tell me which service you want details about.";
  }

  if (
    input.includes("contact") ||
    input.includes("call") ||
    input.includes("email") ||
    input.includes("phone")
  ) {
    return "You can contact our support team at support@company.com.";
  }

  if (input.includes("cloud")) {
    return "Our cloud services include deployment, hosting support, and scalable web solutions.";
  }

  if (input.includes("website")) {
    return "Yes, we provide website design, development, and maintenance services.";
  }

  if (input.includes("chatbot")) {
    return "Yes, we can integrate chatbots into commercial websites for instant user support.";
  }

  if (input.includes("help")) {
    return "I can help you with services, pricing, contact details, cloud support, and website solutions.";
  }

  return "Sorry, I did not understand that. Please ask about services, pricing, contact, cloud, or website support.";
}

function addMessage(message, sender) {
  const chatBox = document.getElementById("chatBox");
  const msgDiv = document.createElement("div");
  msgDiv.classList.add("message", sender);
  msgDiv.textContent = message;
  chatBox.appendChild(msgDiv);
  chatBox.scrollTop = chatBox.scrollHeight;
}

function sendMessage() {
  const userInput = document.getElementById("userInput");
  const text = userInput.value.trim();

  if (text === "") {
    return;
  }

  addMessage(text, "user");

  const reply = getBotResponse(text);

  setTimeout(() => {
    addMessage(reply, "bot");
  }, 400);

  userInput.value = "";
}

document.getElementById("userInput").addEventListener("keypress", function(event) {
  if (event.key === "Enter") {
    sendMessage();
  }
});