import { useState } from "react";
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
  Divider,
  Button
} from "@mui/material";
import { getInitials } from "../../utils/get-initials";
import { CallsWriteDialog } from "./calls-write-dialog";
import { CallsDeleteDialog } from "./calls-delete-dialog";
import SpamService from "../../services/SpamService/SpamService";
import Excel from "exceljs";
import { styled } from "@mui/material/styles";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  fontSize: "14px !important"
}));

const states = [
  {
    value: "survey",
    label: "조사"
  },
  {
    value: "loan guidance",
    label: "대출 안내"
  }
];

export const CallsListTable = (props) => {
  const { setTimeReRender, listSpam, ...rest } = props;
  const [selectedList, setSelectedList] = useState([]);
  const [selectAll, setSelectAll] = useState(false);
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(0);

  const [openWrite, setOpenWrite] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);

  const handleClickOpen = (dialog) => {
    if (dialog === "write") {
      setOpenWrite(true);
    } else if (dialog === "delete") {
      setOpenDelete(true);
    }
  };

  const handleClose = (dialog) => {
    if (dialog === "write") {
      setOpenWrite(false);
    } else if (dialog === "delete") {
      setOpenDelete(false);
    }
  };

  const handleAdd = async (value) => {
    try {
      await SpamService.addSpam(value);
      setTimeReRender((prevState) => prevState + 1);
      setOpenWrite(false);
    } catch (error) {
      console.log(error);
    }
  };

  const handleDelete = async () => {
    try {
      await SpamService.deleteSpam([...selectedList]);
      setTimeReRender((prevState) => prevState + 1);
      setOpenDelete(false);
    } catch (error) {
      console.log(error);
    }
  };

  const handleSelectAll = (event) => {
    let newSelected;

    if (event.target.checked) {
      newSelected = listSpam.map((item) => item.idx);
      setSelectAll(true);
    } else {
      newSelected = [];
      setSelectAll(false);
    }

    setSelectedList(newSelected);
  };

  const handleSelectOne = (event, id) => {
    if (event.target.checked) {
      setSelectedList([...selectedList, id]);
    } else {
      const newSelected = selectedList.filter((item) => item !== id);
      setSelectedList([...newSelected]);
    }
  };

  const handleLimitChange = (event) => {
    setLimit(event.target.value);
  };

  const handlePageChange = (event, newPage) => {
    setPage(newPage);
  };

  const handleDownloadExcel = async () => {
    const fileName = "스팸번호 관리";
    const wb = new Excel.Workbook();

    // table 스팸번호 관리
    const ws = wb.addWorksheet("스팸번호 관리");
    const headers = ["번호", "유형", "번호", "비고", "생성일"];
    const columnWs = ["A", "B", "C", "D", "E"];
    const columnWsWidth = [20, 20, 20, 20, 20];
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
    listSpam.forEach((row, index) => {
      ws.getCell(`A${index + 2}`).value = row?.rownum ?? "";
      ws.getCell(`A${index + 2}`).style = {
        alignment: { vertical: "center", horizontal: "center" }
      };
      ws.getCell(`B${index + 2}`).value = row?.type ?? "";
      ws.getCell(`B${index + 2}`).style = {
        alignment: { vertical: "center", horizontal: "center" }
      };
      ws.getCell(`C${index + 2}`).value = row?.number ?? "";
      ws.getCell(`C${index + 2}`).style = {
        alignment: { vertical: "center", horizontal: "center" }
      };
      ws.getCell(`D${index + 2}`).value = row?.createdAt ?? "";
      ws.getCell(`D${index + 2}`).style = {
        alignment: { vertical: "center", horizontal: "center" }
      };
      ws.getCell(`E${index + 2}`).value = row?.comment ?? "";
      ws.getCell(`E${index + 2}`).style = {
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

  return (
    <>
      <Card {...rest}>
        <Divider />
        <Box sx={{ m: 3, display: "flex", justifyContent: "flex-end" }}>
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
          <Button
            sx={{
              ml: 5,
              minWidth: 100,
              fontSize: "1.05rem"
            }}
            color="error"
            variant="contained"
            onClick={() => handleClickOpen("delete")}
          >
            번호 삭제
          </Button>
          <Button
            sx={{
              ml: 5,
              minWidth: 100,
              fontSize: "1.05rem"
            }}
            variant="contained"
            color="primary"
            onClick={() => handleClickOpen("write")}
          >
            번호 등록
          </Button>
        </Box>
        <PerfectScrollbar>
          <Box sx={{ minWidth: 1050 }}>
            <Table sx={{ fontSize: "14px !important" }}>
              <TableHead>
                <TableRow>
                  <StyledTableCell padding="checkbox">
                    <Checkbox checked={selectAll} onChange={handleSelectAll} />
                  </StyledTableCell>
                  <StyledTableCell>번호</StyledTableCell>
                  <StyledTableCell>유형</StyledTableCell>
                  <StyledTableCell>휴대폰 번호</StyledTableCell>
                  <StyledTableCell>생성일</StyledTableCell>
                  <StyledTableCell>비고</StyledTableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {listSpam.length ? (
                  (limit > 0
                    ? listSpam.slice(page * limit, page * limit + limit)
                    : listSpam
                  ).map((spam, index) => {
                    const type = spam.type
                      ? states.find((item) => item.value === spam.type)
                      : {};
                    return (
                      <TableRow hover key={index}>
                        <StyledTableCell padding="checkbox">
                          <Checkbox
                            onChange={(e) => handleSelectOne(e, spam.idx)}
                            checked={selectedList.includes(spam.idx)}
                            value="true"
                          />
                        </StyledTableCell>
                        <StyledTableCell>
                          <Box
                            sx={{
                              alignItems: "center",
                              display: "flex"
                            }}
                          >
                            <Typography color="textPrimary" variant="body1">
                              {spam.rownum}
                            </Typography>
                          </Box>
                        </StyledTableCell>
                        <StyledTableCell>{type?.label ?? ""}</StyledTableCell>
                        <StyledTableCell>{spam.number}</StyledTableCell>
                        <StyledTableCell>{spam.createdAt}</StyledTableCell>
                        <StyledTableCell>{spam.comment}</StyledTableCell>
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
          count={listSpam.length}
          onPageChange={handlePageChange}
          onRowsPerPageChange={handleLimitChange}
          page={page}
          rowsPerPage={limit}
          rowsPerPageOptions={[5, 10, 25]}
          labelRowsPerPage="표시 페이지 수"
        />
      </Card>
      <CallsWriteDialog
        open={openWrite}
        onClose={() => handleClose("write")}
        onAdd={handleAdd}
      />
      <CallsDeleteDialog
        open={openDelete}
        onClose={() => handleClose("delete")}
        onDelete={handleDelete}
      />
    </>
  );
};

CallsListTable.propTypes = {
  listSpam: PropTypes.array.isRequired
};
