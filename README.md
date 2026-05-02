# Rock Paper Scissors

A polished browser game built with HTML, CSS, and JavaScript. Play classic Rock Paper Scissors against a randomized computer opponent, track your record, use keyboard shortcuts, and keep your score between sessions with `localStorage`.

![HTML](https://img.shields.io/badge/HTML5-structure-E34F26?style=for-the-badge&logo=html5&logoColor=white)
![CSS](https://img.shields.io/badge/CSS3-styling-1572B6?style=for-the-badge&logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-game_logic-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)
![Static App](https://img.shields.io/badge/App-static_site-2EA44F?style=for-the-badge)

## Preview

https://github.com/user-attachments/assets/1790660d-bac6-4e8d-bd60-37f26d0117c3

## Highlights

- Interactive Rock, Paper, and Scissors buttons with animated feedback.
- Random computer move generation for every round.
- Live win, loss, and tie tracking.
- Persistent score storage using browser `localStorage`.
- Reset confirmation flow to avoid accidental score clearing.
- Auto Play mode that runs a new round every second.
- Keyboard controls for quick, mouse-free gameplay.
- Responsive layout for desktop and smaller screens.

## Controls

| Action | Mouse | Keyboard |
| --- | --- | --- |
| Play Rock | Rock button | `R` |
| Play Paper | Paper button | `P` |
| Play Scissors | Scissors button | `S` |
| Toggle Auto Play | Auto Play button | `A` |
| Reset Score | Reset Score button | `Backspace` |

## How It Works

1. Choose Rock, Paper, or Scissors.
2. The computer picks a random move.
3. The game compares both choices and displays the result.
4. The scoreboard updates immediately.
5. The latest score is saved in the browser and restored when you return.

## Project Structure

```text
.
|-- Rock-Paper-Scissors.html
|-- Rock-Paper-Scissors Project.css
|-- Rock-Paper-Scissors Project.js
|-- README.md
`-- images/
    |-- paper-emoji.png
    |-- rock-emoji.png
    `-- scissors-emoji.png
```

## Run Locally

No build step or dependencies are required.

1. Clone or download the repository.
2. Open `Rock-Paper-Scissors.html` in a browser.
3. Start playing.

## Tech Stack

- `HTML5` for the game markup.
- `CSS3` for responsive styling, gradients, hover states, and animations.
- `JavaScript` for game logic, score updates, keyboard shortcuts, auto play, and storage.

## Notable Implementation Details

- Uses `Math.random()` to select the computer move.
- Stores score as JSON in `localStorage`.
- Includes a storage availability check with an in-memory fallback.
- Applies result-specific styles for wins, losses, and ties.
- Uses event listeners for button clicks and keyboard input.

## Future Improvements

- Add sound effects and mute controls.
- Add match history for recent rounds.
- Add difficulty modes or streak tracking.
- Add a dedicated accessibility pass for ARIA labels and focus states.
