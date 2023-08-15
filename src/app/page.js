"use client";

import React, { useState, useEffect } from "react";
import { Modal, Button, Divider } from "antd";
import { decimalToHex, hexToDecimal, generateUniqueNumber } from "./utils.js";
import Guess from "./components/Guess.js";

export default function Home() {
  const [userInput, setUserInput] = useState("#");
  const [randColor, setRandColor] = useState("bisque");
  const [statusText, setStatusText] = useState("");
  const [guesses, setGuesses] = useState([]);
  const [counter, setCounter] = useState(4);
  const [gameOver, setGameOver] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const handleKeypress = (event) => {
    if (event.key === "Enter") {
      enterClick();
    }
  };

  useEffect(() => {
    const r = generateUniqueNumber(256, 0);
    const g = generateUniqueNumber(256, 1);
    const b = generateUniqueNumber(256, 2);

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
    if (counter < 0) {
      return;
    }

    const hexCodePattern = /^[0-9A-Fa-f]+$/;

    if (userInput.length != 7) {
      setStatusText("ERROR: HEX CODE MUST BE EXACTLY 6 DIGITS.");
      return;
    }

    if (!hexCodePattern.test(userInput.substring(1))) {
      setStatusText("INVALID CHARACTER. PLEASE ONLY USE 0-9, A-F");
      return;
    }

    if (guesses.includes(userInput)) {
      setStatusText("ALREADY GUESSED, please try a different hex code.");
      return;
    }

    if (userInput === randColor) {
      setStatusText("You guessed it!");
      setGameOver(true);
    } else {
      if (counter === 0) {
        setStatusText(`Out of guesses. Todays Hexcodle was ${randColor}.`);
        setGameOver(true);
      } else {
        setStatusText(
          `Not quite! ${counter} guess${counter == 1 ? "" : "es"} left.`
        );
      }
    }

    const newGuesses = [...guesses];
    newGuesses.unshift(userInput);
    setGuesses(newGuesses);
    setCounter(counter - 1);
    setUserInput("#");
  };

  return (
    <div id="everything" style={{ backgroundColor: guesses[0] }}>
      <div className="container frosted-glass">
        <Modal
          title="How the HEX do hex codes work?"
          visible={isModalVisible}
          onOk={handleOk}
          onCancel={handleCancel}
        >
          <p>
            First, we will break down each of the 6 hex digits. A hexcode can be
            represented as RRGGBB where R represents red, G represents green and
            B represents blue. The digits/letters in these locations denote the
            intensity of that colour; 0 being the lowest, and F being the
            highest.
          </p>
          <p>
            We use 0-9 are the first 10 values and A-F can be represented as
            digits 11-16, where 0 is the lowest intensity, and 16/F is the
            hightest intensity.
          </p>
          <p>
            Some common hex codes are as follows:
            <ul id="hexList">
              <li>#FFFFFF: White (full intensity for all RGB components)</li>
              <li>#000000: Black (no intensity for all RGB components)</li>
              <li>
                #FF0000: Red (full intensity for red, no intensity for green and
                blue)
              </li>
              <li>
                #00FF00: Green (full intensity for green, no intensity for red
                and blue)
              </li>
              <li>
                #0000FF: Blue (full intensity for blue, no intensity for red and
                green)
              </li>
            </ul>
          </p>
        </Modal>
        <h1 id="title">Hexcodle</h1>

        <div id="instructions">
          <p>
            You will have 5 tries to correctly guess the hex code of the colour
            displayed on screen.<br></br>
            After each guess, you will see if your guess was too low, too high,
            or spot on! <br></br>
            Use these as guides to decipher how close your guess is.
          </p>
        </div>

        <div id="infoModal">
          <Button type="primary" size="small" onClick={showModal}>
            WTF IS HEX?
          </Button>
        </div>

        <div className="square" style={{ backgroundColor: randColor }}></div>

        <div id="inputAndButton">
          <input
            type="text"
            id="userinput"
            maxLength="7"
            onKeyPress={handleKeypress}
            value={userInput}
            onChange={handleChange}
          />

          <button
            id="enterButton"
            onClick={() => {
              enterClick();
            }}
            disabled={gameOver}
          >
            ➜
          </button>
        </div>

        <p>{statusText}</p>

        <h id="guessHeading">Guesses</h>

        {guesses.map((guess, index) => (
          <Guess
            key={index}
            guess={guess}
            target={randColor}
            hashtag={index === 0}
          />
        ))}
      </div>
    </div>
  );
}
