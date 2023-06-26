import { DashboardLayout } from "/src/components/dashboard-layout";
import {
  Box,
  Button,
  Card,
  CardContent,
  Container,
  Typography,
  TextareaAutosize,
} from "@mui/material";
import * as React from "react";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import VerticalAlignBottomIcon from "@mui/icons-material/VerticalAlignBottom";
import { ImageListItem } from "@mui/material";
import phoneImg from "../../../public/assets/phone.png";

const Page = () => {
  return (
    <Box component="main" sx={{ flexGrow: 1, py: 8, display: "flex" }}>
      <Container maxWidth={false}>
        <Box>
          <Box
            sx={{
              alignItems: "center",
              display: "flex",
              justifyContent: "space-between",
              flexWrap: "wrap",
              m: -1,
            }}
          >
            <Typography sx={{ m: 1 }} variant="h4">
              PUSH 발송
            </Typography>
          </Box>
          <Box sx={{ mt: 3 }}>
            <Card>
              <CardContent sx={{ display: "flex" }}>
                <Box
                  sx={{
                    width: 500,
                    height: 800,
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                  }}
                >
                  <img
                    src="/assets/phone.png"
                    width={500}
                    height={800}
                    style={{ objectFit: "cover", marginTop: "-40px" }}
                  />
                  <Button
                    sx={{
                      minWidth: 100,
                      fontSize: "1.05rem",
                      backgroundColor: "#1d93fe",
                    }}
                    variant="contained"
                  >
                    Push
                  </Button>
                </Box>

                <Box>
                  <Box
                    sx={{
                      display: "flex",
                      mb: 6,
                      pb: 2,
                      borderBottom: "1px solid #80808082",
                    }}
                  >
                    <Box sx={{ display: "flex", mb: 3, width: 250 }}>
                      <Typography
                        sx={{ m: 1, justifyContent: "flex-start" }}
                        variant="h5"
                      >
                        01 발송정보
                      </Typography>
                    </Box>
                    <Box sx={{ display: "flex", flexDirection: "column" }}>
                      <Button
                        sx={{
                          mb: 1,
                          width: 150,
                          fontSize: "1.05rem",
                          backgroundColor: "#1d93fe",
                        }}
                        variant="contained"
                      >
                        템플릿 불러오기
                      </Button>
                      <Box sx={{ display: "flex", mt: 4 }}>
                        <Typography
                          sx={{ margin: "0.5rem 3rem 0.5rem 0.5rem" }}
                          variant="h6"
                        >
                          메시지구분*
                        </Typography>
                        <FormControl>
                          <RadioGroup
                            row
                            aria-labelledby="demo-row-radio-buttons-group-label"
                            name="row-radio-buttons-group"
                          >
                            <FormControlLabel
                              value="광고성"
                              control={<Radio />}
                              label="광고성"
                            />
                            <FormControlLabel
                              value="정보성"
                              control={<Radio />}
                              label="정보성"
                            />
                          </RadioGroup>
                        </FormControl>
                      </Box>
                    </Box>
                  </Box>

                  <Box
                    sx={{
                      display: "flex",
                      mb: 6,
                      pb: 2,
                      borderBottom: "1px solid #80808082",
                    }}
                  >
                    <Box sx={{ display: "flex", mb: 3, width: 250 }}>
                      <Typography
                        sx={{ m: 1, justifyContent: "flex-start" }}
                        variant="h5"
                      >
                        02 메시지 내용
                      </Typography>
                    </Box>
                    <Box sx={{ display: "flex", flexDirection: "column" }}>
                      <Button
                        sx={{
                          mb: 1,
                          width: 150,
                          fontSize: "1.05rem",
                          backgroundColor: "#1d93fe",
                        }}
                        variant="contained"
                      >
                        내용입력
                      </Button>
                      <Box sx={{ display: "flex", mt: 4 }}>
                        <Typography
                          sx={{ margin: "0.5rem 3rem 0.5rem 0.5rem" }}
                          variant="h6"
                        >
                          메시지타임*
                        </Typography>
                        <FormControl>
                          <RadioGroup
                            row
                            aria-labelledby="demo-row-radio-buttons-group-label"
                            name="row-radio-buttons-group"
                          >
                            <FormControlLabel
                              value="광고성"
                              control={<Radio />}
                              label="기본"
                            />
                            <FormControlLabel
                              value="정보성"
                              control={<Radio />}
                              label="이미지"
                            />
                          </RadioGroup>
                        </FormControl>
                      </Box>
                    </Box>
                  </Box>

                  <Box
                    sx={{
                      display: "flex",
                      mb: 6,
                      pb: 2,
                      borderBottom: "1px solid #80808082",
                    }}
                  >
                    <Box sx={{ display: "flex", mb: 3, width: 250 }}>
                      <Typography
                        sx={{ m: 1, justifyContent: "flex-start" }}
                        variant="h5"
                      >
                        03 수신자 선택
                      </Typography>
                    </Box>
                    <Box sx={{ display: "flex", flexDirection: "column" }}>
                      <Typography
                        sx={{ margin: "0.5rem 3rem 0.5rem 0.5rem" }}
                        variant="h6"
                      >
                        수신자*
                      </Typography>
                      <Box sx={{ display: "flex", mt: 4, mb: 4 }}>
                        <FormControl>
                          <RadioGroup
                            row
                            aria-labelledby="demo-row-radio-buttons-group-label"
                            name="row-radio-buttons-group"
                          >
                            <FormControlLabel
                              value="광고성"
                              control={<Radio />}
                              label="앱사용자 전체발송"
                            />
                            <FormControlLabel
                              value="정보성"
                              control={<Radio />}
                              label="엑셀 업로드"
                            />
                            <Button
                              sx={{
                                margin: "0 0 0 auto",
                                minWidth: 100,
                                fontSize: "1.05rem",
                                backgroundColor: "#1d93fe",
                              }}
                              variant="contained"
                              endIcon={<VerticalAlignBottomIcon />}
                            >
                              샘플
                            </Button>
                          </RadioGroup>
                        </FormControl>
                      </Box>
                      <Box sx={{ display: "flex", flexDirection: "column" }}>
                        <Box
                          sx={{ display: "flex", alignItems: "center", mb: 3 }}
                        >
                          <Typography
                            sx={{ margin: "0.5rem 3rem 0.5rem 0.5rem" }}
                            variant="h6"
                          >
                            수신자 : 0명
                          </Typography>
                          <Button
                            sx={{
                              minWidth: 80,
                              fontSize: "1.05rem",
                              backgroundColor: "#1d93fe",
                            }}
                            variant="contained"
                          >
                            수신자 삭제
                          </Button>
                        </Box>

                        <TextareaAutosize minRows={4} />
                      </Box>
                    </Box>
                  </Box>

                  <Box sx={{ display: "flex", alignItems: "baseline" }}>
                    <Box sx={{ display: "flex", mb: 3, width: 250 }}>
                      <Typography
                        sx={{ m: 1, justifyContent: "flex-start" }}
                        variant="h5"
                      >
                        04 발송 옵션 선택
                      </Typography>
                    </Box>
                    <Box sx={{ display: "flex", mt: 4 }}>
                      <Typography
                        sx={{ margin: "0.5rem 3rem 0.5rem 0.5rem" }}
                        variant="h6"
                      >
                        발송시간*
                      </Typography>
                      <Box sx={{ display: "flex" }}>
                        <FormControl>
                          <RadioGroup
                            row
                            aria-labelledby="demo-row-radio-buttons-group-label"
                            name="row-radio-buttons-group"
                          >
                            <FormControlLabel
                              value="광고성"
                              control={<Radio />}
                              label="즉시"
                            />
                            <FormControlLabel
                              value="정보성"
                              control={<Radio />}
                              label="예약"
                            />
                          </RadioGroup>
                        </FormControl>
                      </Box>
                    </Box>
                  </Box>
                </Box>
              </CardContent>
            </Card>
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

Page.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default Page;
