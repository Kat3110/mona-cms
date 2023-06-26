import Head from "next/head";
import NextLink from "next/link";
import Router from "next/router";
import { useFormik } from "formik";
import * as Yup from "yup";
import {
  Box,
  Button,
  Container,
  Grid,
  Link,
  TextField,
  Typography
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useAuthContext } from "../contexts/auth-context";
import LoginService from "../services/LoginService/LoginService";

const Login = () => {
  // const authContext = useAuthContext();
  const formik = useFormik({
    initialValues: {
      username: "",
      password: ""
    },
    validationSchema: Yup.object({
      username: Yup.string().max(255).required("Username is required"),
      password: Yup.string().max(255).required("Password is required")
    }),
    onSubmit: async (values, helpers) => {
      try {
        console.log("values", values);
        const res = await LoginService.login(values);
        await authContext.signInByPass(res?.data?.accessToken);
        localStorage.setItem("token", res?.data?.accessToken);
        Router.push("/").catch(console.error);
      } catch (error) {
        if (error?.response?.status === 401) {
          helpers.setFieldError("submit", "Incorrect Username/Password");
        } else {
          helpers.setFieldError(
            "submit",
            error.message || "Something went wrong"
          );
        }
        helpers.setSubmitting(false);
      }
    }
  });

  return (
    <>
      <Head>
        <title>로그인</title>
      </Head>
      <Box
        sx={{
          display: "flex",
          mt: 20,
          mb: 20,
          mx: "auto",
          width: "300px",
          "& img": {
            width: "100%"
          }
        }}
      >
        <img src="/static/images/logo.png" />
      </Box>
      <Box
        component="main"
        sx={{
          alignItems: "center",
          display: "flex",
          minHeight: "100%"
        }}
      >
        <Container maxWidth="sm">
          <form onSubmit={formik.handleSubmit}>
            <Box sx={{ my: 3 }}>
              <Typography color="textPrimary" variant="h4" textAlign={"center"}>
                관리자 페이지
              </Typography>
            </Box>

            <TextField
              error={Boolean(formik.touched.username && formik.errors.username)}
              fullWidth
              helperText={formik.touched.username && formik.errors.username}
              label="아이디를 입력해주세요."
              margin="normal"
              name="username"
              // onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              type="text"
              // value={formik.values.email}
              variant="outlined"
            />
            <TextField
              error={Boolean(formik.touched.password && formik.errors.password)}
              fullWidth
              helperText={formik.touched.password && formik.errors.password}
              label="비밀번호를 입력해주세요."
              margin="normal"
              name="password"
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              type="password"
              // value={formik.values.password}
              variant="outlined"
            />
            {formik.errors.submit && (
              <Typography color="error" sx={{ mt: 2 }} variant="body2">
                {formik.errors.submit}
              </Typography>
            )}
            <Box sx={{ py: 2 }}>
              <Button
                sx={{ backgroundColor: "#1d93fe" }}
                disabled={formik.isSubmitting}
                fullWidth
                size="large"
                type="submit"
                variant="contained"
              >
                로그인하기
              </Button>
            </Box>
            <Typography
              color="textSecondary"
              gutterBottom
              variant="body2"
              sx={{ mt: 3 }}
            >
              비밀번호 분실 시 상위 관리자에게 비밀번호 초기화 요청 후
              임시비밀번호로 로그인 해주세요. 로그인 후 비밀번호 변경 화면에서
              비밀번호를 변경해주세요.
            </Typography>

            <Typography
              color="textSecondary"
              gutterBottom
              variant="body2"
              sx={{ mt: 3 }}
            >
              로그인 5회 실패 시 계정이 잠깁니다. 계정이 잠긴경우에는
              상위관리자에게 잠김해제를 요청해주세요.
            </Typography>
          </form>
        </Container>
      </Box>
    </>
  );
};

export default Login;
