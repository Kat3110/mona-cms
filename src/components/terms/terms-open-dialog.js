import { useState, useEffect, useMemo } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
// import TextEditor, { Editor } from "./terms-editor";
import dynamic from "next/dynamic";
import { Box, TextField, Typography } from "@mui/material";
import TermService from "../../services/TermService/TermService";

export default function TermsOpenDialog(props) {
  const { idx, setTimeRecall } = props;
  const [open, setOpen] = useState(false);
  const [dataEdit, setDataEdit] = useState({});
  const [content, setContent] = useState("");

  const NoSsrWysiwyg = useMemo(() => {
    setContent(dataEdit.content);
    return dynamic(() => import("../utill/editor"), { ssr: false });
  }, [dataEdit.content]);

  const handleClickOpen = async () => {
    try {
      const res = await TermService.getTermDetail(idx);
      setDataEdit(res?.data?.result);
      setOpen(true);
    } catch (error) {
      console.log(error);
    }
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleChangeContent = (value) => {
    setDataEdit({ ...dataEdit, content: value });
  };

  const handleUpdate = async () => {
    const body = {
      ttitle: dataEdit?.title ?? "",
      tcontent: content ?? ""
    };
    try {
      await TermService.updateTerm(idx, body);
      setTimeRecall((prevState) => prevState + 1);
      setOpen(false);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <Button
        variant="outlined"
        onClick={handleClickOpen}
        sx={{ height: 40, fontSize: "1.05rem" }}
      >
        수정
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        fullWidth
      >
        <DialogTitle
          id="alert-dialog-title"
          variant="h5"
          sx={{
            margin: "20px 20px",
            width: "calc(100% - 40px)",
            textAlign: "center",
            borderBottom: "1px solid #808080",
            padding: "0 0 10px"
          }}
        >
          {"이용약관 수정"}
        </DialogTitle>

        <DialogContent>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              mt: 2,
              mb: 2
            }}
          >
            <Typography
              id="alert-dialog-title"
              variant="h6"
              sx={{
                padding: "0 20px 0 0",
                minWidth: 100
              }}
            >
              {"제목"}
            </Typography>
            <TextField
              size="small"
              fullWidth
              value={dataEdit.title}
              onChange={(e) =>
                setDataEdit({ ...dataEdit, title: e.target.value })
              }
            />
          </Box>
          <Box sx={{ border: "1px solid #F1F1F1" }}>
            <NoSsrWysiwyg content={content} setContent={setContent} />
          </Box>
        </DialogContent>

        <DialogActions sx={{ p: "30px 0 20px" }}>
          <Button
            onClick={handleUpdate}
            autoFocus
            sx={{
              fontSize: "1.05rem",
              backgroundColor: "#1d93fe",
              margin: "0 auto"
            }}
            variant="contained"
          >
            수정하기
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
