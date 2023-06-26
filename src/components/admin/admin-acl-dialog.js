import { useState, useEffect, useRef } from "react";
import {
  Box,
  Typography,
  Button,
  Divider,
  Dialog,
  DialogTitle,
  Table,
  TableRow,
  TableCell,
  FormControlLabel,
  Switch,
  Checkbox,
  TableBody,
  TableHead,
  Card,
  CardContent,
  TextField
} from "@mui/material";
import { customers } from "/src/__mocks__/customers";
import AdminService from "../../services/AdminService/AdminService";
import LoadingButton from "@mui/lab/LoadingButton";

const defaultList1 = [
  {
    midx: 1,
    mname: 1,
    aname: "Master",
    aselect: "N",
    adetail: "N",
    awrite: "N",
    aexcel: "N"
  },
  {
    midx: 2,
    mname: 1,
    aname: "Master",
    aselect: "N",
    adetail: "N",
    awrite: "N",
    aexcel: "N"
  },
  {
    midx: 3,
    mname: 1,
    aname: "Master",
    aselect: "N",
    adetail: "N",
    awrite: "N",
    aexcel: "N"
  },
  {
    midx: 4,
    mname: 1,
    aname: "Master",
    aselect: "N",
    adetail: "N",
    awrite: "N",
    aexcel: "N"
  },
  {
    midx: 5,
    mname: 1,
    aname: "Master",
    aselect: "N",
    adetail: "N",
    awrite: "N",
    aexcel: "N"
  },
  {
    midx: 6,
    mname: 1,
    aname: "Master",
    aselect: "N",
    adetail: "N",
    awrite: "N",
    aexcel: "N"
  },
  {
    midx: 7,
    mname: 1,
    aname: "Master",
    aselect: "N",
    adetail: "N",
    awrite: "N",
    aexcel: "N"
  },
  {
    midx: 8,
    mname: 1,
    aname: "Master",
    aselect: "N",
    adetail: "N",
    awrite: "N",
    aexcel: "N"
  },
  {
    midx: 9,
    mname: 1,
    aname: "Master",
    aselect: "N",
    adetail: "N",
    awrite: "N",
    aexcel: "N"
  },
  {
    midx: 10,
    mname: 1,
    aname: "Master",
    aselect: "N",
    adetail: "N",
    awrite: "N",
    aexcel: "N"
  },
  {
    midx: 11,
    mname: 1,
    aname: "Master",
    aselect: "N",
    adetail: "N",
    awrite: "N",
    aexcel: "N"
  },
  {
    midx: 12,
    mname: 1,
    aname: "Master",
    aselect: "N",
    adetail: "N",
    awrite: "N",
    aexcel: "N"
  },
  {
    midx: 13,
    mname: 1,
    aname: "Master",
    aselect: "N",
    adetail: "N",
    awrite: "N",
    aexcel: "N"
  },
  {
    midx: 14,
    mname: 1,
    aname: "Master",
    aselect: "N",
    adetail: "N",
    awrite: "N",
    aexcel: "N"
  },
  {
    midx: 15,
    mname: 1,
    aname: "Master",
    aselect: "N",
    adetail: "N",
    awrite: "N",
    aexcel: "N"
  },
  {
    midx: 16,
    mname: 1,
    aname: "Master",
    aselect: "N",
    adetail: "N",
    awrite: "N",
    aexcel: "N"
  },
  {
    midx: 17,
    mname: 1,
    aname: "Master",
    aselect: "N",
    adetail: "N",
    awrite: "N",
    aexcel: "N"
  },
  {
    midx: 18,
    mname: 1,
    aname: "Master",
    aselect: "N",
    adetail: "N",
    awrite: "N",
    aexcel: "N"
  },
  {
    midx: 19,
    mname: 1,
    aname: "Master",
    aselect: "N",
    adetail: "N",
    awrite: "N",
    aexcel: "N"
  },
  {
    midx: 20,
    mname: 1,
    aname: "Master",
    aselect: "N",
    adetail: "N",
    awrite: "N",
    aexcel: "N"
  },
  {
    midx: 21,
    mname: 1,
    aname: "Master",
    aselect: "N",
    adetail: "N",
    awrite: "N",
    aexcel: "N"
  },
  {
    midx: 22,
    mname: 1,
    aname: "Master",
    aselect: "N",
    adetail: "N",
    awrite: "N",
    aexcel: "N"
  },
  {
    midx: 23,
    mname: 1,
    aname: "Master",
    aselect: "N",
    adetail: "N",
    awrite: "N",
    aexcel: "N"
  },
  {
    midx: 24,
    mname: 1,
    aname: "Master",
    aselect: "N",
    adetail: "N",
    awrite: "N",
    aexcel: "N"
  },
  {
    midx: 25,
    mname: 1,
    aname: "Master",
    aselect: "N",
    adetail: "N",
    awrite: "N",
    aexcel: "N"
  },
  {
    midx: 26,
    mname: 1,
    aname: "Master",
    aselect: "N",
    adetail: "N",
    awrite: "N",
    aexcel: "N"
  }
];

