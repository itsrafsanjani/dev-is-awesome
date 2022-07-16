import React from "react";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import { CustomNextPage } from "@/types/next";

const TutorialPage: CustomNextPage = () => {
  return <div>TutorialPage</div>;
};

TutorialPage.getLayout = (page) => <DefaultLayout>{page}</DefaultLayout>;

export default TutorialPage;
