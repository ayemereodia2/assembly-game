import { useState } from "react";
import { languages } from "../languages";

export default function App() {
  const [currentWords, setCurrentWords] = useState("react")

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

  const wordElement = currentWords.split("").map((character) => (
      <span className="word-box">{character.toUpperCase()}</span>
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

  return (
    <body>
      <HeaderView />
      <LanguageViews />
      <WordView />
    </body>
  );
}
