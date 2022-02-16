import React, { useEffect } from "react";
import Generator from "./Pages/Generator";
import im from "./GitHub-Mark-Light-32px.png";
import "./App.css";
function App() {
  return (
    <>
      {/* <header className="flex justify-center text-white border-b border-gray-600">
        <article className="my-2">
          <h1>Logo</h1>
        </article>
      </header> */}
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
        >
          <img className="mx-auto" src="./GitHub-Mark-Light-32px.png" />
          <p>GitHub</p>
        </a>
      </footer>
    </>
  );
}

export default App;
