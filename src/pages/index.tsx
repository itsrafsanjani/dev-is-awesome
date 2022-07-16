import DefaultLayout from "@/components/Layouts/DefaultLayout";
import { CustomNextPage } from "@/types/next";

const Home: CustomNextPage = () => {
  return <div>Hello world</div>;
};

Home.getLayout = (page) => <DefaultLayout>{page}</DefaultLayout>;

export default Home;
