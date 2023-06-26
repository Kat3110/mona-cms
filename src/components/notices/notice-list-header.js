import {
  Box,
  Button,
  Card,
  CardContent,
  TextField,
  InputAdornment,
  SvgIcon,
  Typography,
  RadioGroup,
  FormControlLabel,
  Radio,
  ButtonGroup,
  Divider
} from "@mui/material";
import { Search as SearchIcon } from "../../icons/search";
import { useState } from "react";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import dayjs from "dayjs";
import {
  getTimeToDay,
  getTimeOfWeek,
  getTimeOfMonth,
  getTimeOf3Month
} from "./../../utils/function";

const states = [
  {
    value: "name",
    label: "이름"
  },
  {
    value: "category",
    label: "범주"
  }
];

const period = ["금일", "1주일", "1개월", "3개월"];

export const NoticeListHeader = (props) => {
  const { onSearch = () => {} } = props;

  const [values, setValues] = useState({
    textInput: "",
    typeTime: "",
    typeSearch: "",
    timePeriod: ""
  });
  const [open, setOpen] = useState(false);
  const [startValue, setStartValue] = useState(null);
  const [endValue, setEndValue] = useState(null);

  const handleChange = (event) => {
    setValues({
      ...values,
      [event.target.name]: event.target.value
    });
  };

  const handleStartDateChange = (newValue) => {
    setStartValue(newValue);
  };
  const handleEndDateChange = (newValue) => {
    setEndValue(newValue);
  };

  const handleSearch = async () => {
    console.log(values);
    let condition = {};
    const category = values.typeSearch === "category" ? values.textInput : "";
    const title = values.typeSearch === "name" ? values.textInput : "";
    let startDate = "",
      endDate = "";
    if (values.typeTime === "period") {
      if (values.timePeriod === "금일") {
        const [start, end] = getTimeToDay();
        startDate = dayjs(start).format("YYYY-MM-DD");
        endDate = dayjs(end).format("YYYY-MM-DD");
      }
      if (values.timePeriod === "1주일") {
        const [start, end] = getTimeOfWeek();
        startDate = dayjs(start).format("YYYY-MM-DD");
        endDate = dayjs(end).format("YYYY-MM-DD");
      }
      if (values.timePeriod === "1개월") {
        const [start, end] = getTimeOfMonth();
        startDate = dayjs(start).format("YYYY-MM-DD");
        endDate = dayjs(end).format("YYYY-MM-DD");
      }
      if (values.timePeriod === "3개월") {
        const [start, end] = getTimeOf3Month();
        startDate = dayjs(start).format("YYYY-MM-DD");
        endDate = dayjs(end).format("YYYY-MM-DD");
      }
    } else {
      startDate = startValue ? dayjs(startValue).format("YYYY-MM-DD") : "";
      endDate = endValue ? dayjs(endValue).format("YYYY-MM-DD") : "";
    }
    condition = { title, category, startDate, endDate };
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
        <Typography sx={{ m: 1 }} fontSize='32px'>
          공지사항 조회
        </Typography>
      </Box>

      <Box sx={{ mt: 3 }}>
        <Card>
          <CardContent
            sx={{
              display: "flex",
              justifyContent: "flex-start",
              alignItems: "center",
              gap: '0 20px'
            }}
          >
            <Box sx={{ mr: 3 }}>
              <Typography sx={{ m: 1 }} fontSize='16px'>
                기간 조회 :
              </Typography>
            </Box>
            <Box>
              <RadioGroup
                row
                aria-labelledby="demo-row-radio-buttons-group-label"
                name="typeTime"
                onChange={handleChange}
                value={values.typeTime}
              >
                <FormControlLabel
                  value="period"
                  control={<Radio />}
                  label="기간 지정"
                />
                <FormControlLabel
                  value="monthly"
                  control={<Radio />}
                  label="월별"
                />
              </RadioGroup>
            </Box>
            <ButtonGroup variant="outlined" aria-label="outlined button group">
              {period.map((item, index) => (
                <Button
                  key={index}
                  variant={values.timePeriod === item ? "contained" : "outlined"}
                  onClick={() => {
                    setValues({ ...values, timePeriod: item });
                  }}
                >
                  {item}
                </Button>
              ))}
            </ButtonGroup>

            <DesktopDatePicker
              inputFormat="yyyy-MM-dd"
              value={startValue}
              onChange={handleStartDateChange}
              renderInput={(params) => <TextField {...params} />}
            />

            <DesktopDatePicker
              inputFormat="yyyy-MM-dd"
              value={endValue}
              onChange={handleEndDateChange}
              renderInput={(params) => <TextField {...params} />}
            />
          </CardContent>
          <Divider />
          <CardContent sx={{ display: "flex", justifyContent: "flex-start", gap: '0 27px' }}>
            <Box sx={{ display: "flex", justifyContent: "flex-start", gap: '0 27px' }}>
              <TextField
                sx={{ minWidth: 200 }}
                label="검색조건"
                name="typeSearch"
                onChange={handleChange}
                required
                select
                SelectProps={{ native: true }}
                value={values.typeSearch}
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
                name="textInput"
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
                placeholder="검색할 단어를 입력해주세요."
                variant="outlined"
                value={values.textInput}
              />
            </Box>
            <Button
              sx={{
                minWidth: 100,
                fontSize: "14px",
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
