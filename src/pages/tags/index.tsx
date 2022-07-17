import React from "react";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import { CustomNextPage } from "@/types/next";
import Container from "@/components/Container";
import { tagList } from "@/data/tag-list";
import { GetStaticProps } from "next";
import { ITag } from "@/types/tag";
import Tag from "@/components/Tag/Tag";
import PageHeader from "@/components/PageHeader/PageHeader";

type Props = {
  tags: ITag[];
};

const TagsPage: CustomNextPage<Props> = ({ tags }) => {
  return (
    <>
      <PageHeader
        title="All Tags"
        desc="Explore all of this site's content by tags."
      />
      <Container className="my-16 max-w-4xl">
        <div className="flex flex-row flex-wrap gap-2">
          {tags.map((tag) => (
            <Tag key={tag.id} tag={tag} />
          ))}
        </div>
      </Container>
    </>
  );
};

TagsPage.getLayout = (page) => <DefaultLayout>{page}</DefaultLayout>;

export default TagsPage;

export const getStaticProps: GetStaticProps<Props> = () => {
  const tags = tagList;
  return {
    props: {
      tags,
    },
  };
};
