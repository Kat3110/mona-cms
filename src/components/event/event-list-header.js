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
  Divider,
} from '@mui/material';
import { Search as SearchIcon } from '../../icons/search';
import { useState } from 'react';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import dayjs from 'dayjs';

const states = [
  {
    value: 'name',
    label: '이름',
  },
  {
    value: 'id',
    label: '아이디',
  },
  {
    value: 'phone',
    label: '전화번호',
  },
];

export const EventListHeader = props => {
  const handleChange = event => {
    setValues({
      ...values,
      [event.target.name]: event.target.value,
    });
  };

  const [values, setValues] = useState({
    searchType: 'name',
    searchValue: '',
  });

  const [startValue, setStartValue] = useState(dayjs('2022-10-07T00:00:00'));
  const [endValue, setEndValue] = useState(dayjs('2022-11-07T00:00:00'));

  const handleStartDateChange = newValue => {
    setStartValue(newValue);
  };
  const handleEndDateChange = newValue => {
    setEndValue(newValue);
  };

  // ** 임시 데이터 만들어놓음
  const emails = ['username@gmail.com', 'user02@gmail.com'];
  const [open, setOpen] = useState(false);
  const [selectedValue, setSelectedValue] = useState(emails[1]);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = value => {
    setOpen(false);
    setSelectedValue(value);
  };

  return (
    <Box {...props}>
      <Box
        sx={{
          alignItems: 'center',
          display: 'flex',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          m: -1,
        }}
      >
        <Typography sx={{ m: 1 }}  fontSize='32px'>
          이벤트/광고 배너 조회
        </Typography>
      </Box>

      <Box sx={{ mt: 3 }}>
        <Card>
          <CardContent
            sx={{
              display: 'flex',
              gap: '0 10px',
              justifyContent: 'flex-start',
              alignItems: 'center',
            }}
          >
            <Box sx={{ mr: 3 }}>
              <Typography sx={{ m: 1 }} fontSize='16px !important'>
                기간 조회 :
              </Typography>
            </Box>
            <Box>
              <RadioGroup
                row
                aria-labelledby="demo-row-radio-buttons-group-label"
                name="row-radio-buttons-group"
              >
                <FormControlLabel
                  value="female"
                  control={<Radio />}
                  label="기간 지정"
                />
                <FormControlLabel
                  value="male"
                  control={<Radio />}
                  label="월별"
                />
              </RadioGroup>
            </Box>
            <ButtonGroup variant="outlined" aria-label="outlined button group">
              <Button>금일</Button>
              <Button>1주일</Button>
              <Button>1개월</Button>
              <Button>3개월</Button>
            </ButtonGroup>

            <DesktopDatePicker
              inputFormat="yyyy-MM-dd"
              value={startValue}
              onChange={handleStartDateChange}
              renderInput={params => <TextField {...params} />}
            />

            <DesktopDatePicker
              inputFormat="yyyy-MM-dd"
              value={endValue}
              onChange={handleEndDateChange}
              renderInput={params => <TextField {...params} />}
            />
          </CardContent>
          <Divider />
          <CardContent sx={{ display: 'flex', gap: '0 10px',
            justifyContent: 'flex-start'}}>
            <Box sx={{ display: 'flex', gap: '0 10px',
              justifyContent: 'flex-start', }}>
              <TextField
                sx={{ minWidth: 200 }}
                label="검색조건"
                name="searchType"
                onChange={handleChange}
                required
                select
                SelectProps={{ native: true }}
                value={values.searchType}
                variant="outlined"
              >
                {states.map(option => (
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
                  ),
                }}
                placeholder="검색할 단어를 입력해주세요."
                variant="outlined"
                value={values.searchValue}
              />
            </Box>
            <Button
              sx={{
                minWidth: 100,
                fontSize: '14px',
                backgroundColor: '#1d93fe',
              }}
              variant="contained"
              onClick={handleClickOpen}
            >
              검색
            </Button>
          </CardContent>
        </Card>
      </Box>
    </Box>
  );
};
