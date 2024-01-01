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

interface EditToolbarProps {
  addItem: (item: GridRowModel) => void;
  setRowModesModel: (
    newModel: (oldModel: GridRowModesModel) => GridRowModesModel
  ) => void;
  nextId: number;
}

function EditToolbar(props: EditToolbarProps) {
  const { addItem, setRowModesModel, nextId } = props;

  const handleClick = () => {
    addItem({ id: nextId, name: "", age: "", isNew: true });
    setRowModesModel((oldModel) => ({
      ...oldModel,
      [nextId]: { mode: GridRowModes.Edit, fieldToFocus: "name" },
    }));
  };

  return (
    <GridToolbarContainer>
      <Button color="primary" startIcon={<AddIcon />} onClick={handleClick}>
        Add record
      </Button>
    </GridToolbarContainer>
  );
}

const IngredientsPage = () => {
  const { items, addItems, initialiseItems, addItem, removeItem, updateItem } =
    useCrud<GridRowModel>((item1, item2) => item1.id === item2.id, initialRows);

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

  const processRowUpdate = (newRow: GridRowModel) => {
    const updatedRow = { ...newRow, isNew: false };
    updateItem(updatedRow);
    return updatedRow;
  };

  const handleRowModesModelChange = (newRowModesModel: GridRowModesModel) => {
    setRowModesModel(newRowModesModel);
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
      getActions: ({ id, row }) => {
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
      },
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
            toolbar: { addItem, setRowModesModel, nextId: items.length + 1 },
          }}
        />
      </Box>
    </Paper>
  );
};

export default IngredientsPage;
