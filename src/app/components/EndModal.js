import Confetti from "./Confetti";
import { Modal } from "antd";
import { compareCharacters } from "../utils";
import Timer from "./Timer";

export default function EndModal({
  open,
  setOpen,
  guesses,
  color,
  counter,
  win = false,
}) {
  const getSharableString = () => {
    let shareableString = `I got today's hexcodle in ${guesses.length} ${
      guesses.length > 1 ? "guesses" : "guess"
    }!\nhttps://hexcodle.vercel.app \n\n`;

    const reversed = [...guesses].reverse();

    for (let i = 0; i < reversed.length; i++) {
      const guess = reversed[i];
      let line = "";

      for (let j = 0; j < guess.length; j++) {
        const guessChar = guess.substring(1).charAt(j);
        const targetChar = color.substring(1).charAt(j);
        if (!guessChar) {
          continue;
        }
        const emoji = compareCharacters(guessChar, targetChar);
        line += emoji;
      }

      shareableString += line + "\n";
    }
    return shareableString;
  };

  return (
    <Modal
      title={win ? "Congrats!" : "Better luck next time"}
      open={open}
      onOk={() => {
        setOpen(false);
      }}
      onCancel={() => {
        setOpen(false);
      }}
      cancelButtonProps={{ style: { display: "none" } }}
    >
      <Confetti />
      {win ? (
        <>
          <p>
            You solved the Hexcodle in {4 - counter} guess
            {4 - counter == 1 ? "" : "es"}.<br></br>
            <br />
            Come back tomorrow for a new colour!
          </p>
        </>
      ) : (
        <p>
          Bummer! The Hexcodle for today was {color}.<br></br>
          Come back tomorrow for a new colour!
        </p>
      )}
      <a
        onClick={() => {
          navigator.clipboard.writeText(getSharableString());
        }}
      >
        Click here to copy your results
      </a>
      <Timer isModalActive={true} />
    </Modal>
  );
}
