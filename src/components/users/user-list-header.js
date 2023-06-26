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
import LoadingButton from "@mui/lab/LoadingButton";
import { Search as SearchIcon } from "../../icons/search";
import { useState } from "react";
import { SimpleDialog } from "./user-select-dialog";

import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import dayjs from "dayjs";
import MemberService from "../../services/MemberService/MemberService";

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

const mock_data = [
  {
    email: "username@gmail.com",
    phone: "010-1234-5679",
    name: "박주혜!",
    number: "010-1234-5555",
    userId: "aypark@naver.com",
    birthDate: "92.02.21",
    regDate: "2022-08-10",
    joinStatus: "Y",
    marketing: [{ sms: "Y" }, { email: "Y" }, { push: "Y" }],
    address: "서울시 노원구"
  },
  {
    email: "user02@gmail.com",
    phone: "010-1234-5678",
    name: "박주혜",
    number: "010-1234-5555",
    userId: "aypark@naver.com",
    birthDate: "92.02.21",
    regDate: "2022-08-10",
    joinStatus: "Y",
    marketing: [{ sms: "Y" }, { email: "Y" }, { push: "Y" }],
    address: "서울시 노원구"
  }
];

export const UsersListHeader = (props) => {
  const { setData = () => {}, onSearch } = props;
  const [startValue, setStartValue] = useState(null);
  const [endValue, setEndValue] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleStartDateChange = (newValue) => {
    setStartValue(newValue);
  };
  const handleEndDateChange = (newValue) => {
    setEndValue(newValue);
  };

  const handleChange = (event) => {
    setValues({
      ...values,
      [event.target.name]: event.target.value
    });
  };

  const [values, setValues] = useState({
    searchType: "name",
    searchValue: ""
  });

  // ** 임시 데이터 만들어놓음
  // const emails = ["username@gmail.com", "user02@gmail.com"];
  const [open, setOpen] = useState(false);
  // const [selectedValue, setSelectedValue] = useState(emails[1]);
  const [listResult, setListResult] = useState([]);

  const handleClickOpen = () => {
    setLoading(true);
    setTimeout(() => {
      if (mock_data.length > 1) {
        setListResult([...mock_data]);
        setOpen(true);
      } else {
        setData(mock_data[0]);
      }
      setLoading(false);
    }, 3000);
  };

  const handleClose = async (value) => {
    let body = {
      startDate: startValue ? dayjs(startValue).format("YYYY-MM-DD") : "",
      endDate: endValue ? dayjs(endValue).format("YYYY-MM-DD") : "",
      name: value.adminName,
      id: value.adminId,
      phone: value.adminPhone
    };
    setOpen(false);
    await onSearch(body);
  };

  const handleSearch = async () => {
    let body = {};
    if (values.searchType === "name") {
      body = { ...body, name: values.searchValue, id: "", phone: "" };
    }
    if (values.searchType === "id") {
      body = { ...body, name: "", id: values.searchValue, phone: "" };
    }
    if (values.searchType === "phone") {
      body = { ...body, name: "", id: "", phone: values.searchValue };
    }
    try {
      setLoading(true);
      const res = await MemberService.homeSearch(body);
      const result = res?.data?.result ?? [];
      setLoading(false);
      if (result.length > 1) {
        setListResult([...result]);
        setOpen(true);
      }
    } catch (error) {
      console.log(error);
    }
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
          회원 정보 조회
        </Typography>
      </Box>
      <Box sx={{ mt: 3 }}>
        <Card>
          <CardContent
            sx={{ display: "flex", justifyContent: "space-between" }}
          >
            <Box>
              <TextField
                sx={{ minWidth: 150, mr: 5 }}
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
                sx={{ minWidth: 400 }}
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
                placeholder="회원정보 검색"
                variant="outlined"
                value={values.searchValue}
              />
            </Box>
            {/* <Box
              sx={{
                alignItems: "center",
                display: "flex",
                justifyContent: "space-between",
                flexWrap: "wrap",
                m: -1
              }}
            >
              <Typography sx={{ m: 1 }} variant="h5">
                시작일:
              </Typography>
              <DesktopDatePicker
                inputFormat="yyyy-MM-dd"
                value={startValue}
                onChange={handleStartDateChange}
                renderInput={(params) => <TextField {...params} />}
              />
            </Box>
            <Box
              sx={{
                alignItems: "center",
                display: "flex",
                justifyContent: "space-between",
                flexWrap: "wrap",
                m: -1
              }}
            >
              <Typography sx={{ m: 1 }} variant="h5">
                종료일:
              </Typography>
              <DesktopDatePicker
                inputFormat="yyyy-MM-dd"
                value={endValue}
                onChange={handleEndDateChange}
                renderInput={(params) => <TextField {...params} />}
              />
            </Box> */}
            <LoadingButton
              sx={{
                ml: 5,
                minWidth: 100,
                fontSize: "1.05rem",
                backgroundColor: "#1d93fe"
              }}
              onClick={handleSearch}
              loading={loading}
              loadingIndicator="검색..."
              variant="contained"
            >
              검색
            </LoadingButton>
            <SimpleDialog list={listResult} open={open} onClose={handleClose} />
          </CardContent>
        </Card>
      </Box>
    </Box>
  );
};
