import classes from "./MealsSummary.module.css";

const MealsSummary = () => {
  return (
    <section className={classes["meal-summary"]}>
      <h2>Exquisite Cuisine, Delivered Straight to Your Door</h2>
      <p>
        Select your preferred dish from our extensive range of options and savor
        a delectable lunch or dinner in the comfort of your own home.
      </p>

      <p>
        Every dish is prepared with top-tier ingredients, right on time, and of
        course, by skilled culinary experts!
      </p>
    </section>
  );
};

export default MealsSummary;
