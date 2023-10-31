import classes from "./Checkout.module.css";
import { useRef, useState } from "react";


// basic validation of the form inputs
const stringRegex = /^[A-Za-z\s'-]+$/;
const isStringValid = (value) => stringRegex.test(value);

const pCodeRegex = /^\d{1,4}$/;
const isPostalCodeValid = (value) => pCodeRegex.test(value);

const eMailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const isEmailValid = (value) => eMailRegex.test(value);


// Checkout Component
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

    // checking whether the info provided is valid or not in the input fields
    const fullNameValidity = isStringValid(fullName);
    const streetNameValidity = isStringValid(streetName);
    const pCodeValidity = isPostalCodeValid(pCode);
    const cityValidity = isStringValid(city);
    const emailValidity = isEmailValid(email);

// checks for validity and eventually the form will be valid if all of these values are valid
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

  const orderForm = (
    <form className={classes["form-checkout"]} onSubmit={handleSubmit}>
      <div>
        <label htmlFor="fullName">Full Name</label>
        <input
          type="text"
          className={classes.input}
          id="fullName"
          ref={fullNameInput}
          placeholder="Jane Doe"
        />
      </div>
      {!formInputValidy.name && (
        <p className={classes.isEmpty}>Please enter your full name.</p>
      )}

      <div>
        <label htmlFor="street">Street</label>
        <input
          type="text"
          className={classes.input}
          id="street"
          ref={streetInput}
          placeholder="Willow"
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
          placeholder="1245"
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
          placeholder="New York"
        />
      </div>
      {!formInputValidy.city && (
        <p className={classes.isEmpty}>
          Please enter your <strong>city</strong> without using any special
          characters.
        </p>
      )}

      <div>
        <label htmlFor="e-mail">E-mail Adress</label>
        <input
          type="e-mail"
          className={classes.input}
          id="e-mail"
          ref={emailInput}
          placeholder="abcdef12345-test@mail.com"
        />
      </div>
      {!formInputValidy.email && (
        <p className={classes.isEmpty}>Please enter a valid e-mail address.</p>
      )}

      <div className={classes["button-checkout"]}>
        <button className={classes.cancelOrder} onClick={props.onCancel}>
          Cancel
        </button>

        <button>Complete Order</button>
      </div>
      <h2>Total Amount: {props.totalAmount}</h2>
    </form>
  );

  return <>{!props.onOrderSuccess && orderForm}</>;
};

export default Checkout;
