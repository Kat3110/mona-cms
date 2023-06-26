import Head from "next/head";
import { useState, useEffect } from "react";
import { Box, Container, Grid } from "@mui/material";
import { UserListTable } from "/src/components/users/user-list-table";
import { UsersListHeader } from "/src/components/users/user-list-header";
import { UserPlatformList } from "/src/components/users/user-platform-list";
import { UserQnaList } from "/src/components/users/user-qna-list";
// import { UserSelectDialog } '/src/components/users/user-select-dialog';
import { DashboardLayout } from "/src/components/dashboard-layout";
import { customers } from "/src/__mocks__/customers";
import { UserBasicInfo } from "../../components/users/user-basic-info";
import MemberService from "../../services/MemberService/MemberService";

const Page = () => {
  const [userBasicInfo, setUserBasicInfo] = useState({});
  const [listMember, setListMember] = useState([]);
  const [listInquiry, setListInquiry] = useState([]);
  const [timeReRender, setTimeReRender] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res1 = await MemberService.getAdminHomeLog({
          name: "",
          id: "",
          phone: "",
          tartDate: "",
          enDate: ""
        });
        const res2 = await MemberService.getInquiryHome();
        setListMember(res1?.data?.result ?? []);
        const inquiry = res2?.data?.result ?? [];
        const list = inquiry.map((item) => ({
          ...item,
          id: item.idx,
          urgency: "",
          feature: "",
          receptionCenter: ""
        }));
        setListInquiry(list);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [timeReRender]);

  const handleSearch = async (condition) => {
    try {
      const res = await MemberService.getAdminHomeLog(condition);
      setListMember(res?.data?.result ?? []);
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
          <UsersListHeader onSearch={handleSearch} />
          <Box sx={{ mt: 3 }}>
            <UserBasicInfo data={userBasicInfo} />
          </Box>
          <Box sx={{ mt: 3 }}>
            <UserListTable listMember={listMember} setData={setUserBasicInfo} />
          </Box>
          <Box sx={{ mt: 3 }}>
            <UserQnaList
              listInquiry={listInquiry}
              setTimeReRender={setTimeReRender}
            />
          </Box>
        </Container>
      </Box>
    </>
  );
};

Page.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default Page;
