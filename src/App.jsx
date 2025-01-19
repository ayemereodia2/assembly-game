import { useState, useRef } from "react";
import { languages } from "../languages";

export default function App() {
  const alphabets = "abcdefghijklmnopqrstuvwxyz";
  const [guesses, setGuesses] = useState([]);
  const [isCorrect, setIsCorrect] = useState(Array(26).fill(false));
  const wrongGuessCount = useRef(0);
  const [keyboardStates, setKeyboardStates] = useState(
    Array(26).fill({
      KEY_STATE: "key-button-box",
    })
  );

  const [languageState, setLanguageState] = useState(
    languages.map((eachLanguage) => ({ ...eachLanguage, isGone: false }))
  );

  const currentPos = useRef(0);
  const currentWordTemp = "react".toUpperCase().split("");
  const remainderText = useRef("react");

  const [currentWords, setCurrentWords] = useState(
    Array(currentWordTemp.length).fill(" ")
  );
 

  const keyPressed = (char, id) => {
    setGuesses((prev) => (prev.includes(char) ? prev : [...prev, char]));
    
    if (currentWordTemp.includes(char.toUpperCase())) {
      remainderText.current = remainderText.current.toUpperCase();
      const arrayValue = remainderText.current
      const index = arrayValue.indexOf(char.toUpperCase());
      arrayValue.replace(char.toUpperCase(), " ");
    
      remainderText.current = arrayValue;

      setCurrentWords((oldChar) => {
        const updatedChars = [...oldChar]; // Create a copy of the old array
        
        updatedChars[index] = char.toUpperCase(); // Update the specific index
        
        return updatedChars; // Return the updated array
      });

      setIsCorrect((prev) => [(prev[id] = true), ...prev]);
      setKeyboardStates((prevKeyState) => [
        ...prevKeyState,
        (prevKeyState[id] = { KEY_STATE: "key-button-box-correct" }),
      ]);


    } else {
      currentPos.current  = currentPos.current + 1;

      setKeyboardStates((prevKeyState) => [
        ...prevKeyState,
        (prevKeyState[id] = { KEY_STATE: "key-button-box-incorrect" }),
      ]);
     
        setLanguageState((prevLanguageArray) => {
          const oldArray = [...prevLanguageArray]
          oldArray[currentPos.current - 1] = {...oldArray[currentPos.current - 1], isGone: true}
          return oldArray
        })
  
    }
  };

  function startNewGame() {
    currentPos.current = 0
    setLanguageState(prev => (prev.map(item => ({...item, isGone:false}))))
    setKeyboardStates(prev => (Array(26).fill({KEY_STATE: "key-button-box"})))
    setCurrentWords(prev => (Array(currentWordTemp.length).fill(" ")))
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
    <span key={index} className={"word-box"}>
      {character.toUpperCase()}
    </span>
  ));


  const keyBoardElements = alphabets.split("").map((char, id) => (
    <button
      onClick={() => keyPressed(char, id)}
      key={char}
      className={ keyboardStates[id].KEY_STATE }
    >
      {char.toUpperCase()}
    </button>
  ));

  function WordView() {
    return <section className="word-container">{wordElement}</section>;
  }

  const languageElements = languageState.map((language) => (
    <div
      key={language.name}
      style={{
        backgroundColor: language.backgroundColor,
        color: language.color,
      }}
      className={`language-div ${language.isGone ? "lost" : ""
      }`}
    >
      <span>{language.name}</span>
    </div>
  ));

  function LanguageViews() {
    return (
      <section className="languages-container">{languageElements}</section>
    );
  }

  function KeyboardView() {
    return <section className="keyboard-container">{keyBoardElements}</section>;
  }

  return (
    <div className="main-container">
      <HeaderView />
      <LanguageViews />
      <WordView />
      <KeyboardView />
      <button onClick={startNewGame} className="base-button">New Game</button>
    </div>
  );
}
