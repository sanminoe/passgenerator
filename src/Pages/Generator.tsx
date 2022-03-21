import React, { SyntheticEvent, useEffect, useState } from "react";
import OptionCheckBox from "../components/OptionCheckBox";
import OptionsCheckBoxes from "../components/OptionsCheckBoxes";

import generatePassword from "../helpers/generatePassword";
import generatePhrase from "../helpers/generatePhrase";
import validatePassword from "../helpers/validatePassword";
import { Error, Options } from "../types/PassGenerator";

interface StrengthData {
  name: string;
  color: string;
}

const strengthInfo: StrengthData[] = [
  {
    name: "You must activate atleast one option",
    color: "bg-red-500",
  },
  {
    name: "Weak",
    color: "bg-red-500",
  },
  {
    name: "Medium",
    color: "bg-orange-500",
  },
  {
    name: "Good",
    color: "bg-green-500",
  },
  {
    name: "Strong",
    color: "bg-blue-700",
  },
];
const Generator = () => {
  const [passStrength, setPassStrength] = useState(0);

  let [strength, setStrength] = useState<StrengthData>(
    strengthInfo[passStrength]
  );

  let [passLength, setPassLength] = useState(6);
  const [rangeLength, setRangeLength] = useState(6);

  let [options, setOptions] = useState<Options>({
    includeNumbers: true,
    includeSymbols: true,
    includeUpperCase: true,
    includeLowerCase: true,
    includeWords: false,
  });
  const [generatorType, setGeneratorType] = useState("password");

  const [errors, setErrors] = useState<Error[]>([]);

  let [password, setPassword] = useState(generatePassword(passLength, options));

  const [isOptionsOpen, setIsOptionsOpen] = useState(false);

  const [separator, setSeparator] = useState(" ");

  let canGenerate = true;

  if (
    options.includeNumbers ||
    options.includeLowerCase ||
    options.includeSymbols ||
    options.includeUpperCase ||
    options.includeWords
  ) {
    canGenerate = true;
  } else {
    canGenerate = false;
  }

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

  const optionsShowHandler = () => {
    setIsOptionsOpen(!isOptionsOpen);
  };

  const changePassLengthInputHandler = (
    e: SyntheticEvent<HTMLInputElement>
  ) => {
    const val = +e.currentTarget.value;
    if (val > 64) {
      setRangeLength(64);
      setPassLength(64);
    } else if (generatorType === "password" && val < 6) {
      setRangeLength(6);
      setPassLength(6);
    } else if (generatorType === "phrase" && val < 3) {
      setRangeLength(3);
      setPassLength(3);
    } else {
      setRangeLength(+e.currentTarget.value);
      setPassLength(+e.currentTarget.value);
    }
  };

  useEffect(() => {
    if (generatorType === "password") {
      setPassword(generatePassword(6, options));
      setRangeLength(6);
      setPassLength(6);
    } else {
      setPassword(
        generatePhrase(3, {
          separator: separator,
          includelowercase: options.includeLowerCase,
          includeuppercase: options.includeUpperCase,
        })
      );
      setRangeLength(3);
      setPassLength(3);
    }
  }, [generatorType]);

  useEffect(() => {
    setErrors(validatePassword(password));
  }, [password]);

  useEffect(() => {
    let cErrors = 0;

    for (const err of errors) {
      if (!err.valid) {
        cErrors += 1;
      }
    }

    if (cErrors === 0) setStrength(strengthInfo[4]);
    else if (cErrors === 1) setStrength(strengthInfo[3]);
    else if (cErrors === 2) setStrength(strengthInfo[2]);
    else setStrength(strengthInfo[1]);
  }, [errors]);

  return (
    <div className="w-5/6 md:w-2/5 flex flex-col justify-center rounded">
      <section className="flex flex-col items-center">
        <div className="flex w-11/12 text-white my-2">
          <div className="flex justify-evenly w-full">
            <button
              onClick={() => setGeneratorType("password")}
              className={generatorType === "password" ? "border-b" : ""}
            >
              Password
            </button>
            <button
              onClick={() => setGeneratorType("phrase")}
              className={generatorType === "phrase" ? "border-b" : ""}
            >
              Phrase
            </button>
          </div>
        </div>
        <div className="text-white mt-2 text-xl">
          <h3>
            {generatorType === "password"
              ? "Password Generator"
              : "Pass Phrase Generator"}
          </h3>
        </div>
        <section className="w-11/12 flex flex-col justify-center">
          <article className="flex mt-5">
            <div className="flex flex-col w-full">
              <input
                type="text"
                name="pass"
                className="bg-custom-grey text-white w-full p-1 text-center mb-1 outline-none rounded"
                value={password}
                onChange={(e) => setPassword(e.currentTarget.value)}
                disabled={!canGenerate}
                autoCorrect="false"
              />
              {generatorType === "password" ? (
                <div
                  className={`flex flex-col w-full text-center items-center justify-center mt-2 rounded ${strength.color} text-white`}
                >
                  <p>{strength.name}</p>
                </div>
              ) : null}
            </div>
          </article>

          {generatorType === "password" && canGenerate ? (
            <section className={`mt-4`}>
              {/* Validation */}
              <ul className="flex flex-col mx-1 items-start rounded">
                {errors.map((e: Error) => (
                  <li
                    key={e.id}
                    className={`${
                      e.valid ? "text-green-500" : "text-red-500"
                    } flex items-center text-sm`}
                  >
                    <span className="mr-2">
                      {e.valid ? (
                        <svg
                          className="w-6 h-6"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M5 13l4 4L19 7"
                          />
                        </svg>
                      ) : (
                        <svg
                          className="w-6 h-6"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M6 18L18 6M6 6l12 12"
                          />
                        </svg>
                      )}
                    </span>
                    <span>{e.msg}</span>
                  </li>
                ))}
              </ul>
            </section>
          ) : null}

          <section className="text-white mt-4">
            <div
              className="flex justify-between items-center bg-custom-grey rounded hover:bg-[rgb(167,167,167)] cursor-pointer"
              onClick={optionsShowHandler}
            >
              <h3 className="ml-2">Options</h3>
              <button
                className={`transform ${
                  isOptionsOpen ? "rotate-180" : "rotate-0"
                } p-1 cursor-pointer mr-2`}
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
            <div className=" bg-[#4e4e4e33] flex justify-center rounded mt-3">
              <article
                className="w-11/12 mt-2 overflow-hidden"
                style={{ height: isOptionsOpen ? "100%" : "1px" }}
              >
                <p>
                  {generatorType === "password"
                    ? "Password length"
                    : "Number of Words"}
                </p>
                <div className="flex items-center mt-2">
                  <input
                    type="range"
                    name="passLength"
                    id="passwordLength"
                    className="w-4/5 form-range appearance-none h-0.5 p-0 rounded slider-thumb outline-none mr-4"
                    value={rangeLength}
                    max="64"
                    min={generatorType === "password" ? "6" : "3"}
                    onChange={(e) => setRangeLength(+e.currentTarget.value)}
                    onMouseUp={sendLengthHandler}
                    onTouchEnd={sendLengthHandler}
                  />
                  <input
                    min={generatorType === "password" ? "6" : "3"}
                    max="48"
                    type="number"
                    className="bg-custom-grey rounded text-center"
                    value={rangeLength}
                    onChange={changePassLengthInputHandler}
                  />
                </div>
                <OptionsCheckBoxes
                  options={options}
                  separator={separator}
                  onChangeSeparator={(e) => {
                    setSeparator(e.currentTarget.value);
                  }}
                  optionsChangeHandler={optionsChangeHandler}
                  generatorType={generatorType}
                />
              </article>
            </div>
          </section>
        </section>
        <div className="w-full md:w-5/6">
          <div>
            <button
              className="w-full mt-4 h-12 text-xl rounded bg-custom-yellow text-black"
              onClick={() =>
                setPassword(
                  generatorType === "password"
                    ? generatePassword(passLength, options)
                    : generatePhrase(passLength, {
                        separator: separator,
                        includelowercase: options.includeLowerCase,
                        includeuppercase: options.includeUpperCase,
                      })
                )
              }
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
        </div>
      </section>
      <footer className="flex justify-center mt-2">
        <a
          href="https://github.com/sanminoe/passgenerator"
          className="text-white flex-col justify-center text-center"
          target="_blank"
          rel="noreferrer"
        >
          <img
            className="mx-auto w-6"
            src="./GitHub-Mark-Light-32px.png"
            alt="github logo"
          />
          <p>GitHub</p>
        </a>
      </footer>
    </div>
  );
};

export default Generator;
