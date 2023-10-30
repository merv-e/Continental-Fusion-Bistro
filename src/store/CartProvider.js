import { useReducer } from "react";
import { ADD_TO_CART, REMOVE_FROM_CART, REMOVE_ALL } from "./actionTypes";

import CartContext from "./cart-context";
import cartReducer, { defaultCartState } from "./cartReducer";

const CartProvider = (props) => {
  const [cartState, dispatchCartAction] = useReducer(
    cartReducer,
    defaultCartState
  );

  const addItemToCartHandler = (item) => {
    dispatchCartAction({
      type: ADD_TO_CART,
      item: item,
    });
  };

  const removeItemFromCartHandler = (id) => {
    dispatchCartAction({
      type: REMOVE_FROM_CART,
      id: id,
    });
  };

  const removeAllItemsFromCartHandler = () => {
    dispatchCartAction({
      type: REMOVE_ALL,
    });
  };

  const cartContext = {
    items: cartState.items,
    totalAmount: cartState.totalAmount,
    addItem: addItemToCartHandler,
    removeItem: removeItemFromCartHandler,
    resetItems: removeAllItemsFromCartHandler,
  };

  return (
    <CartContext.Provider value={cartContext}>
      {props.children}
    </CartContext.Provider>
  );
};

export default CartProvider;
