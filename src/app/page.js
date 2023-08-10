"use client";

import React, { useState, useEffect } from "react";

export default function Home() {
  const [userInput, setUserInput] = useState("#");
  const [randColor, setRandColor] = useState("bisque");
  const [statusText, setStatusText] = useState("");
  const [guessText, setGuessText] = useState("");
  const [guesses, setGuesses] = useState([]);
  const [counter, setCounter] = useState(4);
  const [isTooHigh, setIsTooHigh] = useState(false);
  const [isTooLow, setIsTooLow] = useState(false);

  useEffect(() => {
    const r = Math.floor(Math.random() * 256);
    const g = Math.floor(Math.random() * 256);
    const b = Math.floor(Math.random() * 256);

    const componentToHex = (c) => {
      const hex = c.toString(16);
      return hex.length == 1 ? "0" + hex : hex;
    };

    setRandColor(
      `#${componentToHex(r)}${componentToHex(g)}${componentToHex(b)}`
    );
  }, []);

  const handleChange = (event) => {
    const text = event.target.value;
    if (text[0] !== "#") {
      setUserInput("#");
    } else if (text.length >= 8) {
      return;
    } else {
      setUserInput(text);
    }
  };

  const enterClick = () => {

    setIsTooHigh(userInput > randColor);
    setIsTooLow(userInput < randColor);

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
    } else if (userInput in guesses) {
      setStatusText("ALREADY GUESSED, please try a different hex code.");
    } else {
      setCounter(counter - 1);
      if (counter > 0 && userInput === randColor) {
        setStatusText("You guessed it!");
        return;
      } else if (counter > 0 && userInput !== randColor) {
        setGuessText("Guesses: ");
        setStatusText(`Not quite! ${counter} guesses left.`);
        const newGuesses = [...guesses];
        newGuesses.unshift(userInput);
        setGuesses(newGuesses);
      } else if (counter <= 0 && userInput !== randColor) {
        setGuessText("Guesses: ");
        setStatusText(`Out of guesses. Today's Hexcodle was ${randColor}.`);
        return;
      }
    }
  };


  const renderArrows = () => {
    if (userInput.length !== 7) {
      return null;
    }
    const arrows = [];
    for (let i = 1; i < 7; i++) {
      const currentDigit = parseInt(userInput[i], 16);
      const targetDigit = parseInt(randColor[i], 16);
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
        >
          Enter
        </button>
      </div>

      {/*Displays the status text (correct, incorrect, error, etc...*/}
      <p>{statusText}</p>
      <div id="colourGen" style={{ backgroundColor: randColor }}>
        {renderArrows()}
      </div>
      <p>{randColor}</p>
      <p id="guessDisplay">
        {guessText}
        <ul>
          {guesses.map((guess, index) => (
            <li key={index}>{guess}</li>
          ))}
        </ul>
      </p>
    </div>
  );
}
