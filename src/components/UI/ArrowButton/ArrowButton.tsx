import { type } from "os";

type PropsArrowButton = {
  isOptionsOpen: boolean;
};
const ArrowButton = ({ isOptionsOpen }: PropsArrowButton) => (
  <button
    className={`transform ${isOptionsOpen ? "rotate-180" : "rotate-0"} p-1 cursor-pointer mr-2`}
  >
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="h-6 w-6"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
    </svg>
  </button>
);

export default ArrowButton;
