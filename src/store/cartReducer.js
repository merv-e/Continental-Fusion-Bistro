import { ADD_TO_CART, REMOVE_FROM_CART } from "./actionTypes";

export const defaultCartState = {
    items: [],
    totalAmount: 0,
};

const cartReducer = (state, action) => {

    if (action.type === ADD_TO_CART) {
        const updatedItems = state.items.concat(action.item);

        const updatedTotalAmount = state.totalAmount + action.item.price * action.item.amount;

        return { 
            items : updatedItems,
            totalAmount: updatedTotalAmount,
        };
    }
        return defaultCartState;
    }

export default cartReducer;

    // switch (action.type) {
    //   case ADD_TO_CART:
    //     return {
    //         const updatedItems = state.items.concat(action.item);
    //     };

    //   case REMOVE_FROM_CART:
    //     return 2;

    //   default:
    
    // };