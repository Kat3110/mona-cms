import { useState } from "react";
import PerfectScrollbar from "react-perfect-scrollbar";
import PropTypes from "prop-types";
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
import { NoticeWriteDialog } from "./notice-write-dialog";
import { NoticeDeleteDialog } from "./notice-delete-dialog";
import Excel from "exceljs";
import NoticeService from "../../services/NoticeService/NoticeService";
import { NoticeModifyDialog } from "./notice-modify-dialog";
import { ANNOUNCEMENT_CATEGORY } from "../../utils/constants";

export const NoticeListTable = (props) => {
  const { setTimeReRender = () => {}, listNotice, ...rest } = props;
  const [selectedList, setSelectedList] = useState([]);
  const [selectAll, setSelectAll] = useState(false);

  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(0);

  const [openWrite, setOpenWrite] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [dataEdit, setDataEdit] = useState("");

  // const handleClickOpen = (dialog) => {
  //   if (dialog === "write") {
  //     setOpenWrite(true);
  //   } else if (dialog === "delete") {
  //     setOpenDelete(true);
  //   } else if (dialog === "edit") {
  //     const id = selectedList.at(-1);
  //     setDataEdit(id);
  //     setOpenEdit(true);
  //   }
  // };

  const handleClickOpen = async (dialog) => {
    if (dialog === "write") {
      setOpenWrite(true);
    } else if (dialog === "delete") {
      setOpenDelete(true);
    } else if (dialog === "edit") {
      try {
        const id = selectedList.at(-1);
        const res = await NoticeService.getNoticeDetail(id);
        const result = res?.data?.result ?? {};
        const category = result?.category
          ? ANNOUNCEMENT_CATEGORY.find((item) => item.name === result?.category)
          : "";
        const data = {
          ncategory: category?.value ?? "all",
          nstartdate: result?.startDate ?? null,
          nenddate: result?.endDate ?? null,
          ncontents: result?.contents ?? "",
          // nregdate: "",
          // nregid: "",
          ntitle: result?.title ?? "",
          nshowyn: result?.disclosure ?? ""
        };
        setDataEdit(data);
        setOpenEdit(true);
      } catch (error) {
        console.log(error);
      }
    }
  };

  const handleClose = (dialog) => {
    if (dialog === "write") {
      setOpenWrite(false);
    } else if (dialog === "delete") {
      setOpenDelete(false);
    } else if (dialog === "edit") {
      setOpenEdit(false);
    }
  };

  console.log("selectedList", selectedList);

  const handleSelectAll = (event) => {
    let newSelected;

    if (event.target.checked) {
      newSelected = listNotice.map((item) => item.idx);
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
    const fileName = "공지사항 조회";
    const wb = new Excel.Workbook();

    // table 이벤트/광고 배너 조회
    const ws = wb.addWorksheet("공지사항 조회");
    const headers = [
      "번호",
      "이름",
      "카테고리",
      "게시일",
      "종료일",
      "종료일",
      "공개여부",
      "작성일",
      "작성자"
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
    listNotice.forEach((row, index) => {
      ws.getCell(`A${index + 2}`).value = row?.rownum ?? "";
      ws.getCell(`A${index + 2}`).style = {
        alignment: { vertical: "center", horizontal: "center" }
      };
      ws.getCell(`B${index + 2}`).value = row?.title ?? "";
      ws.getCell(`B${index + 2}`).style = {
        alignment: { vertical: "center", horizontal: "center" }
      };
      ws.getCell(`C${index + 2}`).value = row?.categoryName ?? "";
      ws.getCell(`C${index + 2}`).style = {
        alignment: { vertical: "center", horizontal: "center" }
      };
      ws.getCell(`D${index + 2}`).value = row?.title ?? "";
      ws.getCell(`D${index + 2}`).style = {
        alignment: { vertical: "center", horizontal: "center" }
      };
      ws.getCell(`E${index + 2}`).value = row?.startDate ?? "";
      ws.getCell(`E${index + 2}`).style = {
        alignment: { vertical: "center", horizontal: "center" }
      };
      ws.getCell(`F${index + 2}`).value = row?.endDate ?? "";
      ws.getCell(`F${index + 2}`).style = {
        alignment: { vertical: "center", horizontal: "center" }
      };
      ws.getCell(`G${index + 2}`).value =
        event.showYn === "Y" ? "공개" : "비공개";
      ws.getCell(`G${index + 2}`).style = {
        alignment: { vertical: "center", horizontal: "center" }
      };
      ws.getCell(`H${index + 2}`).value = row?.regDate ?? "";
      ws.getCell(`H${index + 2}`).style = {
        alignment: { vertical: "center", horizontal: "center" }
      };
      ws.getCell(`I${index + 2}`).value = row?.adminName ?? "";
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

  const handleAdd = async (data) => {
    try {
      await NoticeService.addNotice(data);
      setTimeReRender((prevState) => prevState + 1);
      setOpenWrite(false);
    } catch (error) {
      console.log(error);
    }
  };

  const handleUpdate = async (data) => {
    try {
      const id = selectedList.at(-1);
      await NoticeService.modifyNotice(id, data);
      setTimeReRender((prevState) => prevState + 1);
      setOpenEdit(false);
    } catch (error) {
      console.log(error);
    }
  };

  const handleDelete = async (data) => {
    try {
      await NoticeService.deleteNotice([...selectedList]);
      setSelectedList([]);
      setTimeReRender((prevState) => prevState + 1);
      setOpenDelete(false);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Card {...rest}>
        <Box sx={{ m: 3, display: "flex", flexDirection: "row-reverse" }}>
          <Button
            sx={{
              ml: 5,
              minWidth: 100,
              fontSize: "1.05rem"
            }}
            color="error"
            variant="contained"
            onClick={() => handleClickOpen("delete")}
            disabled={!selectedList.length}
          >
            삭제
          </Button>
          <Button
            sx={{
              ml: 5,
              minWidth: 100,
              fontSize: "14px"
            }}
            variant="contained"
            color="success"
            onClick={handleDownloadExcel}
          >
            엑셀 다운로드
          </Button>
        </Box>
        <PerfectScrollbar>
          <Box sx={{ minWidth: 1050 }}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell padding="checkbox">
                    <Checkbox checked={selectAll} onChange={handleSelectAll} />
                  </TableCell>
                  <TableCell sx={{fontSize:'16px !important'}}>번호</TableCell>
                  <TableCell sx={{fontSize:'16px !important'}}>이름</TableCell>
                  <TableCell sx={{fontSize:'16px !important'}}>카테고리</TableCell>
                  <TableCell sx={{fontSize:'16px !important'}}>게시일</TableCell>
                  <TableCell sx={{fontSize:'16px !important'}}>종료일</TableCell>
                  <TableCell sx={{fontSize:'16px !important'}}>공개여부</TableCell>
                  <TableCell sx={{fontSize:'16px !important'}}>작성일</TableCell>
                  <TableCell sx={{fontSize:'16px !important'}}>작성자</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {listNotice.length ? (
                  (limit > 0
                    ? listNotice.slice(page * limit, page * limit + limit)
                    : listNotice
                  )
                    .slice(0, limit)
                    .map((notice, index) => {
                      const category = notice?.categoryName
                        ? ANNOUNCEMENT_CATEGORY.find(
                            (item) => item.name === notice?.categoryName
                          )
                        : "";
                      return (
                        <TableRow hover key={notice.idx}>
                          <TableCell padding="checkbox">
                            <Checkbox
                              checked={selectedList.includes(notice.idx)}
                              onChange={(e) => handleSelectOne(e, notice.idx)}
                              value="true"
                            />
                          </TableCell>
                          <TableCell>
                            <Box
                              sx={{
                                alignItems: "center",
                                display: "flex"
                              }}
                            >
                              <Typography color="textPrimary" variant="body1">
                                {notice.rownum}
                              </Typography>
                            </Box>
                          </TableCell>
                          <TableCell sx={{fontSize: '14px'}}>{notice.title}</TableCell>
                          <TableCell sx={{fontSize: '14px'}}>{category?.text ?? ""}</TableCell>
                          <TableCell sx={{fontSize: '14px'}}>{notice.startDate}</TableCell>
                          <TableCell sx={{fontSize: '14px'}}>{notice.endDate}</TableCell>
                          <TableCell sx={{fontSize: '14px'}}>
                            {notice.showStatus === "y" ? "공개" : "비공개"}
                          </TableCell>
                          <TableCell sx={{fontSize: '14px'}}>{notice.regDate}</TableCell>
                          <TableCell sx={{fontSize: '14px'}}>{notice.adminName}</TableCell>
                        </TableRow>
                      );
                    })
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
          count={listNotice.length}
          onPageChange={handlePageChange}
          onRowsPerPageChange={handleLimitChange}
          page={page}
          rowsPerPage={limit}
          rowsPerPageOptions={[5, 10, 25]}
        />
        <Box sx={{ m: 3, display: "flex", flexDirection: "row-reverse" }}>
          <Button
            sx={{
              ml: 5,
              minWidth: 100,
              fontSize: "1.05rem"
            }}
            color="primary"
            variant="contained"
            onClick={() => handleClickOpen("edit")}
            disabled={!selectedList.length}
          >
            수정
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
            등록
          </Button>
        </Box>
      </Card>
      <NoticeWriteDialog
        open={openWrite}
        onClose={() => handleClose("write")}
        onAdd={handleAdd}
      />
      <NoticeModifyDialog
        open={openEdit}
        onClose={() => handleClose("edit")}
        onUpdate={handleUpdate}
        noticeId={dataEdit}
        notice={dataEdit}
      />
      <NoticeDeleteDialog
        open={openDelete}
        onClose={() => handleClose("delete")}
        onDelete={handleDelete}
      />
    </>
  );
};

NoticeListTable.propTypes = {
  listNotice: PropTypes.array.isRequired
};
