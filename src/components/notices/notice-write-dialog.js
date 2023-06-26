import { useState, useEffect, useMemo } from "react";
import {
  TextField,
  Table,
  TableCell,
  TableRow,
  TableContainer,
  Dialog,
  DialogTitle,
  Select,
  MenuItem,
  Button,
  RadioGroup,
  Radio,
  FormControlLabel,
  Tab
} from "@mui/material";
import dynamic from "next/dynamic";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import dayjs from "dayjs";
import { ANNOUNCEMENT_CATEGORY, DEFAULT_NOTICE } from "../../utils/constants";

export const NoticeWriteDialog = (props) => {
  // ** 문의내역 상세 다이얼로그 오픈
  const { onClose, open, notice = { ...DEFAULT_NOTICE }, onAdd } = props;

  const [startValue, setStartValue] = useState(null);
  const [endValue, setEndValue] = useState(null);
  const [data, setData] = useState({});
  const [content, setContent] = useState("");

  useEffect(() => {
    setData({ ...DEFAULT_NOTICE });
  }, [open]);

  const NoSsrWysiwyg = useMemo(() => {
    setContent(notice?.ncontents ?? "");
    return dynamic(() => import("../utill/editor"), { ssr: false });
  }, [notice?.ncontents]);

  const handleStartDateChange = (newValue) => {
    setStartValue(newValue);
  };

  const handleEndDateChange = (newValue) => {
    setEndValue(newValue);
  };

  const handleChange = (event) => {
    const { value, name } = event.target;
    setData({
      ...data,
      [name]: value
    });
  };

  const handleChangeContent = (content) => {
    setData({ ...data, ncontents: content });
  };

  const handleAdd = async () => {
    const startDate = startValue ? dayjs(startValue).format("YYYY-MM-DD") : "";
    const endDate = endValue ? dayjs(endValue).format("YYYY-MM-DD") : "";
    const regDate = dayjs().format("YYYY-MM-DD");
    const category = data.ncategory === "all" ? null : data.ncategory;
    const body = {
      ...data,
      nregdate: regDate,
      nstartdate: startDate,
      nenddate: endDate,
      ncategory: category,
      ncontents: content
    };
    await onAdd(body);
  };

  const handleClose = () => {
    onClose();
  };

  return (
    <Dialog onClose={handleClose} open={open} fullWidth maxWidth="1300px">
      <DialogTitle fontSize='18px'>공지사항 등록</DialogTitle>
      <TableContainer>
        <Table>
          <TableRow>
            <TableCell
              component="th"
              sx={{ backgroundColor: "#ccc", minWidth: 130, fontSize:'16px' }}
            >
              카테고리
            </TableCell>
            <TableCell>
              <TextField
                select
                SelectProps={{ native: true }}
                labelId="gubun"
                onChange={handleChange}
                value={data.ncategory}
                name="ncategory"
                fullWidth
              >
                {ANNOUNCEMENT_CATEGORY.map((item, index) => (
                  <option key={index} value={item.value}>
                    {item.text}
                  </option>
                ))}
              </TextField>
            </TableCell>
          </TableRow>

          <TableRow>
            <TableCell
              component="th"
              sx={{ backgroundColor: "#ccc", width: 130, fontSize:'16px'  }}
            >
              제목
            </TableCell>
            <TableCell>
              <TextField
                fullWidth
                label="제목"
                onChange={handleChange}
                value={data.ntitle}
                name="ntitle"
              ></TextField>
            </TableCell>
          </TableRow>

          <TableRow>
            <TableCell
              component="th"
              sx={{ backgroundColor: "#ccc", width: 130, fontSize:'16px'  }}
            >
              공개여부
            </TableCell>
            <TableCell colSpan={4}>
              <RadioGroup
                onChange={handleChange}
                value={data.nshowyn}
                name="nshowyn"
                sx={{ display: "flex", flexDirection: "row" }}
              >
                <FormControlLabel value="y" control={<Radio />} label="공개" />
                <FormControlLabel
                  value="n"
                  control={<Radio />}
                  label="비공개"
                />
              </RadioGroup>
            </TableCell>
          </TableRow>

          <TableRow>
            <TableCell
              component="th"
              sx={{ backgroundColor: "#ccc", width: 130, fontSize:'16px'  }}
            >
              시작일
            </TableCell>
            <TableCell>
              <DesktopDatePicker
                inputFormat="yyyy-MM-dd"
                value={startValue}
                onChange={handleStartDateChange}
                renderInput={(params) => <TextField {...params} />}
              />
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell
              component="th"
              sx={{ backgroundColor: "#ccc", width: 130, fontSize:'16px'  }}
            >
              종료일
            </TableCell>
            <TableCell sx={{ mb: 5 }}>
              <DesktopDatePicker
                inputFormat="yyyy-MM-dd"
                value={endValue}
                onChange={handleEndDateChange}
                renderInput={(params) => <TextField {...params} />}
              />
            </TableCell>
          </TableRow>
        </Table>
      </TableContainer>
      <NoSsrWysiwyg content={content} setContent={setContent} />
      <Button
        sx={{
          margin: 5,
          ml: "90%",
          maxWidth: 100,
          fontSize: "14px",
          backgroundColor: "#1d93fe",
          float: "right"
        }}
        variant="contained"
        onClick={handleAdd}
      >
        등록
      </Button>
    </Dialog>
  );
};
