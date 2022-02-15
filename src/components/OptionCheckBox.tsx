import React, { MouseEventHandler } from "react";

interface OptionCheckBoxProps {
  title: string;
  onClick: Function;
  value: boolean;
  id: string;
}

export default function OptionCheckBox(props: OptionCheckBoxProps) {
  return (
    <div className="flex items-center mb-2" id={props.id}>
      <div
        className={`w-4 h-4 box-transparent border rounded mr-2 ${
          props.value ? "bg-green-300" : "bg-white"
        }`}
        onClick={() => props.onClick(props.id)}
      ></div>
      <span>{props.title}</span>
    </div>
  );
}
