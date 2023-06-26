import { DashboardLayout } from "/src/components/dashboard-layout";

const Page = () => {
  return <>content Statistic</>;
};

Page.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default Page;
