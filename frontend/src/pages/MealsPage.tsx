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
// import { Add as AddIcon } from "@mui/icons-material";
import {
  DataGrid,
  GridColDef,
  GridToolbarContainer,
  GridRowModel,
  GridValueGetterParams,
} from "@mui/x-data-grid";
import AddIngredientAutocompleter from "../components/AddIngredientAutocompleter";
import NewMealDialog from "../components/NewMealDialog";
import useCrud from "../hooks/useCrud";
import useGridRowEditing from "../hooks/useGridRowEditing";

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
    // reFetch: reFetchMeals,
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

  // const {
  //   data: items,
  //   idProp,
  //   isLoading,
  //   reFetch,
  //   update: updateItem,
  //   create: addItem,
  //   deleteItem: removeItem,
  // } = useCrud<GridRowModel>("/api/ingredients");
  // const { items, addItem, removeItem, updateItem } = useCrud<GridRowModel>(
  //   (item1, item2) => item1.id === item2.id,
  //   initialRows
  // );

  const {
    rowModes,
    getEditActions,
    handleRowEditStop,
    handleRowModesChange,
    handleAddRowClick,
  } = useGridRowEditing(() => console.log("remove"));

  const processRowUpdate = (newRow: GridRowModel) => {
    // const updatedRow = { ...newRow, isNew: false };
    // updateItem(updatedRow);
    // return updatedRow;
    return newRow;
  };

  const handleToolbarClick = async () => {
    // const newRow = await addItem({
    //   name: "",
    //   age: "",
    //   joinDate: new Date(),
    //   role: "",
    //   isNew: true,
    // });
    // handleAddRowClick(newRow[idProp]);
  };

  const columns: GridColDef[] = [
    { field: "name", headerName: "Name", width: 180, editable: true },
    {
      field: "amount",
      headerName: "Amount",
      type: "number",
      // width: 80,
      align: "left",
      headerAlign: "left",
      editable: true,
    },
    {
      field: "unit",
      headerName: "Unit",
      type: "string",
      // width: 180,
      editable: true,
    },
    {
      field: "actions",
      type: "actions",
      headerName: "Actions",
      // width: 100,
      cellClassName: "actions",
      getActions: getEditActions,
    },
  ];
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
              {meals.map((meal: any) => (
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
                    ingredients: [...selectedMeal.ingredients, ingredient],
                  })
                }
              />
              <Box sx={{ flexGrow: 1 }} />
              <IconButton
                color="inherit"
                aria-label="delete"
                onClick={() => !!selectedMeal && deleteMeal(selectedMeal)} // TODO add confirmation
              >
                <DeleteIcon />
              </IconButton>
            </Toolbar>
            <Divider />
            {!!selectedMeal &&
              !!selectedMeal.ingredients &&
              !!selectedMeal.ingredients.length && (
                <Box
                  sx={{
                    // height: 500,
                    // width: "100%",
                    "& .actions": {
                      color: "text.secondary",
                    },
                    "& .textPrimary": {
                      color: "text.primary",
                    },
                  }}
                >
                  <DataGrid
                    autoHeight
                    rows={selectedMeal.ingredients}
                    getRowId={(item) => item._id}
                    columns={columns}
                    editMode="row"
                    rowModesModel={rowModes}
                    onRowModesModelChange={handleRowModesChange}
                    onRowEditStop={handleRowEditStop}
                    processRowUpdate={processRowUpdate}
                    slotProps={{
                      toolbar: {
                        handleClick: handleToolbarClick,
                      },
                    }}
                  />
                </Box>
              )}
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
