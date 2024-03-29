import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";

interface Ingredient {
  _id: string;
  name: string;
}

interface AddIngredientAutocompleterProps {
  ingredients: any[];
  //   ingredients: Ingredient[];
  onSelect: (ingredient: Ingredient) => void;
}

const AddIngredientAutocompleter = ({
  ingredients,
  onSelect,
}: AddIngredientAutocompleterProps) => {
  return (
    <Autocomplete
      options={ingredients.map((ingredient) => ({
        id: ingredient._id,
        label: ingredient.name,
        ...ingredient,
      }))}
      renderInput={(params) => (
        <TextField {...params} label="Add Ingredient" variant="standard" />
      )}
      sx={{ width: 300 }}
      onChange={(_, value, reason): void => {
        if (reason === "selectOption" && !!value) {
          onSelect(value);
        }
      }}
    />
  );
};

export default AddIngredientAutocompleter;
