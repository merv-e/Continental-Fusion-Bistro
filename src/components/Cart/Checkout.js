import classes from "./Checkout.module.css";
import { useRef, useState } from "react";

// simple validation of the form inputs
const isStringValid = (value) => value.trim() !== "";
const isPostalCodeValid = (value) => value.trim().length < 5;
const isEmailValid = (value) => value.trim().includes("@");

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

    console.log(isFormValid);

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
        />
      </div>
      {!formInputValidy.name && (
        <p className={classes.isEmpty}>Please write your full name.</p>
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
        <p className={classes.isEmpty}>Please write your street name.</p>
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
        <p className={classes.isEmpty}>Please write a valid postal code.</p>
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
        <p className={classes.isEmpty}>Please write your city.</p>
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
        <p className={classes.isEmpty}>Please write a valid e-mail address.</p>
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
