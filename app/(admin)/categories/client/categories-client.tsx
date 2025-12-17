"use client";
import { DataTable } from "@/components/data-table";
import { columns } from "./columns";
import { Category } from "@/lib/generated/prisma";
import z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useCategories } from "@/hooks/use-categories";
import { useRouter } from "next/navigation";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { createCategory } from "@/app/actions/categories";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

const formSchema = z.object({
  name: z.string().min(3, { message: "Name is required" }),
});

type CategoryFormValues = z.infer<typeof formSchema>;
export default function CategoriesClient({
  categories,
}: {
  categories: Category[];
}) {
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
    },
    mode: "onBlur",
  });
  const { open, setOpen, category, setCategory } = useCategories();
  const router = useRouter();

  const onSubmit = async (data: CategoryFormValues) => {
    try {
      if (category?.id) {
      } else {
        await createCategory(data.name);
        toast.success("New category created successfully");
        router.refresh();
        form.reset();
        setCategory({ id: "", name: "" });
        setOpen(false);
      }
    } catch (error: any) {
      toast.error(error?.message ?? "Something went wrong");
    }
  };
  return (
    <>
      <Dialog open={open} onOpenChange={setOpen}>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Edit Category</DialogTitle>
              </DialogHeader>
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                  </FormItem>
                )}
              />
              <Button type="submit" className="cursor-pointer">
                Save changes
              </Button>
            </DialogContent>
          </form>
        </Form>
      </Dialog>
      <div className="p-8 flex flex-col">
        <DataTable data={categories} columns={columns} />
      </div>

      <div className="flex flex-col p-8 ">
        <div className="flex w-full justify-between">
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink href="/dashboard">Dashboard</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>categories</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
          <Button className="cursor-pointer" onClick={() => setOpen(true)}>
            Create new category
          </Button>
        </div>
      </div>
    </>
  );
}
