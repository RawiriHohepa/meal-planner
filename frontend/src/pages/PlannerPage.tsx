import { useState } from "react";
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
} from "@mui/material";

const days = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];

const meals = [
  {
    _id: "11",
    name: "Meal One",
  },
  {
    _id: "22",
    name: "Meal Two",
  },
  {
    _id: "33",
    name: "Meal Three",
  },
];

const PlannerPage = () => {
  const [selectedMealsMainDinner, setSelectedMealsMainDinner] = useState<any>(
    {}
  );
  const [selectedMealsSideOne, setSelectedMealsSideOne] = useState<any>({});
  const [selectedMealsSideTwo, setSelectedMealsSideTwo] = useState<any>({});

  const handleChangeMainDinner = (event: SelectChangeEvent, day: string) => {
    const mealId = event.target.value as string;
    setSelectedMealsMainDinner((existingSelectedMeals: any) => ({
      ...existingSelectedMeals,
      [day]: mealId,
    }));
  };

  const handleChangeSideOne = (event: SelectChangeEvent, day: string) => {
    const mealId = event.target.value as string;
    setSelectedMealsSideOne((existingSelectedMeals: any) => ({
      ...existingSelectedMeals,
      [day]: mealId,
    }));
  };

  const handleChangeSideTwo = (event: SelectChangeEvent, day: string) => {
    const mealId = event.target.value as string;
    setSelectedMealsSideTwo((existingSelectedMeals: any) => ({
      ...existingSelectedMeals,
      [day]: mealId,
    }));
  };

  return (
    <TableContainer component={Paper} elevation={2}>
      <Table sx={{ minWidth: 650 }} aria-label="planner table">
        <TableHead>
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
                    value={selectedMealsMainDinner[day]}
                    onChange={(event) => handleChangeMainDinner(event, day)}
                    variant="standard"
                  >
                    <MenuItem value={undefined}>
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
                    value={selectedMealsSideOne[day]}
                    onChange={(event) => handleChangeSideOne(event, day)}
                    variant="standard"
                  >
                    <MenuItem value={undefined}>
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
                    value={selectedMealsSideTwo[day]}
                    onChange={(event) => handleChangeSideTwo(event, day)}
                    variant="standard"
                  >
                    <MenuItem value={undefined}>
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
  );
};

export default PlannerPage;
