import Head from "next/head";
import { Box, Container, Grid } from "@mui/material";
import { FreqnaListTable } from "/src/components/freqna/freqna-list-table";
import { FreqnaListHeader } from "/src/components/freqna/freqna-list-header";
// import { UserSelectDialog } '/src/components/users/user-select-dialog';
import { DashboardLayout } from "/src/components/dashboard-layout";
import { customers } from "/src/__mocks__/customers";
import { useState, useEffect } from "react";
import FqaService from "../../services/FqaService/FqaService";
import Excel from "exceljs";
import { FQA_CATEGORY } from "../../utils/constants";

const Page = () => {
  const [listFqa, setListFqa] = useState([]);
  const [timeReRender, setTimeReRender] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await FqaService.getFaqList();
        setListFqa(res?.data?.result ?? []);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [timeReRender]);

  const handleDownloadExcel = async () => {
    const fileName = "자주하는 질문 관리";
    const wb = new Excel.Workbook();

    // table 자주하는 질문 관리
    const ws = wb.addWorksheet("자주하는 질문 관리");
    const headers = ["NO", "구분", "질문"];
    const columnWs = ["A", "B", "C"];
    const columnWsWidth = [20, 20, 20];
    //columnWidth && header style, value cell //header
    columnWs.forEach((column, index) => {
      ws.getColumn(index + 1).width = columnWsWidth[index];
      ws.getCell(`${column}1`).style = {
        font: { bold: true },
        alignment: { vertical: "center", horizontal: "center" }
      };
      ws.getCell(`${column}1`).value = headers[index];
    });

    // add value, style cell // body
    listFqa.forEach((row, index) => {
      const category = row?.category
        ? FQA_CATEGORY.find((item) => item.name === row.category)
        : {};
      ws.getCell(`A${index + 2}`).value = row?.rownum ?? "";
      ws.getCell(`A${index + 2}`).style = {
        alignment: { vertical: "center", horizontal: "center" }
      };
      ws.getCell(`B${index + 2}`).value = category?.text ?? "";
      ws.getCell(`B${index + 2}`).style = {
        alignment: { vertical: "center", horizontal: "center" }
      };
      ws.getCell(`C${index + 2}`).value = row?.question ?? "";
      ws.getCell(`C${index + 2}`).style = {
        alignment: { vertical: "center", horizontal: "center" }
      };
    });

    const buffer = await wb.xlsx.writeBuffer();
    const url = window.URL.createObjectURL(new Blob([buffer]));
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", `${fileName}.xlsx`);
    document.body.appendChild(link);
    link.click();
    link.remove();
  };

  const handleSearch = async (condition) => {
    try {
      const res = await FqaService.getFaqList(condition);
      setListFqa(res?.data?.result ?? []);
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
          <FreqnaListHeader
            onSearch={handleSearch}
            onDownloadExcel={handleDownloadExcel}
          />
          <Box sx={{ mt: 3 }}>
            <FreqnaListTable
              listFqa={listFqa}
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
