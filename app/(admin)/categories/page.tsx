import { DataTable } from "@/components/data-table";
import CategoriesClient from "./client/categories-client";
import { getCategories } from "@/app/actions/categories";

export default async function CategoriesPage() {
  const data = await getCategories();
  return (
    <div>
      <CategoriesClient categories={data} />
    </div>
  );
}
