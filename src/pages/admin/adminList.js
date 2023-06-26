import Head from "next/head";
import { useEffect } from "react";
import { Box, Container, Grid, Typography, Card } from "@mui/material";
import { DashboardLayout } from "/src/components/dashboard-layout";
import { AdminListTable } from "../../components/admin/admin-list-table";
import { AdminBasicInfo } from "../../components/admin/admin-basic-info";
import { useState } from "react";
import AdminService from "../../services/AdminService/AdminService";

const Page = () => {
  // data for admin basic info
  const [selectedValue, setSelectedValue] = useState([]);
  const [listAdmin, setListAdmin] = useState([]);
  const [timeRecall, setTimeRecall] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await AdminService.getAdmin();
        let list = res?.data?.result ?? [];
        list = list.map((item, index) => ({ ...item, id: index }));
        setListAdmin(list);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [timeRecall]);

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
          관리자 계정 조회
        </Typography>
        <Container maxWidth={false}>
          <Box sx={{ mt: 3 }}>
            <AdminListTable
              setValue={setSelectedValue}
              listAdmin={listAdmin}
              setTimeRecall={setTimeRecall}
            />
          </Box>
          <Box sx={{ mt: 3 }}>
            <AdminBasicInfo
              value={selectedValue}
              setTimeRecall={setTimeRecall}
            />
          </Box>
        </Container>
      </Box>
    </>
  );
};

Page.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default Page;
