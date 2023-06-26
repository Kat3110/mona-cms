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
import { useEffect, useState } from "react";
import { ADMIN_RIGHT, SEARCH_TYPE } from "../../utils/constants";
import {
  getTimeOf3Month,
  getTimeOfMonth,
  getTimeToDay,
  getTimeYesterday,
  getTimeOfWeek
} from "../../utils/function";
import AdminLogService from "../../services/AdminLogService/AdminLogService";
import Excel from "exceljs";
import dayjs from "dayjs";
import PerfectScrollbar from "react-perfect-scrollbar";
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
    id: "granteeName",
    label: "수여자 이름",
    minWidth: 170,
    align: "center"
  },
  {
    id: "preChangePermissions",
    label: "변경 전 권한",
    minWidth: 170,
    align: "center"
  },
  {
    id: "permissionsAfterChanges",
    label: "변경 후 권한",
    minWidth: 170,
    align: "center"
  },
  {
    id: "Grantee",
    label: "부여자 아이디",
    minWidth: 170,
    align: "center"
  },
  {
    id: "nameGrnt",
    label: "부여자 이름",
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
  granteeName,
  preChangePermissions,
  permissionsAfterChanges,
  Grantee,
  nameGrnt,
  remarks
) {
  return {
    number,
    date,
    accessAddress,
    idGrantee,
    granteeName,
    preChangePermissions,
    permissionsAfterChanges,
    Grantee,
    nameGrnt,
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
    "운영 관리자",
    "운영자",
    "mnkim@konai.com",
    "김모나",
    ""
  ),
  createData(
    2,
    "2022-09-14 10:08:09",
    "111.22.333.444",
    "jjwe@aiaracorp.com",
    "박주혜",
    "운영자",
    "운영 관리자",
    "mnkim@konai.com",
    "김모나",
    ""
  )
];

const period = ["어제", "오늘", "일주일", "1개월", "전체"];

