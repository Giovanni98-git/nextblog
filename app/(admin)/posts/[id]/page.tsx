import { getCategories } from "@/app/actions/categories";
import { getUniquePost } from "@/app/actions/posts";
import PostForm from "@/components/post-form";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";

export default async function PostPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const post = await getUniquePost(id);
  const categories = await getCategories();
  return (
    <>
      <div className="flex flex-col p-8 ">
        <div className="flex w-full justify-between">
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink href="/dashboard">Dashboard</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>Posts</BreadcrumbPage>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>
                  {id === "new" ? "New" : post?.title} {""}
                </BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
          <Button className="cursor-pointer">Create new post</Button>
        </div>
      </div>
      <div className="p-8 flex flex-col">
        <PostForm
          title={""}
          content={""}
          imageUrl={""}
          categoryId={""}
          tags={[]}
          categories={categories}
          status={""}
          slug={""}
        />
      </div>
    </>
  );
}
