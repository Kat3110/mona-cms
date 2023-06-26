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

export const EventDeleteDialog = (props) => {
  const { onClose, open, onDelete } = props;

  const handleClose = () => {
    onClose();
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">이벤트/광고 삭제 확인</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          해당 이벤트/광고 배너들을 삭제하겠습니까?
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
