import { v4 as uuid } from "uuid";

const validatePassword = (password: string) => {
  let errors = [
    {
      id: uuid(),
      msg: "Too short!",
      valid: true,
    },
    {
      id: uuid(),
      msg: "At least 3 letters!",
      valid: true,
    },
    {
      id: uuid(),
      msg: "At least 1 uppercase letter!",
      valid: true,
    },
    {
      id: uuid(),
      msg: "At least 2 numbers!",
      valid: true,
    },
    {
      id: uuid(),
      msg: "Contains 1 special symbol i.e: !@*&$+-!",
      valid: true,
    },
  ];

  // des
  // length > 6
  // contains at least 3 letters
  // contains at least 2 numbers
  // contains at least 1 symbol
  // contains at least 1 uppercase character

  // warning levels 0, 1,2,3

  // check password length
  if (password.length < 6) {
    errors[0].valid = false; // pass too short!
  }

  // check for letters

  let lettersAmount = password.match(/[a-zA-Z]/gi);

  if (lettersAmount) {
    if (lettersAmount?.length! < 3) {
      errors[1].valid = false; // The password must contain at least 3 letters!

      // check for uppercase letters
    }
    let uppercase = password.search(/[A-Z]/g);

    if (uppercase === -1) {
      errors[2].valid = false; // The password must contain at least 1 uppercase letter!
    }
  } else {
    errors[1].valid = false; // The password must contain at least 3 letters!
    errors[2].valid = false; // The password must contain at least 1 uppercase letter!
  }

  // check for numbers
  let numbersAmount = password.match(/[0-9]/g);

  if (numbersAmount) {
    if (numbersAmount.length < 2) {
      errors[3].valid = false; // The password must contain at least 2 numbers!
    }
  } else {
    errors[3].valid = false; // The password must contain at least 2 numbers!
  }

  // check symbols

  let symbolsAmount = password.match(/[!@#$%^&*()_+~`|}{[\\\]:;?><,./\-=]/g);

  if (!symbolsAmount) {
    errors[4].valid = false; // The password must contain 1 special symbol i.e: !@*&$+-!
  }

  return errors;
};
export default validatePassword;
