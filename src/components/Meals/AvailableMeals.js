import { useEffect, useState, useCallback } from "react";
import Card from "../UI/Card";
import classes from "./AvailableMeals.module.css";
import MealItem from "./MealItem/MealItem";

const AvailableMeals = () => {

  const [meals, setMeals] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchMeals = useCallback(async () => {
     setIsLoading(true);
     setError(null);

    try {
      const response = await fetch(
        "https://food-app-88782-default-rtdb.europe-west1.firebasedatabase.app/meals.json"
      );

      if (!response.ok) {
        throw new Error("Something went wrong!");
      }

       const data = await response.json();
       console.log(data); 

       const fetchedMeals = [];

       for (const key in data) {
         fetchedMeals.push({
           id: key,
           name: data[key].name,
           price: data[key].price,
           description: data[key].description,
         });
       }

       setMeals(fetchedMeals);

    } catch (error) {
      setError(error.message);
    }
  }, []);

  useEffect(() => {
    fetchMeals();
  }, [fetchMeals]);

  const mealsList = meals.map((meal) => (
    <MealItem
      id={meal.id}
      key={meal.id}
      name={meal.name}
      description={meal.description}
      price={meal.price}
    />
  ));

  return (
    <section className={classes.meals}>
      <Card>
        <ul>{mealsList}</ul>
      </Card>
    </section>
  );
};

export default AvailableMeals;
