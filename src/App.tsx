import React from "react";
import Generator from "./Pages/Generator";
import "./App.css";

function App() {
  return (
    <>
      <div className="App w-full h-screen">
        <div className="flex justify-center items-center">
          <Generator />
        </div>
      </div>
    </>
  );
}

export default App;
