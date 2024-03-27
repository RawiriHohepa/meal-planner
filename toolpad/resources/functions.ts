import { ingredients } from "../../data/ingredients";
import { meals } from "../../data/meals";
import { portions } from "../../data/portions";

export const getMeals = () => meals;

export const getIngredients = () => ingredients;

export const getPortions = () => portions;

export const savePlan = (plan: any) => console.log(plan);
