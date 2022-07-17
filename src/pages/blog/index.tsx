import DefaultLayout from "@/components/Layouts/DefaultLayout";
import { CustomNextPage } from "@/types/next";
import React from "react";

const BlogListPage: CustomNextPage = () => {
  return <div>BlogListPage</div>;
};

BlogListPage.getLayout = (page) => <DefaultLayout>{page}</DefaultLayout>;

export default BlogListPage;
