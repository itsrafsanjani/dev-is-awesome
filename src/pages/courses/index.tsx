import React from "react";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import { CustomNextPage } from "@/types/next";
import PageHeader from "@/components/PageHeader/PageHeader";
import Container from "@/components/Container";

const CoursesPage: CustomNextPage = () => {
  return (
    <>
      <PageHeader title="All Courses" />
      <Container className="my-16">Courses Page</Container>
    </>
  );
};

CoursesPage.getLayout = (page) => <DefaultLayout>{page}</DefaultLayout>;

export default CoursesPage;
