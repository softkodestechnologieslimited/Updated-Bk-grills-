import { makeAutoObservable } from "mobx";

export class MealService {
  meals = [];

  constructor() {
    makeAutoObservable(this);
  }

  getSingleMeal(mealId) {
    const mealIndex = this.meals.findIndex(meal => meal.id === mealId);
    return this.meals[mealIndex]
  }

  setMeals(meals) {
    this.meals = [...meals];
  }

  addMeal(mealDetails) {
    if (!mealDetails) return;
    this.meals = [...this.meals, mealDetails];
  }

  updateMeal(mealData) {
    const mealIndex = this.meals.findIndex(meal => meal.id === mealData.id);
    // console.log(mealIndex);
    if (mealIndex === -1) return;

    const mealsCopy = [...this.meals];
    mealsCopy[mealIndex] = mealData;

    this.meals = [...mealsCopy];
  }

  deleteMeal(mealId) {
    const mealIndex = this.meals.findIndex(meal => meal.id === mealId);
    if (mealIndex === -1) return;

    const copy = [...this.meals];
    copy.splice(mealIndex, 1);
    this.meals = [...copy];

    // console.log('meal deleted');
  }

}

const mealService = new MealService();

export default mealService;