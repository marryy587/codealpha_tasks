import random

WORDS = ['python', 'jungle', 'rocket', 'castle', 'wizard']
MAX_WRONG = 6

HANGMAN_STAGES = [
    """
       -----
       |   |
           |
           |
           |
           |
    =========
    """,
    """
       -----
       |   |
       O   |
           |
           |
           |
    =========
    """,
    """
       -----
       |   |
       O   |
       |   |
           |
           |
    =========
    """,
    """
       -----
       |   |
       O   |
      /|   |
           |
           |
    =========
    """,
    """
       -----
       |   |
       O   |
      /|\\  |
           |
           |
    =========
    """,
    """
       -----
       |   |
       O   |
      /|\\  |
      /    |
           |
    =========
    """,
    """
       -----
       |   |
       O   |
      /|\\  |
      / \\  |
           |
    =========
    """
]


def display_state(word, guessed, wrong_count, wrong_letters):
    print(HANGMAN_STAGES[wrong_count])
    print("Word: ", end="")
    print(" ".join(ch.upper() if ch in guessed else "_" for ch in word))
    print(f"\nWrong guesses ({wrong_count}/{MAX_WRONG}): {' '.join(wrong_letters).upper()}")
    print()


def get_guess(guessed):
    while True:
        guess = input("Guess a letter: ").strip().lower()
        if len(guess) != 1 or not guess.isalpha():
            print("Please enter a single letter.")
        elif guess in guessed:
            print(f"You already guessed '{guess.upper()}'. Try another.")
        else:
            return guess


def play():
    word = random.choice(WORDS)
    guessed = set()
    wrong_letters = []
    wrong_count = 0

    print("\n" + "=" * 30)
    print("       HANGMAN GAME")
    print("=" * 30)

    while True:
        display_state(word, guessed, wrong_count, wrong_letters)

        if all(ch in guessed for ch in word):
            print(f"🎉 YOU WIN! The word was: {word.upper()}")
            break

        if wrong_count >= MAX_WRONG:
            print(f"💀 GAME OVER! The word was: {word.upper()}")
            break

        guess = get_guess(guessed)
        guessed.add(guess)

        if guess in word:
            print(f"✔ '{guess.upper()}' is in the word!")
        else:
            wrong_letters.append(guess)
            wrong_count += 1
            print(f"✘ '{guess.upper()}' is not in the word.")


def main():
    while True:
        play()
        again = input("\nPlay again? (y/n): ").strip().lower()
        if again != 'y':
            print("Thanks for playing! Goodbye.")
            break


if __name__ == "__main__":
    main()
