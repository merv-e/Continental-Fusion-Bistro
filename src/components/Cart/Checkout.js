import CartContext from "../../store/cart-context";
import classes from "./Checkout.module.css";
import { useRef, useState } from "react";

// simple validation of the form inputs
const isStringValid = (value) => value.trim().length > 0;
const isPostalCodeValid = (value) => value.trim().length < 5;
const isEmailValid = (value) => value.includes("@");

const Checkout = (props) => {
  const [formInputValidy, setFormInputValidy] = useState({
    name: true,
    street: true,
    postalCode: true,
    city: true,
    email: true,
  });

  const fullnameInput = useRef();
  const streetInput = useRef();
  const pCodeInput = useRef();
  const cityInput = useRef();
  const emailInput = useRef();

  const handleSubmit = (e) => {
    e.preventDefault();

    const fullName = fullnameInput.current.value;
    const streetName = streetInput.current.value;
    const pCode = pCodeInput.current.value;
    const city = cityInput.current.value;
    const email = emailInput.current.value;

    const fullNameVal = !isStringValid(fullName);
    const streetNameVal = !isStringValid(streetName);
    const pCodeVal = !isPostalCodeValid(pCode);
    const cityVal = !isStringValid(city);
    const emailVal = !isEmailValid(email);

    setFormInputValidy({
      name: fullNameVal,
      street: streetNameVal,
      postalCode: pCodeVal,
      city: cityVal,
      email: emailVal,
    });

    const isFormValid =
      fullNameVal && streetNameVal && cityVal && pCodeVal && emailVal;

    if (isFormValid) {
      return;
    }
  };

  return (
    <>
      <form className={classes["form-checkout"]} onSubmit={handleSubmit}>
        <div>
          <label htmlFor="fullName">Full Name</label>
          <input
            type="text"
            className={classes.input}
            id="fullName"
            ref={fullnameInput}
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
          <p className={classes.isEmpty}>Please write your postal code.</p>
        )}

        <div>
          <label htmlFor="city">City</label>
          <input type="text" className={classes.input} id="city" ref={cityInput} />
        </div>
        {!formInputValidy.city && (
          <p className={classes.isEmpty}>Please write your city.</p>
        )}

        <div>
          <label htmlFor="e-mail">E-mail Adress</label>
          <input type="e-mail" className={classes.input} id="e-mail" ref={emailInput}/>
        </div>
        {!formInputValidy.email && (
          <p className={classes.isEmpty}>Please write your e-mail address.</p>
        )}

        <div className={classes["button-checkout"]}>
          <button
            type="button"
            className={classes.cancelOrder}
            onClick={props.onCancel}
          >
            Cancel
          </button>

          <button
          // type="submit"
          // disabled={formInputValidy}
          // onClick={orderComplete}
          >
            Complete Order
          </button>
        </div>
      </form>
      <h2>Total Amount: {props.totalAmount}</h2>
    </>
  );
};

export default Checkout;
