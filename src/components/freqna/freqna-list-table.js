import {useState} from "react";
import PerfectScrollbar from "react-perfect-scrollbar";
import PropTypes from "prop-types";
import Link from "next/link";
import {
    Box,
    Card,
    Checkbox,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TablePagination,
    TableRow,
    Typography,
    Button,
    Divider
} from "@mui/material";
import {FqaModify} from "./freqna-modify";
import FqaService from "../../services/FqaService/FqaService";
import {FQA_CATEGORY} from "../../utils/constants";

export const FreqnaListTable = (props) => {
    const {setTimeReRender, listFqa, ...rest} = props;
    const [limit, setLimit] = useState(10);
    const [page, setPage] = useState(0);
    const [dataEdit, setDataEdit] = useState({});

    const handleLimitChange = (event) => {
        setLimit(event.target.value);
    };

    const handlePageChange = (event, newPage) => {
        setPage(newPage);
    };

    const handleTapRow = async (id) => {
        try {
            const res = await FqaService.getDetailFQA(id);
            const result = res?.data?.result ?? {};
            const category = result?.category
                ? FQA_CATEGORY.find((item) => item.name === result?.category)
                : {};
            const data = {
                fcategory: category?.value ?? "",
                fregdate: result?.regDate ?? "",
                fmodifydate: result?.modifyDate ?? "",
                fquestion: result?.question ?? "",
                fshowyn: result?.showYn ?? "",
                fanswer: result?.answer ?? "",
                id: result?.idx ?? ""
            };
            setDataEdit(data);
        } catch (error) {
            console.log(error);
        }
    };

    const handleUpdate = async (id, data) => {
        try {
            await FqaService.updateFQA(id, data);
            setTimeReRender((prevState) => prevState + 1);
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <Card {...rest}>
            <PerfectScrollbar>
                <Box sx={{minWidth: 1050}}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>NO</TableCell>
                                <TableCell>구분</TableCell>
                                <TableCell>질문</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {listFqa.length ? (
                                (limit > 0
                                        ? listFqa.slice(page * limit, page * limit + limit)
                                        : listFqa
                                )
                                    .slice(0, limit)
                                    .map((row, index) => {
                                        const category = row?.category
                                            ? FQA_CATEGORY.find((item) => item.name === row.category)
                                            : {};
                                        return (
                                            <TableRow
                                                hover
                                                key={index}
                                                sx={{cursor: "pointer"}}
                                                onClick={() => handleTapRow(row.idx)}
                                            >
                                                <TableCell>
                                                    <Box
                                                        sx={{
                                                            alignItems: "center",
                                                            display: "flex"
                                                        }}
                                                    >
                                                        <Typography color="textPrimary" variant="body1">
                                                            {row.rownum}
                                                        </Typography>
                                                    </Box>
                                                </TableCell>
                                                <TableCell>{category?.text ?? ""}</TableCell>
                                                <TableCell>{row.question}</TableCell>
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
            </PerfectScrollbar>
            <TablePagination
                component="div"
                count={listFqa.length}
                onPageChange={handlePageChange}
                onRowsPerPageChange={handleLimitChange}
                page={page}
                rowsPerPage={limit}
                rowsPerPageOptions={[5, 10, 25]}
            />
            <Divider/>
            <Box sx={{m: 3, display: "flex", flexDirection: "row-reverse"}}>
                <Link href="freqnaWrite">
                    <Button
                        sx={{ml: 5, minWidth: 100, fontSize: "14px",}} variant="contained">FAQ등록
                    </Button>
                </Link>
            </Box>
            <Divider/>
            <FqaModify onUpdate={handleUpdate} fqa={dataEdit}/>
        </Card>
    );
};

FreqnaListTable.propTypes = {
    listFqa: PropTypes.array.isRequired
};
