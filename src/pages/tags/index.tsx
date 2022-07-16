import React from "react";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import { CustomNextPage } from "@/types/next";

const TagsPage: CustomNextPage = () => {
  return <div>TagsPage</div>;
};

TagsPage.getLayout = (page) => <DefaultLayout>{page}</DefaultLayout>;

export default TagsPage;
