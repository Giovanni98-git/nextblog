"use client";
import { Button } from "@/components/ui/button";
import {
  DialogHeader,
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "@/components/ui/dialog";
import { CategoryProps, useCategories } from "@/hooks/use-categories";
import { Copy, Edit, Trash } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

export default function CellAction({ id, name }: CategoryProps) {
  const { setCategory, setOpen } = useCategories();
  const [isLoading, setIsLoading] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const router = useRouter();

  const onCopy = () => {
    navigator.clipboard.writeText(id);
    toast.success(`Category ${name} copied to clipboard`);
  };

  const onRemoveCategory = async () => {
    try {
      setIsLoading(true);
    } catch (err: any) {
      throw new Error(`Something went wrong ${err?.message}`);
    } finally {
      router.refresh();
      toast.success(`Category ${name} deleted successfully`);
      setIsLoading(false);
      setIsDeleteModalOpen(false);
    }
  };
  return (
    <>
      <div className="flex justify-end gap-6">
        <div
          className="cursor-pointer"
          title="Copy category Id"
          onClick={onCopy}
        >
          <Copy />
        </div>

        <div
          className="cursor-pointer"
          title="Edit"
          onClick={() => {
            setOpen(true);
            setCategory({ id, name });
          }}
        >
          <Edit />
        </div>
        <div
          className="cursor-pointer"
          title="Delete"
          onClick={() => {
            setIsDeleteModalOpen(true);
          }}
        >
          <Trash className="text-red-500" />
        </div>
      </div>
      <Dialog open={isDeleteModalOpen} onOpenChange={setIsDeleteModalOpen}>
        <DialogContent
          className="sm:max-w-[425px] flex flex-col gap-6"
          aria-describedby="category"
          aria-description="delete category"
        >
          <DialogHeader>
            <DialogTitle>Delete Category</DialogTitle>

            <DialogDescription className="flex flex-col">
              <span className="text-md">
                Are you sure you want to delete {name}?{" "}
              </span>
              <span>This action cannot be undone </span>
            </DialogDescription>
          </DialogHeader>
          <Button
            variant="destructive"
            onClick={onRemoveCategory}
            disabled={isLoading}
            className="max-w-40 self-end cursor-pointer"
          >
            Delete
          </Button>
        </DialogContent>
      </Dialog>
    </>
  );
}
