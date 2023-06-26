import { DashboardLayout } from "/src/components/dashboard-layout";
import {
  Box,
  Button,
  Card,
  CardContent,
  Checkbox,
  Container,
  InputAdornment,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from "@mui/material";
import TableContainer from "@mui/material/TableContainer";
import * as React from "react";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import PerfectScrollbar from "react-perfect-scrollbar";

function createData(
  shipping,
  status,
  shippingDate,
  CancellationOfReservation,
  shippingTitle,
  dispatcher,
  shipper
) {
  return {
    shipping,
    status,
    shippingDate,
    CancellationOfReservation,
    shippingTitle,
    dispatcher,
    shipper,
  };
}

const rows = [
  createData(
    50000075,
    "발송",
    "2022-09-20 18:00:01",
    "",
    "PUSH+SMS 혼합발송",
    "sdkfl@konai.com",
    "4"
  ),
  createData(
    50000074,
    "발송",
    "2022-09-11 18:00:01",
    "",
    "테스트",
    "addfl@konai.com",
    "2"
  ),
  createData(
    50000073,
    "예약",
    "2022-10-01 18:00:01",
    "예약취소",
    "테스트",
    "sdkfl@konai.com",
    "2"
  ),
  createData(
    50000072,
    "발송",
    "2022-09-08 18:00:01",
    "",
    "테스트",
    "sslee@konai.com",
    "2"
  ),
  createData(
    50000071,
    "발송",
    "2022-09-01 18:00:01",
    "",
    "테스트",
    "fksk@konai.com",
    "2"
  ),
  createData(
    50000070,
    "예약",
    "2022-11-01 18:00:01",
    "예약취소",
    "테스트",
    "sdkfl@konai.com",
    "2"
  ),
  createData(
    50000069,
    "발송",
    "2022-08-01 18:00:01",
    "",
    "테스트",
    "22dfsd@konai.com",
    "2"
  ),
  createData(
    50000068,
    "발송",
    "2022-07-01 18:00:01",
    "",
    "테스트",
    "sdkfl@konai.com",
    "2"
  ),
  createData(
    50000067,
    "예약",
    "2022-04-01 18:00:01",
    "예약취소",
    "테스트",
    "sdkfl@konai.com",
    "2"
  ),
  createData(
    50000066,
    "발송",
    "2022-06-01 18:00:01",
    "",
    "테스트",
    "sdkfl@konai.com",
    "2"
  ),
];

const Page = () => {
  return (
    <Box component="main" sx={{ flexGrow: 1, py: 8, display: "flex" }}>
      <Container maxWidth={false}>
        <Box>
          <Typography sx={{ m: 1 }} variant="h4">
            PUSH 관리
          </Typography>
          <Box sx={{ mt: 3 }}>
            <Card sx={{ mb: 4 }}>
              <CardContent sx={{ display: "flex" }}>
                <Box
                  sx={{
                    display: "flex",
                    width: "100%",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <Box sx={{ display: "flex", alignItems: "center" }}>
                    <Typography
                      sx={{ m: 1, justifyContent: "flex-start" }}
                      variant="h6"
                    >
                      제목
                    </Typography>
                    <TextField
                      sx={{ minWidth: 110, margin: "0 1rem" }}
                      name="searchValue"
                      placeholder="제목을 염력하세요"
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start"></InputAdornment>
                        ),
                      }}
                      variant="outlined"
                    />
                    <FormControl>
                      <RadioGroup
                        row
                        aria-labelledby="demo-row-radio-buttons-group-label"
                        name="row-radio-buttons-group"
                      >
                        <FormControlLabel
                          value="전체"
                          control={<Radio />}
                          label="전체"
                        />
                        <FormControlLabel
                          value="예약"
                          control={<Radio />}
                          label="예약"
                        />
                        <FormControlLabel
                          value="발송"
                          control={<Radio />}
                          label="발송"
                        />
                      </RadioGroup>
                    </FormControl>
                  </Box>
                  <Button
                    sx={{
                      width: 100,
                      height: 50,
                      fontSize: "1.05rem",
                      backgroundColor: "#1d93fe",
                    }}
                    variant="contained"
                  >
                    조회
                  </Button>
                </Box>
              </CardContent>
            </Card>

            <Card sx={{ width: "90%", margin: "0 auto" }}>
              <PerfectScrollbar>
                <Typography sx={{ m: 1 }} variant="h6">
                  발송목록
                </Typography>
                <Box sx={{ width: "100%", overflow: "hidden" }}>
                  <TableContainer sx={{ maxHeight: 490 }}>
                    <Table stickyHeader aria-label="sticky table">
                      <TableHead>
                        <TableRow>
                          <TableCell padding="checkbox">
                            <Checkbox checked color="primary" />
                          </TableCell>
                          <TableCell align="center">발송No</TableCell>
                          <TableCell align="center">상태</TableCell>
                          <TableCell align="center">발송일시</TableCell>
                          <TableCell align="center">예약취소</TableCell>
                          <TableCell align="center">발송제목</TableCell>
                          <TableCell align="center">발송자</TableCell>
                          <TableCell align="center">발송인원</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {rows.map((row) => (
                          <TableRow
                            key={row.shipping}
                            sx={{
                              "&:last-child td, &:last-child th": { border: 0 },
                            }}
                          >
                            <TableCell padding="checkbox">
                              <Checkbox value="true" />
                            </TableCell>
                            <TableCell align="center">{row.shipping}</TableCell>
                            <TableCell align="center">{row.status}</TableCell>
                            <TableCell align="center">
                              {row.shippingDate}
                            </TableCell>
                            <TableCell align="center">
                              {row.CancellationOfReservation}
                            </TableCell>
                            <TableCell align="center">
                              {row.shippingTitle}
                            </TableCell>
                            <TableCell align="center">
                              {row.dispatcher}
                            </TableCell>
                            <TableCell align="center">{row.shipper}</TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </TableContainer>
                </Box>
              </PerfectScrollbar>
            </Card>
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

Page.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default Page;
