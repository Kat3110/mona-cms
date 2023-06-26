import {
  Box,
  Button,
  Card,
  CardContent,
  TextField,
  InputAdornment,
  SvgIcon,
  Typography
} from "@mui/material";
import { Search as SearchIcon } from "../../icons/search";
import { Upload as UploadIcon } from "../../icons/upload";
import { Download as DownloadIcon } from "../../icons/download";
import { useState } from "react";

const states = [
  {
    value: "number",
    label: "번호"
  },
  {
    value: "type",
    label: "유형"
  }
];

export const CallsListHeader = (props) => {
  const { onSearch = () => {} } = props;
  const handleChange = (event) => {
    setValues({
      ...values,
      [event.target.name]: event.target.value
    });
  };

  const [values, setValues] = useState({
    searchType: "number",
    searchValue: ""
  });

  const handleSearch = async () => {
    const condition =
      values.searchType === "number"
        ? { type: "", number: values.searchValue }
        : { type: values.searchValue, number: "" };
    await onSearch(condition);
  };

  return (
    <Box {...props}>
      <Box
        sx={{
          alignItems: "center",
          display: "flex",
          justifyContent: "space-between",
          flexWrap: "wrap",
          m: -1
        }}
      >
        <Typography sx={{ m: 1, fontSize: "32px !important" }} variant="h4">
          스팸번호 관리
        </Typography>
      </Box>
      <Box sx={{ mt: 3 }}>
        <Card>
          <CardContent sx={{ display: "flex" }}>
            <Box>
              <TextField
                sx={{ minWidth: 200, mr: 5 }}
                label="검색조건"
                name="searchType"
                onChange={handleChange}
                required
                select
                SelectProps={{ native: true }}
                value={values.searchType}
                variant="outlined"
              >
                {states.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </TextField>
              <TextField
                sx={{ minWidth: 700 }}
                name="searchValue"
                onChange={handleChange}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <SvgIcon color="action" fontSize="small">
                        <SearchIcon />
                      </SvgIcon>
                    </InputAdornment>
                  )
                }}
                placeholder="검색할 단어를 입력하세요."
                variant="outlined"
                value={values.searchValue}
              />
            </Box>
            <Button
              sx={{
                ml: 5,
                minWidth: 100,
                fontSize: "1.05rem",
                backgroundColor: "#1d93fe"
              }}
              variant="contained"
              onClick={handleSearch}
            >
              검색
            </Button>
          </CardContent>
        </Card>
      </Box>
    </Box>
  );
};
