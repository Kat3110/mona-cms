import { useState, useMemo, useEffect } from "react";
import PerfectScrollbar from "react-perfect-scrollbar";
import PropTypes from "prop-types";
import { DataGrid } from "@mui/x-data-grid";
import {
  TextField,
  Box,
  Card,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  TableContainer,
  Typography,
  CardHeader,
  Dialog,
  DialogTitle,
  Select,
  MenuItem,
  Button
} from "@mui/material";
import dynamic from "next/dynamic";

import { styled } from "@mui/material/styles";
import dayjs from "dayjs";
import { FQA_CATEGORY, STATUS_QA } from "../../utils/constants";
import InquiryService from "../../services/InquiryService/InquiryService";

const StyledDataGrid = styled(DataGrid)(({ theme }) => ({
  fontSize: "14px !important",
  "& .MuiDataGrid-columnHeader": {
    backgroundColor: "#F3F4F6"
  }
}));

const StyledTypography = styled(Typography)({
  display: "-webkit-box",
  overflow: "hidden",
  WebkitBoxOrient: "vertical",
  WebkitLineClamp: 1
});

const columns = [
  {
    flex: 1,
    field: "regDate",
    headerName: "접수일자",
    renderCell: ({ row }) => (
      <StyledTypography variant="body2">
        {row.regDate ? dayjs(row.regDate).format("YYYY-MM-DD") : ""}
      </StyledTypography>
    )
  },
  {
    flex: 1,
    field: "answerStatus",
    headerName: "상태",
    renderCell: ({ row }) => (
      <StyledTypography variant="body2">{row.answerStatus}</StyledTypography>
    )
  },
  {
    flex: 1,
    field: "urgency",
    headerName: "긴급도",
    renderCell: ({ row }) => (
      <StyledTypography variant="body2">{""}</StyledTypography>
    )
  },
  {
    flex: 1,
    field: "category",
    headerName: "대분류",
    renderCell: ({ row }) => {
      const category = row.category
        ? FQA_CATEGORY.find((item) => item.name === row.category)
        : {};
      return (
        <StyledTypography variant="body2">
          {category?.text ?? ""}
        </StyledTypography>
      );
    }
  },
  {
    flex: 1,
    field: "question",
    headerName: "문의내역",
    renderCell: ({ row }) => (
      <StyledTypography variant="body2">{row.question}</StyledTypography>
    )
  },
  {
    flex: 1,
    field: "feature",
    headerName: "특이사항",
    renderCell: ({ row }) => (
      <StyledTypography variant="body2">{""}</StyledTypography>
    )
  },
  {
    flex: 1,
    field: "receptionCenter",
    headerName: "접수센터",
    renderCell: ({ row }) => (
      <StyledTypography variant="body2">{""}</StyledTypography>
    )
  },
  {
    flex: 1,
    field: "userRequest",
    headerName: "접수자명",
    renderCell: ({ row }) => (
      <StyledTypography variant="body2">{row.userRequest}</StyledTypography>
    )
  }
];

const rows = [
  {
    id: 1,
    receiptDate: "2022.11.11",
    status: "Status",
    urgency: "Urgency",
    classification: "Classification Classification",
    inquiryDetails: "Inquiry Details Inquiry Details",
    remarks: "Remarks Remarks",
    receptionCenter: "Reception Center Reception Center",
    nameOfRecipient: "Name of Recipient Name of Recipient"
  }
];

