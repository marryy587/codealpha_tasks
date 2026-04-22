def get_response(user_input):
    msg = user_input.lower().strip()

    if msg in ["hello", "hi", "hey", "hii"]:
        return "Hi there! How can I help you?"

    elif msg in ["how are you", "how are you?", "how r you", "how do you do"]:
        return "I'm fine, thanks! How about you?"

    elif msg in ["i'm fine", "i am fine", "good", "i'm good", "doing well"]:
        return "Great to hear that! 😊"

    elif msg in ["what is your name", "what's your name", "who are you"]:
        return "I'm a simple rule-based chatbot built in Python!"

    elif msg in ["what can you do", "help", "what do you do"]:
        return "I can respond to greetings, answer basic questions, and have a simple conversation with you."

    elif msg in ["bye", "goodbye", "see you", "exit", "quit"]:
        return "Goodbye! Have a great day! 👋"

    elif msg in ["thanks", "thank you", "thx"]:
        return "You're welcome! 😊"

    elif msg in ["what time is it", "time"]:
        from datetime import datetime
        return f"The current time is {datetime.now().strftime('%I:%M %p')}."

    elif msg in ["what is today", "today's date", "date"]:
        from datetime import datetime
        return f"Today is {datetime.now().strftime('%A, %B %d, %Y')}."

    elif "joke" in msg:
        return "Why do programmers prefer dark mode? Because light attracts bugs! 😄"

    elif "weather" in msg:
        return "I'm not connected to the internet, so I can't check the weather. Try a weather app!"

    elif "your favorite" in msg or "favourite" in msg:
        return "As a bot, I don't have favorites — but I do love Python! 🐍"

    else:
        return "I'm not sure I understand. Try saying 'hello', 'how are you', or 'bye'."


def chat():
    print("=" * 40)
    print("        SIMPLE PYTHON CHATBOT")
    print("=" * 40)
    print("Type 'bye' to exit.\n")

    while True:
        user_input = input("You: ").strip()

        if not user_input:
            print("Bot: Please say something!\n")
            continue

        response = get_response(user_input)
        print(f"Bot: {response}\n")

        if user_input.lower().strip() in ["bye", "goodbye", "see you", "exit", "quit"]:
            break


if __name__ == "__main__":
    chat()