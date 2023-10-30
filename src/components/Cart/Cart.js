import { useContext, useState, Fragment } from "react";
import classes from "./Cart.module.css";

import Modal from "../UI/Modal";
import CartContext from "../../store/cart-context";
import CartItem from "../Cart/CartItem";
import Checkout from "./Checkout";

const Cart = (props) => {
  //Loading and error states
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);

  // order states
  const [isOrdered, setIsOrdered] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isOrderSuccessful, setIsOrderSuccessful] = useState(false);

  const cartCtx = useContext(CartContext);

  const totalAmount = `$${cartCtx.totalAmount.toFixed(2)}`;
  const hasItems = cartCtx.items.length > 0;

  const cartItemAddHandler = (item) => {
    cartCtx.addItem({ ...item, amount: 1 });
  };
  const cartItemRemoveHandler = (id) => {
    cartCtx.removeItem(id);
  };

  const submitOrder = async (userData) => {
    setIsLoading(true);
    setIsOrdered(false);
    setIsSubmitted(true);

    try {
      const response = await fetch(
        "https://food-app-88782-default-rtdb.europe-west1.firebasedatabase.app/orders.json",
        {
          method: "POST",
          body: JSON.stringify({
            userData,
            orderedItems: cartCtx.items,
          }),
        }
      );
      if (!response.ok) {
        throw new Error("Order is not successful!");
      }
      setIsOrderSuccessful(true);
      setIsLoading(false);
      setIsSubmitted(false);
      cartCtx.resetItems();
    } catch (error) {
      setIsLoading(false);
      setError(error.message);
      // setIsOrderSuccessful(false);
    }
  };

  const cartItems = (
    <ul className={classes["cart-items"]}>
      {cartCtx.items.map((item) => (
        <CartItem
          key={item.id}
          name={item.name}
          amount={item.amount}
          price={item.price}
          onAdd={cartItemAddHandler.bind(null, item)}
          onRemove={cartItemRemoveHandler.bind(null, item.id)}
        />
      ))}
    </ul>
  );

  const cartModalContent = (
    <Fragment>
      {cartItems}
      <div className={classes.total}>
        <span>Total Amount</span>
        <span>{totalAmount}</span>
      </div>
      <div className={classes.actions}>
        <button className={classes["button--alt"]} onClick={props.onClose}>
          Close
        </button>
        {hasItems && (
          <button className={classes.button} onClick={() => setIsOrdered(true)}>
            Order
          </button>
        )}
      </div>
    </Fragment>
  );

  // const loading = <p className={classes.loading}>Loading...</p>;

  const successfulOrderContent = (
    <div className={classes["succesfull-order"]}>
      <p className={classes["order-succesfull-text"]}>
        Order Succesfully Completed! Please check your e-mail address for
        confirmation.
      </p>
      <button onClick={props.onClose}>Close</button>
    </div>
  );

  const err = (
    <div className={classes.error}>
      <p className={classes["error-text"]}>Something went wrong! Please try again!</p>
      <button onClick={props.onClose}>Close</button>
    </div>
  );
  return (
    <Modal onClose={props.onClose}>
      {!isOrdered && !isSubmitted && !isOrderSuccessful && cartModalContent}

      {isOrdered && !isSubmitted && (
        <Checkout
          totalAmount={totalAmount}
          onCancel={props.onClose}
          onOrder={submitOrder}
        />
      )}

      {isOrderSuccessful && successfulOrderContent}
      {error && err}
    </Modal>
  );
};

export default Cart;
