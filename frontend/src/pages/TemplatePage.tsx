import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Paper from "@mui/material/Paper";
import AddIcon from "@mui/icons-material/Add";
import {
  DataGrid,
  GridColDef,
  GridToolbarContainer,
  GridRowModel,
  GridValueGetterParams,
} from "@mui/x-data-grid";
import useCrud from "../hooks/useCrud";
import useGridRowEditing from "../hooks/useGridRowEditing";

const EditToolbar = ({ handleClick }: { handleClick: () => void }) => {
  return (
    <GridToolbarContainer>
      <Button color="primary" startIcon={<AddIcon />} onClick={handleClick}>
        New Item
      </Button>
    </GridToolbarContainer>
  );
};

const TemplatePage = () => {
  const {
    data: items,
    idProp,
    update: updateItem,
    create: addItem,
    deleteItem: removeItem,
  } = useCrud<any>("/api/templates");

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

  const handleToolbarClick = async () => {
    const newRow = await addItem({
      name: "",
      age: "",
      joinDate: new Date(),
      role: "",
      isNew: true,
    });
    handleAddRowClick(newRow[idProp]);
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
      valueGetter: (params: GridValueGetterParams) => new Date(params.value),
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
          getRowId={(item) => item._id}
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

export default TemplatePage;
