import * as React from "react";
import { Box, Button, Paper } from "@mui/material";
import {
  Add as AddIcon,
  Edit as EditIcon,
  DeleteOutlined as DeleteIcon,
  Save as SaveIcon,
  Close as CancelIcon,
} from "@mui/icons-material";
import {
  GridRowModesModel,
  GridRowModes,
  DataGrid,
  GridColDef,
  GridToolbarContainer,
  GridActionsCellItem,
  GridEventListener,
  GridRowId,
  GridRowModel,
  GridRowEditStopReasons,
} from "@mui/x-data-grid";
import useCrud from "../hooks/useCrudState";

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
        Add record
      </Button>
    </GridToolbarContainer>
  );
};

const gridRowEditModes = (removeItem: (itemToRemove: GridRowModel) => void) => {
  const [rowModesModel, setRowModesModel] = React.useState<GridRowModesModel>(
    {}
  );

  const handleRowEditStop: GridEventListener<"rowEditStop"> = (
    params,
    event
  ) => {
    if (params.reason === GridRowEditStopReasons.rowFocusOut) {
      event.defaultMuiPrevented = true;
    }
  };

  const handleEditClick = (id: GridRowId) => () => {
    setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.Edit } });
  };

  const handleSaveClick = (id: GridRowId) => () => {
    setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.View } });
  };

  const handleDeleteClick = (row: GridRowModel) => () => {
    removeItem(row);
  };

  const handleCancelClick = (id: GridRowId, editedRow: GridRowModel) => () => {
    setRowModesModel({
      ...rowModesModel,
      [id]: { mode: GridRowModes.View, ignoreModifications: true },
    });

    if (editedRow!.isNew) {
      removeItem(editedRow);
    }
  };

  const handleRowModesModelChange = (newRowModesModel: GridRowModesModel) => {
    setRowModesModel(newRowModesModel);
  };

  const getActions = ({ id, row }: { id: GridRowId; row: GridRowModel }) => {
    const isInEditMode = rowModesModel[id]?.mode === GridRowModes.Edit;

    if (isInEditMode) {
      return [
        <GridActionsCellItem
          icon={<SaveIcon />}
          label="Save"
          key="Save"
          sx={{
            color: "primary.main",
          }}
          onClick={handleSaveClick(id)}
        />,
        <GridActionsCellItem
          icon={<CancelIcon />}
          label="Cancel"
          key="Cancel"
          className="textPrimary"
          onClick={handleCancelClick(id, row)}
          color="inherit"
        />,
      ];
    }

    return [
      <GridActionsCellItem
        icon={<EditIcon />}
        label="Edit"
        key="Edit"
        className="textPrimary"
        onClick={handleEditClick(id)}
        color="inherit"
      />,
      <GridActionsCellItem
        icon={<DeleteIcon />}
        label="Delete"
        key="Delete"
        onClick={handleDeleteClick(row)}
        color="inherit"
      />,
    ];
  };

  const handleAddRecordClick = (id: number) => {
    setRowModesModel((oldModel) => ({
      ...oldModel,
      [id]: { mode: GridRowModes.Edit, fieldToFocus: "name" },
    }));
  };

  return {
    rowModesModel,
    handleRowEditStop,
    handleRowModesModelChange,
    getActions,
    handleAddRecordClick,
  };
};

const IngredientsPage = () => {
  const { items, addItem, removeItem, updateItem } = useCrud<GridRowModel>(
    (item1, item2) => item1.id === item2.id,
    initialRows
  );

  const {
    rowModesModel,
    handleRowEditStop,
    handleRowModesModelChange,
    getActions,
    handleAddRecordClick,
  } = gridRowEditModes(removeItem);

  const processRowUpdate = (newRow: GridRowModel) => {
    const updatedRow = { ...newRow, isNew: false };
    updateItem(updatedRow);
    return updatedRow;
  };

  const handleToolbarClick = () => {
    const id = Math.random() * 100;
    addItem({ id, name: "", age: "", isNew: true });
    handleAddRecordClick(id);
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
      getActions,
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
          rowModesModel={rowModesModel}
          onRowModesModelChange={handleRowModesModelChange}
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
