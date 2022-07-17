import Bold from "@/components/Atoms/Bold";
import Link from "@/components/Atoms/Link";
import Text from "@/components/Atoms/Text";
import Container from "@/components/Container";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import { SITE_INFO } from "@/constants/site";
import { CustomNextPage } from "@/types/next";

const HomePage: CustomNextPage = () => {
  return (
    <header className="py-32 lg:py-48 text-center">
      <Container className="max-w-4xl">
        <h2 className="text-4xl md:text-5xl lg:text-6xl font-black dark:text-gray-200 text-gray-700 mb-8">
          Learn <span className="text-sky-500">Web</span> &{" "}
          <span className="text-purple-500">Mobile</span> <br />
          Development in <span className="text-pink-500">Modern Way</span>.
        </h2>
        <Text className="md:text-lg lg:text-xl">
          In <Bold>{SITE_INFO.domain}</Bold> you will find{" "}
          <Link href="/tutorials">Tutorials</Link> and{" "}
          <Link href="/courses">Courses</Link> which will help you learn and
          build <Bold>Web</Bold> & <Bold>Mobile</Bold> apps in the most{" "}
          <Bold>Fun</Bold> & <Bold>Modern</Bold> way possible. BTW{" "}
          <Bold>everything is for free!</Bold>
        </Text>
      </Container>
    </header>
  );
};

HomePage.getLayout = (page) => <DefaultLayout>{page}</DefaultLayout>;

export default HomePage;
