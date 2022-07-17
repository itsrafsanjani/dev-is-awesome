import React from "react";
import { createSSGHelpers } from "@trpc/react/ssg";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import { CustomNextPage } from "@/types/next";
import Container from "@/components/Container";
import { GetStaticProps } from "next";
import TagItem from "@/components/Tag/Tag";
import PageHeader from "@/components/PageHeader/PageHeader";
import { transformer, trpc } from "@/utils/trpc";
import { appRouter } from "@/server/routes/app";
import { createContext } from "@/server/trpc";

type Props = {};

const TagsPage: CustomNextPage<Props> = () => {
  const tagsQuery = trpc.useQuery(["tags.all"]);
  return (
    <>
      <PageHeader
        title="All Tags"
        desc="Explore all of this site's content by tags."
      />
      <Container className="my-16 max-w-4xl">
        <div className="flex flex-row flex-wrap gap-3">
          {tagsQuery.data?.map((tag) => (
            <TagItem key={tag.tag} tag={tag} />
          ))}
        </div>
      </Container>
    </>
  );
};

TagsPage.getLayout = (page) => <DefaultLayout>{page}</DefaultLayout>;

export default TagsPage;

export const getStaticProps: GetStaticProps<Props> = async () => {
  const ssg = createSSGHelpers({
    router: appRouter,
    transformer,
    ctx: await createContext(),
  });

  await ssg.fetchQuery("tags.all");

  return {
    props: {
      trpcState: ssg.dehydrate(),
    },
  };
};
