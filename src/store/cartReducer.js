import { ADD_TO_CART, REMOVE_ALL, REMOVE_FROM_CART } from "./actionTypes";

export const defaultCartState = {
  items: [],
  totalAmount: 0,
};

const cartReducer = (state, action) => {
  if (action.type === ADD_TO_CART) {
    const updatedTotalAmount =
      state.totalAmount + action.item.price * action.item.amount;

    const existingCartItemIndex = state.items.findIndex(
      (item) => item.id === action.item.id
    );

    const existingCartItem = state.items[existingCartItemIndex]; // eger index'i bulamazsa sonucu 'null' olacak bunun.

    let updatedItems;

    // eger shopping cart'ta item bulunuyorsa bu islemi tekrar yapmasin hepsini birlestirsin diye bu islemi yapiyoruz. Orn : diyelim ki Sushi'yi ekledik Cart'a, sonra bir kere daha Sushiyi  ekledik, asagidaki if kosulu olmaksızın sanki farklı bir sey eklemisiz gibi Sushi'yi tekrar tekrar ekliyor, iste biz bunu yapmasini istemiyoruz. Aynı id'ye sahip ayni item oldugunu bul, eger yeniden ayni item eklenirse bunu yeniden bul ve ona gore islem yap diyoruz KISACA XD
    if (existingCartItem) {
      const updatedItem = {
        ...existingCartItem, //Var olan item'i kopyala,
        amount: existingCartItem.amount + action.item.amount, //amount kısmını güncelleyerek :)
      };

      updatedItems = [...state.items]; // burada cart'taki butun itemları kopyalıyoruz.
      updatedItems[existingCartItemIndex] = updatedItem; // sonra da updatemItem hangisi ise sadece onu guncelliyoruz :)

    }
    // eger Cart'a eklenmediyse items'a ekle diyoruz asagida yapilan islemle de. :)
    else {
      updatedItems = state.items.concat(action.item);
    }

    return {
      items: updatedItems,
      totalAmount: updatedTotalAmount,
    };
  }

  if (action.type === REMOVE_FROM_CART) {
    const existingCartItemIndex = state.items.findIndex(
      (item) => item.id === action.id
    );

    const existingItem = state.items[existingCartItemIndex];

    const updatedTotalAmount =
     Math.abs(state.totalAmount - existingItem.price);

    let updatedItems;

    if (existingItem.amount === 1) {
      updatedItems = state.items.filter(item => item.id !== action.id)
    } else {
      const updatedItem = {...existingItem, amount: existingItem.amount - 1 };

      updatedItems = [...state.items];
      updatedItems[existingCartItemIndex] = updatedItem;

    }

    return {
      ...state,
      items: updatedItems,
      totalAmount: updatedTotalAmount,
    }
  }

  if (action.type === REMOVE_ALL) {
    return defaultCartState;
  }

  return defaultCartState;
};

export default cartReducer;
