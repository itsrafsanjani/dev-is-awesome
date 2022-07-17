import React from "react";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import { CustomNextPage } from "@/types/next";
import Container from "@/components/Container";
import { tagList } from "@/data/tag-list";
import { GetStaticProps } from "next";
import { ITag } from "@/types/tag";
import Tag from "@/components/Tag/Tag";

type Props = {
  tags: ITag[];
};

const TagsPage: CustomNextPage<Props> = ({ tags }) => {
  return (
    <Container>
      <header className="py-16 text-center">
        <h1 className="text-3xl font-bold">All Tags</h1>
        <div className="flex flex-row flex-wrap gap-2 items-center justify-center mt-4">
          {tags.map((tag) => (
            <Tag key={tag.id} tag={tag} />
          ))}
        </div>
      </header>
    </Container>
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
