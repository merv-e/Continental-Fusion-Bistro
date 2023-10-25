import CartContext from "../../store/cart-context";
import classes from "./Checkout.module.css";
import { useState } from "react";

const Checkout = (props) => {
  // const handleSubmit = (ev) => {
  //     ev.preventDefault();
  // };

  const [fullName, setFullName] = useState("");
  const [street, setStreetName] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [city, setCity] = useState("");

  const [email, setEmail] = useState("");

  const [uzerineGelindi, setUzerineGelindi] = useState(false);
  const [boslukVar, setBoslukVar] = useState();

  const orderComplete = () => {
    console.log("Order Completed. Thank you for choosing our restaurant.");
  };

  return (
    <>
      <form
        className={classes["form-checkout"]}
        onSubmit={(ev) => ev.preventDefault()}
      >
        <div>
          <label htmlFor="fullName">Full Name</label>
          <input
            type="text"
            className={classes.input}
            id="fullName"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
          />
        </div>
       

        <div>
          <label htmlFor="street">Street</label>
          <input
            type="text"
            className={classes.input}
            id="street"
            value={street}
            onChange={(e) => setStreetName(e.target.value)}
          />
        </div>
        

        <div>
          <label htmlFor="post-code">Postal Code</label>
          <input
            type="text"
            className={classes.input}
            id="post-code"
            value={postalCode}
            onChange={(e) => setPostalCode(e.target.value)}
          />
        </div>
       

        <div>
          <label htmlFor="city">City</label>
          <input
            type="text"
            className={classes.input}
            id="city"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            
          />
        </div>
       

        <div>
          <label htmlFor="e-mail">E-mail Adress</label>
          <input
            type="e-mail"
            className={classes.input}
            id="e-mail"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        

        <div className={classes["button-container"]}>
          <button
            type="button"
            className={classes.cancelOrder}
            onClick={props.onCancel}
          >
            Cancel
          </button>

          <button
            type="submit"
            onClick={orderComplete}
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
