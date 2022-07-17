import Container from "@/components/Container";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import PageHeader from "@/components/PageHeader/PageHeader";
import { CustomNextPage } from "@/types/next";
import React from "react";

const BlogListPage: CustomNextPage = () => {
  return (
    <>
      <PageHeader title="All Blogs" />
      <Container className="my-16">Blog List Page</Container>
    </>
  );
};

BlogListPage.getLayout = (page) => <DefaultLayout>{page}</DefaultLayout>;

export default BlogListPage;
