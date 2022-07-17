-- DropForeignKey
ALTER TABLE "TagToPost" DROP CONSTRAINT "TagToPost_postId_fkey";

-- DropForeignKey
ALTER TABLE "TagToPost" DROP CONSTRAINT "TagToPost_tagId_fkey";

-- AddForeignKey
ALTER TABLE "TagToPost" ADD CONSTRAINT "TagToPost_tagId_fkey" FOREIGN KEY ("tagId") REFERENCES "tags"("tag") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TagToPost" ADD CONSTRAINT "TagToPost_postId_fkey" FOREIGN KEY ("postId") REFERENCES "posts"("id") ON DELETE CASCADE ON UPDATE CASCADE;
