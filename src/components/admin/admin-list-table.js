import PropTypes from "prop-types";
import { DataGrid, useGridApiRef, useGridApiContext } from "@mui/x-data-grid";
import { useState } from "react";
import {
  Box,
  Card,
  Typography,
  CardHeader,
  Button,
  Divider
} from "@mui/material";

import { AdminWriteDialog } from "./admin-write-dialog";
import { AdminDeleteDialog } from "./admin-delete-dialog";
import Excel from "exceljs";
import AdminService from "../../services/AdminService/AdminService";
import { styled } from "@mui/material/styles";

const StyledDataGrid = styled(DataGrid)(({ theme }) => ({
  fontSize: "14px !important",
  "& .MuiDataGrid-columnHeader": {
    backgroundColor: "#F3F4F6"
  }
}));

const columns = [
  {
    flex: 0.12,
    field: "adminName",
    minWidth: 30,
    headerName: "이름",
    renderCell: ({ row }) => (
      <Box sx={{ display: "flex", alignItems: "center" }}>
        <Typography variant="body2">{row.adminName}</Typography>
      </Box>
    )
  },
  {
    flex: 0.12,
    field: "adminId",
    minWidth: 30,
    headerName: "아이디",
    renderCell: ({ row }) => (
      <Box sx={{ display: "flex", alignItems: "center" }}>
        <Typography variant="body2">{row.adminId}</Typography>
      </Box>
    )
  },
  {
    flex: 0.15,
    field: "accessName",
    minWidth: 30,
    headerName: "관리자 권한",
    renderCell: ({ row }) => (
      <Box sx={{ display: "flex", alignItems: "center" }}>
        <Typography variant="body2">{row.accessName}</Typography>
      </Box>
    )
  },
  {
    flex: 0.15,
    field: "adminPhone",
    minWidth: 30,
    headerName: "전화번호",
    renderCell: ({ row }) => (
      <Box sx={{ display: "flex", alignItems: "center" }}>
        <Typography variant="body2">{row.adminPhone}</Typography>
      </Box>
    )
  },
  {
    flex: 0.15,
    field: "dateRegister",
    minWidth: 30,
    headerName: "등록일자",
    renderCell: ({ row }) => (
      <Box sx={{ display: "flex", alignItems: "center" }}>
        <Typography variant="body2">{row.dateRegister}</Typography>
      </Box>
    )
  },
  {
    flex: 0.15,
    field: "timeRegister",
    minWidth: 50,
    headerName: "등록시간",
    renderCell: ({ row }) => (
      <Box sx={{ display: "flex", alignItems: "center" }}>
        <Typography variant="body2">{row.timeRegister}</Typography>
      </Box>
    )
  },
  {
    flex: 0.18,
    field: "adminRegId",
    minWidth: 160,
    headerName: "등록자 아이디",
    renderCell: ({ row }) => (
      <Box sx={{ display: "flex", alignItems: "center" }}>
        <Typography variant="body2">{row.adminRegId}</Typography>
      </Box>
    )
  }
];
const rows = [
  {
    id: 1,
    lastName: "Snow",
    firstName: "Jon",
    access: "운영자",
    phone: "010-1234-1234",
    regDate: "2022-11-02",
    regTime: "16:13:10",
    regId: "test"
  },
  {
    id: 2,
    lastName: "Lannister",
    firstName: "Cersei",
    access: "운영자",
    phone: "010-1234-1234",
    regDate: "2022-11-02",
    regTime: "16:13:10",
    regId: "test"
  },
  {
    id: 3,
    lastName: "Lannister",
    firstName: "Jaime",
    access: "운영자",
    phone: "010-1234-1234",
    regDate: "2022-11-02",
    regTime: "16:13:10",
    regId: "test"
  },
  {
    id: 4,
    lastName: "Stark",
    firstName: "Arya",
    access: "운영자",
    phone: "010-1234-1234",
    regDate: "2022-11-02",
    regTime: "16:13:10",
    regId: "test"
  },
  {
    id: 5,
    lastName: "Targaryen",
    firstName: "Daenerys",
    access: "운영자",
    phone: "010-1234-1234",
    regDate: "2022-11-02",
    regTime: "16:13:10",
    regId: "test"
  },
  {
    id: 6,
    lastName: "Melisandre",
    firstName: null,
    access: "운영자",
    phone: "010-1234-1234",
    regDate: "2022-11-02",
    regTime: "16:13:10",
    regId: "test"
  },
  {
    id: 7,
    lastName: "Clifford",
    firstName: "Ferrara",
    access: "운영자",
    phone: "010-1234-1234",
    regDate: "2022-11-02",
    regTime: "16:13:10",
    regId: "test"
  },
  {
    id: 8,
    lastName: "Frances",
    firstName: "Rossini",
    access: "운영자",
    phone: "010-1234-1234",
    regDate: "2022-11-02",
    regTime: "16:13:10",
    regId: "test"
  },
  {
    id: 9,
    lastName: "Roxie",
    firstName: "Harvey",
    access: "운영자",
    phone: "010-1234-1234",
    regDate: "2022-11-02",
    regTime: "16:13:10",
    regId: "test"
  }
];

