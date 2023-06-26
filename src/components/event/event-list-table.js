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
import { EventWriteDialog } from "./event-write-dialog";
import { EventDeleteDialog } from "./event-delete-dialog";
import { EventModifyDialog } from "./event-modify-dialog";
import Excel from "exceljs";
import EventService from "../../services/EventService/EventService";
import { BANNER_CATEGORY, THUMB_CATEGORY } from "../../utils/constants";

export const EventListTable = (props) => {
    const { setTimeReRender = () => {}, listEvent, ...rest } = props;
    const [selectedList, setSelectedList] = useState([]);
    const [selectAll, setSelectAll] = useState(false);

    const [limit, setLimit] = useState(10);
    const [page, setPage] = useState(0);

    const [openWrite, setOpenWrite] = useState(false);
    const [openDelete, setOpenDelete] = useState(false);
    const [openEdit, setOpenEdit] = useState(false);
    const [dataEdit, setDataEdit] = useState({});

    const handleClickOpen = async (dialog) => {
        if (dialog === "write") {
            setOpenWrite(true);
        } else if (dialog === "delete") {
            setOpenDelete(true);
        } else if (dialog === "edit") {
            try {
                console.log("selectedList.at(-1)", selectedList.at(-1));
                const res = await EventService.getEventDetail(selectedList.at(-1));
                const result = res?.data?.result ?? {};
                const thumCategory = result.thumbCategory
                    ? THUMB_CATEGORY.find((item) => item.name === result.thumbCategory)
                    : {};
                const bannerCategory = result.bannerCategory
                    ? BANNER_CATEGORY.find((item) => item.name === result.bannerCategory)
                    : {};
                const data = {
                    ccategory: thumCategory?.value ?? "",
                    title: result?.title ?? "",
                    thmbImg: result?.thumbImgName ?? "",
                    showYn: result?.showYn ?? "",
                    startDate: result?.startDate ?? "",
                    endDate: result?.endDate ?? "",
                    content: result?.content ?? "",
                    cbCategory: bannerCategory?.value ?? "",
                    url: result?.url ?? "",
                    bannerImg: result?.bannerImgName ?? ""
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

    const handleSelectAll = (event) => {
        let newSelected;

        if (event.target.checked) {
            newSelected = listEvent.map((item) => item.idx);
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
        const fileName = "이벤트.광고 배너 조회";
        const wb = new Excel.Workbook();

        // table 이벤트/광고 배너 조회
        const ws = wb.addWorksheet("이벤트.광고 배너 조회");
        const headers = [
            "번호",
            "카테고리",
            "베너",
            "제목",
            "시작일",
            "종료일",
            "공개여부",
            "등록일",
            "작성자",
            "조회수"
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
        listEvent.forEach((row, index) => {
            ws.getCell(`A${index + 2}`).value = row?.rownum ?? "";
            ws.getCell(`A${index + 2}`).style = {
                alignment: { vertical: "center", horizontal: "center" }
            };
            ws.getCell(`B${index + 2}`).value = row?.thumbCategory ?? "";
            ws.getCell(`B${index + 2}`).style = {
                alignment: { vertical: "center", horizontal: "center" }
            };
            ws.getCell(`C${index + 2}`).value = row?.bannerCategory ?? "";
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
                row.showYn === "Y" ? "공개" : "비공개";
            ws.getCell(`G${index + 2}`).style = {
                alignment: { vertical: "center", horizontal: "center" }
            };
            ws.getCell(`H${index + 2}`).value = row?.regDate ?? "";
            ws.getCell(`H${index + 2}`).style = {
                alignment: { vertical: "center", horizontal: "center" }
            };
            ws.getCell(`I${index + 2}`).value = row?.regName ?? "";
            ws.getCell(`I${index + 2}`).style = {
                alignment: { vertical: "center", horizontal: "center" }
            };
            ws.getCell(`J${index + 2}`).value = row?.viewCount ?? "";
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

    const handleAdd = async (data) => {
        try {
            await EventService.addEvent(data);
            setTimeReRender((prevState) => prevState + 1);
            setOpenWrite(false);
        } catch (error) {
            console.log(error);
        }
    };

    const handleUpdate = async (data) => {
        try {
            const id = selectedList.at(-1);
            await EventService.modifyEvent(id, data);
            setTimeReRender((prevState) => prevState + 1);
            setOpenEdit(false);
        } catch (error) {
            console.log(error);
        }
    };

    const handleDelete = async (data) => {
        try {
            await EventService.deleteEvent([...selectedList]);
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
                    >
                        삭제
                    </Button>
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
                <PerfectScrollbar>
                    <Box sx={{ minWidth: 1050 }}>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell padding="checkbox">
                                        <Checkbox checked={selectAll} onChange={handleSelectAll} />
                                    </TableCell>
                                    <TableCell>번호</TableCell>
                                    <TableCell>카테고리</TableCell>
                                    <TableCell>베너</TableCell>
                                    <TableCell>제목</TableCell>
                                    <TableCell>시작일</TableCell>
                                    <TableCell>종료일</TableCell>
                                    <TableCell>공개여부</TableCell>
                                    <TableCell>등록일</TableCell>
                                    <TableCell>작성자</TableCell>
                                    <TableCell>조회수</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {listEvent.length ? (
                                    (limit > 0
                                            ? listEvent.slice(page * limit, page * limit + limit)
                                            : listEvent
                                    ).map((event, index) => {
                                        const thumCategory = event.thumbCategory
                                            ? THUMB_CATEGORY.find(
                                                (item) => item.name === event.thumbCategory
                                            )
                                            : {};
                                        const bannerCategory = event.bannerCategory
                                            ? BANNER_CATEGORY.find(
                                                (item) => item.name === event.bannerCategory
                                            )
                                            : {};
                                        return (
                                            <TableRow hover key={index}>
                                                <TableCell padding="checkbox">
                                                    <Checkbox
                                                        onChange={(e) => handleSelectOne(e, event.idx)}
                                                        checked={selectedList.includes(event.idx)}
                                                        // disabled={selectedList!==}
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
                                                            {event.rownum}
                                                        </Typography>
                                                    </Box>
                                                </TableCell>
                                                <TableCell>{thumCategory?.text ?? ""}</TableCell>
                                                <TableCell>{bannerCategory?.text ?? ""}</TableCell>
                                                <TableCell>{event.title}</TableCell>
                                                <TableCell>{event.startDate}</TableCell>
                                                <TableCell>{event.endDate}</TableCell>
                                                <TableCell>
                                                    {event.showYn === "Y" ? "공개" : "비공개"}
                                                </TableCell>
                                                <TableCell>{event.regDate}</TableCell>
                                                <TableCell>{event.regName}</TableCell>
                                                <TableCell>{event.viewCount}</TableCell>
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
                    count={listEvent.length}
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
                        disabled={selectedList.length > 1 || !selectedList.length}
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
            <EventWriteDialog
                open={openWrite}
                onClose={() => handleClose("write")}
                onAdd={handleAdd}
            />
            <EventModifyDialog
                open={openEdit}
                onClose={() => handleClose("edit")}
                onUpdate={handleUpdate}
                event={dataEdit}
            />
            <EventDeleteDialog
                open={openDelete}
                onClose={() => handleClose("delete")}
                onDelete={handleDelete}
            />
        </>
    );
};

EventListTable.propTypes = {
    listEvent: PropTypes.array.isRequired
};
