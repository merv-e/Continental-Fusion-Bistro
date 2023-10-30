import classes from "./Checkout.module.css";
import { useEffect, useRef, useState } from "react";

// basic validation of the form inputs
const stringRegex = /^[A-Za-z\s'-]+$/;
const isStringValid = (value) => stringRegex.test(value);

const pCodeRegex = /^\d{1,4}$/;
const isPostalCodeValid = (value) => pCodeRegex.test(value);

const eMailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const isEmailValid = (value) => eMailRegex.test(value);

const Checkout = (props) => {
  const [formInputValidy, setFormInputValidy] = useState({
    name: true,
    street: true,
    postalCode: true,
    city: true,
    email: true,
  });

  const fullNameInput = useRef();
  const streetInput = useRef();
  const pCodeInput = useRef();
  const cityInput = useRef();
  const emailInput = useRef();

  //TODO: create custom hook

  const handleSubmit = (e) => {
    e.preventDefault();

    // variables with current names after getting user input
    const fullName = fullNameInput.current.value;
    const streetName = streetInput.current.value;
    const pCode = pCodeInput.current.value;
    const city = cityInput.current.value;
    const email = emailInput.current.value;

    // checking whether user's info is valid in the input fields
    const fullNameValidity = isStringValid(fullName);
    const streetNameValidity = isStringValid(streetName);
    const pCodeValidity = isPostalCodeValid(pCode);
    const cityValidity = isStringValid(city);
    const emailValidity = isEmailValid(email);

    // check for validity and then form will be valid if these values are valid
    setFormInputValidy({
      name: fullNameValidity,
      street: streetNameValidity,
      postalCode: pCodeValidity,
      city: cityValidity,
      email: emailValidity,
    });

    const isFormValid =
      fullNameValidity &&
      streetNameValidity &&
      cityValidity &&
      pCodeValidity &&
      emailValidity;

    if (!isFormValid) {
      return;
    }

    props.onOrder({
      name: fullName,
      street: streetName,
      postalCode: pCode,
      city: city,
      email: email,
    });
  };

  // orderCompleted
  const [isOrderCompleted, setIsOrderCompleted] = useState(false);

  const orderForm = (
    <form className={classes["form-checkout"]} onSubmit={handleSubmit}>
      <div>
        <label htmlFor="fullName">Full Name</label>
        <input
          type="text"
          className={classes.input}
          id="fullName"
          ref={fullNameInput}
        />
      </div>
      {!formInputValidy.name && (
        <p className={classes.isEmpty}>
          Please enter your full name without using any special characters.
        </p>
      )}

      <div>
        <label htmlFor="street">Street</label>
        <input
          type="text"
          className={classes.input}
          id="street"
          ref={streetInput}
        />
      </div>
      {!formInputValidy.street && (
        <p className={classes.isEmpty}>
          Please enter your street name without using any special characters.
        </p>
      )}

      <div>
        <label htmlFor="post-code">Postal Code</label>
        <input
          type="text"
          className={classes.input}
          id="post-code"
          ref={pCodeInput}
        />
      </div>
      {!formInputValidy.postalCode && (
        <p className={classes.isEmpty}>
          Please enter a postal code that does not exceed 4 digits.
        </p>
      )}

      <div>
        <label htmlFor="city">City</label>
        <input
          type="text"
          className={classes.input}
          id="city"
          ref={cityInput}
        />
      </div>
      {!formInputValidy.city && (
        <p className={classes.isEmpty}>
          Please enter your city without using any special characters.
        </p>
      )}

      <div>
        <label htmlFor="e-mail">E-mail Adress</label>
        <input
          type="e-mail"
          className={classes.input}
          id="e-mail"
          ref={emailInput}
        />
      </div>
      {!formInputValidy.email && (
        <p className={classes.isEmpty}>Please enter a valid e-mail address.</p>
      )}

      <div className={classes["button-checkout"]}>
        <button className={classes.cancelOrder} onClick={props.onCancel}>
          Cancel
        </button>

        <button onClick={() => setIsOrderCompleted(true)}>
          Complete Order
        </button>
      </div>
      <h2>Total Amount: {props.totalAmount}</h2>
    </form>
  );

  return <>{!props.onOrderSuccess && orderForm}</>;
};

export default Checkout;
