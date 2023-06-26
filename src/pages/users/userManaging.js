import { DashboardLayout } from "/src/components/dashboard-layout";

const Page = () => {
  return <>user Managing</>;
};

Page.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default Page;
