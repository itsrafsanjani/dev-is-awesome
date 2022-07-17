import Container from "@/components/Container";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
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
    <Container>
      <header className="my-16 text-center">
        <h1 className="text-3xl font-bold text-center">#{tag.name}</h1>
        {!!tag.desc && (
          <p className="mt-4 text-gray-600 dark:text-gray-300">{tag.desc}</p>
        )}
      </header>
    </Container>
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
