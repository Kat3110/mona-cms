import { Box, Container } from "@mui/material";
import { AdminAclTable } from "/src/components/admin/admin-acl-table";
import { AdminAclHeader } from "/src/components/admin/admin-acl-header";
import { DashboardLayout } from "/src/components/dashboard-layout";
import { customers } from "/src/__mocks__/customers";
import { useState } from "react";
import { useEffect } from "react";
import AdminService from "../../services/AdminService/AdminService";

const Page = () => {
  const [selectedOption, setSelectedOption] = useState("Super Administrator");
  const [listAccessMenu, setListAccessMenu] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await AdminService.getAccessMenuList(selectedOption);
        setListAccessMenu(res?.data?.result ?? []);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  const handleOnSearch = async () => {
    try {
      const res = await AdminService.getAccessMenuList(selectedOption);
      setListAccessMenu(res?.data?.result ?? []);
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
          <AdminAclHeader
            selectedOption={selectedOption}
            setSelectedOption={setSelectedOption}
            onSearch={handleOnSearch}
          />
          <Box sx={{ mt: 3 }}>
            <AdminAclTable
              listAccessMenu={listAccessMenu}
              selectedOption={selectedOption}
            />
          </Box>
        </Container>
      </Box>
    </>
  );
};

Page.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default Page;
