import { ChangeEventHandler, MouseEventHandler } from "react";
import { Options } from "../../types/PassGenerator";
import OptionCheckBox from "./OptionCheckBox";

interface PropsOptionsCheckBoxes {
  options: Options;
  generatorType: string;
  optionsChangeHandler: Function;
  separator: string;
  onChangeSeparator: ChangeEventHandler<HTMLInputElement>;
}

const OptionsCheckBoxes = ({
  options,
  generatorType,
  optionsChangeHandler,
  separator,
  onChangeSeparator,
}: PropsOptionsCheckBoxes) => {
  return (
    <div className="flex flex-col mt-4">
      <OptionCheckBox
        value={options.includeUpperCase}
        title="Include uppercase letters"
        onClick={optionsChangeHandler}
        id={"includeUpperCase"}
      />
      {generatorType === "password" ? (
        <OptionCheckBox
          value={options.includeNumbers}
          title="Include numbers"
          onClick={optionsChangeHandler}
          id={"includeNumbers"}
        />
      ) : null}
      <OptionCheckBox
        value={options.includeLowerCase}
        title="Include lowercase letters"
        onClick={optionsChangeHandler}
        id={"includeLowerCase"}
      />
      {generatorType === "password" ? (
        <OptionCheckBox
          value={options.includeSymbols}
          title="Include special symbols"
          onClick={optionsChangeHandler}
          id={"includeSymbols"}
        />
      ) : null}

      {generatorType === "phrase" ? (
        <div className="mb-4">
          <label className="flex">
            <div className="mr-4">
              <span>Separator</span>
            </div>
            <div>
              <input
                type="text"
                placeholder="Separator"
                onChange={onChangeSeparator}
                value={separator}
                className="bg-[#4e4e4e33] pl-2 rounded-sm text-xl"
              />
            </div>
          </label>
        </div>
      ) : null}
    </div>
  );
};

export default OptionsCheckBoxes;
