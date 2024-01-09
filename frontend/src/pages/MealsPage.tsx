import { useState } from "react";
import {
  Autocomplete,
  Box,
  Button,
  IconButton,
  Toolbar,
  Divider,
  TextField,
  Paper,
  Tabs,
  Tab,
} from "@mui/material";
import { Delete as DeleteIcon } from "@mui/icons-material";
import NewMealDialog from "../components/NewMealDialog";
import TabPanel from "../components/TabPanel";

// TODO connect to mongo
const meals = [
  {
    _id: "111",
    name: "Meal One",
  },
  {
    _id: "222",
    name: "Meal Two",
  },
  {
    _id: "333",
    name: "Meal Three",
  },
  {
    _id: "444",
    name: "Meal Four",
  },
];

const newMeal = (name?: string) => {
  if (!name) return;
  meals.push({
    _id: `${meals.length + 1}`,
    name,
  });
};

const MealsPage = () => {
  const [selectedMealIndex, setSelectedMealIndex] = useState(0);
  const [newMealDialogIsOpen, setNewMealDialogIsOpen] = useState(false);

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
              {/* TODO implement autocompleter */}
              <Autocomplete
                options={[{ label: "Option 1" }]}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Placeholder"
                    variant="standard"
                  />
                )}
                sx={{ width: 300 }}
                onChange={(_, value, reason): void => {
                  // TODO fix not showing up straight away
                  if (reason === "selectOption") newMeal(value?.label);
                }}
              />
              <Box sx={{ flexGrow: 1 }} />
              <IconButton color="inherit" aria-label="delete">
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
