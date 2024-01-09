import { useState } from "react";
import { Box, Toolbar, Divider, Paper, Tabs, Tab } from "@mui/material";

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

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

const TabPanel = ({ children, value, index, ...other }: TabPanelProps) => (
  <div
    role="tabpanel"
    hidden={value !== index}
    id={`simple-tabpanel-${index}`}
    aria-labelledby={`simple-tab-${index}`}
    {...other}
  >
    {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
  </div>
);

const a11yProps = (index: number) => ({
  id: `simple-tab-${index}`,
  "aria-controls": `simple-tabpanel-${index}`,
});

const MealsPage = () => {
  const [selectedMealIndex, setSelectedMealIndex] = useState(0);

  return (
    <Paper elevation={2}>
      <Box sx={{ display: "flex" }}>
        <Box>
          {/* TODO implement button and popup dialog */}
          <Toolbar>New Meal</Toolbar>
          <Divider />
          <Tabs
            value={selectedMealIndex}
            orientation="vertical"
            onChange={(_, newSelectedMealIndex) =>
              setSelectedMealIndex(newSelectedMealIndex)
            }
          >
            {meals.map((meal, index) => (
              <Tab key={meal._id} label={meal.name} {...a11yProps(index)} />
            ))}
          </Tabs>
        </Box>
        <Divider orientation="vertical" flexItem />
        <Box sx={{ width: "100%" }}>
          {/* TODO implement toolbar */}
          <Toolbar>New Ingredient Autocompleter & Delete button</Toolbar>
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
  );
};

export default MealsPage;
