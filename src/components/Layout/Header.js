import { Fragment, useEffect, useState } from "react";
import classes from "./Header.module.css";
import meals from "../../assets/meals.jpg";
import HeaderCart from "./HeaderCart";
import icon from "../../../src/assets/logo-android-chrome-192.png";
import OrderHistory from "./OrderHistory";

const Header = (props) => {
  const [isScreenSmall, setIsScreenSmall] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsScreenSmall(window.innerWidth <= 768);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

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
          {!isScreenSmall ? (
            <>
              <HeaderCart onShowCart={props.onShowCart} />
              <OrderHistory />
            </>
          ) : (
            <div className={classes.menu}>
              <button className={classes["menu-button"]}>
                <span>&#9776;</span>
                
              </button>
            </div>
          )}
        </div>
      </header>

      <div className={classes["main-image"]}>
        <img src={meals} alt="Culinary Delights Spread Across the Table!" />
      </div>
    </Fragment>
  );
};

export default Header;
