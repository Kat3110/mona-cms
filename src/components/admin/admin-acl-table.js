import { useState, useEffect } from "react";
import PerfectScrollbar from "react-perfect-scrollbar";
import PropTypes from "prop-types";
import { AdminAclDialog } from "./admin-acl-dialog";
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
  FormControlLabel,
  Switch,
  Button,
  Divider
} from "@mui/material";
import AdminService from "../../services/AdminService/AdminService";
import LoadingButton from "@mui/lab/LoadingButton";

const menuPermission = [
  {
    id: 1,
    topMenu: "회원관리",
    menu: "정보조회",
    permissionToView: true,
    detailedInquiryAuthority: true,
    permissionToRegister: true,
    permissionToDownload: true
  },
  {
    id: 2,
    topMenu: "관리자",
    menu: "관리자 계정 조회",
    permissionToView: true,
    detailedInquiryAuthority: true,
    permissionToRegister: true,
    permissionToDownload: true
  },
  {
    id: 3,
    topMenu: "관리자",
    menu: "비밀번호 변경",
    permissionToView: false,
    detailedInquiryAuthority: false,
    permissionToRegister: false,
    permissionToDownload: false
  },
  {
    id: 4,
    topMenu: "관리자",
    menu: "메뉴 권한 관리",
    permissionToView: false,
    detailedInquiryAuthority: false,
    permissionToRegister: false,
    permissionToDownload: false
  },
  {
    id: 5,
    topMenu: "전화",
    menu: "스팸번호 관리",
    permissionToView: false,
    detailedInquiryAuthority: false,
    permissionToRegister: false,
    permissionToDownload: false
  },
  {
    id: 6,
    topMenu: "플랫폼 서비스",
    menu: "플랫폼 서비스 조회",
    permissionToView: false,
    detailedInquiryAuthority: false,
    permissionToRegister: false,
    permissionToDownload: false
  },
  {
    id: 7,
    topMenu: "이벤트/광고 배너",
    menu: "이벤트/광고 배너 조회",
    permissionToView: false,
    detailedInquiryAuthority: false,
    permissionToRegister: false,
    permissionToDownload: false
  }
];

const defaultMidx = {
  "콘텐츠 관리": 1,
  통계: 2,
  "회원 관리": 3,
  "회원 정보조회": 4,
  "회원 정보조회": 5,
  "관리자 계정 조회": 6,
  "비밀번호 변경": 7,
  "메뉴 권한 관리": 8,
  전화: 9,
  "스팸번호 관리": 10,
  "이벤트/광고 배너": 11,
  "이벤트/광고 배너 조회": 12,
  "공지사항 관리": 13,
  "공지사항 조회": 14,
  "자주하는 질문": 15,
  "자주하는 질문관리": 16,
  "자주하는 질문등록": 17,
  "1:1 문의": 18,
  "1:1 문의관리": 19,
  "작업 이력 관리": 20,
  "관리자 작업 이력 조회": 21,
  "메뉴 권한 부여 이력 조회": 22,
  "개인정보 취급 이력 조회": 23,
  PUSH: 24,
  "PUSH 발송": 25,
  "PUSH 관리": 26
};

