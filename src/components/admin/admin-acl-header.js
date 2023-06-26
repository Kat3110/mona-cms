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
    value: "Super Administrator",
    label: "최고 관리자"
  },
  {
    value: "Operations Manage",
    label: "운영 관리자"
  },
  {
    value: "Operator",
    label: "운영자"
  }
];

export const AdminAclHeader = (props) => {
  const { selectedOption, setSelectedOption, onSearch } = props;

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
        <Typography sx={{ m: 1 }} variant="h4">
          메뉴 권한 관리
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
                required
                select
                SelectProps={{ native: true }}
                value={selectedOption}
                onChange={(e) => setSelectedOption(e.target.value)}
                variant="outlined"
              >
                {states.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </TextField>
            </Box>
            <Button
              sx={{
                ml: 5,
                minWidth: 100,
                fontSize: "1.05rem",
                backgroundColor: "#1d93fe"
              }}
              variant="contained"
              onClick={onSearch}
            >
              검색
            </Button>
          </CardContent>
        </Card>
      </Box>
    </Box>
  );
};
