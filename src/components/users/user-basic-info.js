import { useState } from "react";
import {
  Box,
  Button,
  Card,
  CardHeader,
  Divider,
  Typography,
  TableContainer,
  Table,
  TableCell,
  TableRow,
  Checkbox,
  Dialog,
  DialogTitle,
  TableHead,
  TableBody,
  OutlinedInput,
  InputAdornment,
  IconButton
} from "@mui/material";

import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

import { styled } from "@mui/material/styles";
import { tableCellClasses } from "@mui/material/TableCell";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: "#ccc"
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14
  }
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover
  },

  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0
  }
}));

const MemberShipCheckDialog = (props) => {
  // ** 멤버십 카드 패스워드 인증 다이얼로그
  const { onClose, selectedValue, open } = props;
  // ** 문의내역 상세 구분
  const [values, setValues] = useState({
    password: "",
    showPassword: false
  });

  const handleClose = () => {
    onClose(selectedValue);
  };
  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };

  const handleClickShowPassword = () => {
    setValues({
      ...values,
      showPassword: !values.showPassword
    });
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  return (
    <Dialog onClose={handleClose} open={open} fullWidth width="500px">
      <DialogTitle>암호입력</DialogTitle>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          flexWrap: "nowrap",
          alignItems: "center",
          p: 4
        }}
      >
        <Typography sx={{ mb: 3 }}>
          카드번호 마스킹 해제를 위해서 암호를 입력하세요.
        </Typography>
        <OutlinedInput
          type={values.showPassword ? "text" : "password"}
          value={values.password}
          onChange={handleChange("password")}
          endAdornment={
            <InputAdornment position="end">
              <IconButton
                aria-label="toggle password visibility"
                onClick={handleClickShowPassword}
                onMouseDown={handleMouseDownPassword}
                edge="end"
              >
                {values.showPassword ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            </InputAdornment>
          }
        />
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            p: 3,
            width: 200
          }}
        >
          <Button color="primary" type="submit" variant="contained">
            확인
          </Button>
          <Button color="error" type="submit" variant="contained">
            취소
          </Button>
        </Box>
      </Box>
    </Dialog>
  );
};

const UserMemberDialog = (props) => {
  // ** 문의내역 상세 다이얼로그 오픈
  const { onClose, selectedValue, open } = props;
  const handleClose = () => {
    onClose(selectedValue);
  };

  const [openCheck, setOpenCheck] = useState(false);
  const handleClickOpen = () => {
    setOpenCheck(true);
  };
  const handleCloseCheck = (value) => {
    setOpenCheck(false);
  };

  return (
    <Dialog onClose={handleClose} open={open} fullWidth maxWidth="1300px">
      <DialogTitle>멤버쉽 카드 상세보기</DialogTitle>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>멤버쉽 카드 번호</TableCell>
            <TableCell>상태</TableCell>
            <TableCell>배송상태</TableCell>
            <TableCell>만료일</TableCell>
            <TableCell>등록일시</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {/* {customers.slice(0, limit).map(customer => ( */}
          <TableRow hover onClick={handleClickOpen}>
            <TableCell>
              <Box
                sx={{
                  alignItems: "center",
                  display: "flex"
                }}
              >
                <Typography color="textPrimary" variant="body1">
                  9460-44**-****-1852
                </Typography>
              </Box>
            </TableCell>
            <TableCell>정상</TableCell>
            <TableCell>배송완료</TableCell>
            <TableCell>2525-09-15</TableCell>
            <TableCell>2022-09-15 21:53:31</TableCell>
          </TableRow>
          {/* ))} */}
        </TableBody>
      </Table>
      <MemberShipCheckDialog open={openCheck} onClose={handleCloseCheck} />
    </Dialog>
  );
};

