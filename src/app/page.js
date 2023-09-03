"use client";

import React, { useState, useEffect } from "react";
import { Modal, Button, Divider } from "antd";
import { decimalToHex, hexToDecimal, generateUniqueNumber } from "./utils.js";
import Guess from "./components/Guess.js";
import Confetti from "./components/Confetti.js";

export default function Home() {
  const [userInput, setUserInput] = useState("#");
  const [randColor, setRandColor] = useState("bisque");
  const [statusText, setStatusText] = useState(" ");
  const [guesses, setGuesses] = useState([]);
  const [counter, setCounter] = useState(4);
  const [gameOver, setGameOver] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isWinModalVisible, setIsWinModalVisible] = useState(false);
  const [isLossModalVisible, setIsLossModalVisible] = useState(false);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const showWinModal = () => {
    setIsWinModalVisible(true);
  };

  const showLossModal = () => {
    setIsLossModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
    setIsWinModalVisible(false);
    setIsLossModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    setIsWinModalVisible(false);
    setIsLossModalVisible(false);
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

  useEffect(() => {
    if (counter === -1) {
      showLossModal();
    }
  }, [counter]);

  useEffect(() => {
    if (statusText === "You guessed it!") {
      showWinModal();
    }
  }, [counter]);

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
      setStatusText("Error: Hex code must be exactly 6 digits.");
      return;
    }

    if (!hexCodePattern.test(userInput.substring(1))) {
      setStatusText("Invalid character. Hex codes may only contain 0-9, A-F");
      return;
    }

    if (guesses.includes(userInput)) {
      setStatusText(
        "Already guessed this one! Please enter a different hex code."
      );
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
    <>
      <div className="everything" /*style={{ backgroundColor: guesses[0] }}*/>
        <Modal
          title="Congrats!"
          open={isWinModalVisible}
          onOk={handleOk}
          onCancel={handleCancel}
          cancelButtonProps={{ style: { display: "none" } }}
        >
          <p>
            You solved the Hexcodle in {4 - counter} guess
            {4 - counter == 1 ? "" : "es"}.<br></br>
            <br></br>
            Come back tomorrow for a new colour!
          </p>
          <Confetti />
        </Modal>

        <Modal
          title="Better luck next time"
          open={isLossModalVisible}
          onOk={handleOk}
          onCancel={handleCancel}
          cancelButtonProps={{ style: { display: "none" } }}
        >
          <p>
            Bummer! The Hexcodle for today was {randColor}.<br></br>
            Come back tomorrow for a new colour!
          </p>
        </Modal>

        <Modal
          title="How the HEX do hex codes work?"
          open={isModalVisible}
          onOk={handleOk}
          onCancel={handleCancel}
          cancelButtonProps={{ style: { display: "none" } }}
        >
          <p>
            First, we will break down each of the 6 hex digits. A hex code can
            be represented as RRGGBB where R represents red, G represents green
            and B represents blue values. The digits/letters in these locations
            denote the intensity of that colour; 0 being the lowest, and F being
            the highest.
          </p>
          <p>
            We use 0-9 are the first 10 values and A-F can be represented as
            digits 11-16, where 0 is the lowest intensity, and 16, or F, is the
            hightest intensity.
          </p>
          <p>
            Some common hex codes are as follows:
            <ul id="hexList">
              <li style={{ color: "#CBCBC9" }}>
                #FFFFFF: White (full intensity for all RGB components)
              </li>
              <li>#000000: Black (no intensity for all RGB components)</li>
              <li style={{ color: "red" }}>
                #FF0000: Red (full intensity for red, no intensity for green and
                blue)
              </li>
              <li style={{ color: "green" }}>
                #00FF00: Green (full intensity for green, no intensity for red
                and blue)
              </li>
              <li style={{ color: "blue" }}>
                #0000FF: Blue (full intensity for blue, no intensity for red and
                green)
              </li>
            </ul>
          </p>
          <p>
            Still a little confused? Try the{" "}
            <a href="https://htmlcolorcodes.com/">hex colour codes</a> website.
          </p>
        </Modal>
        <div>
          <section className="frosted-glass">
            <h1 className="title">Hexcodle</h1>

            <p>
              You will have 5 tries to correctly guess the hex code of the
              colour displayed on screen. After each guess, you will see if your
              guess was too low, too high, or spot on! Use these as guides to
              decipher how close your guess is.
            </p>

            <button className="modal-button" onClick={showModal}>
              WTF IS HEX?
            </button>
          </section>
          <section className="frosted-glass">
            <div
              style={{
                display: "flex",
                justifyContent: "start",
                alignItems: "end",
                marginBottom: 8,
              }}
            >
              <div style={{ marginRight: 32 }}>
                <h3>Target</h3>
                <div
                  className="square"
                  style={{ backgroundColor: randColor }}
                ></div>
              </div>
              <div>
                <h3>Your Guess</h3>
                <div
                  className="square"
                  style={{ backgroundColor: guesses[0] }}
                ></div>
              </div>
            </div>

            <div id="input-and-button">
              <input
                type="text"
                className="input input-bordered input-sm w-full max-w-xs"
                maxLength="7"
                onKeyPress={handleKeypress}
                value={userInput}
                onChange={handleChange}
                disabled={gameOver}
              />

              <button
                className="square-button"
                onClick={() => {
                  enterClick();
                }}
                disabled={gameOver}
              >
                ➜
              </button>
            </div>
            <p className="guess-text">{statusText}</p>
          </section>

          <section className="frosted-glass guess-section">
            <h2 id="guess-heading">Guesses</h2>

            {guesses.map((guess, index) => (
              <Guess
                key={index}
                guess={guess}
                target={randColor}
                hashtag={index === 0}
              />
            ))}
          </section>
        </div>
      </div>
    </>
  );
}
