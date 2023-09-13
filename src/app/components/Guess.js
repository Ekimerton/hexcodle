import React from "react";
import "./Guess.css";
import { hexToDecimal, compareCharacters } from "../utils";

export default function Guess(props) {
  const { guess, target, hashtag } = props;

  return (
    <>
      <div className="guess-container">
        {[...guess.substring(1)].map((character, index) => (
          <div
            key={index}
            className="guess-character"
            style={{ borderColor: guess }}
          >
            <p className="guess-p">{character}</p>
            <p className="guess-p">
              {compareCharacters(character, target.substring(1).charAt(index))}
            </p>
          </div>
        ))}
      </div>
    </>
  );
}
