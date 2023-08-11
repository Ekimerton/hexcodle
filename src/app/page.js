"use client";

import React, { useState, useEffect } from "react";
import { Modal, Button, Divider} from "antd";

export default function Home() {
  const [userInput, setUserInput] = useState("#");
  const [randColor, setRandColor] = useState("bisque");
  const [statusText, setStatusText] = useState("");
  const [guessText, setGuessText] = useState("");
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

    setUserInput("#");

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
      } else if (counter == 1 && userInput !== randColor) {
        setStatusText(`Not quite! ${counter} guess left.`);
        const newGuesses = [...guesses];
        newGuesses.unshift(userInput);
        setGuesses(newGuesses);
      } else if (counter > 0 && userInput !== randColor) {
        setStatusText(`Not quite! ${counter} guesses left.`);
        const newGuesses = [...guesses];
        newGuesses.unshift(userInput);
        setGuesses(newGuesses);
      } else if (counter <= 0 && userInput !== randColor) {
        const newGuesses = [...guesses];
        newGuesses.unshift(userInput);
        setGuesses(newGuesses);
        setStatusText(`Out of guesses. Todays Hexcodle was ${randColor}.`);
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

      <div id="instructions">
        <p>
          You will have 5 tries to correctly guess the hex code of the colour
          displayed on screen.<br></br>
          After each guess, you'll see if your guess was too low, too high, or
          spot on! <br></br>
          Use these as guides to decipher how close your guess is.
        </p>
      </div>

      <div id="infoModal">
        <Button type="primary" size="small" onClick={showModal}>
          WTF IS HEX?
        </Button>
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
            <ul>
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
      </div>

      <div class="square" style={{ backgroundColor: randColor }}></div>

      <div id="inputAndButton">
        <input
          type="text"
          id="userinput"
          value={userInput}
          onChange={handleChange}
        />

        <Button
          type="primary"
          size="small"
          id="enterButton"
          onClick={() => {
            enterClick();
          }}
          on
          disabled={gameOver}
        >
          ENTER
        </Button>
      </div>

      <p>{statusText}</p>
      <h id="guessHeading">Guesses</h>
      <div id="guessDisplay">
        {guessText}
        <ul>
          <div id="guessContainer">
            {guesses.map((guess, index) => (
              <>
                <li key={index}>{guess} </li>
                {renderArrows(guess)}
              </>
            ))}
          </div>
        </ul>
      </div>
    </div>
  );
}
