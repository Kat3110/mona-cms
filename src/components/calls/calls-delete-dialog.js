import { useState } from "react";
import {
  Button,
  Dialog,
  DialogContent,
  DialogContentText,
  DialogActions,
  DialogTitle,
  Typography
} from "@mui/material";

export const CallsDeleteDialog = (props) => {
  const { onClose, selectedValue, open, onDelete } = props;

  // ** 문의내역 상세 구분
  const [data, setData] = useState({
    status: "Y",
    gubun: "etc",
    regDate: "2022.04.07 16:15:12",
    editDate: "2022.04.07 16:15:12"
  });

  const handleChange = (event) => {
    const { value, name } = event.target;
    setData({
      ...data,
      [name]: value
    });
  };

  const handleClose = () => {
    onClose(selectedValue);
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">스팸번호 삭제 확인</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          해당 스팸번호들을 삭제하겠습니까?
          <Typography sx={{ mt: 3 }} color="error">
            삭제 시 복구가 불가능합니다.
          </Typography>
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={onDelete}>삭제</Button>
        <Button onClick={handleClose} autoFocus>
          닫기
        </Button>
      </DialogActions>
    </Dialog>
  );
};
