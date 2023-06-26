import { useState, useEffect } from "react";
import PerfectScrollbar from "react-perfect-scrollbar";
import PropTypes from "prop-types";
import { format } from "date-fns";
import {
  Avatar,
  Box,
  Card,
  Checkbox,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  Typography,
  Button
} from "@mui/material";
import { getInitials } from "../../utils/get-initials";
import Excel from "exceljs";
import dayjs from "dayjs";

export const UserListTable = ({ listMember, ...rest }) => {
  const [selectedCustomerIds, setSelectedCustomerIds] = useState([]);
  const [selectAll, setSelectAll] = useState(false);
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(0);

  console.log("listMember", listMember);

  console.log("selectedCustomerIds", selectedCustomerIds);

  const handleSelectAll = (event) => {
    let newSelectedCustomerIds;

    if (event.target.checked) {
      setSelectAll(true);
      newSelectedCustomerIds = listMember.map((customer) => customer.idx);
    } else {
      setSelectAll(false);
      newSelectedCustomerIds = [];
    }

    setSelectedCustomerIds(newSelectedCustomerIds);
  };

  const handleSelectOne = (event, id) => {
    // const selectedIndex = selectedCustomerIds.indexOf(id);
    // let newSelectedCustomerIds = [];

    // if (selectedIndex === -1) {
    //   newSelectedCustomerIds = newSelectedCustomerIds.concat(
    //     selectedCustomerIds,
    //     id
    //   );
    // } else if (selectedIndex === 0) {
    //   newSelectedCustomerIds = newSelectedCustomerIds.concat(
    //     selectedCustomerIds.slice(1)
    //   );
    // } else if (selectedIndex === selectedCustomerIds.length - 1) {
    //   newSelectedCustomerIds = newSelectedCustomerIds.concat(
    //     selectedCustomerIds.slice(0, -1)
    //   );
    // } else if (selectedIndex > 0) {
    //   newSelectedCustomerIds = newSelectedCustomerIds.concat(
    //     selectedCustomerIds.slice(0, selectedIndex),
    //     selectedCustomerIds.slice(selectedIndex + 1)
    //   );
    // }

    // setSelectedCustomerIds(newSelectedCustomerIds);

    if (event.target.checked) {
      setSelectedCustomerIds([...selectedCustomerIds, id]);
    } else {
      const newSelected = selectedCustomerIds.filter((item) => item !== id);
      setSelectedCustomerIds([...newSelected]);
    }
  };

  const handleLimitChange = (event) => {
    setLimit(event.target.value);
  };

  const handlePageChange = (event, newPage) => {
    setPage(newPage);
  };

  const handleCreateExcel = async () => {
    const fileName = "회원 관리.xlsx";
    const wb = new Excel.Workbook();

    // table 회원기본정보
    const wsMember = wb.addWorksheet("회원기본정보");
    const headersMember = ["번호", "작업일시", "계정", "작업", "성공여부"];
    const columnWsMember = ["A", "B", "C", "D", "E"];
    const columnWsMemberWidth = [20, 20, 20, 20, 20];
    //columnWidth && header style, value cell //header
    columnWsMember.forEach((column, index) => {
      wsMember.getColumn(index + 1).width = columnWsMemberWidth[index];
      wsMember.getCell(`${column}1`).style = {
        font: { bold: true },
        alignment: { vertical: "center", horizontal: "center" }
      };
      wsMember.getCell(`${column}1`).value = headersMember[index];
    });

    // add value, style cell // body
    listMember.forEach((customer, index) => {
      wsMember.getCell(`A${index + 2}`).value = customer?.id ?? "";
      wsMember.getCell(`A${index + 2}`).style = {
        alignment: { vertical: "center", horizontal: "center" }
      };
      wsMember.getCell(`B${index + 2}`).value = customer?.regDate ?? "";
      wsMember.getCell(`B${index + 2}`).style = {
        alignment: { vertical: "center", horizontal: "center" }
      };
      wsMember.getCell(`C${index + 2}`).value = customer?.name ?? "";
      wsMember.getCell(`C${index + 2}`).style = {
        alignment: { vertical: "center", horizontal: "center" }
      };
      wsMember.getCell(`D${index + 2}`).value = "자주하는 질문";
      wsMember.getCell(`D${index + 2}`).style = {
        alignment: { vertical: "center", horizontal: "center" }
      };
      wsMember.getCell(`E${index + 2}`).value = "성공";
      wsMember.getCell(`E${index + 2}`).style = {
        alignment: { vertical: "center", horizontal: "center" }
      };
    });

    // table 이용중인 플랫폼 서비스
    const wsPlatform = wb.addWorksheet("이용중인 플랫폼 서비스");
    const headersPlatform = [
      "플랫폼 서비스명",
      "가입상태",
      "가입일자",
      "최근 접속일"
    ];
    const columnWsPlatform = ["A", "B", "C", "D"];
    const columnWsPlatformWidth = [20, 20, 20, 20];
    //columnWidth && header style, value cell //header
    columnWsPlatform.forEach((column, index) => {
      wsPlatform.getColumn(index + 1).width = columnWsPlatformWidth[index];
      wsPlatform.getCell(`${column}1`).style = {
        font: { bold: true },
        alignment: { vertical: "center", horizontal: "center" }
      };
      wsPlatform.getCell(`${column}1`).value = headersPlatform[index];
    });

    // add value, style cell // body
    listMember.forEach((customer, index) => {
      wsPlatform.getCell(`A${index + 2}`).value = customer?.id ?? "";
      wsPlatform.getCell(`A${index + 2}`).style = {
        alignment: { vertical: "center", horizontal: "center" }
      };
      wsPlatform.getCell(`B${index + 2}`).value = customer?.regDate ?? "";
      wsPlatform.getCell(`B${index + 2}`).style = {
        alignment: { vertical: "center", horizontal: "center" }
      };
      wsPlatform.getCell(`C${index + 2}`).value = customer?.name ?? "";
      wsPlatform.getCell(`C${index + 2}`).style = {
        alignment: { vertical: "center", horizontal: "center" }
      };
      wsPlatform.getCell(`D${index + 2}`).value = "자주하는 질문";
      wsPlatform.getCell(`D${index + 2}`).style = {
        alignment: { vertical: "center", horizontal: "center" }
      };
    });

    // table 문의내역
    const wsInquiry = wb.addWorksheet("문의내역");
    const headersInquiry = [
      "접수일자",
      "상태",
      "긴급도",
      "대분류",
      "문의내역",
      "특이사항",
      "접수센터",
      "접수자명"
    ];
    const columnWsInquiry = ["A", "B", "C", "D", "E", "F", "G", "H"];
    const columnWsInquiryWidth = [20, 20, 20, 20, 20, 20, 20, 20];
    //columnWidth && header style, value cell //header
    columnWsInquiry.forEach((column, index) => {
      wsInquiry.getColumn(index + 1).width = columnWsInquiryWidth[index];
      wsInquiry.getCell(`${column}1`).style = {
        font: { bold: true },
        alignment: { vertical: "center", horizontal: "center" }
      };
      wsInquiry.getCell(`${column}1`).value = headersInquiry[index];
    });

    // add value, style cell // body
    listMember.forEach((customer, index) => {
      wsInquiry.getCell(`A${index + 2}`).value = customer?.id ?? "";
      wsInquiry.getCell(`A${index + 2}`).style = {
        alignment: { vertical: "center", horizontal: "center" }
      };
      wsInquiry.getCell(`B${index + 2}`).value = customer?.regDate ?? "";
      wsInquiry.getCell(`B${index + 2}`).style = {
        alignment: { vertical: "center", horizontal: "center" }
      };
      wsInquiry.getCell(`C${index + 2}`).value = customer?.name ?? "";
      wsInquiry.getCell(`C${index + 2}`).style = {
        alignment: { vertical: "center", horizontal: "center" }
      };
      wsInquiry.getCell(`D${index + 2}`).value = "자주하는 질문";
      wsInquiry.getCell(`D${index + 2}`).style = {
        alignment: { vertical: "center", horizontal: "center" }
      };
      wsInquiry.getCell(`E${index + 2}`).value = "성공";
      wsInquiry.getCell(`E${index + 2}`).style = {
        alignment: { vertical: "center", horizontal: "center" }
      };
      wsInquiry.getCell(`F${index + 2}`).value = "";
      wsInquiry.getCell(`F${index + 2}`).style = {
        alignment: { vertical: "center", horizontal: "center" }
      };
      wsInquiry.getCell(`G${index + 2}`).value = "";
      wsInquiry.getCell(`G${index + 2}`).style = {
        alignment: { vertical: "center", horizontal: "center" }
      };
      wsInquiry.getCell(`H${index + 2}`).value = "";
      wsInquiry.getCell(`H${index + 2}`).style = {
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

  const handleDownloadExcel = async () => {
    handleCreateExcel();
  };

  return (
    <Card {...rest}>
      <PerfectScrollbar>
        <Box sx={{ minWidth: 1050 }}>
          <Box sx={{ m: 3, display: "flex", flexDirection: "row-reverse" }}>
            <Button
              sx={{
                ml: 5,
                minWidth: 100,
                fontSize: "1.05rem"
              }}
              variant="contained"
              color="success"
              onClick={handleDownloadExcel}
            >
              엑셀 다운로드
            </Button>
          </Box>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell padding="checkbox">
                  <Checkbox
                    checked={selectAll}
                    color="primary"
                    onChange={handleSelectAll}
                    value="true"
                  />
                </TableCell>
                <TableCell sx={{ textAlign: "center" }}>번호</TableCell>
                <TableCell sx={{ textAlign: "center" }} colSpan={2}>
                  작업일시
                </TableCell>
                <TableCell sx={{ textAlign: "center" }}>계정</TableCell>
                <TableCell sx={{ textAlign: "center" }}>작업</TableCell>
                <TableCell sx={{ textAlign: "center" }}>성공여부</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {listMember.length ? (
                (limit > 0
                  ? listMember.slice(page * limit, page * limit + limit)
                  : listMember
                )
                  .slice(0, limit)
                  .slice(0, limit)
                  .map((customer, index) => (
                    <TableRow
                      hover
                      key={index}
                      sx={{ cursor: "pointer" }}
                      // selected={selectedCustomerIds.indexOf(customer.id) !== -1}
                      onClick={() => handleClickRow(customer.idx)}
                    >
                      <TableCell padding="checkbox">
                        <Checkbox
                          // checked={
                          //   selectedCustomerIds.indexOf(customer.id) !== -1
                          // }
                          // onChange={(event) =>
                          //   handleSelectOne(event, customer.id)
                          // }
                          checked={!!selectedCustomerIds.includes(customer.idx)}
                          onChange={(e) => handleSelectOne(e, customer.idx)}
                          value="true"
                        />
                      </TableCell>
                      <TableCell>
                        <Box
                          sx={{
                            textAlign: "center"
                          }}
                        >
                          <Typography color="textPrimary" variant="body1">
                            {customer.rownum}
                          </Typography>
                        </Box>
                      </TableCell>
                      <TableCell
                        sx={{
                          textAlign: "center"
                        }}
                      >
                        {customer.date}
                      </TableCell>
                      <TableCell
                        sx={{
                          textAlign: "center"
                        }}
                      >
                        {customer.time}
                      </TableCell>
                      <TableCell
                        sx={{
                          textAlign: "center"
                        }}
                      >
                        {customer.admin_id}
                      </TableCell>
                      <TableCell
                        sx={{
                          textAlign: "center"
                        }}
                      >
                        {customer.work}
                      </TableCell>
                      <TableCell
                        sx={{
                          textAlign: "center"
                        }}
                      >
                        {customer.success ? "성공" : "실패"}
                      </TableCell>
                    </TableRow>
                  ))
              ) : (
                <TableRow sx={{ display: "flex", justifyContent: "center" }}>
                  <TableCell colSpan={6}>No rows</TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </Box>
      </PerfectScrollbar>
      <TablePagination
        component="div"
        count={listMember.length}
        onPageChange={handlePageChange}
        onRowsPerPageChange={handleLimitChange}
        page={page}
        rowsPerPage={limit}
        rowsPerPageOptions={[5, 10, 25]}
        labelRowsPerPage="표시 페이지 수"
      />
    </Card>
  );
};

UserListTable.propTypes = {
  listMember: PropTypes.array.isRequired
};
