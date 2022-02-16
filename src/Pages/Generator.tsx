import React, { useEffect, useState } from "react";
import OptionCheckBox from "../components/OptionCheckBox";

import generatePassword from "../helpers/generatePassword";
import validatePassword from "../helpers/validatePassword";
import { Error, Options } from "../types/PassGenerator";

interface StrengthData {
  name: string;
  color: string;
}

const strengthInfo: StrengthData[] = [
  {
    name: "Weak",
    color: "bg-red-500",
  },
  {
    name: "Medium",
    color: "bg-orange-500",
  },
  {
    name: "Strong",
    color: "bg-green-500",
  },
];
export default () => {
  const [passStrength, setPassStrength] = useState<StrengthData>(strengthInfo[1]);
  let [passLength, setPassLength] = useState(7);
  const [rangeLength, setRangeLength] = useState(7);

  let [options, setOptions] = useState<Options>({
    includeNumbers: false,
    includeSymbols: false,
    includeUpperCase: false,
    includeLowerCase: false,
    includeWords: true,
  });

  const [errors, setErrors] = useState<Error[]>([]);
  let [password, setPassword] = useState(generatePassword(passLength, options));

  const [isOptionsOpen, setIsOptionsOpen] = useState(false);

  let copyPasswordHandler = () => {
    navigator.clipboard.writeText(password).then(() => {
      alert("Password copied");
    });
  };

  const optionsChangeHandler = (id: keyof Options) => {
    let opt: Options = { ...options };

    opt[id] = !opt[id];

    setOptions(opt);
  };

  let sendLengthHandler = () => {
    setPassLength(rangeLength);
  };

  useEffect(() => {
    setErrors(validatePassword(password));
  }, [password]);

  useEffect(() => {
    if (errors.length >= 3) {
      setPassStrength(strengthInfo[0]);
    } else if (errors.length >= 1 && errors.length < 3) {
      setPassStrength(strengthInfo[1]);
    } else {
      setPassStrength(strengthInfo[2]);
    }
  }, [errors]);

  return (
    <div className="w-5/6 flex flex-col justify-center my-4 rounded">
      <section className="flex flex-col items-center">
        <div className="text-white mt-2 text-xl">
          <h3>Password Generator</h3>
        </div>
        <section className="w-11/12 flex flex-col justify-center">
          <article className="flex mt-5">
            <div className="flex flex-col w-full">
              <input
                type="text"
                name="pass"
                className=" border-b border-custom-grey text-white w-full bg-transparent p-1 text-center mb-1 outline-none"
                value={password}
                onChange={(e) => setPassword(e.currentTarget.value)}
              />
              <div
                className={`flex flex-col w-full text-center items-center justify-center mt-2 rounded ${passStrength.color} text-white`}
              >
                <p>{passStrength.name}</p>
              </div>
            </div>
          </article>

          <section className={`mt-4`}>
            {/* Validation */}
            <ul className="flex flex-col mx-1 items-center bg-[rgb(220,38,38,0.1)] rounded">
              {errors.map((e: Error) => (
                <li key={e.id} className="text-red-500">
                  {e.msg}
                </li>
              ))}
            </ul>
          </section>

          <section className="text-white mt-4">
            <div className="flex justify-between items-center">
              <h3>Options</h3>
              <button
                onClick={() => setIsOptionsOpen(!isOptionsOpen)}
                className={`transform ${
                  isOptionsOpen ? "rotate-180" : "rotate-0"
                } p-1 cursor-pointer`}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </button>
            </div>
            <div className=" bg-[rgb(0,0,0,0.2)] flex justify-center rounded mt-3">
              <article
                className="w-11/12 mt-2 overflow-hidden"
                style={{ height: isOptionsOpen ? "100%" : "1px" }}
              >
                <p>Length</p>
                <div className="flex items-center mt-2">
                  <input
                    type="range"
                    name="passLength"
                    id="passwordLength"
                    className="w-4/5 form-range appearance-none h-0.5 p-0 rounded slider-thumb outline-none mr-4"
                    value={rangeLength}
                    max="64"
                    min="7"
                    onChange={(e) => setRangeLength(+e.currentTarget.value)}
                    onMouseUp={sendLengthHandler}
                    onTouchEnd={sendLengthHandler}
                  />
                  <input
                    min="6"
                    max="48"
                    type="number"
                    className="bg-custom-grey rounded text-center"
                    value={rangeLength}
                  />
                </div>
                <div className="flex flex-col mt-4">
                  <OptionCheckBox
                    value={options.includeUpperCase}
                    title="Include UpperCase"
                    onClick={optionsChangeHandler}
                    id={"includeUpperCase"}
                  />
                  <OptionCheckBox
                    value={options.includeNumbers}
                    title="Include numbers"
                    onClick={optionsChangeHandler}
                    id={"includeNumbers"}
                  />
                  <OptionCheckBox
                    value={options.includeLowerCase}
                    title="Include lowercase letters"
                    onClick={optionsChangeHandler}
                    id={"includeLowerCase"}
                  />
                  <OptionCheckBox
                    value={options.includeSymbols}
                    title="Include special symbols"
                    onClick={optionsChangeHandler}
                    id={"includeSymbols"}
                  />
                  <OptionCheckBox
                    value={options.includeWords}
                    title="Include word"
                    onClick={optionsChangeHandler}
                    id={"includeWords"}
                  />
                </div>
              </article>
            </div>
          </section>
          <div>
            <button
              className="w-full mt-4 h-12 text-xl rounded bg-custom-yellow text-black"
              onClick={() => setPassword(generatePassword(passLength, options))}
            >
              Generate
            </button>
          </div>
          <div>
            <button
              className="w-full my-4 h-12 rounded bg-custom-grey text-white"
              onClick={copyPasswordHandler}
            >
              Copy
            </button>
          </div>
        </section>
      </section>
    </div>
  );
};