export const AdminAclTable = ({ listAccessMenu, selectedOption, ...rest }) => {
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(0);

  const [openWrite, setOpenWrite] = useState(false);

  const [menus, setMenus] = useState([]);
  const [checked, setChecked] = useState({
    accessSelect: false,
    accessDetail: false,
    accessWrite: false,
    accessExcel: false
  });

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setMenus([...listAccessMenu]);
    setChecked({
      accessSelect: false,
      accessDetail: false,
      accessWrite: false,
      accessExcel: false
    });
  }, [listAccessMenu]);

  const handleSwitch = (id, value, field) => {
    const idx = menus.findIndex((item) => item.accessId === id);
    let newMenus = menus;
    newMenus[idx] = { ...newMenus[idx], [field]: value };
    setMenus([...newMenus]);
  };

  const handleClickOpen = (dialog) => {
    if (dialog === "write") {
      setOpenWrite(true);
    }
  };

  const handleClose = (dialog) => {
    if (dialog === "write") {
      setOpenWrite(false);
    }
  };

  const handleSelectAll = (e, field) => {
    let newMenus = [];
    if (e.target.checked) {
      newMenus = menus.map((item) => ({ ...item, [field]: "Y" }));
      setChecked({ ...checked, [field]: true });
    } else {
      newMenus = menus.map((item) => ({ ...item, [field]: "N" }));
      setChecked({ ...checked, [field]: false });
    }
    setMenus([...newMenus]);
  };

  const handleCheckDisable = (field) => {
    const newMenus = menus.filter((item) => item[field] === "Y");
    return newMenus.length === menus.length;
  };

  const handleLimitChange = (event) => {
    setLimit(event.target.value);
  };

  const handlePageChange = (event, newPage) => {
    setPage(newPage);
  };

  const handleModify = async () => {
    setLoading(true);
    const body = menus.map((item) => ({
      idx: item.accessId,
      midx: defaultMidx[item.menuName],
      aname: selectedOption,
      aselect: item.accessSelect,
      adetail: item.accessDetail,
      awrite: item.accessWrite,
      aexcel: item.accessExcel
    }));
    try {
      await AdminService.modifyAccess(body, selectedOption);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  return (
    <>
      <Card {...rest}>
        <PerfectScrollbar>
          <Box sx={{ minWidth: 1050 }}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>상위메뉴</TableCell>
                  <TableCell>메뉴</TableCell>
                  <TableCell>
                    <Checkbox
                      checked={checked["accessSelect"]}
                      onChange={(e) => handleSelectAll(e, "accessSelect")}
                      disabled={
                        checked["accessSelect"] &&
                        !handleCheckDisable("accessSelect")
                      }
                      color="primary"
                    />
                    조회권한
                  </TableCell>
                  <TableCell>
                    <Checkbox
                      color="primary"
                      checked={checked["accessDetail"]}
                      onChange={(e) => handleSelectAll(e, "accessDetail")}
                      disabled={
                        checked["accessDetail"] &&
                        !handleCheckDisable("accessDetail")
                      }
                    />
                    상세조회 권한
                  </TableCell>
                  <TableCell>
                    <Checkbox
                      color="primary"
                      checked={checked["accessWrite"]}
                      onChange={(e) => handleSelectAll(e, "accessWrite")}
                      disabled={
                        checked["accessWrite"] &&
                        !handleCheckDisable("accessWrite")
                      }
                    />
                    등록권한
                  </TableCell>
                  <TableCell>
                    <Checkbox
                      color="primary"
                      checked={checked["accessExcel"]}
                      onChange={(e) => handleSelectAll(e, "accessExcel")}
                      disabled={
                        checked["accessExcel"] &&
                        !handleCheckDisable("accessExcel")
                      }
                    />
                    엑셀 다운로드 권한
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {menus.length ? (
                  (limit > 0
                    ? menus.slice(page * limit, page * limit + limit)
                    : menus
                  ).map((menu, index) => (
                    <TableRow hover key={index}>
                      <TableCell>
                        <Box
                          sx={{
                            alignItems: "center",
                            display: "flex"
                          }}
                        >
                          <Typography color="textPrimary" variant="body1">
                            {menu.menuParentName}
                          </Typography>
                        </Box>
                      </TableCell>
                      <TableCell>{menu.menuName}</TableCell>
                      <TableCell>
                        <FormControlLabel
                          control={
                            <Switch
                              checked={!!(menu.accessSelect === "Y")}
                              onChange={() =>
                                handleSwitch(
                                  menu.accessId,
                                  menu.accessSelect === "Y" ? "N" : "Y",
                                  "accessSelect"
                                )
                              }
                              name="gilad"
                            />
                          }
                        />
                      </TableCell>
                      <TableCell>
                        <FormControlLabel
                          control={
                            <Switch
                              checked={!!(menu.accessDetail === "Y")}
                              onChange={() =>
                                handleSwitch(
                                  menu.accessId,
                                  menu.accessDetail === "Y" ? "N" : "Y",
                                  "accessDetail"
                                )
                              }
                              name="gilad"
                            />
                          }
                        />
                      </TableCell>
                      <TableCell>
                        <FormControlLabel
                          control={
                            <Switch
                              checked={!!(menu.accessWrite === "Y")}
                              onChange={() =>
                                handleSwitch(
                                  menu.accessId,
                                  menu.accessWrite === "Y" ? "N" : "Y",
                                  "accessWrite"
                                )
                              }
                              name="gilad"
                            />
                          }
                        />
                      </TableCell>
                      <TableCell>
                        <FormControlLabel
                          control={
                            <Switch
                              checked={!!(menu.accessExcel === "Y")}
                              onChange={() =>
                                handleSwitch(
                                  menu.accessId,
                                  menu.accessExcel === "Y" ? "N" : "Y",
                                  "accessExcel"
                                )
                              }
                              name="gilad"
                            />
                          }
                        />
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow sx={{ display: "flex", justifyContent: "center" }}>
                    <TableCell colSpan={6}>No rows</TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </Box>
        </PerfectScrollbar>
        <TablePagination
          component="div"
          count={menus.length}
          onPageChange={handlePageChange}
          onRowsPerPageChange={handleLimitChange}
          page={page}
          rowsPerPage={limit}
          rowsPerPageOptions={[5, 10, 25]}
        />
        <Divider />
        <Box sx={{ m: 3, display: "flex", flexDirection: "row-reverse" }}>
          <LoadingButton
            sx={{
              ml: 5,
              minWidth: 100,
              fontSize: "1.05rem"
            }}
            onClick={handleModify}
            loading={loading}
            loadingIndicator="수정..."
            variant="contained"
            color="success"
          >
            수정
          </LoadingButton>
          <Button
            sx={{
              ml: 5,
              minWidth: 100,
              fontSize: "1.05rem"
            }}
            variant="contained"
            color="primary"
            onClick={() => handleClickOpen("write")}
          >
            신규권한등록
          </Button>
        </Box>
      </Card>
      <AdminAclDialog
        open={openWrite}
        onClose={() => handleClose("write")}
      />
    </>
  );
};

AdminAclTable.propTypes = {
  listAccessMenu: PropTypes.array.isRequired
};
