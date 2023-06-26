import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import AdminLogService from "../../services/AdminLogService/AdminLogService";

export default function AlertDialog(props) {
  const { onDownload, menu } = props;
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = async () => {
    // const isDownload = onDownload();
    // console.log("isDownload", isDownload);
    // if (!isDownload) setOpen(true);
    try {
      const res = await AdminLogService.checkDownloadRight({
        nameFunction: "excel",
        menuName: menu
      });
      if (res?.data?.result !== "Y") {
        setOpen(true);
      } else {
        onDownload();
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Button
        variant="contained"
        onClick={handleClickOpen}
        sx={{
          minWidth: 100,
          fontSize: "1.05rem",
          backgroundColor: "#1d93fe"
        }}
      >
        엑셀 다운로드
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogContent
          sx={{
            textAlign: "center",
            width: "100%",
            m: "0 auto 20px",
            minWidth: "500px",
            p: 0
          }}
        >
          <DialogTitle
            id="alert-dialog-title"
            variant="h6"
            sx={{ width: "100%", borderBottom: "1px solid #808080", mb: 6 }}
          >
            알림
          </DialogTitle>
          <DialogContent>
            <DialogContentText
              id="alert-dialog-description"
              sx={{ color: "#121828" }}
            >
              {"다운로드 권한이 없습니다."}
            </DialogContentText>
            <DialogContentText
              id="alert-dialog-description"
              variant="h6"
              sx={{ color: "red" }}
            >
              {"운영 관리자에게 문의바랍니다."}
            </DialogContentText>
          </DialogContent>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={handleClose}
            variant="outlined"
            autoFocus
            sx={{ width: "100px", m: "0 auto 20px" }}
          >
            확인
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
