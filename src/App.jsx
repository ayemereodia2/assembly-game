import { useState, useRef } from "react";
import { languages } from "../languages";

export default function App() {
  const mainWords = "rteact";
  const alphabets = "abcdefghijklmnopqrstuvwxyz";
  const [guesses, setGuesses] = useState([]);
  const [isCorrect, setIsCorrect] = useState(Array(26).fill(false));
  const wrongGuessCount = useRef(0);
  const [keyboardStates, setKeyboardStates] = useState(Array(26).fill({
    KEY_STATE: "key-button-box"
  }));



  let currentPos = useRef(0);
  let remainderText = useRef(mainWords);
  const [currentWords, setCurrentWords] = useState(Array(mainWords.length).fill(" "))
  
  const keyPressed = (char, id) => {
    setGuesses(prev =>  (prev.includes(char) ? prev : [...prev, char]));
    if(mainWords.split("").includes(char)){
     
       const index = remainderText.current.indexOf(char);
       console.log(index);
      remainderText.current = remainderText.current.replace(char, " ")

      setCurrentWords((oldChar) => {
        const updatedChars = [...oldChar]; // Create a copy of the old array
        updatedChars[index] = char;       // Update the specific index
        return updatedChars;              // Return the updated array
      });

      setIsCorrect(prev => [prev[id] = true, ...prev]);
      setKeyboardStates(prevKeyState => [...prevKeyState, prevKeyState[id] = {KEY_STATE:  "key-button-box-correct"}])
    }else {
      wrongGuessCount.current = wrongGuessCount.current + 1;
      setKeyboardStates(prevKeyState => [...prevKeyState, prevKeyState[id] = {KEY_STATE: "key-button-box-incorrect"}])
      console.log(wrongGuessCount.current);
    }
  }
  
  function HeaderView() {
    return (
      <header>
        <span className="header-label">Assembly: Endgame</span>
        <p className="header-para">
          Guess the word in under 8 attempts to keep the programming world safe
          from Assembly!
        </p>
        <section className="game-status-container">
          <h2>You win!</h2>
          <p>“Farewell HTML & CSS” 🫡 </p>
        </section>
      </header>
    );
  }

  const wordElement = currentWords.map((character, index) => (
      <span key={index} className={"word-box"}>{character.toUpperCase()}</span>
  ))

  const keyBoardElements = alphabets.split("").map((char, id) => (
    <button onClick={() => keyPressed(char, id)} key={char} className={keyboardStates[id].KEY_STATE}>{char.toUpperCase()}</button>
  ))

  function WordView() {
    return (
      <section className="word-container">
        {wordElement}
      </section>
    )
  }

  const languageElements = languages.map((language) => (
    <div key={language.name}
      style={{
        backgroundColor: language.backgroundColor,
        color: language.color,
      }}
      className="language-div"
    >
      <span>{language.name}</span>
    </div>
  ));

  function LanguageViews() {
    return (
      <section className="languages-container">{languageElements}</section>
    );
  }

  function KeyboardView(){
    return (
      <section className="keyboard-container">
        {keyBoardElements}
      </section>
    )
  }

  return (
    <div className="main-container">
      <HeaderView />
      <LanguageViews />
      <WordView />
      <KeyboardView/>
      <button className="base-button">New Game</button>
    </div>
  );
}