const defaultList = [
  {
    accessWrite: "N",
    accessSelect: "N",
    accessDetail: "N",
    accessExcel: "N",
    parentMenu: "콘텐츠 관리",
    idx: 2,
    menuName: "통계"
  },
  {
    accessWrite: "N",
    accessSelect: "N",
    accessDetail: "N",
    parentMenu: "회원 관리",
    accessExcel: "N",
    idx: 4,
    menuName: "회원 정보조회"
  },
  {
    accessWrite: "N",
    accessSelect: "N",
    accessDetail: "N",
    accessExcel: "N",
    idx: 6,
    parentMenu: "관리자",
    menuName: "관리자 계정 조회"
  },
  {
    accessWrite: "N",
    accessSelect: "N",
    accessDetail: "N",
    menuName: "비밀번호 변경",
    accessExcel: "N",
    parentMenu: "관리자",
    idx: 7
  },
  {
    accessWrite: "N",
    menuName: "메뉴 권한 관리",
    accessSelect: "N",
    accessDetail: "N",
    idx: 8,
    accessExcel: "N",
    parentMenu: "관리자"
  },
  {
    accessWrite: "N",
    accessSelect: "N",
    accessDetail: "N",
    idx: 10,
    parentMenu: "전화",
    menuName: "스팸번호 관리",
    accessExcel: "N"
  },
  {
    idx: 12,
    accessWrite: "N",
    accessSelect: "N",
    accessDetail: "N",
    parentMenu: "이벤트/광고 배너",
    accessExcel: "N",
    menuName: "이벤트/광고 배너 조회"
  },
  {
    accessWrite: "N",
    accessSelect: "N",
    accessDetail: "N",
    idx: 14,
    accessExcel: "N",
    parentMenu: "공지사항 관리",
    menuName: "공지사항 조회"
  },
  {
    accessWrite: "N",
    accessSelect: "N",
    accessDetail: "N",
    menuName: "자주하는 질문관리",
    accessExcel: "N",
    parentMenu: "자주하는 질문",
    idx: 16
  },
  {
    accessWrite: "N",
    accessSelect: "N",
    accessDetail: "N",
    menuName: "자주하는 질문등록",
    accessExcel: "N",
    parentMenu: "자주하는 질문",
    idx: 17
  },
  {
    accessWrite: "N",
    accessSelect: "N",
    accessDetail: "N",
    accessExcel: "N",
    parentMenu: "1:1 문의",
    menuName: "1:1 문의관리",
    idx: 19
  },
  {
    accessWrite: "N",
    accessSelect: "N",
    accessDetail: "N",
    menuName: "관리자 작업 이력 조회",
    accessExcel: "N",
    idx: 21,
    parentMenu: "작업 이력 관리"
  },
  {
    accessWrite: "N",
    menuName: "메뉴 권한 부여 이력 조회",
    accessSelect: "N",
    accessDetail: "N",
    accessExcel: "N",
    idx: 22,
    parentMenu: "작업 이력 관리"
  },
  {
    accessWrite: "N",
    accessSelect: "N",
    accessDetail: "N",
    menuName: "개인정보 취급 이력 조회",
    accessExcel: "N",
    idx: 23,
    parentMenu: "작업 이력 관리"
  },
  {
    accessWrite: "N",
    parentMenu: "PUSH",
    accessSelect: "N",
    accessDetail: "N",
    idx: 25,
    accessExcel: "N",
    menuName: "PUSH 발송"
  },
  {
    accessWrite: "N",
    parentMenu: "PUSH",
    accessSelect: "N",
    accessDetail: "N",
    idx: 26,
    accessExcel: "N",
    menuName: "PUSH 관리"
  }
];

