import Head from "next/head";
import { Box, Container, Grid, Typography, Card } from "@mui/material";
import { CallsListTable } from "/src/components/calls/calls-list-table";
import { CallsListHeader } from "/src/components/calls/calls-list-header";
// import { UserSelectDialog } '/src/components/users/user-select-dialog';
import { DashboardLayout } from "/src/components/dashboard-layout";
import { customers } from "/src/__mocks__/customers";
import { useState, useEffect } from "react";
import SpamService from "../../services/SpamService/SpamService";

const Page = () => {
  const [listSpam, setListSpam] = useState([]);
  const [timeReRender, setTimeReRender]= useState(0)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await SpamService.getSpamList({ type: "", number: "" });
        setListSpam(res?.data?.result ?? []);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [timeReRender]);

  const handleSearch = async (condition) => {
    try {
      const res = await SpamService.getSpamList(condition);
      setListSpam(res?.data?.result ?? []);
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
          <CallsListHeader onSearch={handleSearch} />
          <Box sx={{ mt: 3 }}>
            <Card
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center"
              }}
            >
              <Box sx={{ textAlign: "center", m: 10 }}>
                <Typography variant="h4">등록된 스팸번호 수</Typography>

                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center"
                  }}
                >
                  <Typography variant="h1">{listSpam.length}</Typography>
                  <Typography variant="h4">개</Typography>
                </Box>
              </Box>
            </Card>
          </Box>
          <Box sx={{ mt: 3 }}>
            <CallsListTable listSpam={listSpam} setTimeReRender={setTimeReRender}/>
          </Box>
        </Container>
      </Box>
    </>
  );
};

Page.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default Page;
