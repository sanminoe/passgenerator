import React from "react";
import Generator from "./Pages/Generator";
import "./App.css";
function App() {
  return (
    <>
      <div className="App">
        <div className="flex justify-center items-center">
          <Generator />
        </div>
      </div>
      <footer className="flex justify-center mt-2">
        <a
          href="https://github.com/sanminoe/passgenerator"
          className="text-white flex-col justify-center text-center"
          target="_blank"
          rel="noreferrer"
        >
          <img className="mx-auto" src="./GitHub-Mark-Light-32px.png" alt="github logo" />
          <p>GitHub</p>
        </a>
      </footer>
    </>
  );
}

export default App;
