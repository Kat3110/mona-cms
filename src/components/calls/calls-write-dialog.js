import { useState } from "react";
import {
  Box,
  Typography,
  Button,
  Divider,
  Dialog,
  DialogTitle,
  Card,
  Container,
  TextField
} from "@mui/material";

const states = [
  {
    value: "survey",
    label: "조사"
  },
  {
    value: "loan guidance",
    label: "대출 안내"
  }
];

export const CallsWriteDialog = (props) => {
  const [values, setValues] = useState({
    type: "survey",
    number: "",
    comment: ""
  });

  // ** 문의내역 상세 다이얼로그 오픈
  const { onClose, open, onAdd } = props;

  const handleChange = (event) => {
    const { value, name } = event.target;
    setValues({
      ...values,
      [name]: value
    });
  };

  const handleClose = () => {
    onClose();
  };

  const handleAdd = async () => {
    await onAdd(values);
  };

  return (
    <Dialog onClose={handleClose} open={open} fullWidth>
      <DialogTitle>스팸번호 등록</DialogTitle>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 5
        }}
      >
        <Container>
          <Card>
            <Box
              sx={{
                m: 3,
                display: "flex",
                justifyContent: "center",
                alignItems: "center"
              }}
            >
              <Typography
                sx={{
                  fontSize: "1.3rem",
                  minWidth: "200px"
                }}
              >
                유형 :
              </Typography>
              <TextField
                fullWidth
                required
                select
                SelectProps={{ native: true }}
                onChange={handleChange}
                value={values.type}
                name="type"
                variant="outlined"
              >
                {states.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </TextField>
            </Box>

            <Box
              sx={{
                m: 3,
                display: "flex",
                justifyContent: "center",
                alignItems: "center"
              }}
            >
              <Typography
                sx={{
                  fontSize: "1.3rem",
                  minWidth: "200px"
                }}
              >
                번호 :
              </Typography>
              <TextField
                fullWidth
                SelectProps={{ native: true }}
                onChange={handleChange}
                value={values.number}
                name="number"
                variant="outlined"
              ></TextField>
            </Box>
            <Box
              sx={{
                m: 3,
                display: "flex",
                justifyContent: "center",
                alignItems: "center"
              }}
            >
              <Typography
                sx={{
                  fontSize: "1.3rem",
                  minWidth: "200px"
                }}
              >
                비고 :
              </Typography>
              <TextField
                fullWidth
                multiline
                rows={6}
                onChange={handleChange}
                value={values.comment}
                name="comment"
                SelectProps={{ native: true }}
                variant="outlined"
              ></TextField>
            </Box>
            <Box
              sx={{
                m: 3,
                display: "flex",
                justifyContent: "center",
                alignItems: "center"
              }}
            >
              <Button
                variant="contained"
                sx={{
                  ml: 4,
                  backgroundColor: "#1d93fe",
                  fontSize: "1.05rem"
                }}
                onClick={handleAdd}
              >
                저장
              </Button>
              <Button
                variant="contained"
                sx={{
                  ml: 4,
                  fontSize: "1.05rem"
                }}
                color="error"
                onClick={handleClose}
              >
                닫기
              </Button>
            </Box>
          </Card>
        </Container>
      </Box>
    </Dialog>
  );
};