const UserQnaDialog = (props) => {
  // ** 문의내역 상세 다이얼로그 오픈
  const { onClose, open, inquiry, onUpdate } = props;
  const [data, setData] = useState({});
  const [answer, setAnswer] = useState("");

  const NoSsrWysiwyg = useMemo(() => {
    setAnswer(inquiry.ianswer);
    return dynamic(() => import("../utill/editor"), { ssr: false });
  }, [inquiry.ianswer]);

  useEffect(() => {
    setData({ ...inquiry });
  }, [inquiry]);

  const handleChange = (event) => {
    const { value, name } = event.target;
    setData({
      ...data,
      [name]: value
    });
  };

  const handleClose = () => {
    onClose();
  };

  const handleListItemClick = (value) => {
    onClose(value);
  };

  const handleUpdate = async () => {
    const body = {
      icategory: data?.icategory ?? "",
      iquestion: data?.iquestion ?? "",
      answerStatus: data?.answerStatus ?? "",
      ianswer: answer
    };
    await onUpdate(body);
  };

  return (
    <Dialog onClose={handleClose} open={open} fullWidth maxWidth="1192px">
      <DialogTitle>상세보기</DialogTitle>
      <TableContainer sx={{ overflowX: "unset" }}>
        <Table>
          <TableRow>
            <TableCell
              component="th"
              sx={{ backgroundColor: "#ccc", minWidth: 130 }}
            >
              구분
            </TableCell>
            <TableCell>
              <TextField
                select
                SelectProps={{ native: true }}
                size="small"
                labelId="gubun"
                value={data.icategory ? data.icategory : ""}
                onChange={handleChange}
                fullWidth
                name="icategory"
              >
                {FQA_CATEGORY.map((item, index) => (
                  <option value={item.value} key={index}>
                    {item.text}
                  </option>
                ))}
              </TextField>
            </TableCell>
            <TableCell
              component="th"
              sx={{ backgroundColor: "#ccc", minWidth: 130 }}
            >
              전화번호
            </TableCell>
            <TableCell>
              <TextField
                select
                SelectProps={{ native: true }}
                size="small"
                labelId="status"
                value={data.answerStatus ? data.answerStatus : ""}
                onChange={handleChange}
                fullWidth
                name="answerStatus"
              >
                {STATUS_QA.map((item, index) => (
                  <option value={item.value} key={index}>
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
              통합앱 가입일자
            </TableCell>
            <TableCell>{data.iregdate}</TableCell>
            <TableCell
              component="th"
              sx={{ backgroundColor: "#ccc", width: 130 }}
            >
              가입 상태
            </TableCell>
            <TableCell> {data.ianswerdate}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell
              component="th"
              sx={{ backgroundColor: "#ccc", width: 130 }}
            >
              질문
            </TableCell>
            <TableCell colSpan={7}>
              <TextField
                size="small"
                id="outlined-basic"
                label="질문"
                variant="outlined"
                fullWidth
                value={data.iquestion}
                onChange={handleChange}
                name="iquestion"
              />
            </TableCell>
          </TableRow>
        </Table>
      </TableContainer>
      <NoSsrWysiwyg content={answer ?? ""} setContent={setAnswer} />
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
        onClick={handleUpdate}
      >
        수정
      </Button>
    </Dialog>
  );
};

export const UserQnaList = ({ listInquiry, setTimeReRender, ...rest }) => {
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(0);
  const [dataEdit, setDataEdit] = useState({});

  const [open, setOpen] = useState(false);

  const handleClickOpen = async (params) => {
    try {
      const res = await InquiryService.getDetailInquiry(params.id);
      const result = res?.data?.result ?? {};
      const category = result?.category
        ? FQA_CATEGORY.find((item) => item.name === result?.category)
        : "";
      const showYn = result?.answerStatus
        ? STATUS_QA.find((item) => item.text === result?.answerStatus)
        : "";
      setDataEdit({
        ianswer: result?.answer ?? "",
        icategory: category?.value ?? "",
        iquestion: result?.question ?? "",
        answerStatus: showYn?.value ?? "",
        id: params.id,
        iregdate: result?.requestDate ?? "",
        ianswerdate: result?.answerDate ?? "",
        replyName: result?.replyName ?? ""
      });
      setOpen(true);
    } catch (error) {
      console.log(error);
    }
  };

  const handleUpdate = async (body) => {
    try {
      await InquiryService.updateInquiry(dataEdit.id, body);
      setTimeReRender((prevState) => prevState + 1);
      setOpen(false);
    } catch (error) {
      console.log(error);
    }
  };

  const handleClose = () => {
    setOpen(false);
    // setSelectedValue(value);
  };

  const handleLimitChange = (event) => {
    setLimit(event.target.value);
  };

  const handlePageChange = (event, newPage) => {
    setPage(newPage);
  };

  return (
    <>
      <Card {...rest}>
        <CardHeader title="문의내역" />
        <PerfectScrollbar>
          {/* <Box>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>접수일자</TableCell>
                  <TableCell>상태</TableCell>
                  <TableCell>긴급도</TableCell>
                  <TableCell>대분류</TableCell>
                  <TableCell>문의내역</TableCell>
                  <TableCell>특이사항</TableCell>
                  <TableCell>접수센터</TableCell>
                  <TableCell>접수자명</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {customers.slice(0, limit).map((customer) => (
                  <TableRow hover key={customer.id} onClick={handleClickOpen}>
                    <TableCell>
                      <Box
                        sx={{
                          alignItems: "center",
                          display: "flex"
                        }}
                      >
                        <Typography color="textPrimary" variant="body1">
                          {customer.id}
                        </Typography>
                      </Box>
                    </TableCell>
                    <TableCell>{customer.regDate}</TableCell>
                    <TableCell>{customer.name}</TableCell>
                    <TableCell>자주하는 질문</TableCell>
                    <TableCell>성공</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Box> */}
          <StyledDataGrid
            autoHeight
            pagination
            rows={listInquiry}
            columns={columns}
            disableSelectionOnClick
            pageSize={5}
            rowsPerPageOptions={[5, 10, 25]}
            // labelRowsPerPage="표시 페이지 수"
            componentsProps={{
              pagination: {
                labelRowsPerPage: "표시 페이지 수"
              }
            }}
            sx={{
              "& .MuiDataGrid-columnHeaders": { borderRadius: 0 },
              display: "flex",
              justifyContent: "center"
            }}
            onCellClick={handleClickOpen}
          />
        </PerfectScrollbar>
        {/* <TablePagination
          component="div"
          count={customers.length}
          onPageChange={handlePageChange}
          onRowsPerPageChange={handleLimitChange}
          page={page}
          rowsPerPage={limit}
          rowsPerPageOptions={[5, 10, 25]}
        /> */}
      </Card>
      <UserQnaDialog
        inquiry={dataEdit}
        onUpdate={handleUpdate}
        open={open}
        onClose={handleClose}
      />
    </>
  );
};

UserQnaList.propTypes = {
  listInquiry: PropTypes.array.isRequired
};
