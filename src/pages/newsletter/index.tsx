import React from "react";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import { CustomNextPage } from "@/types/next";
import PageHeader from "@/components/PageHeader/PageHeader";
import Container from "@/components/Container";

const NewsletterPage: CustomNextPage = () => {
  return (
    <>
      <PageHeader title="Subscirbe to Newsletter" />
      <Container className="my-16">NewsletterPage</Container>
    </>
  );
};

NewsletterPage.getLayout = (page) => <DefaultLayout>{page}</DefaultLayout>;

export default NewsletterPage;
