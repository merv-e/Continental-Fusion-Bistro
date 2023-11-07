import { Fragment, useEffect, useState } from "react";
import classes from "./Header.module.css";
import meals from "../../assets/meals.jpg";
import HeaderCart from "./HeaderCart";
import icon from "../../../src/assets/logo-android-chrome-192.png";
import OrderHistory from "./OrderHistory";

const Header = (props) => {
  const [isScreenSmall, setIsScreenSmall] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const openMenu = isMenuOpen && (
    <div className={classes["hidden-menu"]}>
      <button onClick={() => setIsMenuOpen(false)}>Close</button>
      <button onClick={props.onShowCart}>Your Cart</button>
      <button>
        {/*  onClick={props.onShowOrder} */}
        Order History
      </button>
    </div>
  );

  const changeHeaderClass = `${classes.header} ${
    isMenuOpen && isScreenSmall ? classes["fullscreen-menu"] : ""
  }`;

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
      <header className={changeHeaderClass}>
        <div className={classes.navbar}>
          <div className={classes["header-icon-and-name"]}>
            <img
              src={icon}
              alt="Icon of the website"
              className={classes.icon}
            />
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
              <button
                className={classes["menu-button"]}
                onClick={() => setIsMenuOpen(!isMenuOpen)}
              >
                &#9776;
              </button>
            )}
          </div>
        </div>
        {isScreenSmall && isMenuOpen && openMenu}
      </header>

      <div className={classes["main-image"]}>
        <img src={meals} alt="Culinary Delights Spread Across the Table!" />
      </div>
    </Fragment>
  );
};

export default Header;
