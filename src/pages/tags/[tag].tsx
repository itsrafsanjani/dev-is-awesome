import React from "react";
import Container from "@/components/Container";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import { CustomNextPage } from "@/types/next";
import { GetStaticPaths, GetStaticProps } from "next";

type Props = {
  id: string;
};

const TagDetailPage: CustomNextPage<Props> = ({ id }) => {
  return (
    <>
      {/* <PageHeader
        title={tagQuery.data?.name || tagQuery.data?.tag || "Unknown"}
        desc={tagQuery.data?.desc || `#${tagQuery.data?.tag}`}
        style={{
          backgroundColor: tagQuery.data?.bgColor || undefined,
          color: tagQuery.data?.fgColor || undefined,
        }}
      /> */}
      <Container className="my-16">{id}</Container>
    </>
  );
};

TagDetailPage.getLayout = (page) => <DefaultLayout>{page}</DefaultLayout>;

export default TagDetailPage;

export const getStaticPaths: GetStaticPaths = async () => {
  const paths: string[] = [];
  return {
    paths,
    fallback: "blocking",
  };
};

export const getStaticProps: GetStaticProps<Props> = async ({ params }) => {
  const id = params!["tag"] as string;

  return {
    props: {
      id,
    },
  };
};
