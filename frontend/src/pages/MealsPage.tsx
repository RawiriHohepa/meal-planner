import { useState } from "react";
import {
  Box,
  Button,
  IconButton,
  Toolbar,
  Divider,
  Paper,
  Tabs,
  Tab,
} from "@mui/material";
import { Delete as DeleteIcon } from "@mui/icons-material";
import AddIngredientAutocompleter from "../components/AddIngredientAutocompleter";
import NewMealDialog from "../components/NewMealDialog";
import TabPanel from "../components/TabPanel";
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
  const [selectedMealIndex, setSelectedMealIndex] = useState(0);
  const [newMealDialogIsOpen, setNewMealDialogIsOpen] = useState(false);

  const {
    data: meals,
    create: createMeal,
    // deleteItem: deleteMeal,
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
            <Tabs
              value={selectedMealIndex}
              orientation="vertical"
              onChange={(_, newSelectedMealIndex) =>
                setSelectedMealIndex(newSelectedMealIndex)
              }
            >
              {meals.map((meal, index) => (
                <Tab
                  key={meal._id}
                  label={meal.name}
                  id={`simple-tab-${index}`}
                  aria-controls={`simple-tabpanel-${index}`}
                />
              ))}
            </Tabs>
          </Box>
          <Divider orientation="vertical" flexItem />
          <Box sx={{ flexGrow: 1 }}>
            <Toolbar>
              <AddIngredientAutocompleter
                ingredients={ingredients}
                onSelect={(ingredient) => newMeal(ingredient.name)}
              />
              <Box sx={{ flexGrow: 1 }} />
              <IconButton
                color="inherit"
                aria-label="delete"
                // TODO Delete meal
              >
                <DeleteIcon />
              </IconButton>
            </Toolbar>
            <Divider />
            {/* TODO implement table */}
            {meals.map((meal, index) => (
              <TabPanel value={selectedMealIndex} index={index} key={meal._id}>
                {meal.name}
              </TabPanel>
            ))}
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
