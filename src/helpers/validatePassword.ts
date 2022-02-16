import { v4 as uuid } from "uuid";

export default (password: string) => {
  let errors = [];

  // des
  // length > 6
  // contains at least 3 letters
  // contains at least 2 numbers
  // contains at least 1 symbol
  // contains at least 1 uppercase character

  // warning levels 0, 1,2,3

  // check password length
  if (password.length < 6) {
    errors.push({
      msg: "Password too short!",
      id: uuid(),
    });
  }

  // check for letters

  let lettersAmount = password.match(/[a-zA-Z]/gi);

  if (lettersAmount) {
    if (lettersAmount?.length! < 3) {
      errors.push({
        msg: "The password must contain at least 3 letters!",
        id: uuid(),
      });
      // check for uppercase letters
    }
    let uppercase = password.search(/[A-Z]/g);

    if (uppercase === -1) {
      errors.push({
        msg: "The password must contain at least 1 uppercase letter!",
        id: uuid(),
      });
    }
  } else {
    errors.push({
      msg: "The password must contain at least 3 letters!",
      id: uuid(),
    });
    errors.push({
      msg: "The password must contain at least 1 uppercase letter!",
      id: uuid(),
    });
  }

  // check for numbers
  let numbersAmount = password.match(/[0-9]/g);

  if (numbersAmount) {
    if (numbersAmount.length < 2) {
      errors.push({
        msg: "The password must contain at least 2 numbers!",
        id: uuid(),
      });
    }
  } else {
    errors.push({
      msg: "The password must contain at least 2 numbers!",
      id: uuid(),
    });
  }

  // check symbols

  let symbolsAmount = password.match(/[!@#$%^&*()_+~`|}{[\\\]:;?><,./\-=]/g);

  if (!symbolsAmount) {
    errors.push({
      msg: "The password must contain 1 special symbol i.e: !@*&$+-!",
      id: uuid(),
    });
  }

  console.log(errors);

  return errors;
};
