import { useState, useEffect, useRef, useMemo } from "react";
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
  TableBody
} from "@mui/material";
import dynamic from "next/dynamic";

import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import dayjs from "dayjs";
import {
  BANNER_CATEGORY,
  DEFAULT_EVENT,
  THUMB_CATEGORY
} from "../../utils/constants";

export const EventModifyDialog = (props) => {
  // ** 문의내역 상세 다이얼로그 오픈
  const {
    onClose,
    open,
    event = { ...DEFAULT_EVENT },
    onUpdate = () => {}
  } = props;

  //content

  // const

  const oldValue = useRef(null);

  const [startValue, setStartValue] = useState(null);
  const [endValue, setEndValue] = useState(null);
  const [data, setData] = useState({ ...event });
  const [content, setContent] = useState("");

  const NoSsrWysiwyg = useMemo(() => {
    setContent(event.content);
    return dynamic(() => import("../utill/editor"), { ssr: false });
  }, [event.content]);

  useEffect(() => {
    setData(event);
    oldValue.current = event;
    setStartValue(event.startDate);
    setEndValue(event.endDate);
  }, [event]);

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
  // thmbImg, bannerImg
  const handleSelectFile = async (e, type) => {
    setData({ ...data, [type]: e.target.files[0] });
  };

  // content
  const handleChangeContent = (content) => {
    setData({ ...data, content: content });
  };

  const handleClose = () => {
    onClose();
  };

  const handleModify = async () => {
    console.log("data", data);
    let body = new FormData();
    const thmbImg =
      oldValue.current.thmbImg === data.thmbImg ? null : data.thmbImg;
    const bannerImg =
      oldValue.current.bannerImg === data.bannerImg ? null : data.bannerImg;
    body.append("ccategory", data.ccategory);
    body.append("title", data.title);
    body.append("thumbImg", thmbImg);
    body.append("showYn", data.showYn);
    body.append(
      "startDate",
      startValue ? dayjs(startValue).format("YYYY-MM-DD") : ""
    );
    body.append(
      "endDate",
      endValue ? dayjs(endValue).format("YYYY-MM-DD") : ""
    );
    body.append("content", content);
    body.append("cbCategory", data.cbCategory);
    body.append("url", data.url);
    body.append("bannerImg", bannerImg);
    await onUpdate(body);
  };

  return (
    <Dialog onClose={handleClose} open={open} fullWidth maxWidth="1300px">
      <DialogTitle>이벤트/광고 베너 등록</DialogTitle>
      <TableContainer>
        <Table>
          <TableBody>
            <TableRow>
              <TableCell
                component="th"
                sx={{ backgroundColor: "#ccc", minWidth: 130 }}
              >
                이벤트 카테고리
              </TableCell>
              <TableCell>
                <TextField
                  select
                  SelectProps={{ native: true }}
                  labelId="gubun"
                  value={data.ccategory}
                  onChange={handleChange}
                  fullWidth
                  name="ccategory"
                >
                  {THUMB_CATEGORY.map((item, index) => (
                    <option key={index} value={item.value}>
                      {item.text}
                    </option>
                  ))}
                </TextField>
              </TableCell>
              <TableCell
                component="th"
                sx={{ backgroundColor: "#ccc", minWidth: 130 }}
              >
                베너광고
              </TableCell>
              <TableCell>
                <TextField
                  select
                  SelectProps={{ native: true }}
                  labelId="status"
                  value={data.cbCategory}
                  onChange={handleChange}
                  fullWidth
                  name="cbCategory"
                >
                  {BANNER_CATEGORY.map((item, index) => (
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
                sx={{ backgroundColor: "#ccc", width: 130 }}
              >
                제목
              </TableCell>
              <TableCell>
                <TextField
                  fullWidth
                  label="제목"
                  value={data.title}
                  onChange={handleChange}
                  name="title"
                ></TextField>
              </TableCell>
              <TableCell
                component="th"
                sx={{ backgroundColor: "#ccc", width: 130 }}
              >
                링크 URL
              </TableCell>
              <TableCell>
                <TextField
                  fullWidth
                  label="베너 이미지 클릭 시 이동시킬 URL"
                  value={data.url}
                  onChange={handleChange}
                  name="url"
                ></TextField>
              </TableCell>
            </TableRow>

            <TableRow>
              <TableCell
                component="th"
                sx={{ backgroundColor: "#ccc", width: 130 }}
              >
                썸네일 이미지
              </TableCell>
              <TableCell>
                <TextField
                  size="small"
                  sx={{ mr: 3 }}
                  value={data?.thmbImg?.name}
                  disabled
                />
                <Button variant="contained" component="label">
                  Upload File
                  <input
                    type="file"
                    hidden
                    onChange={(e) => handleSelectFile(e, "thmbImg")}
                  />
                </Button>
              </TableCell>
              <TableCell
                component="th"
                sx={{ backgroundColor: "#ccc", width: 130 }}
              >
                베너 이미지
              </TableCell>
              <TableCell>
                <TextField
                  // label="배너 이미지"
                  size="small"
                  sx={{ mr: 3 }}
                  value={data?.bannerImg?.name}
                  disabled
                />
                <Button variant="contained" component="label">
                  Upload File
                  <input
                    type="file"
                    hidden
                    onChange={(e) => handleSelectFile(e, "bannerImg")}
                  />
                </Button>
              </TableCell>
            </TableRow>

            <TableRow>
              <TableCell
                component="th"
                sx={{ backgroundColor: "#ccc", width: 130 }}
              >
                공개여부
              </TableCell>
              <TableCell colSpan={4}>
                <RadioGroup
                  value={data.showYn}
                  name="showYn"
                  onChange={handleChange}
                  sx={{ display: "flex", flexDirection: "row" }}
                >
                  <FormControlLabel
                    value="Y"
                    control={<Radio />}
                    label="공개"
                  />
                  <FormControlLabel
                    value="N"
                    control={<Radio />}
                    label="비공개"
                  />
                </RadioGroup>
              </TableCell>
            </TableRow>

            <TableRow>
              <TableCell
                component="th"
                sx={{ backgroundColor: "#ccc", width: 130 }}
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
              <TableCell
                component="th"
                sx={{ backgroundColor: "#ccc", width: 130 }}
              >
                종료일
              </TableCell>
              <TableCell>
                <DesktopDatePicker
                  inputFormat="yyyy-MM-dd"
                  value={endValue}
                  onChange={handleEndDateChange}
                  renderInput={(params) => <TextField {...params} />}
                />
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
      <NoSsrWysiwyg content={content} setContent={setContent} />
      <Button
        sx={{
          margin: 5,
          ml: "90%",
          maxWidth: 100,
          fontSize: "1.05rem",
          backgroundColor: "#1d93fe",
          float: "right"
        }}
        variant="contained"
        onClick={handleModify}
      >
        수정
      </Button>
    </Dialog>
  );
};
