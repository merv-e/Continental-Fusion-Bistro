import { Fragment } from "react";
import classes from "./Header.module.css";
import meals from "../../assets/meals.jpg";
import HeaderCart from "./HeaderCart";
import icon from "../../../src/assets/logo-android-chrome-192.png";
import OrderHistory from "./OrderHistory";

const Header = (props) => {
  return (
    <Fragment>
      <header className={classes.header}>
        <div className={classes["header-icon-and-name"]}>
          <img src={icon} alt="Icon of the website" className={classes.icon} />
          <h1 className={classes["restaurant-name"]}>
            Continental Fusion Bistro
          </h1>
        </div>
        <div className={classes["order-info"]}>
          <HeaderCart onShowCart={props.onShowCart} />
          <OrderHistory  />
        </div>
      </header>

      <div className={classes["main-image"]}>
        <img src={meals} alt="Culinary Delights Spread Across the Table!" />
      </div>
    </Fragment>
  );
};

export default Header;
