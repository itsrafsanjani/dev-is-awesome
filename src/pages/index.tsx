import Container from "@/components/Container";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import { CustomNextPage } from "@/types/next";

const HomePage: CustomNextPage = () => {
  return <Container className="my-16">Hello world</Container>;
};

HomePage.getLayout = (page) => <DefaultLayout>{page}</DefaultLayout>;

export default HomePage;
