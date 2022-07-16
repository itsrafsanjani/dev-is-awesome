import DefaultLayout from "@/components/Layouts/DefaultLayout";
import { CustomNextPage } from "@/types/next";

const HomePage: CustomNextPage = () => {
  return (
    <div>
      {new Array(100).fill("1").map((_, index) => (
        <p key={index}>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Adipisci
          numquam perspiciatis possimus quisquam praesentium fugiat, vitae
          suscipit necessitatibus aliquam quia?
        </p>
      ))}
    </div>
  );
};

HomePage.getLayout = (page) => <DefaultLayout>{page}</DefaultLayout>;

export default HomePage;
