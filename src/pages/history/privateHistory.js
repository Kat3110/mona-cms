import {
  Box,
  Button,
  ButtonGroup,
  Card,
  CardContent,
  Container,
  InputAdornment,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TextField,
  Typography,
  TablePagination
} from "@mui/material";
import { DashboardLayout } from "/src/components/dashboard-layout";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import AlertDialog from "../../components/alertDialog/alertDialog";
import PerfectScrollbar from "react-perfect-scrollbar";
import Excel from "exceljs";
import { SEARCH_TYPE, TASK_CLASSIFICATION2 } from "../../utils/constants";
import AdminLogService from "../../services/AdminLogService/AdminLogService";
import { useState, useEffect } from "react";
import dayjs from "dayjs";
import { styled } from "@mui/material/styles";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  fontSize: "14px !important"
}));

const columns = [
  { id: "name", label: "Name", minWidth: 170 },
  { id: "code", label: "ISO\u00a0Code", minWidth: 100 },
  {
    id: "number",
    label: "번호",
    minWidth: 170,
    align: "center"
  },
  {
    id: "date",
    label: "작업일시",
    minWidth: 170,
    align: "center"
  },
  {
    id: "accessAddress",
    label: "접속 주소",
    minWidth: 170,
    align: "center"
  },
  {
    id: "idGrantee",
    label: "수여자 아이디",
    minWidth: 170,
    align: "center"
  },
  {
    id: "name",
    label: "이름",
    minWidth: 170,
    align: "center"
  },
  {
    id: "numberOfData",
    label: "데이터 수",
    minWidth: 170,
    align: "center"
  },
  {
    id: "useMenu",
    label: "사용 메뉴",
    minWidth: 170,
    align: "center"
  },
  {
    id: "work",
    label: "작업",
    minWidth: 170,
    align: "center"
  },
  {
    id: "remarks",
    label: "비고",
    minWidth: 170,
    align: "center"
  }
];

function createData(
  number,
  date,
  accessAddress,
  idGrantee,
  name,
  numberOfData,
  useMenu,
  work,
  remarks
) {
  return {
    number,
    date,
    accessAddress,
    idGrantee,
    name,
    numberOfData,
    useMenu,
    work,
    remarks
  };
}

const rows = [
  createData(
    1,
    "2022-09-14 10:08:09",
    "111.22.333.444",
    "jjwe@aiaracorp.com",
    "박주혜",
    "3",
    "회원 관리>정보조회",
    "조회",
    "김회원"
  ),
  createData(
    2,
    "2022-09-14 10:08:09",
    "111.22.333.444",
    "jjwe@aiaracorp.com",
    "박주혜",
    "1",
    "회원 관리>정보조회",
    "수정",
    "김회원"
  )
];

const period = ["어제", "오늘", "일주일", "1개월", "전체"];

