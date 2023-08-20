import React from "react";
import "./Guess.css";
import { hexToDecimal } from "../utils";

export default function Guess(props) {
  const { guess, target, hashtag } = props;

  const compareCharacters = (guess, target) => {
    if (guess === target) {
      return "✅";
    } else if (hexToDecimal(guess) < hexToDecimal(target)) {
      return "⬆️";
    } else {
      return "⬇️";
    }
  };

  return (
    <>
      <div style={{ backgroundColor: guess, width: "100%", borderRadius: 16, marginBottom: 8 }}>
      <h3 style={{backgroundColor: "#f3f3f3", borderTopLeftRadius: 16, borderTopRightRadius: 16}}>Guess 1/5</h3>
        <div className="guess-container">
        {[...guess.substring(1)].map((character, index) => (
          <div
            key={index}
            className="guess-character frosted-glass"
          >
            <p className="guess-p">{character}</p>
            <p className="guess-p">
              {compareCharacters(character, target.substring(1).charAt(index))}
            </p>
          </div>
        ))}
        </div>
      </div>
    </>
  );
}
