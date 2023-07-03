"use client";

import React, { useState, useEffect } from "react";

export default function Home() {
  const [userInput, setUserInput] = useState("#");
  const [randColor, setRandColor] = useState("bisque");
  const [statusText, setStatusText] = useState("");
  const [guesses, setGuesses] = useState([]);
  const [counter, setCounter] = useState(0);

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
    setUserInput("#");
    {
      /* Checking validity of user's guess:
      - is it length 6 exactly (not including #)
      - does it only contain valid hex characters
      - has it not been previously guessed */
    }
    if (userInput.length != 7) {
      setStatusText("ERROR: HEX CODE MUST BE EXACTLY 6 DIGITS");
      return;
    } else {
      setCounter(counter + 1);
      if (counter < 4 && userInput === randColor) {
        setStatusText("You guessed it!");
        return;
      } else if (counter < 4 && userInput !== randColor) {
        setStatusText("Not quite!", counter, " guesses left.");
        const newGuesses = [...guesses];
        newGuesses.unshift(userInput);
        setGuesses(newGuesses);
      } else if (counter >= 4 && userInput !== randColor) {
        setStatusText("Out of guesses. Today's Hexcodle was ", randColor);
        return;
      }
    }
  };

  return (
    <div id="everything">
      <h1 id="title">Hexcodle</h1>

      {/*This is where the hex code colour will be generated*/}
      <div id="colourGen" style={{ backgroundColor: randColor }}></div>

      <p>{randColor}</p>

      {/*<p id="instructions">The goal: guess the hex code of the colour displayed on screen.<br></br>
      Don't know hex codes? No worries! We have a hex code cheat sheet! Just simply click the 'hex' button!</p>*/}

      <div id="inputAndButton">
        <input
          type="text"
          id="userinput"
          value={userInput}
          onChange={handleChange}
        />
        <button
          id="enterButton"
          onClick={() => {
            enterClick();
          }}
        >
          Enter
        </button>
      </div>
      <p>{statusText}</p>
      <p>{guesses}</p>
    </div>
  );
}