const Page = () => {
  const [values, setValues] = useState({
    textInput: "",
    typeSearch: "",
    timePeriod: ""
  });
  const [listMenuHistory, setListMenuHistory] = useState([]);
  const [startValue, setStartValue] = useState(null);
  const [endValue, setEndValue] = useState(null);

  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await AdminLogService.getAccessLog({
          startDate: "",
          endDate: "",
          adminName: "",
          id: "",
          ip: "",
          accessName: ""
        });
        setListMenuHistory(res?.data?.result ?? []);
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
      timePeriod: ""
    });
    setStartValue(null);
    setEndValue(null);
    try {
      const res = await AdminLogService.getAccessLog({
        startDate: "",
        endDate: "",
        adminName: "",
        id: "",
        ip: "",
        accessName: ""
      });
      setListMenuHistory(res?.data?.result ?? []);
    } catch (error) {
      console.log(error);
    }
  };

  const handleSearch = async () => {
    let body = {
      // action: values.taskClass,
      accessName: "",
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
      const res = await AdminLogService.getAccessLog(body);
      setListMenuHistory(res?.data?.result ?? []);
    } catch (error) {
      console.log(error);
    }
  };

  const handleDownloadExcel = async () => {
    const fileName = "메뉴 권한 부여 이력 조회";
    const wb = new Excel.Workbook();

    // table 메뉴 권한 부여 이력 조회
    const ws = wb.addWorksheet("메뉴 권한 부여 이력 조회");
    const headers = [
      "번호",
      "사용일시",
      "접속 주소",
      "수여자 아이디",
      "수여자 이름",
      "변경 전 권한",
      "변경 후 권한",
      "부여자 아이디",
      "부여자 이름",
      "비고"
    ];
    const columnWs = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J"];
    const columnWsWidth = [20, 20, 20, 20, 20, 20, 20, 20, 20, 20];
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
    listMenuHistory.forEach((row, index) => {
      const oldAccessName = row.oldAccessName
        ? ADMIN_RIGHT.find((item) => item.value === row.oldAccessName)
        : {};
      const newAccessName = row.newAccessName
        ? ADMIN_RIGHT.find((item) => item.value === row.newAccessName)
        : {};
      ws.getCell(`A${index + 2}`).value = row?.rownum ?? "";
      ws.getCell(`A${index + 2}`).style = {
        alignment: { vertical: "center", horizontal: "center" }
      };
      ws.getCell(`B${index + 2}`).value = row.regDate
        ? dayjs(row.regDate).format("YYYY-MM-DD")
        : "";
      ws.getCell(`B${index + 2}`).style = {
        alignment: { vertical: "center", horizontal: "center" }
      };
      ws.getCell(`C${index + 2}`).value = row?.ip ?? "";
      ws.getCell(`C${index + 2}`).style = {
        alignment: { vertical: "center", horizontal: "center" }
      };
      ws.getCell(`D${index + 2}`).value = row?.adminId ?? "";
      ws.getCell(`D${index + 2}`).style = {
        alignment: { vertical: "center", horizontal: "center" }
      };
      ws.getCell(`E${index + 2}`).value = row?.adminName ?? "";
      ws.getCell(`E${index + 2}`).style = {
        alignment: { vertical: "center", horizontal: "center" }
      };
      ws.getCell(`F${index + 2}`).value = oldAccessName?.text ?? "";
      ws.getCell(`F${index + 2}`).style = {
        alignment: { vertical: "center", horizontal: "center" }
      };
      ws.getCell(`G${index + 2}`).value = newAccessName?.text ?? "";
      ws.getCell(`G${index + 2}`).style = {
        alignment: { vertical: "center", horizontal: "center" }
      };
      ws.getCell(`H${index + 2}`).value = row.changeById ?? "";
      ws.getCell(`H${index + 2}`).style = {
        alignment: { vertical: "center", horizontal: "center" }
      };
      ws.getCell(`I${index + 2}`).value = row.changeByName ?? "";
      ws.getCell(`I${index + 2}`).style = {
        alignment: { vertical: "center", horizontal: "center" }
      };
      ws.getCell(`J${index + 2}`).value = row.note ?? "";
      ws.getCell(`J${index + 2}`).style = {
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
              메뉴 권한 부여 이력 조회
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
                          sx={{ border: 1 }}
                        >
                          {item}
                        </Button>
                      </Box>
                    ))}
                  </ButtonGroup>
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
                <Typography sx={{ m: 1 }} variant="h5">
                  전체 {listMenuHistory.length}
                </Typography>
              </Box>
            </Box>
            <AlertDialog
              onDownload={handleDownloadExcel}
              menu="메뉴 권한 부여 이력 조회"
            />
          </Box>
        </Box>

        <PerfectScrollbar>
          <Box sx={{ mt: 3 }}>
            <Table
              sx={{ minWidth: 650, fontSize: "32px !important" }}
              aria-label="simple table"
            >
              <TableHead>
                <TableRow>
                  <StyledTableCell>번호</StyledTableCell>
                  <StyledTableCell align="center">작업일시</StyledTableCell>
                  <StyledTableCell align="center">접속 주소</StyledTableCell>
                  <StyledTableCell align="center">
                    수여자 아이디
                  </StyledTableCell>
                  <StyledTableCell align="center">수여자 이름</StyledTableCell>
                  <StyledTableCell align="center">변경 전 권한</StyledTableCell>
                  <StyledTableCell align="center">변경 후 권한</StyledTableCell>
                  <StyledTableCell align="center">
                    부여자 아이디
                  </StyledTableCell>
                  <StyledTableCell align="center">부여자 이름</StyledTableCell>
                  <StyledTableCell align="center">비고</StyledTableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {listMenuHistory.length ? (
                  (limit > 0
                    ? listMenuHistory.slice(page * limit, page * limit + limit)
                    : listMenuHistory
                  ).map((row, index) => {
                    const oldAccessName = row.oldAccessName
                      ? ADMIN_RIGHT.find(
                          (item) => item.value === row.oldAccessName
                        )
                      : {};
                    const newAccessName = row.newAccessName
                      ? ADMIN_RIGHT.find(
                          (item) => item.value === row.newAccessName
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
                          {row.regDate
                            ? dayjs(row.regDate).format("YYYY-MM-DD")
                            : ""}
                        </StyledTableCell>
                        <StyledTableCell align="center">
                          {row.ip}
                        </StyledTableCell>
                        <StyledTableCell align="center">
                          {row.adminId}
                        </StyledTableCell>
                        <StyledTableCell align="center">
                          {row.adminName}
                        </StyledTableCell>
                        <StyledTableCell align="center">
                          {oldAccessName?.text ?? ""}
                        </StyledTableCell>
                        <StyledTableCell align="center">
                          {newAccessName?.text ?? ""}
                        </StyledTableCell>
                        <StyledTableCell align="center">
                          {row.changeById}
                        </StyledTableCell>
                        <StyledTableCell align="center">
                          {row.changeByName}
                        </StyledTableCell>
                        <StyledTableCell align="center">
                          {row.note}
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
          count={listMenuHistory.length}
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
