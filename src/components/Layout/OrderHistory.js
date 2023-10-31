import classes from "./OrderHistory.module.css";

const OrderHistory = (props) => {
  return (
    <div className={classes["order-history"]}>
      <button onClick={props.onShowOrder}>
        <span>Order History</span>
      </button>
    </div>
  );
};

export default OrderHistory;
