import React from "react";
import classes from "./checkbox.module.css";
interface OptionCheckBoxProps {
  title: string;
  onClick: Function;
  value: boolean;
  id: string;
}

export default function OptionCheckBox(props: OptionCheckBoxProps) {
  return (
    <div
      className="flex items-center mb-3"
      id={props.id}
      onClick={() => props.onClick(props.id)}
    >
      <div
        className={`w-6 h-6 box-transparent border rounded mr-2 ${
          props.value ? "bg-green-500" : "bg-custom-grey"
        }`}
      ></div>
      <span className={classes.option}>{props.title}</span>
    </div>
  );
}
