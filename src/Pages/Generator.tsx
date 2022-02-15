import React, {
  ChangeEventHandler,
  FormEvent,
  MouseEventHandler,
  SyntheticEvent,
  useEffect,
  useState,
} from "react";
import OptionCheckBox from "../components/OptionCheckBox";
import StrengthBar from "../components/StrengthBar";
import generatePassword from "../helpers/generatePassword";
import validatePassword from "../helpers/validatePassword";
import { Error, Options } from "../types/PassGenerator";

export default () => {
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

  return (
    <div className="w-5/6 flex flex-col justify-center my-4 bg-white rounded">
      <section className="flex flex-col items-center">
        <div className="text-black mt-2 text-xl">
          <h3>Password Generator</h3>
        </div>
        <section className="w-11/12 flex flex-col justify-center">
          <article className="flex mt-5">
            <div className="flex flex-col w-full">
              <input
                type="text"
                name="pass"
                className="border rounded bg-white w-full p-1 text-center mb-1"
                value={password}
                onChange={(e) => setPassword(e.currentTarget.value)}
              />
              <StrengthBar strength={(errors.length / 5) * 100} />
            </div>
            <div className="flex flex-col w-2/12  items-center justify-between">
              <div className="text-black w-12 text-center">
                <p>Weak</p>
              </div>
            </div>
          </article>

          <section className="mt-4 ml-5">
            {/* Validation */}
            <ul className="flex flex-col list-disc">
              {errors.map((e: Error) => (
                <li key={e.id} className="text-red-600">
                  {e.msg}
                </li>
              ))}
            </ul>
          </section>

          <section>
            <div>
              <h3>Options</h3>
            </div>
            <div className="box-transparent flex justify-center rounded">
              <article className="w-11/12 mt-2">
                <p>Length</p>
                <div>
                  <input
                    type="range"
                    name="passLength"
                    id="passwordLength"
                    className="w-full form-range appearance-none h-0.5 p-0 rounded slider-thumb outline-none"
                    value={rangeLength}
                    max="64"
                    min="7"
                    onChange={(e) => setRangeLength(+e.currentTarget.value)}
                    onMouseUp={sendLengthHandler}
                    onTouchEnd={sendLengthHandler}
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
              className="w-full mt-4 h-12 border text-xl rounded"
              onClick={() => setPassword(generatePassword(passLength, options))}
            >
              Generate
            </button>
          </div>
          <div>
            <button className="w-full my-4 h-12 border rounded" onClick={copyPasswordHandler}>
              Copy
            </button>
          </div>
        </section>
      </section>
    </div>
  );
};
