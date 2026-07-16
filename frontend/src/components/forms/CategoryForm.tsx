import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { categoryValidation } from "@/schema/category";
import type { CategoryData } from "@/types/category";
import { CategoryFields } from "@/types/category";

import { Button, Input, Label, Textarea } from "../ui";

type CategoryFormProps = {
  category: CategoryData | null;
  loading: boolean;
  isEditing: boolean;

  // Called whenever the form is submitted
  onSubmit: (data: CategoryData) => Promise<void>;
};

function CategoryForm({
  category,
  loading,
  isEditing,
  onSubmit,
}: CategoryFormProps) {
  /**
   * React Hook Form
   *
   * Manages:
   * - form state
   * - validation
   * - errors
   * - submission
   */
  const {
    register,
    handleSubmit,
    reset,
    formState: {
      errors,
      isSubmitting,
      isDirty,
    },
  } = useForm<CategoryData>({
    resolver: zodResolver(categoryValidation),

    defaultValues: {
      name: "",
      description: "",
    },
  });

  /**
   * Whenever the selected category changes:
   *
   * Edit
   * ↓
   * Fill form
   *
   * Create
   * ↓
   * Empty form
   */
  useEffect(() => {
    if (category) {
      reset(category);
    } else {
      reset({
        name: "",
        description: "",
      });
    }
  }, [category, reset]);

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-4"
    >
      {CategoryFields.map((field) => (
        <div key={field.id}>
          <Label>
            {field.label}
          </Label>

          {field.type === "textarea" ? (
            <>
              <Textarea
                {...register(field.id as keyof CategoryData)}
                placeholder={field.placeholder}
              />

              <p className="text-red-500 text-sm">
                {errors[field.id as keyof CategoryData]?.message}
              </p>
            </>
          ) : (
            <>
              <Input
                {...register(field.id as keyof CategoryData)}
                type={field.type}
                placeholder={field.placeholder}
              />

              <p className="text-red-500 text-sm">
                {errors[field.id as keyof CategoryData]?.message}
              </p>
            </>
          )}
        </div>
      ))}

      <Button
        type="submit"
        disabled={
          loading ||
          isSubmitting ||
          !isDirty
        }
        className="w-full"
      >
        {loading || isSubmitting
          ? "Saving..."
          : isEditing
          ? "Save Changes"
          : "Create Category"}
      </Button>
    </form>
  );
}

export default CategoryForm;