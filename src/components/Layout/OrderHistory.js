import classes from "./OrderHistory.module.css";

const OrderHistory = (props) => {
  const fetchOrders = async () => {
    const response = await fetch(
      "https://food-app-88782-default-rtdb.europe-west1.firebasedatabase.app/orders.json"
    );

    const data = await response.json();

    const keyOfTheLastOrder = Object.values(data).length - 1;
    const findTheLastOrderedItem = Object.values(data)[keyOfTheLastOrder];
    const lastOrder = findTheLastOrderedItem.orderedItems.map((item) => item);

    const lastOrderUserInfo = findTheLastOrderedItem.userData;
    // console.log(lastOrderUserInfo);

    // User info
    console.group();
    console.log("FORM DATA:");
    console.group();
    console.log("name:", lastOrderUserInfo.name);
    console.log("street:", lastOrderUserInfo.street);
    console.log("city:", lastOrderUserInfo.city);
    console.log("postal code:", lastOrderUserInfo.postalCode);
    console.log("e-mail:", lastOrderUserInfo.email);
    console.groupEnd();
    console.groupEnd();

    let total = 0;

    
    // Meal and price info
    console.log("YOUR ORDER:");
    
    for (let i = 0; i < lastOrder.length; i++) {
      const meal = lastOrder[i].name;
      const price = lastOrder[i].price;
      total += price;
      total.toFixed(2);
      
      // console.group();
      console.group();
      console.log("MEAL:", meal);
      console.log("PRICE", price);
      console.groupEnd();
    };
    console.log("TOTAL PRICE", total.toFixed(2));

    alert("Please check the console to see the information of the last order that is fetched. The info shows the very last order. Therefore if you haven't ordered anything yet, please do so, to see your info in the console!");
  };

  return (
    <div className={classes["order-history"]}>
      <button onClick={() => fetchOrders()}>
        <span>Order History</span>
      </button>
    </div>
  );
};

export default OrderHistory;
