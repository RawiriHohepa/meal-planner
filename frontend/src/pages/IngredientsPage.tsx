import { Box, Button, Paper } from "@mui/material";
import { Add as AddIcon } from "@mui/icons-material";
import {
  DataGrid,
  GridColDef,
  GridToolbarContainer,
  GridRowModel,
} from "@mui/x-data-grid";
import useCrud from "../hooks/useCrudState";
import useGridRowEditing from "../hooks/useGridRowEditing";

const initialRows: GridRowModel[] = [
  {
    id: 1,
    name: "1",
    age: 25,
    joinDate: new Date(),
    role: "Market",
  },
  {
    id: 2,
    name: "2",
    age: 36,
    joinDate: new Date(),
    role: "Market",
  },
  {
    id: 3,
    name: "3",
    age: 19,
    joinDate: new Date(),
    role: "Market",
  },
  {
    id: 4,
    name: "4",
    age: 28,
    joinDate: new Date(),
    role: "Market",
  },
  {
    id: 5,
    name: "5",
    age: 23,
    joinDate: new Date(),
    role: "Market",
  },
];

const EditToolbar = ({ handleClick }: { handleClick: () => void }) => {
  return (
    <GridToolbarContainer>
      <Button color="primary" startIcon={<AddIcon />} onClick={handleClick}>
        New Ingredient
      </Button>
    </GridToolbarContainer>
  );
};

const IngredientsPage = () => {
  const { items, addItem, removeItem, updateItem } = useCrud<GridRowModel>(
    (item1, item2) => item1.id === item2.id,
    initialRows
  );

  const {
    rowModes,
    getEditActions,
    handleRowEditStop,
    handleRowModesChange,
    handleAddRowClick,
  } = useGridRowEditing(removeItem);

  const processRowUpdate = (newRow: GridRowModel) => {
    const updatedRow = { ...newRow, isNew: false };
    updateItem(updatedRow);
    return updatedRow;
  };

  const handleToolbarClick = () => {
    const id = Math.random() * 100;
    addItem({ id, name: "", age: "", isNew: true });
    handleAddRowClick(id);
  };

  const columns: GridColDef[] = [
    { field: "name", headerName: "Name", width: 180, editable: true },
    {
      field: "age",
      headerName: "Age",
      type: "number",
      width: 80,
      align: "left",
      headerAlign: "left",
      editable: true,
    },
    {
      field: "joinDate",
      headerName: "Join date",
      type: "date",
      width: 180,
      editable: true,
    },
    {
      field: "role",
      headerName: "Department",
      width: 220,
      editable: true,
      type: "singleSelect",
      valueOptions: ["Market", "Finance", "Development"],
    },
    {
      field: "actions",
      type: "actions",
      headerName: "Actions",
      width: 100,
      cellClassName: "actions",
      getActions: getEditActions,
    },
  ];

  return (
    <Paper elevation={2}>
      <Box
        sx={{
          height: 500,
          width: "100%",
          "& .actions": {
            color: "text.secondary",
          },
          "& .textPrimary": {
            color: "text.primary",
          },
        }}
      >
        <DataGrid
          rows={items}
          columns={columns}
          editMode="row"
          rowModesModel={rowModes}
          onRowModesModelChange={handleRowModesChange}
          onRowEditStop={handleRowEditStop}
          processRowUpdate={processRowUpdate}
          slots={{
            toolbar: EditToolbar,
          }}
          slotProps={{
            toolbar: {
              handleClick: handleToolbarClick,
            },
          }}
        />
      </Box>
    </Paper>
  );
};

export default IngredientsPage;
