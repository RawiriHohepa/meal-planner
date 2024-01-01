import { useState } from "react";
import {
  Edit as EditIcon,
  DeleteOutlined as DeleteIcon,
  Save as SaveIcon,
  Close as CancelIcon,
} from "@mui/icons-material";
import {
  GridRowModesModel,
  GridRowModes,
  GridActionsCellItem,
  GridEventListener,
  GridRowId,
  GridRowModel,
  GridRowEditStopReasons,
} from "@mui/x-data-grid";

const useGridRowEditing = (removeRow: (rowToRemove: GridRowModel) => void) => {
  const [rowModes, setRowModes] = useState<GridRowModesModel>({});

  const handleEditClick = (id: GridRowId) => {
    setRowModes((oldModes) => ({
      ...oldModes,
      [id]: { mode: GridRowModes.Edit },
    }));
  };

  const handleSaveClick = (id: GridRowId) => {
    setRowModes((oldModes) => ({
      ...oldModes,
      [id]: { mode: GridRowModes.View },
    }));
  };

  const handleDeleteClick = (row: GridRowModel) => {
    removeRow(row);
  };

  const handleCancelClick = (id: GridRowId, row: GridRowModel) => {
    setRowModes((oldModes) => ({
      ...oldModes,
      [id]: { mode: GridRowModes.View, ignoreModifications: true },
    }));

    if (row.isNew) {
      removeRow(row);
    }
  };

  const getEditActions = ({
    id,
    row,
  }: {
    id: GridRowId;
    row: GridRowModel;
  }) => {
    const isInEditMode = rowModes[id]?.mode === GridRowModes.Edit;

    if (isInEditMode) {
      return [
        <GridActionsCellItem
          icon={<SaveIcon />}
          label="Save"
          key="Save"
          sx={{
            color: "primary.main",
          }}
          onClick={() => handleSaveClick(id)}
        />,
        <GridActionsCellItem
          icon={<CancelIcon />}
          label="Cancel"
          key="Cancel"
          className="textPrimary"
          onClick={() => handleCancelClick(id, row)}
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
        onClick={() => handleEditClick(id)}
        color="inherit"
      />,
      <GridActionsCellItem
        icon={<DeleteIcon />}
        label="Delete"
        key="Delete"
        onClick={() => handleDeleteClick(row)}
        color="inherit"
      />,
    ];
  };

  const handleRowEditStop: GridEventListener<"rowEditStop"> = (
    params,
    event
  ) => {
    if (params.reason === GridRowEditStopReasons.rowFocusOut) {
      event.defaultMuiPrevented = true;
    }
  };

  const handleRowModesChange = (newRowModes: GridRowModesModel) => {
    setRowModes(newRowModes);
  };

  const handleAddRowClick = (id: number) => {
    setRowModes((oldModes) => ({
      ...oldModes,
      [id]: { mode: GridRowModes.Edit, fieldToFocus: "name" },
    }));
  };

  return {
    rowModes,
    getEditActions,
    handleRowEditStop,
    handleRowModesChange,
    handleAddRowClick,
  };
};

export default useGridRowEditing;
