import React from "react";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import { CustomNextPage } from "@/types/next";

const CoursesPage: CustomNextPage = () => {
  return <div>CoursesPage</div>;
};

CoursesPage.getLayout = (page) => <DefaultLayout>{page}</DefaultLayout>;

export default CoursesPage;
