interface Props {
  strength: number;
}

export default function StrengthBar(props: Props) {
  return (
    <div className="box-transparent w-full border h-3 rounded relative">
      <div className={`bg-green-200 h-full`} style={{ width: `${props.strength}%` }}></div>
    </div>
  );
}
