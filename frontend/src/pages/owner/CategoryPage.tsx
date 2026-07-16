import { useEffect, useState } from "react";
import toast from "react-hot-toast";

import {
  CategoryForm,
  CategoryLayout,
} from "@/components";

import { Button } from "@/components/ui";

import categoryService from "@/services/category";

import type { CategoryData } from "@/types/category";

type CategoryWithId = CategoryData & {
  id: number;
};

function CategoryPage() {
  /**
   * Stores every category
   */
  const [categories, setCategories] = useState<CategoryWithId[]>([]);

  /**
   * Category currently being edited.
   *
   * null
   * ↓
   * Create mode
   *
   * Category
   * ↓
   * Edit mode
   */
  const [selectedCategory, setSelectedCategory] =
    useState<CategoryWithId | null>(null);

  /**
   * Used while fetching data.
   */
  const [loading, setLoading] = useState(false);

  /**
   * Loads every category belonging
   * to the authenticated restaurant.
   */
  const fetchCategories = async () => {
    setLoading(true);

    try {
      const response =
        await categoryService.getCategories();

      setCategories(response.categories);
    } catch (error) {
      console.error(error);

      toast.error(
        "Failed to load categories."
      );
    } finally {
      setLoading(false);
    }
  };

  /**
   * Handles both:
   *
   * Create
   *
   * and
   *
   * Update
   */
  const handleSubmit = async (
    data: CategoryData
  ) => {
    try {
      if (selectedCategory) {
        await categoryService.updateCategory(
          selectedCategory.id,
          data
        );

        toast.success(
          "Category updated successfully."
        );
      } else {
        await categoryService.createCategory(
          data
        );

        toast.success(
          "Category created successfully."
        );
      }

      /**
       * Refresh list
       */
      await fetchCategories();

      /**
       * Switch back
       * to Create mode.
       */
      setSelectedCategory(null);

    } catch (error) {
      console.error(error);

      toast.error(
        "Failed to save category."
      );
    }
  };

  /**
   * Deletes a category.
   */
  const handleDelete = async (
    id: number
  ) => {
    try {
      await categoryService.deleteCategory(id);

      toast.success(
        "Category deleted."
      );

      await fetchCategories();

      /**
       * If we're deleting
       * the category currently
       * being edited,
       * reset the form.
       */
      if (selectedCategory?.id === id) {
        setSelectedCategory(null);
      }

    } catch (error) {
      console.error(error);

      toast.error(
        "Failed to delete category."
      );
    }
  };

  /**
   * Initial page load.
   */
  useEffect(() => {
    fetchCategories();
  }, []);

  return (
    <CategoryLayout
      title="Categories"
      subtitle="Manage your restaurant categories."
    >
      <CategoryForm
        category={selectedCategory}
        loading={loading}
        isEditing={!!selectedCategory}
        onSubmit={handleSubmit}
      />

      <div className="mt-8 space-y-3">
        {categories.map((category) => (
          <div
            key={category.id}
            className="flex items-center justify-between rounded-md border p-3"
          >
            <div>
              <p className="font-medium">
                {category.name}
              </p>

              {category.description && (
                <p className="text-sm text-muted-foreground">
                  {category.description}
                </p>
              )}
            </div>

            <div className="space-x-2">
              <Button
                variant="outline"
                onClick={() =>
                  setSelectedCategory(category)
                }
              >
                Edit
              </Button>

              <Button
                variant="destructive"
                onClick={() =>
                  handleDelete(category.id)
                }
              >
                Delete
              </Button>
            </div>
          </div>
        ))}
      </div>
    </CategoryLayout>
  );
}

export default CategoryPage;