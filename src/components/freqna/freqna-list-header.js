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
import { useState } from "react";
import { FQA_CATEGORY } from "../../utils/constants";

const states = [
  {
    value: "name",
    label: "이름"
  },
  {
    value: "id",
    label: "아이디"
  },
  {
    value: "phone",
    label: "전화번호"
  }
];

export const FreqnaListHeader = (props) => {
  const { onSearch, onDownloadExcel } = props;
  const [selectedOption, setSelectedOption] = useState("");

  const handleSearch = async () => {
    await onSearch(selectedOption);
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
        <Typography sx={{ m: 1 }} fontSize='32px'>
          자주하는 질문 관리
        </Typography>
      </Box>
      <Box sx={{ mt: 3 }}>
        <Card>
          <CardContent
            sx={{
              display: "flex",
                justifyContent: 'flex-start',
                alignItems: 'center'
            }}
          >
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                flexDirection: "row",
                  gap: '0 30px'
              }}
            >
              <Typography sx={{ fontSize: '16px'}}>구분</Typography>
              <Box>
                <TextField
                  sx={{ minWidth: 200}}
                  label="검색조건"
                  name="searchType"
                  onChange={(e) => setSelectedOption(e.target.value)}
                  required
                  select
                  SelectProps={{ native: true }}
                  value={selectedOption}
                  variant="outlined"
                >
                  {FQA_CATEGORY.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.text}
                    </option>
                  ))}
                </TextField>
              </Box>
              <Button
                sx={{
                  minWidth: 100,
                  fontSize: "1.05rem",
                  backgroundColor: "#1d93fe"
                }}
                variant="contained"
                onClick={handleSearch}
              >
                검색
              </Button>
            </Box>
            <Box>
              <Button
                sx={{
                  ml: 4,
                  minWidth: 100,
                  fontSize: "1.05rem",
                  backgroundColor: "#14B8A6"
                }}
                variant="contained"
                onClick={onDownloadExcel}
              >
                엑셀 다운로드
              </Button>
            </Box>
          </CardContent>
        </Card>
      </Box>
    </Box>
  );
};
