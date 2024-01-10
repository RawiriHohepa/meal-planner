import { useState } from "react";
import {
  Box,
  Button,
  IconButton,
  Toolbar,
  Divider,
  Paper,
  List,
  ListItemButton,
  Typography,
} from "@mui/material";
import { Delete as DeleteIcon } from "@mui/icons-material";
import AddIngredientAutocompleter from "../components/AddIngredientAutocompleter";
import NewMealDialog from "../components/NewMealDialog";
import useCrud from "../hooks/useCrud";

// interface Meal {
//   _id: string;
//   name: string;
//   ingredients: {
//     _id: string;
//     name: string;
//   }[];
// }

const MealsPage = () => {
  const [selectedMeal, setSelectedMeal] = useState<any>();
  const [newMealDialogIsOpen, setNewMealDialogIsOpen] = useState(false);

  const {
    data: meals,
    update: updateMeal,
    create: createMeal,
    deleteItem: deleteMeal,
  } = useCrud("/api/meals");

  const { data: ingredients } = useCrud("/api/ingredients");

  const newMeal = (name?: string) => {
    if (!name) return;
    createMeal({
      name,
    });
  };

  return (
    <>
      <Paper elevation={2}>
        <Box sx={{ display: "flex" }}>
          <Box>
            <Toolbar>
              <Button
                variant="contained"
                onClick={() => setNewMealDialogIsOpen(true)}
              >
                New Meal
              </Button>
            </Toolbar>
            <Divider />
            <List>
              {meals.map((meal) => (
                <ListItemButton
                  key={meal._id}
                  selected={selectedMeal === meal}
                  onClick={() => setSelectedMeal(meal)}
                >
                  {meal.name}
                </ListItemButton>
              ))}
            </List>
          </Box>
          <Divider orientation="vertical" flexItem />
          <Box sx={{ flexGrow: 1 }}>
            <Toolbar>
              <AddIngredientAutocompleter
                ingredients={ingredients}
                onSelect={(ingredient) =>
                  updateMeal({
                    ...selectedMeal,
                    ingredients: selectedMeal.ingredients.push(ingredient),
                  })
                }
              />
              <Box sx={{ flexGrow: 1 }} />
              <IconButton
                color="inherit"
                aria-label="delete"
                onClick={() => !!selectedMeal && deleteMeal(selectedMeal)}
              >
                <DeleteIcon />
              </IconButton>
            </Toolbar>
            <Divider />
            {/* TODO implement table */}
            <Typography sx={{ p: 3 }}>{selectedMeal?.name}</Typography>
          </Box>
        </Box>
      </Paper>
      <NewMealDialog
        open={newMealDialogIsOpen}
        onSubmit={newMeal}
        closeDialog={() => {
          setNewMealDialogIsOpen(false);
        }}
      />
    </>
  );
};

export default MealsPage;
