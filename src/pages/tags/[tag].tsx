import React from "react";
import Container from "@/components/Container";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import { prisma } from "@/configs/prisma";
import { CustomNextPage } from "@/types/next";
import { transformer, trpc } from "@/utils/trpc";
import { GetStaticPaths, GetStaticProps } from "next";
import PageHeader from "@/components/PageHeader/PageHeader";
import { createSSGHelpers } from "@trpc/react/ssg";
import { createContext } from "@/server/trpc";
import { appRouter } from "@/server/routes/app";

type Props = {
  id: string;
};

const TagDetailPage: CustomNextPage<Props> = ({ id }) => {
  const tagQuery = trpc.useQuery(["tags.byId", { id }]);

  return (
    <>
      <PageHeader
        title={tagQuery.data?.name || tagQuery.data?.tag || "Unknown"}
        desc={tagQuery.data?.desc || `#${tagQuery.data?.tag}`}
        style={{
          backgroundColor: tagQuery.data?.bgColor || undefined,
          color: tagQuery.data?.fgColor || undefined,
        }}
      />
      <Container className="my-16">{id}</Container>
    </>
  );
};

TagDetailPage.getLayout = (page) => <DefaultLayout>{page}</DefaultLayout>;

export default TagDetailPage;

export const getStaticPaths: GetStaticPaths = async () => {
  const tags = await prisma.tag.findMany({
    select: {
      tag: true,
    },
  });
  const paths = tags.map((item) => `/tags/${item.tag}`) || [];
  return {
    paths,
    fallback: "blocking",
  };
};

export const getStaticProps: GetStaticProps<Props> = async ({ params }) => {
  const id = params!["tag"] as string;
  const ssg = createSSGHelpers({
    router: appRouter,
    ctx: await createContext(),
    transformer,
  });

  await ssg.fetchQuery("tags.byId", { id });
  return {
    props: {
      trpcState: ssg.dehydrate(),
      id,
    },
  };
};
