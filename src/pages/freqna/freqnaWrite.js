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
import { DashboardLayout } from "/src/components/dashboard-layout";
import { customers } from "/src/__mocks__/customers";
import dynamic from "next/dynamic";
const NoSsrWysiwyg = dynamic(() => import("/src/components/utill/editor"), {
    ssr: false
});
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import dayjs from "dayjs";
import { useState } from "react";
import { FQA_CATEGORY, DISCLOSURE, DEFAULT_QA } from "../../utils/constants";
import FqaService from "../../services/FqaService/FqaService";
import Router from "next/router";

const Page = () => {
    const [data, setData] = useState({ ...DEFAULT_QA });

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

    const handleAdd = async () => {
        const body = {
            fcategory: data.fcategory,
            fquestion: data.fquestion,
            fshowyn: data.fshowyn,
            fanswer: data.fanswer
        };
        try {
            await FqaService.addFQA(body);
            Router.push("freqnaList");
        } catch (error) {
            console.log(error);
        }
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
                        <Typography sx={{ m: 1 }} variant="h4">
                            자주하는 질문 등록
                        </Typography>
                    </Box>
                    <Box sx={{ mt: 3 }}>
                        <TableContainer>
                            <Table>
                                <TableRow>
                                    <TableCell
                                        component="th"
                                        sx={{ backgroundColor: "#ccc", minWidth: 130 }}
                                    >
                                        카테고리
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
                                </TableRow>
                                <TableRow>
                                    <TableCell
                                        component="th"
                                        sx={{ backgroundColor: "#ccc", minWidth: 130 }}
                                    >
                                        상태
                                    </TableCell>
                                    <TableCell>
                                        <TextField
                                            select
                                            SelectProps={{ native: true }}
                                            labelId="gubun"
                                            value={data?.fshowyn ?? ""}
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

                                <TableRow>
                                    <TableCell
                                        component="th"
                                        sx={{ backgroundColor: "#ccc", width: 130 }}
                                    >
                                        질문
                                    </TableCell>
                                    <TableCell>
                                        <TextField
                                            fullWidth
                                            label="제목"
                                            value={data.fquestion}
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
                        <NoSsrWysiwyg
                            content={data.fanswer}
                            setContent={handleChangeContent}
                        />
                        <Button
                            sx={{
                                mt: 5,
                                fontSize: "1.05rem",
                                backgroundColor: "#1d93fe",
                                float: "right"
                            }}
                            variant="contained"
                            onClick={handleAdd}
                        >
                            FAQ 등록
                        </Button>
                    </Box>
                </Container>
            </Box>
        </>
    );
};

Page.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default Page;