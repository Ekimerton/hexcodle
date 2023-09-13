// For Hansies :^)
import { useState } from "react";
import moment from "moment-timezone";
import seedrandom from "seedrandom";

/*
    Function to generate a random number based on the current date
    This is a pseudo-random function that generated a number between (0 and n].
    Normally you'd have to generate a new target every day and store that in a database
    but this makes it so everyone has the same random target every day,
    while needing no server :>
*/
export function generateUniqueNumber(n, offset = 0) {
  const now = moment().tz("America/New_York");
  const seed = now.format("DD-MM-YYYY");
  const rng = seedrandom(seed + offset);
  const uniqueNumber = Math.floor(rng() * (Number(n) + 1));
  return uniqueNumber;
}

/*
    This is a basic hook for using the useState hook in react, but with
    local storage! So instead of doing

    const [guess, setGuess] = useState("")
    
    You can do:

    const [guess, setGuess] = useLocalStorage("previousGuesses", "");

    Like normal useState it takes an initial value as one of the params (2nd param),
    and the first param is a key which creates a store for it in the browser storage.
*/
export default function useLocalStorage(key, initialValue) {
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.log(error);
      return initialValue;
    }
  });

  const setValue = (value) => {
    try {
      const valueToStore =
        value instanceof Function ? value(storedValue) : value;
      setStoredValue(valueToStore);
      window.localStorage.setItem(key, JSON.stringify(valueToStore));
    } catch (error) {
      console.log(error);
    }
  };

  return [storedValue, setValue];
}

// Function for converting 0-15 to a character
export function decimalToHex(n) {
  if (n < 0 || n > 15) {
    throw new Error("Input must be a number between 0 and 15.");
  }

  return n.toString(16);
}

// Function for converting a character to 0-15
export function hexToDecimal(hexChar) {
  if (typeof hexChar !== "string" || !hexChar.match(/^[0-9a-fA-F]$/)) {
    console.log(hexChar);
    throw new Error("Input must be a char between 0 and f.");
  }

  return parseInt(hexChar, 16);
}

export function compareCharacters(guess, target) {
  if (guess === target) {
    return "✅";
  } else if (hexToDecimal(guess) < hexToDecimal(target)) {
    return "⬆️";
  } else {
    return "⬇️";
  }
}
