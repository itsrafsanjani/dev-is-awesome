import React from "react";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import { CustomNextPage } from "@/types/next";

const NewsletterPage: CustomNextPage = () => {
  return <div>NewsletterPage</div>;
};

NewsletterPage.getLayout = (page) => <DefaultLayout>{page}</DefaultLayout>;

export default NewsletterPage;
