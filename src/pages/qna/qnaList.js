import {useState, useEffect, useMemo} from "react";
import {
    Box,
    Button,
    Container,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
    Typography,
    TextField,
    TableContainer,
    Divider
    //as TextFieldText
} from "@mui/material";
import {DashboardLayout} from "/src/components/dashboard-layout";
import {makeStyles} from "@material-ui/core/styles";
// import TextField from "@material-ui/core/TextField";
// import dynamic from "next/dynamic";
// const Editor = dynamic(
//   () => import("react-draft-wysiwyg").then((mod) => mod.Editor),
//   { ssr: false }
// );
import dynamic from "next/dynamic";

import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import InquiryService from "../../services/InquiryService/InquiryService";
import {STATUS_QA, FQA_CATEGORY} from "../../utils/constants";
import dayjs from "dayjs";

const useStyles = makeStyles((theme) => ({
    container: {
        display: "flex",
        flexWrap: "wrap"
    },
    textField: {
        marginLeft: theme.spacing(1),
        marginRight: theme.spacing(1),
        width: 200
    }
}));

const columns = [
    {id: "name", label: "Name", minWidth: 170},
    {id: "code", label: "ISO\u00a0Code", minWidth: 100},
    {
        id: "number",
        label: "NO",
        minWidth: 170,
        align: "center"
    },
    {
        id: "id",
        label: "문의자 아이디",
        minWidth: 170,
        align: "center"
    },
    {
        id: "division",
        label: "구분",
        minWidth: 170,
        align: "center"
    },
    {
        id: "question",
        label: "질문",
        minWidth: 170,
        align: "center"
    },
    {
        id: "status",
        label: "답변상태",
        minWidth: 170,
        align: "center"
    }
];

function createData(number, id, division, question, status) {
    return {number, id, division, question, status};
}

const rows = [
    createData(
        39,
        "pay3717@naver.com",
        "회사관련",
        "모나는 어떤 회사입니까?  ",
        "답변대기"
    ),
    createData(
        38,
        "woy3717@gmail.com",
        "해지",
        "해지는 어떻게 하나요?",
        "답변대기"
    ),
    createData(
        37,
        "wity3@naver.com",
        "기타",
        "홈페이지에서 요금 내역서 발행이 가능한가요?",
        "답변대기"
    ),
    createData(
        36,
        "dfsdfsdf@naver.com",
        "유심",
        "유심 변경은 어떻게 하나요?",
        "답변대기"
    ),
    createData(
        35,
        "Vslkdjg@naver.com",
        "유심",
        "서비스 이용 중 유심불량이 날 경우 어떻게 해야하나요?",
        "답변대기"
    )
];

