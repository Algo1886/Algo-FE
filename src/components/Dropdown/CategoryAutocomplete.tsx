import * as React from "react";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";

interface Category {
  id: number;
  name: string;
}

interface CategoryAutocompleteProps {
  categories: Category[];
  selected: number;
  onChange: (value: number) => void;
  isSubmitAttempted: boolean;
}

const CategoryAutocomplete: React.FC<CategoryAutocompleteProps> = ({
  categories,
  selected,
  onChange,
  isSubmitAttempted,
}) => {
  const [inputValue, setInputValue] = React.useState("");

  return (
    <div className="flex flex-col gap-1" >
      <label className="font-medium text-gray-700">
        문제 유형 <span className="text-blue-500">*</span>
      </label>
      <Autocomplete
  value={categories.find(c => c.id === selected) || null}
  onChange={(_event, newValue) => {
    if (newValue) onChange(newValue.id)
    else onChange(0)
  }}
  inputValue={inputValue}
  onInputChange={(_event, newInputValue) => setInputValue(newInputValue)}
  options={categories}
  getOptionLabel={(option) => option.name}
  isOptionEqualToValue={(option, value) => option.name === value.name}
  renderInput={(params) => (
    <TextField
      {...params}
      placeholder="문제 유형을 입력하세요"
      helperText={isSubmitAttempted && !selected ? "필수 입력 항목입니다" : ""}
    />
  )}
  sx={{
    "& .MuiOutlinedInput-root": {
      borderRadius: "8px",
      paddingY: "2px",
      paddingX: "10px",
      bgcolor: "white",
      width: "300px",
      "& fieldset": {
        border: "1px solid",
        borderColor: (isSubmitAttempted && !selected) ? "red" : "#e5e7eb",
      },
      "&:hover fieldset": {
        border: "1px solid",
        borderColor: "#e5e7eb",
      },
      "&.Mui-focused fieldset": {
        border: "1px solid",
        borderColor: (isSubmitAttempted && !selected) ? "red" : "#e5e7eb",
      },
    },
      "& .MuiFormHelperText-root": {
        color: "red",
        fontSize: "13px",
        marginLeft: "0px",
        marginTop: "6px"
      }
  }}
/>
    </div>
  );
};

export default CategoryAutocomplete;