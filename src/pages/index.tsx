import Container from "@/components/Container";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import { CustomNextPage } from "@/types/next";

const HomePage: CustomNextPage = () => {
  return <Container>Hello world</Container>;
};

HomePage.getLayout = (page) => <DefaultLayout>{page}</DefaultLayout>;

export default HomePage;
