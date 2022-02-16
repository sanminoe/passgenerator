import React, { MouseEventHandler } from "react";

interface OptionCheckBoxProps {
  title: string;
  onClick: Function;
  value: boolean;
  id: string;
}

export default function OptionCheckBox(props: OptionCheckBoxProps) {
  return (
    <div className="flex items-center mb-3" id={props.id}>
      <div
        className={`w-6 h-6 box-transparent border rounded mr-2 ${
          props.value ? "bg-green-600" : "bg-custom-grey"
        }`}
        onClick={() => props.onClick(props.id)}
      ></div>
      <span>{props.title}</span>
    </div>
  );
}
