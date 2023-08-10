"use client";

import React, { useState, useEffect } from "react";

export default function Home() {
  const [userInput, setUserInput] = useState("#");
  const [randColor, setRandColor] = useState("bisque");
  const [statusText, setStatusText] = useState("");
  const [guessText, setGuessText] = useState("");
  const [guesses, setGuesses] = useState([]);
  const [counter, setCounter] = useState(4);
  const [gameOver, setGameOver] = useState(false);

  useEffect(() => {
    const r = Math.floor(Math.random() * 256);
    const g = Math.floor(Math.random() * 256);
    const b = Math.floor(Math.random() * 256);

    const componentToHex = (c) => {
      const hex = c.toString(16);
      return hex.length == 1 ? "0" + hex : hex;
    };

    setRandColor(
      `#${componentToHex(r)}${componentToHex(g)}${componentToHex(
        b
      )}`.toUpperCase()
    );
  }, []);

  const handleChange = (event) => {
    const text = event.target.value;
    if (text[0] !== "#") {
      setUserInput("#");
    } else if (text.length >= 8) {
      return;
    } else {
      setUserInput(text.toUpperCase());
    }
  };

  const enterClick = () => {
    const hexCodePattern = /^[0-9A-Fa-f]+$/;
    {
      /* Mapping each hex value onto an integer to make it easy to compare when doing greater/less values */
    }

    {
      /*setIsTooHigh(userInput > randColor);
  setIsTooLow(userInput < randColor);*/
    }

    setGuessText("Guesses: ");

    setUserInput("#");
    {
      /* Checking validity of user's guess:
      - is it length 6 exactly (not including #)
      - does it only contain valid hex characters
      - has it not been previously guessed */
    }

    if (userInput.length != 7) {
      setStatusText("ERROR: HEX CODE MUST BE EXACTLY 6 DIGITS.");
      return;
    } else if (!hexCodePattern.test(userInput.substring(1))) {
      setStatusText("INVALID CHARACTER. PLEASE ONLY USE 0-9, A-F");
    } else if (userInput in guesses) {
      setStatusText("ALREADY GUESSED, please try a different hex code.");
    } else {
      setCounter(counter - 1);
      if (counter > 0 && userInput === randColor) {
        setStatusText("You guessed it!");
        const newGuesses = [...guesses];
        newGuesses.unshift(userInput);
        setGuesses(newGuesses);
        setGameOver(true);
        return;
      } else if (counter > 0 && userInput !== randColor) {
        setStatusText(`Not quite! ${counter} guesses left.`);
        const newGuesses = [...guesses];
        newGuesses.unshift(userInput);
        setGuesses(newGuesses);
      } else if (counter <= 0 && userInput !== randColor) {
        setStatusText(`Out of guesses. Today's Hexcodle was ${randColor}.`);
        setGameOver(true);
        return;
      }
    }
  };

  const renderArrows = (guess) => {
    const hexMapping = {
      0: 0,
      1: 1,
      2: 2,
      3: 3,
      4: 4,
      5: 5,
      6: 6,
      7: 7,
      8: 8,
      9: 9,
      A: 10,
      B: 11,
      C: 12,
      D: 13,
      E: 14,
      F: 15,
    };

    if (guess.length !== 7) {
      return null;
    }
    const arrows = [];
    for (let i = 1; i < 7; i++) {
      const currentDigit = hexMapping[guess[i]];
      const targetDigit = hexMapping[randColor[i]];

      if (currentDigit > targetDigit) {
        arrows.push("⬇️");
      } else if (currentDigit < targetDigit) {
        arrows.push("⬆️");
      } else {
        arrows.push("✅");
      }
    }
    return arrows.map((arrow, index) => <span key={index}>{arrow}</span>);
  };

  return (
    <div id="everything">
      <h1 id="title">Hexcodle</h1>

      {/*Instructions for how game works and hyperlink to colour code picker site*/}
      <p id="instructions">
        You will have 5 tries to correctly guess the hex code of the colour
        displayed on screen.<br></br>
        Don't know hex codes byb memory? No worries! Try the{" "}
        <a href="https://htmlcolorcodes.com/color-picker/">
          html colour picker
        </a>{" "}
        site!
      </p>

      {/*This is where the hex code colour will be generated*/}
      <div id="colourGen" style={{ backgroundColor: randColor }}></div>
      <p>{randColor}</p>

      {/*Input text field and 'enter' button for submitting an answer 
      NEED TO IMPLEMENT PRESSING ENTER TO SUBMIT AS WELL*/}
      <div id="inputAndButton">
        <input
          type="text"
          id="userinput"
          value={userInput}
          onChange={handleChange}
        />

        {/*Enter button that will submit player's guess when pressed*/}
        <button
          id="enterButton"
          onClick={() => {
            enterClick();
          }}
          disabled={gameOver}
        >
          Enter
        </button>
      </div>

      {/*Displays the status text (correct, incorrect, error, etc...*/}
      <p>{statusText}</p>
      <div id="guessDisplay">
        {guessText}
        <ul>
          {guesses.map((guess, index) => (
            <>
              <li key={index}>{guess}</li>
              {renderArrows(guess)}
            </>
          ))}
        </ul>
      </div>
    </div>
  );
}
