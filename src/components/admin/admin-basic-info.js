import { useState, useEffect, useRef } from "react";
import {
  Box,
  Button,
  Card,
  CardHeader,
  Divider,
  TextField,
  Typography,
  TableContainer,
  Table,
  TableCell,
  TableRow,
  Select,
  MenuItem,
  RadioGroup,
  FormControlLabel,
  Radio
} from "@mui/material";

import { styled } from "@mui/material/styles";
import { tableCellClasses } from "@mui/material/TableCell";
import LoadingButton from "@mui/lab/LoadingButton";
import AdminService from "../../services/AdminService/AdminService";
import { ADMIN_RIGHT } from "./../../utils/constants";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: "#ccc"
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14
  }
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover
  },

  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0
  }
}));

export const AdminBasicInfo = (props) => {
  const { value = [], setTimeRecall } = props;

  const [editValue, setEditValue] = useState({});
  const [loading, setLoading] = useState(false);
  const currentID = useRef(null);

  useEffect(() => {
    // // setEditValue(value[0]);
    // setEditValue({
    //   timeRegister: "17:50:48",
    //   adminId: "admin6",
    //   accessName: "Super Administrator",
    //   adminRegId: "admin5",
    //   dateRegister: "2022-11-25",
    //   adminPhone: "0325151093",
    //   adminName: "admin6",
    //   adminRight: "operatorA",
    //   accountBlocked: "blocked", // Y || N
    //   handleInfo: "N"
    // });
    console.log("value.length", value.length);
    const fetchData = async () => {
      const lastItem = value.at(-1);
      console.log("value.at(-1)", value.at(-1));
      try {
        const res = await AdminService.getDetailAdmin(lastItem.adminId);
        const result = res?.data?.result[0] ?? {};
        console.log("result", result);

        setEditValue({ ...result });
        currentID.current = lastItem.adminId;
      } catch (error) {
        console.log(error);
      }
    };
    if (value.length) fetchData();
  }, [value]);

  console.log("editValue", editValue);

  const handleModify = async () => {
    setLoading(true);
    const data = {
      adminName: editValue?.adminName ?? "",
      accessName: editValue?.accessName ?? "",
      adminId: editValue?.adminId ?? "",
      adminPhone: editValue?.adminPhone ?? "",
      adminLock: editValue?.adminLock ?? "",
      reason: editValue?.reason ?? "",
      adminAccess: editValue?.adminAccess ?? ""
    };
    try {
      await AdminService.updateAdmin(currentID.current, data);
      setLoading(false);
      setTimeRecall((prevState) => prevState + 1);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  const handleInitPassword = async () => {
    try {
      await AdminService.initPassword(currentID.current);
      setTimeRecall((prevState) => prevState + 1);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Card>
        <CardHeader
          sx={{ fontSize: "18px !important" }}
          title="관리자 기본 정보"
        />
        <Divider />
        <TableContainer>
          <Table size="small" sx={{ fontSize: "14px !important" }}>
            <TableRow>
              <TableCell
                component="th"
                sx={{ backgroundColor: "#ccc", width: 130 }}
              >
                이름
              </TableCell>
              <TableCell>
                <TextField
                  sx={{ width: "50%" }}
                  variant="outlined"
                  value={editValue?.adminName ?? ""}
                  onChange={(e) =>
                    setEditValue({ ...editValue, adminName: e.target.value })
                  }
                />
              </TableCell>
              <TableCell
                component="th"
                sx={{ backgroundColor: "#ccc", width: 130 }}
              >
                아이디
              </TableCell>
              <TableCell>
                <TextField
                  sx={{ width: "50%" }}
                  variant="outlined"
                  value={editValue?.adminId ?? ""}
                  onChange={(e) =>
                    setEditValue({ ...editValue, adminId: e.target.value })
                  }
                />
              </TableCell>
            </TableRow>

            <TableRow>
              <TableCell
                component="th"
                sx={{ backgroundColor: "#ccc", width: 130 }}
              >
                관리자 권한
              </TableCell>
              <TableCell>
                <TextField
                  select
                  SelectProps={{ native: true }}
                  labelId="gubun"
                  sx={{ width: "50%" }}
                  name="gubun"
                  value={editValue?.accessName ?? ""}
                  onChange={(e) =>
                    setEditValue({ ...editValue, accessName: e.target.value })
                  }
                >
                  {/* {editValue?.adminAccess ?? ""} */}
                  {ADMIN_RIGHT.map((item, index) => (
                    <option value={item.value} key={index}>
                      {item.text}
                    </option>
                  ))}
                </TextField>
              </TableCell>
              <TableCell
                component="th"
                sx={{ backgroundColor: "#ccc", width: 130 }}
              >
                비밀번호
              </TableCell>
              <TableCell>
                <Button
                  variant="contained"
                  size="small"
                  sx={{ ml: 4, backgroundColor: "#1d93fe" }}
                  onClick={handleInitPassword}
                >
                  초기화
                </Button>
              </TableCell>
            </TableRow>

            <TableRow>
              <TableCell
                component="th"
                sx={{ backgroundColor: "#ccc", width: 130 }}
              >
                전화번호
              </TableCell>
              <TableCell>
                <TextField
                  sx={{ width: "50%" }}
                  variant="outlined"
                  value={editValue?.adminPhone ?? ""}
                  onChange={(e) =>
                    setEditValue({ ...editValue, adminPhone: e.target.value })
                  }
                />
              </TableCell>
              <TableCell
                component="th"
                sx={{ backgroundColor: "#ccc", width: 130 }}
              >
                계정잠김여부
              </TableCell>
              <TableCell colSpan={2}>
                <TextField
                  select
                  SelectProps={{ native: true }}
                  labelId="gubun"
                  name="gubun"
                  sx={{ width: "50%" }}
                  value={editValue?.adminLock ?? ""}
                  onChange={(e) =>
                    setEditValue({
                      ...editValue,
                      adminLock: e.target.value
                    })
                  }
                >
                  <option value="N">정상</option>
                  <option value="Y">잠김</option>
                </TextField>
                <Typography>
                  {editValue?.adminLock === "Y" ? editValue?.reason : ""}
                </Typography>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell
                component="th"
                sx={{ backgroundColor: "#ccc", width: 130 }}
              >
                등록일자
              </TableCell>
              <TableCell>{editValue?.dateRegister ?? ""}</TableCell>
              <TableCell
                component="th"
                sx={{ backgroundColor: "#ccc", width: 130 }}
              >
                등록시간
              </TableCell>
              <TableCell>{editValue?.timeRegister ?? ""}</TableCell>
            </TableRow>

            <TableRow>
              <TableCell
                component="th"
                sx={{ backgroundColor: "#ccc", width: 130 }}
              >
                등록자 아이디
              </TableCell>
              <TableCell>{editValue?.adminRegId ?? ""}</TableCell>
              <TableCell
                component="th"
                sx={{ backgroundColor: "#ccc", width: 130 }}
              >
                개인정보 취급 여부
              </TableCell>
              <TableCell>
                <RadioGroup
                  row
                  aria-labelledby="demo-row-radio-buttons-group-label"
                  name="row-radio-buttons-group"
                  value={editValue?.adminAccess === "Y" ? "Y" : "N"}
                  onChange={(e) =>
                    setEditValue({
                      ...editValue,
                      adminAccess: e.target.value
                    })
                  }
                >
                  <FormControlLabel value="Y" control={<Radio />} label="예" />
                  <FormControlLabel
                    value="N"
                    control={<Radio />}
                    label="아니오"
                  />
                </RadioGroup>
              </TableCell>
            </TableRow>
          </Table>
        </TableContainer>
        <Box sx={{ m: 3, display: "flex", flexDirection: "row-reverse" }}>
          <LoadingButton
            sx={{
              ml: 5,
              minWidth: 100
            }}
            onClick={handleModify}
            loading={loading}
            loadingIndicator="수정..."
            variant="contained"
            color="primary"
          >
            수정
          </LoadingButton>
        </Box>
      </Card>
    </>
  );
};