export const AdminListTable = (props) => {
  const { listAdmin = [], setValue = () => {}, setTimeRecall, ...rest } = props;
  const [openWrite, setOpenWrite] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const [selectedIds, setSelectedIds] = useState([]);
  const [queryOptions, setQueryOptions] = useState({ items: [] });
  const dataGridApiRef = useGridApiRef();
  // const dataGridApiRef = useGridApiContext();

  const onFilterChange = (filterModel) => {
    // Here you save the data you need from the filter model
    setQueryOptions({ ...filterModel });
    // console.log("data", data);
  };

  // console.log("queryOptions", queryOptions);

  const handleClickOpen = (dialog) => {
    if (dialog === "write") {
      setOpenWrite(true);
    } else if (dialog === "delete") {
      setOpenDelete(true);
    }
  };

  const handleDownloadExcel = async () => {
    console.log("queryOptions", queryOptions);
    // return;
    const fileName = "관리자 목록.xlsx";
    const wb = new Excel.Workbook();

    // table 관리자 목록
    const ws = wb.addWorksheet("관리자 목록");
    const headers = [
      "이름",
      "아이디",
      "관리자 권한",
      "전화번호",
      "등록일자",
      "등록시간",
      "등록자 아이디"
    ];
    const columnWs = ["A", "B", "C", "D", "E", "F", "G"];
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
    const { columnField = "", value = "" } = queryOptions?.items[0] ?? {};
    const newListAdmin =
      columnField && value
        ? listAdmin.filter((item) => item[columnField].includes(value))
        : listAdmin;
    newListAdmin.forEach((row, index) => {
      ws.getCell(`A${index + 2}`).value = row?.adminName ?? "";
      ws.getCell(`A${index + 2}`).style = {
        alignment: { vertical: "center", horizontal: "center" }
      };
      ws.getCell(`B${index + 2}`).value = row?.adminId ?? "";
      ws.getCell(`B${index + 2}`).style = {
        alignment: { vertical: "center", horizontal: "center" }
      };
      ws.getCell(`C${index + 2}`).value = row?.accessName ?? "";
      ws.getCell(`C${index + 2}`).style = {
        alignment: { vertical: "center", horizontal: "center" }
      };
      ws.getCell(`D${index + 2}`).value = row?.adminPhone ?? "";
      ws.getCell(`D${index + 2}`).style = {
        alignment: { vertical: "center", horizontal: "center" }
      };
      ws.getCell(`E${index + 2}`).value = row?.dateRegister ?? "";
      ws.getCell(`E${index + 2}`).style = {
        alignment: { vertical: "center", horizontal: "center" }
      };
      ws.getCell(`F${index + 2}`).value = row?.timeRegister ?? "";
      ws.getCell(`F${index + 2}`).style = {
        alignment: { vertical: "center", horizontal: "center" }
      };
      ws.getCell(`G${index + 2}`).value = row?.adminRegId ?? "";
      ws.getCell(`G${index + 2}`).style = {
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

  const handleClose = async (dialog) => {
    if (dialog === "write") {
      setOpenWrite(false);
    } else if (dialog === "delete") {
      setOpenDelete(false);
    }
  };

  console.log("selectedIds", selectedIds);

  const handleDelete = async () => {
    try {
      const listId = [];
      listAdmin.forEach((item) => {
        if (selectedIds.includes(item.id)) {
          listId.push(item.adminId);
        }
      });
      await AdminService.deleteAdmin(listId.join(","));
      setOpenDelete(false);
      setTimeRecall((prevState) => prevState + 1);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Card>
        <CardHeader title="관리자 목록" sx={{ fontSize: "18px !important" }} />
        <StyledDataGrid
          apiRef={dataGridApiRef}
          checkboxSelection
          autoHeight
          pagination
          rows={listAdmin}
          columns={columns}
          // getRowId={()}
          // onFilterModelChange={(model, details) => console.log("model", model)}
          // isRowSelectable={(params) =>
          //   selectedIds.includes(params.row.id) || !selectedIds.length
          // }
          disableSelectionOnClick
          pageSize={5}
          rowsPerPageOptions={[5, 10, 25]}
          componentsProps={{
            pagination: {
              labelRowsPerPage: "표시 페이지 수"
            }
          }}
          onFilterModelChange={onFilterChange}
          // gridFilterModelSelector={(data) => console.log("data", data)}
          setQuickFilterValues={(values) => {
            console.log("value", values);
          }}
          // sx={{
          //   "& .MuiDataGrid-columnHeaders": { borderRadius: 0 },
          //   display: "flex",
          //   justifyContent: "center"
          // }}
          onSelectionModelChange={(ids) => {
            setSelectedIds([...ids]);
            const rowsSelected = listAdmin.filter((item) =>
              ids.includes(item.id)
            );
            setValue([...rowsSelected]);
          }}
          // onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
        />
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
            관리자 삭제
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
            관리자 등록
          </Button>
        </Box>
      </Card>
      <AdminWriteDialog
        open={openWrite}
        onClose={() => handleClose("write")}
        setTimeRecall={setTimeRecall}
      />
      <AdminDeleteDialog
        open={openDelete}
        onClose={() => handleClose("delete")}
        setOpenDelete={setOpenDelete}
        onDelete={handleDelete}
      />
    </>
  );
};

AdminListTable.propTypes = {
  // customers: PropTypes.array.isRequired
  setValue: PropTypes.func.isRequired
};