const Page = () => {
  const [values, setValues] = useState({
    textInput: "",
    typeSearch: "",
    timePeriod: "",
    taskClass: ""
  });
  const [listAdminHistory, setListAdminHistory] = useState([]);
  const [startValue, setStartValue] = useState(null);
  const [endValue, setEndValue] = useState(null);

  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await AdminLogService.getQueryInforLog({
          startDate: "",
          endDate: "",
          adminName: "",
          id: "",
          ip: "",
          action: ""
        });
        setListAdminHistory(res?.data?.result ?? []);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  const handleStartDateChange = (newValue) => {
    setStartValue(newValue);
  };
  const handleEndDateChange = (newValue) => {
    setEndValue(newValue);
  };

  const onChangeTimePeriod = (value) => {
    setValues({ ...values, timePeriod: value });
    let startDate = null,
      endDate = null;
    if (value === "어제") {
      const [start, end] = getTimeYesterday();
      startDate = dayjs(start).format("YYYY-MM-DD");
      endDate = dayjs(end).format("YYYY-MM-DD");
    }
    if (value === "오늘") {
      const [start, end] = getTimeToDay();
      startDate = dayjs(start).format("YYYY-MM-DD");
      endDate = dayjs(end).format("YYYY-MM-DD");
    }
    if (value === "일주일") {
      const [start, end] = getTimeOfWeek();
      startDate = dayjs(start).format("YYYY-MM-DD");
      endDate = dayjs(end).format("YYYY-MM-DD");
    }
    if (value === "1개월") {
      const [start, end] = getTimeOfMonth();
      startDate = dayjs(start).format("YYYY-MM-DD");
      endDate = dayjs(end).format("YYYY-MM-DD");
    }
    if (values.timePeriod === "전체") {
      startDate = null;
      endDate = null;
    }
    setStartValue(startDate);
    setEndValue(endDate);
  };

  const handleReset = async () => {
    setValues({
      textInput: "",
      typeSearch: "",
      timePeriod: "",
      taskClass: ""
    });
    setStartValue(null);
    setEndValue(null);
    try {
      const res = await AdminLogService.getQueryInforLog({
        startDate: "",
        endDate: "",
        adminName: "",
        id: "",
        ip: "",
        action: ""
      });
      setListAdminHistory(res?.data?.result ?? []);
    } catch (error) {
      console.log(error);
    }
  };

  const handleSearch = async () => {
    let body = {
      action: values.taskClass === "All" ? "" : values.taskClass,
      startDate: startValue ? dayjs(startValue).format("YYYY-MM-DD") : "",
      endDate: endValue ? dayjs(endValue).format("YYYY-MM-DD") : ""
    };
    if (values.typeSearch === "All") {
      body = {
        ...body,
        adminName: "",
        id: "",
        ip: ""
      };
    }
    if (values.typeSearch === "Name") {
      body = {
        ...body,
        adminName: values.textInput,
        id: "",
        ip: ""
      };
    }
    if (values.typeSearch === "ID") {
      body = {
        ...body,
        adminName: "",
        id: values.textInput,
        ip: ""
      };
    }
    if (values.typeSearch === "Access address") {
      body = {
        ...body,
        adminName: "",
        id: "",
        ip: values.textInput
      };
    }
    try {
      const res = await AdminLogService.getQueryInforLog(body);
      setListAdminHistory(res?.data?.result ?? []);
    } catch (error) {
      console.log(error);
    }
  };

  const handleDownloadExcel = async () => {
    const fileName = "개인정보 취급 이력 조회";
    const wb = new Excel.Workbook();

    // table 	개인정보 취급 이력 조회
    const ws = wb.addWorksheet("개인정보 취급 이력 조회");
    const headers = [
      "번호",
      "사용일시",
      "접속 주소",
      "수여자 아이디",
      "이름",
      "데이터 수",
      "사용 메뉴",
      "작업",
      "비고"
    ];
    const columnWs = ["A", "B", "C", "D", "E", "F", "G", "H", "I"];
    const columnWsWidth = [20, 20, 20, 20, 20, 20, 20, 20, 20];
    //columnWidth && header style, value cell //header
    columnWs.forEach((column, index) => {
      ws.getColumn(index + 1).width = columnWsWidth[index];
      ws.getCell(`${column}1`).style = {
        font: { bold: true },
        alignment: { vertical: "center", horizontal: "center" }
      };
      ws.getCell(`${column}1`).value = headers[index];
    });

    // add value, style cell // body
    listAdminHistory.forEach((row, index) => {
      const action = row.action
        ? TASK_CLASSIFICATION2.find((item) => item.value === row.action)
        : {};
      ws.getCell(`A${index + 2}`).value = row?.rownum ?? "";
      ws.getCell(`A${index + 2}`).style = {
        alignment: { vertical: "center", horizontal: "center" }
      };
      ws.getCell(`B${index + 2}`).value = row.reg_date
        ? dayjs(row.reg_date).format("YYYY-MM-DD")
        : "";
      ws.getCell(`B${index + 2}`).style = {
        alignment: { vertical: "center", horizontal: "center" }
      };
      ws.getCell(`C${index + 2}`).value = row?.ip ?? "";
      ws.getCell(`C${index + 2}`).style = {
        alignment: { vertical: "center", horizontal: "center" }
      };
      ws.getCell(`D${index + 2}`).value = row?.admin_id ?? "";
      ws.getCell(`D${index + 2}`).style = {
        alignment: { vertical: "center", horizontal: "center" }
      };
      ws.getCell(`E${index + 2}`).value = row?.admin_name ?? "";
      ws.getCell(`E${index + 2}`).style = {
        alignment: { vertical: "center", horizontal: "center" }
      };
      ws.getCell(`F${index + 2}`).value = row?.number_action ?? "";
      ws.getCell(`F${index + 2}`).style = {
        alignment: { vertical: "center", horizontal: "center" }
      };
      ws.getCell(`G${index + 2}`).value = row?.menu ?? "";
      ws.getCell(`G${index + 2}`).style = {
        alignment: { vertical: "center", horizontal: "center" }
      };
      ws.getCell(`H${index + 2}`).value = action?.value ?? "";
      ws.getCell(`H${index + 2}`).style = {
        alignment: { vertical: "center", horizontal: "center" }
      };
      ws.getCell(`I${index + 2}`).value = row.viewName ?? "";
      ws.getCell(`I${index + 2}`).style = {
        alignment: { vertical: "center", horizontal: "center" }
      };
    });

    const buffer = await wb.xlsx.writeBuffer();
    const url = window.URL.createObjectURL(new Blob([buffer]));
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", `${fileName}.xlsx`);
    document.body.appendChild(link);
    link.click();
    link.remove();
  };

  const handleLimitChange = (event) => {
    setLimit(event.target.value);
  };

  const handlePageChange = (event, newPage) => {
    setPage(newPage);
  };

  return (
    <Box component="main" sx={{ flexGrow: 1, py: 8 }}>
      <Container maxWidth={false}>
        <Box>
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
              개인정보 사용 이력 조회
            </Typography>
          </Box>
          <Box sx={{ mt: 3 }}>
            <Card>
              <CardContent sx={{ display: "flex", flexDirection: "column" }}>
                <Box sx={{ display: "flex", alignItems: "center", mb: 3 }}>
                  <Box sx={{ mr: 3, width: 120 }}>
                    <Typography
                      sx={{ m: 1, fontSize: "16px !important" }}
                      variant="h5"
                    >
                      검색 유형
                    </Typography>
                  </Box>
                  <Box>
                    <TextField
                      sx={{ minWidth: 200, mr: 5, fontSize: "16px !important" }}
                      name="searchType"
                      required
                      select
                      SelectProps={{ native: true }}
                      variant="outlined"
                      value={values.typeSearch}
                      onChange={(e) =>
                        setValues({ ...values, typeSearch: e.target.value })
                      }
                    >
                      {SEARCH_TYPE.map((item, index) => (
                        <option value={item.value} key={index}>
                          {item.text}
                        </option>
                      ))}
                    </TextField>
                    <TextField
                      sx={{ minWidth: 700, fontSize: "16px !important" }}
                      name="searchValue"
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start"></InputAdornment>
                        )
                      }}
                      variant="outlined"
                      value={values.textInput}
                      onChange={(e) =>
                        setValues({ ...values, textInput: e.target.value })
                      }
                    />
                  </Box>
                  <Button
                    sx={{
                      margin: "0 0 0 auto",
                      minWidth: 100,
                      fontSize: "1.05rem",
                      backgroundColor: "#1d93fe"
                    }}
                    variant="contained"
                    onClick={handleReset}
                  >
                    초기화
                  </Button>
                </Box>

                <Box sx={{ display: "flex", alignItems: "center", mb: 3 }}>
                  <Box sx={{ mr: 3, width: 120 }}>
                    <Typography
                      sx={{ m: 1, fontSize: "16px !important" }}
                      variant="h5"
                    >
                      일자
                    </Typography>
                  </Box>
                  <Box sx={{ mr: 3 }}>
                    <DesktopDatePicker
                      inputFormat="yyyy-MM-dd"
                      renderInput={(params) => <TextField {...params} />}
                      value={startValue}
                      onChange={handleStartDateChange}
                    />
                  </Box>
                  <Box sx={{ mr: 3 }}>
                    <DesktopDatePicker
                      inputFormat="yyyy-MM-dd"
                      renderInput={(params) => <TextField {...params} />}
                      value={endValue}
                      onChange={handleEndDateChange}
                    />
                  </Box>

                  <ButtonGroup
                    variant="outlined"
                    aria-label="outlined button group"
                  >
                    {period.map((item, index) => (
                      <Box sx={{ mr: 3 }} key={index}>
                        <Button
                          variant={
                            values.timePeriod === item ? "contained" : ""
                          }
                          onClick={() => {
                            onChangeTimePeriod(item);
                          }}
                          sx={{ border: 1, fontSize: "16px !important" }}
                        >
                          {item}
                        </Button>
                      </Box>
                    ))}
                  </ButtonGroup>
                </Box>

                <Box sx={{ display: "flex", alignItems: "center" }}>
                  <Box sx={{ mr: 3, width: 120 }}>
                    <Typography
                      sx={{ m: 1, fontSize: "16px !important" }}
                      variant="h5"
                    >
                      작업 구분
                    </Typography>
                  </Box>
                  <Box>
                    <TextField
                      sx={{ minWidth: 200, mr: 5 }}
                      name="searchType"
                      required
                      select
                      SelectProps={{ native: true }}
                      variant="outlined"
                      value={values.taskClass}
                      onChange={(e) =>
                        setValues({ ...values, taskClass: e.target.value })
                      }
                    >
                      {TASK_CLASSIFICATION2.map((item, index) => (
                        <option value={item.value} key={index}>
                          {item.text}
                        </option>
                      ))}
                    </TextField>
                  </Box>
                </Box>
              </CardContent>
            </Card>
            <Box
              sx={{
                m: 3,
                display: "flex",
                justifyContent: "center",
                alignItems: "center"
              }}
            >
              <Button
                size="large"
                variant="contained"
                sx={{
                  backgroundColor: "#1d93fe",
                  fontSize: "1.05rem",
                  padding: "0.5rem 3rem"
                }}
                onClick={handleSearch}
              >
                조회
              </Button>
            </Box>
          </Box>
        </Box>

        <Box>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between"
            }}
          >
            <Box sx={{ display: "flex" }}>
              <Box sx={{ mr: 3, width: 120 }}>
                <Typography
                  sx={{ m: 1, fontSize: "18px !important" }}
                  variant="h5"
                >
                  전체 {listAdminHistory.length}
                </Typography>
              </Box>
            </Box>
            <AlertDialog
              onDownload={handleDownloadExcel}
              menu="개인정보 사용 이력 조회"
            />
          </Box>
        </Box>

        <PerfectScrollbar>
          <Box sx={{ mt: 3 }}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <StyledTableCell>번호</StyledTableCell>
                  <StyledTableCell align="center">작업일시</StyledTableCell>
                  <StyledTableCell align="center">접속 주소</StyledTableCell>
                  <StyledTableCell align="center">
                    수여자 아이디
                  </StyledTableCell>
                  <StyledTableCell align="center">이름</StyledTableCell>
                  <StyledTableCell align="center">데이터 수</StyledTableCell>
                  <StyledTableCell align="center">사용 메뉴</StyledTableCell>
                  <StyledTableCell align="center">작업</StyledTableCell>
                  <StyledTableCell align="center">비고</StyledTableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {listAdminHistory.length ? (
                  (limit > 0
                    ? listAdminHistory.slice(page * limit, page * limit + limit)
                    : listAdminHistory
                  ).map((row, index) => {
                    const action = row.action
                      ? TASK_CLASSIFICATION2.find(
                          (item) => item.value === row.action
                        )
                      : {};
                    return (
                      <TableRow
                        key={index}
                        sx={{
                          "&:last-child td, &:last-child th": { border: 0 }
                        }}
                      >
                        <StyledTableCell component="th" scope="row">
                          {row.rownum}
                        </StyledTableCell>
                        <StyledTableCell align="center">
                          {row.reg_date
                            ? dayjs(row.reg_date).format("YYYY-MM-DD")
                            : ""}
                        </StyledTableCell>
                        <StyledTableCell align="center">
                          {row.ip}
                        </StyledTableCell>
                        <StyledTableCell align="center">
                          {row.admin_id}
                        </StyledTableCell>
                        <StyledTableCell align="center">
                          {row.admin_name}
                        </StyledTableCell>
                        <StyledTableCell align="center">
                          {row.number_action}
                        </StyledTableCell>
                        <StyledTableCell align="center">
                          {row.menu}
                        </StyledTableCell>
                        <StyledTableCell align="center">
                          {action?.text ?? ""}
                        </StyledTableCell>
                        <StyledTableCell align="center">
                          {row.viewName}
                        </StyledTableCell>
                      </TableRow>
                    );
                  })
                ) : (
                  <TableRow sx={{ display: "flex", justifyContent: "center" }}>
                    <StyledTableCell colSpan={6}>No rows</StyledTableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </Box>
        </PerfectScrollbar>
        <TablePagination
          component="div"
          count={listAdminHistory.length}
          onPageChange={handlePageChange}
          onRowsPerPageChange={handleLimitChange}
          page={page}
          rowsPerPage={limit}
          rowsPerPageOptions={[5, 10, 25]}
          labelRowsPerPage="표시 페이지 수"
        />
      </Container>
    </Box>
  );
};

Page.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default Page;
