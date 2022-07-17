import Container from "@/components/Container";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import PageHeader from "@/components/PageHeader/PageHeader";
import { tagList } from "@/data/tag-list";
import { CustomNextPage } from "@/types/next";
import { ITag } from "@/types/tag";
import { GetStaticPaths, GetStaticProps } from "next";
import React from "react";

type Props = {
  tag: ITag;
};

const TagDetailPage: CustomNextPage<Props> = ({ tag }) => {
  return (
    <>
      <PageHeader
        title={tag.name}
        desc={`#${tag.id}`}
        style={{
          backgroundColor: tag.bgColor,
          color: tag.fgColor,
        }}
      />
      <Container className="my-16">{tag.name}</Container>
    </>
  );
};

TagDetailPage.getLayout = (page) => <DefaultLayout>{page}</DefaultLayout>;

export default TagDetailPage;

export const getStaticPaths: GetStaticPaths = (context) => {
  const paths = tagList.map((tag) => `/tags/${tag.id}`);
  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps<Props> = ({ params }) => {
  const slug = params!["slug"];
  const tag = tagList.find((item) => item.id === slug)!;
  return {
    props: {
      tag,
    },
  };
};
