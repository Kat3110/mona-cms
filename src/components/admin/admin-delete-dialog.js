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

export const AdminDeleteDialog = (props) => {
  const { onClose, open, setOpenDelete, onDelete } = props;

  const handleClose = () => {
    onClose();
  };

  const handleDelete = async () => {
    await onDelete();
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">관리자 삭제 확인</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          이 관리자를 삭제하겠습니까?
          <Typography sx={{ mt: 3 }} color="error">
            관리자 정보 삭제 시 로그인이 불가능합니다.
          </Typography>
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleDelete}>삭제</Button>
        <Button onClick={() => setOpenDelete(false)} autoFocus>
          닫기
        </Button>
      </DialogActions>
    </Dialog>
  );
};
