import { ADD_TO_CART, REMOVE_FROM_CART } from "./actionTypes";

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
    if(existingCartItem) {

      const updatedItem = {
        ...existingCartItem,
        amount: existingCartItem.amount + action.item.amount,
      };

      updatedItems = [...state.items]; //state items arrayini kopyaliyoruz
      updatedItems[existingCartItemIndex] = updatedItem; // sonra da updatemItem ne ise sadece onu guncelliyoruz :) 

      console.log(updatedItem);
      console.log(updatedItems);
    } 
    // eger Cart'ta yer almiyorsa items'a ekle diyoruz asagida yapilan islemle de. :) 
    else {
        updatedItems = state.items.concat(action.item);
    };

    return {
      items: updatedItems,
      totalAmount: updatedTotalAmount,
    };
  }
  return defaultCartState;
};

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
