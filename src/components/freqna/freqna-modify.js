import Head from "next/head";
import {
  Box,
  Container,
  Grid,
  TableContainer,
  TableRow,
  Table,
  TableCell,
  Button,
  RadioGroup,
  FormControlLabel,
  Radio,
  Select,
  MenuItem,
  TextField,
  Typography,
  Divider
} from "@mui/material";
import dynamic from "next/dynamic";

import dayjs from "dayjs";
import { useState, useEffect, useMemo } from "react";
import { DISCLOSURE, FQA_CATEGORY } from "../../utils/constants";

export const FqaModify = (props) => {
  const { fqa, onUpdate } = props;
  const [data, setData] = useState({});
  const [answer, setAnswer] = useState("");
  const [disable, setDisable] = useState(false);

  const NoSsrWysiwyg = useMemo(() => {
    setAnswer(data.fanswer);
    return dynamic(() => import("/src/components/utill/editor"), {
      ssr: false
    });
  }, [data.fanswer]);

  useEffect(() => {
    if (data?.fcategory === 28) {
      setDisable(true);
    }
    setData(fqa);
  }, [fqa]);

  const handleChange = (event) => {
    const { value, name } = event.target;
    setData({
      ...data,
      [name]: value
    });
  };

  const handleChangeContent = (content) => {
    setData({
      ...data,
      fanswer: content
    });
  };

  const handleUpdate = async () => {
    const body = {
      fcategory: data.fcategory,
      fquestion: data.fquestion,
      fshowyn: data.fshowyn,
      fanswer: answer,
      fregdate: null,
      fmodifydate: null
    };
    await onUpdate(data.id, body);
  };

  return (
    <>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 8
        }}
      >
        <Container maxWidth={false}>
          <Box
            sx={{
              alignItems: "center",
              display: "flex",
              justifyContent: "space-between",
              flexWrap: "wrap",
              m: -1
            }}
          >
            <Typography sx={{ m: 1 }} fontSize="18px">
              상세보기
            </Typography>
          </Box>
          <Box sx={{ mt: 3 }}>
            <TableContainer>
              <Table>
                <TableRow
                  sx={{
                    display: "grid",
                    gridTemplateColumns: "15% 35% 15% 35%"
                  }}
                >
                  <TableCell component="th" sx={{ backgroundColor: "#ccc", fontSize: '16px', display: 'flex',
                    alignItems: 'center' }}>
                    구분
                  </TableCell>
                  <TableCell>
                    <TextField
                      select
                      SelectProps={{ native: true }}
                      labelId="gubun"
                      value={data?.fcategory ?? ""}
                      onChange={handleChange}
                      fullWidth
                      name="fcategory"
                    >
                      {FQA_CATEGORY.map((item, index) => (
                        <option value={item.value} key={index}>
                          {item.text}
                        </option>
                      ))}
                    </TextField>
                  </TableCell>
                  <TableCell component="th" sx={{ backgroundColor: "#ccc", fontSize: '16px', display: 'flex',
                    alignItems: 'center' }}>
                    상태
                  </TableCell>
                  <TableCell>
                    <TextField
                      select
                      SelectProps={{ native: true }}
                      labelId="gubun"
                      value={data?.fshowyn === "y" ? "Y" : "N"}
                      onChange={handleChange}
                      fullWidth
                      name="fshowyn"
                    >
                      {DISCLOSURE.map((item, index) => (
                        <option value={item.value} key={index}>
                          {item.text}
                        </option>
                      ))}
                    </TextField>
                  </TableCell>
                </TableRow>
                <TableRow
                  sx={{
                    display: "grid",
                    gridTemplateColumns: "15% 35% 15% 35%"
                  }}
                >
                  <TableCell component="th" sx={{ backgroundColor: "#ccc", fontSize: '16px', display: 'flex',
                    alignItems: 'center' }}>
                    등록일자
                  </TableCell>
                  <TableCell>
                    {data?.fregdate
                      ? dayjs(data?.fregdate).format("YYYY-MM-DD")
                      : ""}
                  </TableCell>
                  <TableCell component="th" sx={{ backgroundColor: "#ccc", fontSize: '16px', display: 'flex',
                    alignItems: 'center' }}>
                    수정일자
                  </TableCell>
                  <TableCell>
                    {data?.fmodifydate
                      ? dayjs(data?.fmodifydate).format("YYYY-MM-DD")
                      : ""}
                  </TableCell>
                </TableRow>

                <TableRow
                  sx={{
                    display: "grid",
                    gridTemplateColumns: "15% 35% 15% 35%"
                  }}
                >
                  <TableCell component="th" sx={{ backgroundColor: "#ccc", fontSize: '16px', display: 'flex',
                    alignItems: 'center' }}>
                    질문
                  </TableCell>
                  <TableCell>
                    <TextField
                      fullWidth
                      label="제목"
                      value={data?.fquestion ?? ""}
                      onChange={handleChange}
                      name="fquestion"
                    />
                  </TableCell>
                </TableRow>
              </Table>
            </TableContainer>
            <Divider />
            <Box
              sx={{
                alignItems: "center",
                display: "flex",
                justifyContent: "space-between",
                flexWrap: "wrap"
              }}
            >
              <Typography sx={{ m: 1, mt: 3 }} variant="h5">
                답변 작성
              </Typography>
            </Box>
            <NoSsrWysiwyg content={answer} setContent={setAnswer} />
            {!disable && (
              <Button
                sx={{
                  mt: 5,
                  mb: 5,
                  maxWidth: 150,
                  fontSize: "1.05rem",
                  backgroundColor: "#1d93fe",
                  float: "right"
                }}
                variant="contained"
                onClick={handleUpdate}
              >
                수정
              </Button>
            )}
          </Box>
        </Container>
      </Box>
    </>
  );
};
