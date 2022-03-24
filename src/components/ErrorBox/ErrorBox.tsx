type PropsErrorBox = {
  valid: boolean;
  msg: string;
};

const ErrorBox = ({ valid, msg }: PropsErrorBox) => {
  return (
    <li className={`${valid ? "text-green-500" : "text-red-500"} flex items-center`}>
      <span className="mr-2">
        {valid ? (
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
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
      <span>{msg}</span>
    </li>
  );
};

export default ErrorBox;
