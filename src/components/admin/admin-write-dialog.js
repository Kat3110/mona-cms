import { useState, useRef } from "react";
import {
  Box,
  Typography,
  Button,
  Divider,
  Dialog,
  DialogTitle,
  TableContainer,
  Table,
  TableRow,
  TableCell,
  Select,
  MenuItem,
  TextField,
  RadioGroup,
  FormControlLabel,
  Radio
} from "@mui/material";
import { useForm, Controller } from "react-hook-form";
import AdminService from "../../services/AdminService/AdminService";
import { ADMIN_RIGHT } from "../../utils/constants";

export const AdminWriteDialog = (props) => {
  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
    control
  } = useForm({
    mode: "all"
  });
  const { onClose, open, setTimeRecall } = props;
  const [message, setMessage] = useState("");
  const adminIdRef = useRef(null);

  const handleClose = () => {
    onClose();
  };

  const handleCheckAdminId = async () => {
    console.log("adminId?.current?.value", adminIdRef?.current?.value);
    try {
      const res = await AdminService.checkAdminId(adminIdRef?.current?.value);
      if (res?.data?.message === "Already using id") {
        setMessage("이미 등록된 아이디입니다.");
      } else {
        setMessage("");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const onSubmit = async (data) => {
    const body = {
      adminName: data.adminName,
      adminId: data.adminId,
      accessIdx: data.adminRights,
      phoneNumber: data.adminPhone,
      adminAccess: data.handleInfo
    };
    try {
      await AdminService.createAdmin(body);
      onClose();
      setTimeRecall((prevState) => prevState + 1);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Dialog onClose={handleClose} open={open} fullWidth maxWidth="1300px">
      <form onSubmit={handleSubmit(onSubmit)}>
        <DialogTitle>관리자 등록</DialogTitle>
        <TableContainer>
          <Table>
            <TableRow
              sx={{ display: "grid", gridTemplateColumns: "15% 35% 15% 35%" }}
            >
              <TableCell component="th" sx={{ backgroundColor: "#ccc" }}>
                이름
              </TableCell>
              <TableCell>
                <TextField
                  id="outlined-basic"
                  label="이름"
                  variant="outlined"
                  error={errors?.adminName}
                  sx={{ width: "50%" }}
                  {...register("adminName", { required: true })}
                />
              </TableCell>
              <TableCell component="th" sx={{ backgroundColor: "#ccc" }}>
                아이디
              </TableCell>
              <TableCell>
                <Box>
                  <TextField
                    id="outlined-basic"
                    label="아이디"
                    variant="outlined"
                    error={errors?.adminId}
                    sx={{ width: "50%" }}
                    inputRef={adminIdRef}
                    {...register("adminId", { required: true })}
                  />
                  <Button
                    variant="contained"
                    sx={{
                      ml: 4,
                      backgroundColor: "#1d93fe",
                      fontSize: "1.05rem"
                    }}
                    onClick={handleCheckAdminId}
                  >
                    중복확인
                  </Button>
                </Box>
                {message && <Typography color="error">{message}</Typography>}
              </TableCell>
            </TableRow>

            <TableRow
              sx={{ display: "grid", gridTemplateColumns: "15% 35% 15% 35%" }}
            >
              <TableCell component="th" sx={{ backgroundColor: "#ccc" }}>
                전화번호
              </TableCell>
              <TableCell>
                <TextField
                  id="outlined-basic"
                  label="전화번호"
                  variant="outlined"
                  sx={{ width: "50%" }}
                  error={errors?.adminPhone}
                  {...register("adminPhone", { required: true })}
                />
              </TableCell>
              <TableCell component="th" sx={{ backgroundColor: "#ccc" }}>
                관리자 권한
              </TableCell>
              <TableCell>
                <TextField
                  select
                  SelectProps={{ native: true }}
                  labelId="gubun"
                  sx={{ width: "50%" }}
                  label="구분"
                  fullWidth
                  error={errors?.adminRights}
                  {...register("adminRights", { required: true })}
                >
                  {ADMIN_RIGHT.map((item, index) => (
                    <option value={item.idx} key={index}>
                      {item.text}
                    </option>
                  ))}
                </TextField>
              </TableCell>
            </TableRow>
            <TableRow
              sx={{ display: "grid", gridTemplateColumns: "15% 35% 15% 35%" }}
            >
              <TableCell component="th" sx={{ backgroundColor: "#ccc" }}>
                개인정보 취급 여부
              </TableCell>
              <TableCell>
                <Controller
                  name="handleInfo"
                  rules={{ required: true }}
                  sx={{ width: "50%" }}
                  control={control}
                  render={({ field: { onChange, value } }) => (
                    <RadioGroup
                      row
                      name="handleInfo"
                      value={value}
                      onChange={onChange}
                    >
                      <FormControlLabel
                        value={"Y"}
                        control={
                          <Radio
                            sx={errors?.handleInfo && { color: "#D14343" }}
                          />
                        }
                        label="예"
                      />
                      <FormControlLabel
                        value={"N"}
                        control={
                          <Radio
                            sx={errors?.handleInfo && { color: "#D14343" }}
                          />
                        }
                        label="아니오"
                      />
                    </RadioGroup>
                  )}
                />
              </TableCell>
            </TableRow>
          </Table>
        </TableContainer>
        <Divider />
        <Box sx={{ m: 3, display: "flex", flexDirection: "row-reverse" }}>
          <Button
            sx={{
              ml: 5,
              minWidth: 100,
              fontSize: "1.05rem"
            }}
            variant="contained"
            color="primary"
            type="submit"
            disable={!!message}
          >
            등록
          </Button>
        </Box>
      </form>
    </Dialog>
  );
};
