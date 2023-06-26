import { DashboardLayout } from "/src/components/dashboard-layout";

const Page = () => {
  return <>task History</>;
};

Page.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default Page;
