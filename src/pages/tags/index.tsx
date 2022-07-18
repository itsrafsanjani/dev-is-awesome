import React from "react";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import { CustomNextPage } from "@/types/next";
import Container from "@/components/Container";
import { GetStaticProps } from "next";
import PageHeader from "@/components/PageHeader/PageHeader";

type Props = {};

const TagsPage: CustomNextPage<Props> = () => {
  return (
    <>
      <PageHeader
        title="All Tags"
        desc="Explore all of this site's content by tags."
      />
      <Container className="my-16 max-w-4xl">
        {/* <div className="flex flex-row flex-wrap gap-3">
          {[].map((tag) => (
            <TagItem key={tag.tag} tag={tag} />
          ))}
        </div> */}
      </Container>
    </>
  );
};

TagsPage.getLayout = (page) => <DefaultLayout>{page}</DefaultLayout>;

export default TagsPage;

export const getStaticProps: GetStaticProps<Props> = async () => {
  return {
    props: {},
  };
};