export const AdminAclDialog = (props) => {
  // ** 문의내역 상세 다이얼로그 오픈
  const { onClose, open } = props;
  const inputText = useRef(null);

  const [menus, setMenus] = useState([]);
  const [message, setMessage] = useState({ type: "", mess: "" });
  const [checked, setChecked] = useState({
    accessSelect: false,
    accessDetail: false,
    accessWrite: false,
    accessExcel: false
  });

  const [loading, setLoading] = useState({ checking: false, adding: false });
  const [errorSubmit, setErrorSubmit] = useState("");

  useEffect(() => {
    setMenus([...defaultList]);
    setChecked({
      accessSelect: false,
      accessDetail: false,
      accessWrite: false,
      accessExcel: false
    });
  }, []);

  const handleClose = () => {
    onClose();
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

  const handleSwitch = (id, value, field) => {
    const idx = menus.findIndex((item) => item.idx === id);
    let newMenus = menus;
    newMenus[idx] = { ...newMenus[idx], [field]: value };
    setMenus([...newMenus]);
  };

  const handleAddAccess = async () => {
    if (!inputText.current.value) {
      setErrorSubmit("이름 입력 권한명입니다 ");
      return;
    }
    setLoading({ ...loading, adding: true });
    const body = menus.map((item) => ({
      aselect: item.accessSelect,
      adetail: item.accessDetail,
      awrite: item.accessWrite,
      aexcel: item.accessExcel,
      aname: inputText.current.value,
      midx: item.idx
    }));
    try {
      await AdminService.addAccess(body);
      setLoading({ ...loading, adding: false });
      onClose();
    } catch (error) {
      setLoading({ ...loading, adding: false });
      console.log(error);
    }
  };

  const handleCheckAccess = async () => {
    setLoading({ ...loading, checking: true });
    try {
      const res = await AdminService.checkAccess(inputText.current.value);
      if (res?.data?.code === "FAILED") {
        setMessage({ type: "FAILED", mess: "※이미 등록된 권한명입니다." });
      } else {
        setMessage({ type: "SUCCESS", mess: "※ 등록 가능합니다." });
      }
      setLoading({ ...loading, checking: false });
    } catch (error) {
      setLoading({ ...loading, checking: false });
      console.log(error);
    }
  };

  return (
    <Dialog onClose={handleClose} open={open} fullWidth maxWidth="1300px">
      <DialogTitle>신규권한 등록</DialogTitle>
      <Box
        sx={{
          alignItems: "center",
          display: "flex",
          justifyContent: "space-between",
          flexWrap: "wrap",
          m: -1
        }}
      ></Box>
      <Box sx={{ mt: 3 }}>
        <Card>
          <CardContent sx={{ display: "flex", alignItems: "center" }}>
            <Box>
              <TextField
                sx={{ minWidth: 300, ml: 5 }}
                label="신규권한명"
                name="searchType"
                required
                SelectProps={{ native: true }}
                variant="outlined"
                inputRef={inputText}
              />
            </Box>

            <LoadingButton
              sx={{
                ml: 3,
                minWidth: 250,
                fontSize: "1.05rem",
                backgroundColor: "#1d93fe"
              }}
              onClick={handleCheckAccess}
              loading={loading.checking}
              loadingIndicator="중복확인..."
              variant="contained"
            >
              중복확인
            </LoadingButton>
            <Typography
              sx={
                message.type === "FAILED"
                  ? { color: "red", minWidth: 200, ml: 5 }
                  : { minWidth: 200, ml: 5 }
              }
            >
              {message.mess}
            </Typography>
          </CardContent>
        </Card>
      </Box>
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
                    checked["accessWrite"] && !handleCheckDisable("accessWrite")
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
                    checked["accessExcel"] && !handleCheckDisable("accessExcel")
                  }
                />
                엑셀 다운로드 권한
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {menus.map((menu, index) => (
              <TableRow hover key={index}>
                <TableCell>
                  <Box
                    sx={{
                      alignItems: "center",
                      display: "flex"
                    }}
                  >
                    <Typography color="textPrimary" variant="body1">
                      {menu.parentMenu}
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
                            menu.idx,
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
                            menu.idx,
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
                            menu.idx,
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
                            menu.idx,
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
            ))}
          </TableBody>
        </Table>
      </Box>
      <Divider />
      <Box
        sx={{
          m: 3,
          display: "flex",
          justifyContent: "flex-end",
          alignItems: "center"
        }}
      >
        {errorSubmit && (
          <Typography sx={{ minWidth: 200, ml: 5 }} color="error">
            {errorSubmit}
          </Typography>
        )}
        <LoadingButton
          sx={{
            ml: 5,
            minWidth: 100,
            fontSize: "1.05rem"
          }}
          variant="contained"
          color="primary"
          onClick={handleAddAccess}
          loading={loading.adding}
          loadingIndicator="등록..."
          disabled={message.type === "FAILED"}
        >
          등록
        </LoadingButton>
      </Box>
    </Dialog>
  );
};
