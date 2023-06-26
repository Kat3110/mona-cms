import Head from "next/head";
import { Box, Container, Grid } from "@mui/material";
import { NoticeListTable } from "/src/components/notices/notice-list-table";
import { NoticeListHeader } from "/src/components/notices/notice-list-header";
import { DashboardLayout } from "/src/components/dashboard-layout";
import NoticeService from "../../services/NoticeService/NoticeService";
import { useState, useEffect } from "react";

const Page = () => {
  const [listNotice, setListNotice] = useState([]);
  const [timeReRender, setTimeReRender] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await NoticeService.getNoticeList({
          startDate: "",
          endDate: "",
          title: "",
          category: ""
        });
        setListNotice(res?.data?.result ?? []);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [timeReRender]);

  const handleSearch = async (condition) => {
    try {
      const res = await NoticeService.getNoticeList(condition);
      setListNotice(res?.data?.result ?? []);
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
          <NoticeListHeader onSearch={handleSearch} />
          <Box sx={{ mt: 3 }}>
            <NoticeListTable
              listNotice={listNotice}
              setTimeReRender={setTimeReRender}
            />
          </Box>
        </Container>
        <Box sx={{ mt: 3 }}></Box>
      </Box>
    </>
  );
};

Page.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default Page;
