import { useState, useEffect } from "react";
import {
  Box,
  Button,
  Container,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography
} from "@mui/material";
import { DashboardLayout } from "/src/components/dashboard-layout";
import TermsOpenDialog from "/src/components/terms/terms-open-dialog";
import TermService from "../../services/TermService/TermService";

const columns = [
  { id: "name", label: "Name", minWidth: 170 },
  { id: "code", label: "ISO\u00a0Code", minWidth: 100 },
  {
    id: "number",
    label: "구분",
    minWidth: 170,
    align: "center"
  },
  {
    id: "title",
    label: "제목",
    minWidth: 170,
    align: "center"
  },
  {
    id: "finalModificationDate",
    label: "최종수정일",
    minWidth: 170,
    align: "center"
  },
  {
    id: "worker",
    label: "작업자",
    minWidth: 170,
    align: "center"
  }
];

function createData(number, title, finalModificationDate, worker) {
  return { number, title, finalModificationDate, worker };
}

const rows = [
  createData(1, "[필수] 서비스 이용약관", "2022-10-24", "관리자"),
  createData(2, "[필수] 개인(신용)정보 수집 및 이용", "2022-10-24", "관리자"),
  createData(3, "[필수] 본인확인 서비스 전체 동의", "2022-10-24", "관리자"),
  createData(4, "[선택] 혜택 및 마케팅 정보 수진 동의", "2022-10-24", "관리자")
];

const Page = () => {
  const [timeRecall, setTimeRecall] = useState(0);
  const [listTerm, setListTerm] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await TermService.getTermsList();
        setListTerm(res?.data?.result ?? []);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [timeRecall]);
  return (
    <Box component="main" sx={{ flexGrow: 1, py: 8 }}>
      <Container maxWidth={false}>
        <Typography sx={{ m: 1 }} variant="h4">
          이용약관 관리
        </Typography>
        <Box sx={{ mt: 7 }}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell align="center">구분</TableCell>
                <TableCell align="center">제목</TableCell>
                <TableCell align="center">최종수정일</TableCell>
                <TableCell align="center">작업자</TableCell>
                <TableCell align="center">수정</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {listTerm.map((row, index) => (
                <TableRow
                  key={index}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell align="center" component="th" scope="row">
                    {row.rownum}
                  </TableCell>
                  <TableCell align="left">{row.title}</TableCell>
                  <TableCell align="center">{row.dateMofidy}</TableCell>
                  <TableCell align="center">{row.admin_name}</TableCell>
                  <TableCell align="center">
                    <TermsOpenDialog
                      idx={row.idx}
                      setTimeRecall={setTimeRecall}
                    />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Box>
      </Container>
    </Box>
  );
};

Page.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default Page;
