import React from "react";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import { CustomNextPage } from "@/types/next";
import Container from "@/components/Container";
import PageHeader from "@/components/PageHeader/PageHeader";

const TutorialPage: CustomNextPage = () => {
  return (
    <>
      <PageHeader title="All Tutorials" />
      <Container className="my-16">Tutorials Page</Container>
    </>
  );
};

TutorialPage.getLayout = (page) => <DefaultLayout>{page}</DefaultLayout>;

export default TutorialPage;
