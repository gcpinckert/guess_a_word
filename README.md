# Guess A Word

A simple word guessing game.

## Core Functions

- Contains an array of words
- Picks a word at random
- Uses that word to create a "Guess a Word" game for the user.
- Displays a tree with a certain number of apples and the word as a series of blanks (`_ _ _ _`).
- The game takes *keyboard input* from the user in the form of a single keypress at a time.
- It checks to see if the letter pressed on the keyboard is in the word.
  - If it is: that letter is filled into the blanks in the word to which it belongs. (i.e. `_ _ _ _` becomes `_ E _ _`).
  - If it is not: one of the apples is removed
- Regardless of whether the letter is in the word or not, it is always added to a list of guessed letters for each guess made by the user.
- If the user wins (guesses the word before running out of apples)
  - A "You won" message is displayed
  - The background fades to blue
  - A link is shown that allows to user to play again
- If the user loses (runs out of apples before guessing the word)
  - A "Sorry, you lost" message is displayed
  - The background fades to red
  - A link is shown that allows the user to play again
- If the user click's the play again link:
  - The background is reset
  - The apples in the tree are reset
  - A new random word is chosen and the blanks are displayed for the user
  - The list of guessed letters is reset
- The array of words is limited and reduced by the selected word each time the user plays. Therefore, eventually the game will run out of words. In the case of that eventuality, a message is displayed to that effect.