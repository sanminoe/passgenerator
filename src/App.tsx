import React, { useEffect } from "react";
import Generator from "./Pages/Generator";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Home from "./Pages/Home";
import "./App.css";
function App() {
  return (
    <div className="App">
      <header className="flex justify-between text-white">
        <article>
          <h1>Logo</h1>
        </article>
        <section>
          <ul className="flex items-center">
            <li>Home</li>
            <li>
              <a>Generate a password</a>
            </li>
          </ul>
        </section>
      </header>
      <div className="flex justify-center">
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Generator />} />
            <Route path="/generator" element={<Generator />} />
          </Routes>
        </BrowserRouter>
      </div>
    </div>
  );
}

export default App;
