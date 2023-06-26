import { DashboardLayout } from "/src/components/dashboard-layout";

const Page = () => {
  return <>management Menu</>;
};

Page.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default Page;
