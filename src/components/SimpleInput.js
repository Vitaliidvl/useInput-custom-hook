import { useRef } from 'react';

import useInput from '../hooks/use-input';

const SimpleInput = (props) => {
  const {
    value: enteredName,
    isValid: enteredNameIsValid,
    hasError: nameInputHasError,
    valueChangeHandler: nameChangeHandler,
    inputBlurHandler,
    reset: resetHandler,
  } = useInput((value) => value !== '');
  const nameInputRef = useRef();

  const {
    value: enteredEmail,
    isValid: enteredEmailIsValid,
    hasError: emailInputHasError,
    valueChangeHandler: emailInputChangeHandler,
    inputBlurHandler: inputEmailBlurHandler,
    reset: resetEmailHandler,
  } = useInput((value) => value.includes('@'));

  let formIsValid = false;

  if (enteredNameIsValid && enteredEmailIsValid) {
    formIsValid = true;
  }

  const formSubmitHandler = (event) => {
    event.preventDefault();
    if (!enteredNameIsValid) {
      return;
    }

    console.log(enteredName);
    const enteredValue = nameInputRef.current.value;
    console.log(enteredValue);
    //nameInputRef.current.value = ''; not ideal
    resetHandler();

    resetEmailHandler();
  };

  const nameInputClasses = nameInputHasError
    ? 'form-control invalid'
    : 'form-control';

  const emailInputClasses = emailInputHasError
    ? 'form-control invalid'
    : 'form-control';

  return (
    <form onSubmit={formSubmitHandler}>
      <div className={nameInputClasses}>
        <label htmlFor="name">Your Name</label>
        <input
          ref={nameInputRef}
          type="text"
          id="name"
          onChange={nameChangeHandler}
          onBlur={inputBlurHandler}
          value={enteredName}
        />
        {nameInputHasError && (
          <p style={{ color: 'red' }}>Name must not be empty.</p>
        )}
      </div>

      <div className={emailInputClasses}>
        <label htmlFor="email">Your E-mail</label>
        <input
          ref={nameInputRef}
          type="email"
          id="email"
          onChange={emailInputChangeHandler}
          onBlur={inputEmailBlurHandler}
          value={enteredEmail}
        />
        {emailInputHasError && (
          <p style={{ color: 'red' }}>Please enter a valid email.</p>
        )}
      </div>
      <div className="form-actions">
        <button disabled={!formIsValid}>Submit</button>
      </div>
    </form>
  );
};

export default SimpleInput;