const Page = () => {
    const [listInquiry, setListInquiry] = useState([]);
    const [timeReRender, setTimeReRender] = useState([]);
    const [condition, setCondition] = useState({
        category: "",
        state: ""
    });
    const [dataEdit, setDataEdit] = useState({});
    const [answer, setAnswer] = useState("");
    const [limit, setLimit] = useState(10);
    const [page, setPage] = useState(0);

    const handleLimitChange = (event) => {
        setLimit(event.target.value);
    };

    const handlePageChange = (event, newPage) => {
        setPage(newPage);
    };

    const NoSsrWysiwyg = useMemo(() => {
        setAnswer(dataEdit.fanswer ?? "");
        return dynamic(() => import("../../components/utill/editor"), {
            ssr: false
        });
    }, [dataEdit.fanswer]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await InquiryService.getInquiryList({
                    category: "",
                    state: ""
                });
                setListInquiry(res?.data?.result ?? []);
            } catch (error) {
                console.log(error);
            }
        };
        fetchData();
    }, [timeReRender]);

    const handleSearchByCategory = async () => {
        try {
            const res = await InquiryService.getInquiryList({
                state: "",
                category: condition.category
            });
            setListInquiry(res?.data?.result ?? []);
        } catch (error) {
            console.log(error);
        }
    };

    const handleSearchByState = async () => {
        try {
            const res = await InquiryService.getInquiryList({
                state: condition.state,
                category: ""
            });
            setListInquiry(res?.data?.result ?? []);
        } catch (error) {
            console.log(error);
        }
    };

    const handleGetDetail = async (id) => {
        try {
            const res = await InquiryService.getDetailInquiry(id);
            // setListNotice(res?.data?.result ?? {});
            const result = res?.data?.result ?? {};
            console.log("result", id, result);
            const category = result?.category
                ? FQA_CATEGORY.find((item) => item.name === result?.category)
                : "";
            const showYn = result?.answerStatus
                ? STATUS_QA.find((item) => item.text === result?.answerStatus)
                : "";
            setDataEdit({
                // userid: result,
                fanswer: result?.answer ?? "",
                fcategory: category?.value ?? "",
                fquestion: result?.question ?? "",
                fshowyn: showYn?.value ?? "",
                id: id,
                iregdate: result?.requestDate ?? "",
                ianswerdate: result?.answerDate ?? "",
                replyName: result?.replyName ?? ""
            });
        } catch (error) {
            console.log(error);
        }
    };

    const handleChange = (e) => {
        const {value, name} = e.target;
        setDataEdit({
            ...dataEdit,
            [name]: value
        });
    };

    const handleEditorStateChange = (editorState) => {
        setDataEdit({
            ...dataEdit,
            fanswer: editorState
        });
    };

    const handleUpdate = async () => {
        const body = {
            icategory: dataEdit?.fcategory ?? "",
            iquestion: dataEdit?.fquestion ?? "",
            answerStatus: dataEdit?.fshowyn ?? "",
            // ianswer: dataEdit?.fanswer ?? ""
            ianswer: answer
        };
        console.log("body", body);
        try {
            await InquiryService.updateInquiry(dataEdit.id, body);
            setTimeReRender((prevState) => prevState + 1);
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <Box component="main" sx={{flexGrow: 1, py: 8}}>
            <Container maxWidth={false} sx={{mb: 7}}>
                <Typography sx={{mb: 6}} fontSize='32px'>
                    1:1문의관리
                </Typography>
                <Box sx={{display: "flex", gap: "0 70px", mb: 3}}>
                    <Box sx={{display: "flex", alignItems: "center", gap: "0 20px"}}>
                        <Typography fontSize='16px'>구분 :</Typography>
                        <TextField
                            style={{minWidth: "200px"}}
                            name="searchType"
                            required
                            select
                            SelectProps={{native: true}}
                            variant="outlined"
                            value={condition.category}
                            onChange={(e) =>
                                setCondition({...condition, category: e.target.value})
                            }
                        >
                            {FQA_CATEGORY.map((item, index) => (
                                <option value={item.name} key={index}>
                                    {item.text}
                                </option>
                            ))}
                        </TextField>
                        <Button
                            size="large"
                            variant="contained"
                            sx={{
                                backgroundColor: "#1d93fe",
                                fontSize: "14px",
                                width: "100px"
                            }}
                            onClick={handleSearchByCategory}
                        >
                            조회
                        </Button>
                    </Box>

                    <Box sx={{display: "flex", alignItems: "center", gap: "0 20px"}}>
                        <Typography  fontSize='16px'>답변상태 :</Typography>
                        <TextField
                            style={{minWidth: "200px"}}
                            name="searchType"
                            required
                            select
                            SelectProps={{native: true}}
                            variant="outlined"
                            value={condition.state}
                            onChange={(e) =>
                                setCondition({...condition, state: e.target.value})
                            }
                        >
                            {STATUS_QA.map((item, index) => (
                                <option value={item.value} key={index}>
                                    {item.text}
                                </option>
                            ))}
                        </TextField>
                        <Button
                            size="large"
                            variant="contained"
                            sx={{
                                backgroundColor: "#1d93fe",
                                fontSize: "14px",
                                width: "100px"
                            }}
                            onClick={handleSearchByState}
                        >
                            조회
                        </Button>
                    </Box>
                </Box>

                <Box>
                    <Table sx={{minWidth: 650}} aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell align="center" sx={{fontSize: '14px !important'}}>번호</TableCell>
                                <TableCell align="center" sx={{fontSize: '14px !important'}}>문의자 아이디</TableCell>
                                <TableCell align="left" sx={{fontSize: '14px !important'}}>구분</TableCell>
                                <TableCell align="left" sx={{fontSize: '14px !important'}}>질문</TableCell>
                                <TableCell align="center" sx={{fontSize: '14px !important'}}>답변상태</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {listInquiry.length ? (
                                (limit > 0
                                        ? listInquiry.slice(page * limit, page * limit + limit)
                                        : listInquiry
                                )
                                    .slice(0, limit)
                                    .map((row, index) => {
                                        const category = row?.category
                                            ? FQA_CATEGORY.find((item) => item.name === row.category)
                                            : {};
                                        return (
                                            <TableRow
                                                key={index}
                                                sx={{
                                                    "&:last-child td, &:last-child th": {border: 0},
                                                    cursor: "pointer"
                                                }}
                                                onClick={() => handleGetDetail(row.idx)}
                                            >
                                                <TableCell sx={{fontSize: '14px !important'}} align="center" component="th" scope="row">
                                                    {row.rownum}
                                                </TableCell>
                                                <TableCell sx={{fontSize: '14px !important'}} align="center">{row.userRequest}</TableCell>
                                                <TableCell sx={{fontSize: '14px !important'}} align="left">
                                                    {category?.text ?? ""}
                                                </TableCell>
                                                <TableCell sx={{fontSize: '14px !important'}} align="left">{row.question}</TableCell>
                                                <TableCell sx={{fontSize: '14px !important'}} align="center">
                                                    <Button size="small" variant="outlined">
                                                        {row.answerStatus}
                                                    </Button>
                                                </TableCell>
                                            </TableRow>
                                        );
                                    })
                            ) : (
                                <TableRow sx={{display: "flex", justifyContent: "center"}}>
                                    <TableCell colSpan={6}>No rows</TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </Box>
            </Container>

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
                        <Typography sx={{m: 1}} variant="h4">
                            상세보기
                        </Typography>
                    </Box>
                    <Box sx={{mt: 3}}>
                        <TableContainer>
                            <Table>
                                <TableRow
                                    sx={{
                                        display: "grid",
                                        gridTemplateColumns: "15% 35% 15% 35%"
                                    }}
                                >
                                    <TableCell component="th" sx={{backgroundColor: "#ccc"}}>
                                        구분
                                    </TableCell>
                                    <TableCell>
                                        <TextField
                                            size="small"
                                            name="fcategory"
                                            value={dataEdit?.fcategory ?? ""}
                                            onChange={handleChange}
                                            required
                                            select
                                            SelectProps={{native: true}}
                                            variant="outlined"
                                            style={{width: "50%"}}
                                        >
                                            {FQA_CATEGORY.map((item, index) => (
                                                <option value={item.value} key={index}>
                                                    {item.text}
                                                </option>
                                            ))}
                                        </TextField>
                                    </TableCell>
                                    <TableCell component="th" sx={{backgroundColor: "#ccc"}}>
                                        상태
                                    </TableCell>
                                    <TableCell>
                                        <TextField
                                            size="small"
                                            name="fshowyn"
                                            value={dataEdit?.fshowyn ?? ""}
                                            onChange={handleChange}
                                            required
                                            select
                                            SelectProps={{native: true}}
                                            variant="outlined"
                                            style={{width: "50%"}}
                                        >
                                            {STATUS_QA.map((item, index) => (
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
                                    <TableCell component="th" sx={{backgroundColor: "#ccc"}}>
                                        등록일자
                                    </TableCell>
                                    <TableCell>
                                        {dataEdit.iregdate
                                            ? dayjs(dataEdit.iregdate).format("YYYY-MM-DD")
                                            : ""}
                                    </TableCell>
                                    <TableCell component="th" sx={{backgroundColor: "#ccc"}}>
                                        답변일자/ 담당자
                                    </TableCell>
                                    <TableCell>
                                        {dataEdit.ianswerdate
                                            ? dayjs(dataEdit.ianswerdate).format("YYYY-MM-DD")
                                            : ""}{" "}
                                        {dataEdit.replyName && (< span >(담당자 : {dataEdit.replyName})</span>)}
                                    </TableCell>
                                </TableRow>

                                <TableRow
                                    sx={{
                                        display: "grid",
                                        gridTemplateColumns: "15% 85%"
                                    }}
                                >
                                    <TableCell component="th" sx={{backgroundColor: "#ccc"}}>
                                        질문
                                    </TableCell>
                                    <TableCell>
                                        <TextField
                                            type="text"
                                            name="fquestion"
                                            value={dataEdit?.fquestion ?? ""}
                                            onChange={handleChange}
                                            size="small"
                                            fullWidth
                                        />
                                    </TableCell>
                                </TableRow>
                            </Table>
                        </TableContainer>
                        <Divider/>
                        <Box
                            sx={{
                                alignItems: "center",
                                display: "flex",
                                justifyContent: "space-between",
                                flexWrap: "wrap"
                            }}
                        >
                            <Typography sx={{m: 1, mt: 3}} variant="h5">
                                답변 작성
                            </Typography>
                        </Box>
                        {/* <Editor
              // toolbarClassName="toolbarClassName"
              // wrapperClassName="wrapperClassName"
              // editorClassName="editorClassName"
              // placeholder="요금 내역서 발행은 고객센터 (1811-6825)를 통하여 문의 바랍니다."
              wrapperClassName="demo-wrapper"
              editorClassName="demo-editor"
              editorState={dataEdit.fanswer}
              onEditorStateChange={handleEditorStateChange}
            /> */}
                        <NoSsrWysiwyg content={answer ?? ""} setContent={setAnswer}/>
                        <Button
                            sx={{
                                mt: 5,
                                maxWidth: 150,
                                fontSize: "14px",
                                backgroundColor: "#1d93fe",
                                float: "right"
                            }}
                            variant="contained"
                            onClick={handleUpdate}
                        >
                            수정
                        </Button>
                    </Box>
                </Container>
            </Box>
        </Box>
    );
};

Page.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default Page;
