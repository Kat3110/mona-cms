import {
  Box,
  Container,
  Grid,
  Typography,
  Card,
  CardHeader,
  Divider,
  Button,
  TextField,
  OutlinedInput,
  InputAdornment,
  IconButton
} from "@mui/material";
import { DashboardLayout } from "/src/components/dashboard-layout";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { useState } from "react";
import AdminService from "../../services/AdminService/AdminService";
import LoadingButton from "@mui/lab/LoadingButton";

const Page = () => {
  const [values, setValues] = useState({
    oldPassword: { password: "", showPassword: false, error: "" },
    newPassword: { password: "", showPassword: false, error: "" },
    confirmPassword: { password: "", showPassword: false, error: "" }
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (prop) => (event) => {
    setValues({
      ...values,
      [prop]: { ...values[prop], password: event.target.value }
    });
  };

  const handleClickShowPassword = (prop) => {
    setValues({
      ...values,
      [prop]: { ...values[prop], showPassword: !values[prop].showPassword }
    });
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleChangePassword = async () => {
    if (values["newPassword"].password !== values["confirmPassword"].password) {
      setValues({
        ...values,
        confirmPassword: {
          ...values["confirmPassword"],
          error: "비밀번호가 일치하지 않습니다."
        }
      });
      return;
    } else {
      setValues({
        ...values,
        confirmPassword: {
          ...values["confirmPassword"],
          error: ""
        }
      });
    }
    setLoading(true);
    try {
      await AdminService.changePassword({
        oldPassword: values.oldPassword.password,
        newPassword: values.newPassword.password,
        confirmNewPassword: values.confirmPassword.password
      });
      setValues({
        oldPassword: { password: "", showPassword: false, error: "" },
        newPassword: { password: "", showPassword: false, error: "" },
        confirmPassword: { password: "", showPassword: false, error: "" }
      });
      setLoading(false);
    } catch (error) {
      if (error?.response?.status === 401) {
        setValues({
          ...values,
          oldPassword: {
            ...values["oldPassword"],
            error: "비밀번호가 일치하지 않습니다."
          }
        });
      } else {
        console.log(error);
      }
      setLoading(false);
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
        <Typography
          sx={{ ml: 3, mb: 5, fontSize: "32px !important" }}
          variant="h4"
        >
          관리자 비밀번호 변경
        </Typography>
        <Container maxWidth={false}>
          <Box sx={{ mt: 3 }}>
            <Card>
              <Box
                sx={{
                  m: 3,
                  display: "flex",
                  justifyContent: "flex-start",
                  alignItems: "center"
                }}
              >
                <Typography
                  sx={{
                    minWidth: "200px",
                    textAlign: "center",
                    fontSize: "16px !important"
                  }}
                >
                  기존 비밀번호
                </Typography>
                <OutlinedInput
                  sx={{ fontSize: "16px !important" }}
                  fullWidth
                  type={
                    values["oldPassword"].showPassword ? "text" : "password"
                  }
                  value={values["oldPassword"].password}
                  onChange={handleChange("oldPassword")}
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={() => handleClickShowPassword("oldPassword")}
                        onMouseDown={handleMouseDownPassword}
                        edge="end"
                      >
                        {values["oldPassword"].showPassword ? (
                          <VisibilityOff />
                        ) : (
                          <Visibility />
                        )}
                      </IconButton>
                    </InputAdornment>
                  }
                />
                <Typography
                  sx={{
                    minWidth: "400px",
                    textAlign: "center",
                    fontSize: "16px !important"
                  }}
                  color="error"
                >
                  {values["oldPassword"].error}
                </Typography>
              </Box>
              <Box
                sx={{
                  m: 3,
                  display: "flex",
                  justifyContent: "flex-start",
                  alignItems: "center"
                }}
              >
                <Typography
                  sx={{
                    minWidth: "200px",
                    textAlign: "center",
                    fontSize: "16px !important"
                  }}
                >
                  변경할 비밀번호
                </Typography>
                <OutlinedInput
                  sx={{ fontSize: "16px !important" }}
                  fullWidth
                  type={
                    values["newPassword"].showPassword ? "text" : "password"
                  }
                  value={values["newPassword"].password}
                  onChange={handleChange("newPassword")}
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={() => handleClickShowPassword("newPassword")}
                        onMouseDown={handleMouseDownPassword}
                        edge="end"
                      >
                        {values["newPassword"].showPassword ? (
                          <VisibilityOff />
                        ) : (
                          <Visibility />
                        )}
                      </IconButton>
                    </InputAdornment>
                  }
                />
                <Typography
                  sx={{
                    minWidth: "400px",
                    textAlign: "center"
                  }}
                  color="error"
                ></Typography>
              </Box>
              <Box
                sx={{
                  m: 3,
                  display: "flex",
                  justifyContent: "flex-start",
                  alignItems: "center"
                }}
              >
                <Typography
                  sx={{
                    minWidth: "200px",
                    textAlign: "center",
                    fontSize: "16px !important"
                  }}
                >
                  비밀번호 재입력
                </Typography>
                <OutlinedInput
                  sx={{ fontSize: "16px !important" }}
                  fullWidth
                  type={
                    values["confirmPassword"].showPassword ? "text" : "password"
                  }
                  value={values["confirmPassword"].password}
                  onChange={handleChange("confirmPassword")}
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={() =>
                          handleClickShowPassword("confirmPassword")
                        }
                        onMouseDown={handleMouseDownPassword}
                        edge="end"
                      >
                        {values["confirmPassword"].showPassword ? (
                          <VisibilityOff />
                        ) : (
                          <Visibility />
                        )}
                      </IconButton>
                    </InputAdornment>
                  }
                />
                <Typography
                  sx={{
                    minWidth: "400px",
                    textAlign: "center",
                    fontSize: "16px !important"
                  }}
                  color="error"
                >
                  {values["confirmPassword"].error}
                </Typography>
              </Box>
              <Box
                sx={{
                  m: 3,
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center"
                }}
              >
                <LoadingButton
                  sx={{
                    ml: 4,
                    backgroundColor: "#1d93fe",
                    color: "#fff",
                    width: 100,
                    fontSize: "16px !important"
                  }}
                  onClick={handleChangePassword}
                  loading={loading}
                  loadingIndicator="변경..."
                >
                  변경
                </LoadingButton>
              </Box>
            </Card>
          </Box>
        </Container>
      </Box>
    </>
  );
};

Page.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default Page;
