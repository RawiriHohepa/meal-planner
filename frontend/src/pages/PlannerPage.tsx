import {
  Paper,
  MenuItem,
  FormControl,
  Select,
  SelectChangeEvent,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";
import useCrud from "../hooks/useCrud";
import { useMemo } from "react";

const days: (
  | "monday"
  | "tuesday"
  | "wednesday"
  | "thursday"
  | "friday"
  | "saturday"
  | "sunday"
)[] = [
  "monday",
  "tuesday",
  "wednesday",
  "thursday",
  "friday",
  "saturday",
  "sunday",
];

type Planner = {
  _id: string;
  name: string;
  selectedMeals: {
    monday: string;
    tuesday: string;
    wednesday: string;
    thursday: string;
    friday: string;
    saturday: string;
    sunday: string;
  };
};

type Meal = {
  _id: string;
  name: string;
  ingredients: Ingredient[];
};

type Ingredient = {
  _id: string;
  name: string;
  unit: string;
  amount?: number;
};

const PlannerPage = () => {
  const { data: meals } = useCrud<Meal>("/api/meals");
  const { data: ingredients } = useCrud<Ingredient>("/api/ingredients");
  const { data: planners, update: updatePlanner } =
    useCrud<Planner>("/api/planner");

  const mainDinner = planners.find((planner) => planner.name === "Main Dinner");
  const sideOne = planners.find((planner) => planner.name === "Side One");
  const sideTwo = planners.find((planner) => planner.name === "Side Two");

  const handleChangeSelectedMeal = (
    event: SelectChangeEvent,
    day: string,
    planner?: Planner
  ) => {
    const mealId = event.target.value as string;
    if (!!planner) {
      updatePlanner({
        ...planner,
        selectedMeals: {
          ...planner.selectedMeals,
          [day]: mealId,
        },
      });
    }
  };

  const shoppingList: Ingredient[] = useMemo(() => {
    return ingredients;
  }, [mainDinner, sideOne, sideTwo]);

  return (
    <>
      <TableContainer component={Paper} elevation={2}>
        <Table sx={{ minWidth: 650 }} aria-label="planner table">
          <TableHead
            sx={{ "& th::first-letter": { textTransform: "capitalize" } }}
          >
            <TableRow>
              <TableCell />
              {days.map((day) => (
                <TableCell key={day}>{day}</TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow>
              <TableCell>Main Dinner</TableCell>
              {days.map((day) => (
                <TableCell key={day}>
                  <FormControl sx={{ minWidth: 80 }}>
                    <Select
                      value={mainDinner?.selectedMeals[day] || ""}
                      onChange={(event) =>
                        handleChangeSelectedMeal(event, day, mainDinner)
                      }
                      variant="standard"
                    >
                      <MenuItem value={""}>
                        <em>None</em>
                      </MenuItem>
                      {meals.map((meal) => (
                        <MenuItem value={meal._id} key={meal._id}>
                          {meal.name}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </TableCell>
              ))}
            </TableRow>
            <TableRow>
              <TableCell>Side One</TableCell>
              {days.map((day) => (
                <TableCell key={day}>
                  <FormControl sx={{ minWidth: 80 }}>
                    <Select
                      value={sideOne?.selectedMeals[day] || ""}
                      onChange={(event) =>
                        handleChangeSelectedMeal(event, day, sideOne)
                      }
                      variant="standard"
                    >
                      <MenuItem value={""}>
                        <em>None</em>
                      </MenuItem>
                      {meals.map((meal) => (
                        <MenuItem value={meal._id} key={meal._id}>
                          {meal.name}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </TableCell>
              ))}
            </TableRow>
            <TableRow>
              <TableCell>Side Two</TableCell>
              {days.map((day) => (
                <TableCell key={day}>
                  <FormControl sx={{ minWidth: 80 }}>
                    <Select
                      value={sideTwo?.selectedMeals[day] || ""}
                      onChange={(event) =>
                        handleChangeSelectedMeal(event, day, sideTwo)
                      }
                      variant="standard"
                    >
                      <MenuItem value={""}>
                        <em>None</em>
                      </MenuItem>
                      {meals.map((meal) => (
                        <MenuItem value={meal._id} key={meal._id}>
                          {meal.name}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </TableCell>
              ))}
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
      <Paper sx={{ mt: 3, p: 3 }} elevation={2}>
        <List>
          {shoppingList.map((ingredient) => (
            <ListItem key={ingredient._id}>
              <ListItemText primary={ingredient.name} />
              <em>{`${ingredient.amount}${ingredient.unit}`}</em>
            </ListItem>
          ))}
        </List>
      </Paper>
    </>
  );
};

export default PlannerPage;