export const UserBasicInfo = (props) => {
  const { data = {} } = props;
  // const [values, setValues] = useState({
  //   name: "박주혜",
  //   number: "010-1234-5555",
  //   userId: "aypark@naver.com",
  //   birthDate: "92.02.21",
  //   regDate: "2022-08-10",
  //   joinStatus: "Y",
  //   marketing: [{ sms: "Y" }, { email: "Y" }, { push: "Y" }],
  //   address: "서울시 노원구"
  // });

  const [open, setOpen] = useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = (value) => {
    setOpen(false);
    // setSelectedValue(value);
  };

  return (
    <>
      <Card>
        <CardHeader title="회원기본정보" />
        <Divider />
        <TableContainer>
          <Table size="small">
            <TableRow
              sx={{
                display: "grid",
                gridTemplateColumns: "10% 16% 8% 12% 12% 14% 8% 12%"
              }}
            >
              <TableCell
                component="th"
                sx={{
                  backgroundColor: "#ccc",

                  fontSize: "14px !important"
                }}
              >
                회원명
              </TableCell>
              <TableCell sx={{ fontSize: "14px !important" }}>
                {data?.name ?? ""}
              </TableCell>
              <TableCell
                component="th"
                sx={{
                  backgroundColor: "#ccc",

                  fontSize: "14px !important"
                }}
              >
                전화번호
              </TableCell>
              <TableCell sx={{ fontSize: "14px !important" }}>
                {data?.number ?? ""}
              </TableCell>
              <TableCell
                component="th"
                sx={{
                  backgroundColor: "#ccc",

                  fontSize: "14px !important"
                }}
              >
                아이디
              </TableCell>
              <TableCell sx={{ fontSize: "14px !important" }}>
                {data?.userId ?? ""}
              </TableCell>
              <TableCell
                component="th"
                sx={{
                  backgroundColor: "#ccc",

                  fontSize: "14px !important"
                }}
              >
                생년월일
              </TableCell>
              <TableCell sx={{ fontSize: "14px !important" }}>
                {data?.birthDate ?? ""}
              </TableCell>
            </TableRow>
            <TableRow
              sx={{
                display: "grid",
                gridTemplateColumns: "10% 16% 8% 12% 12% 14% 8% 12%"
              }}
            >
              <TableCell
                component="th"
                sx={{
                  backgroundColor: "#ccc",

                  fontSize: "14px !important"
                }}
              >
                통합앱 가입일자
              </TableCell>
              <TableCell sx={{ fontSize: "14px !important" }}>
                {data?.regDate ?? ""}
              </TableCell>
              <TableCell
                component="th"
                sx={{
                  backgroundColor: "#ccc",

                  fontSize: "14px !important"
                }}
              >
                가입 상태
              </TableCell>
              <TableCell sx={{ fontSize: "14px !important" }}>
                {data?.joinStatus ?? ""}
              </TableCell>
              <TableCell
                component="th"
                sx={{
                  backgroundColor: "#ccc",

                  fontSize: "14px !important"
                }}
              >
                마케팅 수신동의
              </TableCell>
              <TableCell sx={{ fontSize: "14px !important" }}>
                <Checkbox
                  name="sms"
                  value="Y"
                  checked
                  sx={{
                    "&.MuiCheckbox-root": {
                      padding: 0
                    }
                  }}
                />
                SMS
                <Checkbox
                  name="email"
                  value="Y"
                  sx={{
                    marginLeft: "5px",
                    "&.MuiCheckbox-root": {
                      padding: 0
                    }
                  }}
                />
                Email
                <Checkbox
                  name="push"
                  value="Y"
                  sx={{
                    marginLeft: "5px",
                    "&.MuiCheckbox-root": {
                      padding: 0
                    }
                  }}
                />
                Push
              </TableCell>
              <TableCell
                component="th"
                sx={{
                  backgroundColor: "#ccc",

                  fontSize: "14px !important"
                }}
              >
                주소
              </TableCell>
              <TableCell sx={{ fontSize: "14px !important" }}>
                {data?.address ?? ""}
              </TableCell>
            </TableRow>
          </Table>
        </TableContainer>
        <TableContainer sx={{marginTop: '5px'}}>
          <Table size="small">
            <TableRow
              sx={{
                display: "grid",
                gridTemplateColumns: "15% 15% 15% 15% 15% 25%"
              }}
            >
              <TableCell
                component="th"
                sx={{
                  backgroundColor: "#ccc",

                  fontSize: "14px !important"
                }}
              >
                대리점(판매자)
              </TableCell>
              <TableCell sx={{ fontSize: "14px !important" }}>사용중</TableCell>
              <TableCell
                component="th"
                sx={{ backgroundColor: "#ccc" }}
              >
                개통일자
              </TableCell>
              <TableCell sx={{ fontSize: "14px !important" }}>
                2021-11-05(313일 사용)
              </TableCell>
              <TableCell
                component="th"
                sx={{
                  backgroundColor: "#ccc",

                  fontSize: "14px !important"
                }}
              >
                선/후불 구분
              </TableCell>
              <TableCell sx={{ fontSize: "14px !important" }}>후불</TableCell>
            </TableRow>
            <TableRow
              sx={{
                display: "grid",
                gridTemplateColumns: "15% 15% 15% 15% 15% 25%"
              }}
            >
              <TableCell
                component="th"
                sx={{
                  backgroundColor: "#ccc",

                  fontSize: "14px !important"
                }}
              >
                회선상태
              </TableCell>
              <TableCell>사용중</TableCell>
              <TableCell
                component="th"
                sx={{
                  backgroundColor: "#ccc",

                  fontSize: "14px !important"
                }}
              >
                멤버쉽 카드 상태
              </TableCell>
              <TableCell>
                사용중
                <Button
                  variant="contained"
                  size="small"
                  sx={{ ml: 4, backgroundColor: "#1d93fe" }}
                  onClick={handleClickOpen}
                >
                  상세
                </Button>
              </TableCell>
            </TableRow>
          </Table>
        </TableContainer>
        <Divider />
        <Box
          sx={{
            display: "flex",
            justifyContent: "flex-end",
            p: 2
          }}
        ></Box>
      </Card>
      <UserMemberDialog open={open} onClose={handleClose} />
    </>
  );
};
