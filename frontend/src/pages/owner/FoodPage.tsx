import { useEffect, useState } from "react";
import toast from "react-hot-toast";

import {
  FoodsForm,
  FoodsLayout,
  FoodList,
} from "@/components";

import foodService from "@/services/food";
import categoryService from "@/services/category";

import type { FoodData } from "@/types/food";
import type { CategoryData } from "@/types/category";

/* -------------------------------------------------------------------------- */
/*                                   Types                                    */
/* -------------------------------------------------------------------------- */

type FoodWithId = FoodData & {
  id: number;
};

type CategoryWithId = CategoryData & {
  id: number;
};

/* -------------------------------------------------------------------------- */
/*                                 Food Page                                  */
/* -------------------------------------------------------------------------- */

function FoodPage() {
  /* ------------------------------------------------------------------------ */
  /*                                   State                                  */
  /* ------------------------------------------------------------------------ */

  const [foods, setFoods] = useState<FoodWithId[]>([]);
  const [categories, setCategories] = useState<CategoryWithId[]>([]);

  const [selectedFood, setSelectedFood] =
    useState<FoodWithId | null>(null);

  const [pageLoading, setPageLoading] = useState(true);

  const [submitLoading, setSubmitLoading] =
    useState(false);

  /* ------------------------------------------------------------------------ */
  /*                              Fetch Categories                            */
  /* ------------------------------------------------------------------------ */

  const fetchCategories = async () => {
    try {
      const response = await categoryService.getCategories();

      setCategories(response.categories);
    } catch (error) {
      console.error(error);

      toast.error("Failed to load categories.");
    }
  };

  /* ------------------------------------------------------------------------ */
  /*                                Fetch Foods                               */
  /* ------------------------------------------------------------------------ */

  const fetchFoods = async () => {
    try {
      const response = await foodService.getFoods();

      setFoods(response.foods);
    } catch (error) {
      console.error(error);

      toast.error("Failed to load foods.");
    }
  };

  /* ------------------------------------------------------------------------ */
  /*                              Create / Update                             */
  /* ------------------------------------------------------------------------ */

  const handleSubmit = async (data: FoodData) => {
    setSubmitLoading(true);

    try {
      if (selectedFood) {
        await foodService.updateFoodById(
          selectedFood.id,
          data
        );

        toast.success("Food updated successfully.");
      } else {
        await foodService.createFood(data);

        toast.success("Food created successfully.");
      }

      await fetchFoods();

      setSelectedFood(null);
    } catch (error) {
      console.error(error);

      toast.error("Failed to save food.");
    } finally {
      setSubmitLoading(false);
    }
  };

  /* ------------------------------------------------------------------------ */
  /*                                Delete Food                               */
  /* ------------------------------------------------------------------------ */

  const handleDelete = async (id: number) => {
    try {
      await foodService.deleteFoodById(id);

      toast.success("Food deleted successfully.");

      await fetchFoods();

      if (selectedFood?.id === id) {
        setSelectedFood(null);
      }
    } catch (error) {
      console.error(error);

      toast.error("Failed to delete food.");
    }
  };

  /* ------------------------------------------------------------------------ */
  /*                               Cancel Editing                             */
  /* ------------------------------------------------------------------------ */

  const handleCancelEdit = () => {
    setSelectedFood(null);
  };

  /* ------------------------------------------------------------------------ */
  /*                               Initial Load                               */
  /* ------------------------------------------------------------------------ */

  useEffect(() => {
    const loadPage = async () => {
      setPageLoading(true);

      await Promise.all([
        fetchCategories(),
        fetchFoods(),
      ]);

      setPageLoading(false);
    };

    loadPage();
  }, []);

    /* ------------------------------------------------------------------------ */
  /*                              Loading State                               */
  /* ------------------------------------------------------------------------ */

  if (pageLoading) {
    return (
      <FoodsLayout
        title="Foods"
        subtitle="Manage your restaurant's food items"
      >
        <div className="py-8 text-center">
          <p className="text-muted-foreground">
            Loading foods...
          </p>
        </div>
      </FoodsLayout>
    );
  }

  /* ------------------------------------------------------------------------ */
  /*                                   JSX                                    */
  /* ------------------------------------------------------------------------ */

  return (
    <FoodsLayout
      title="Foods"
      subtitle="Manage your restaurant's food items"
    >
      {/* Food Form */}
      <FoodsForm
        food={selectedFood}
        categories={categories}
        loading={submitLoading}
        isEditing={!!selectedFood}
        onSubmit={handleSubmit}
      />

      {/* Cancel Editing */}
      {selectedFood && (
        <div className="mt-4 flex justify-end">
          <button
            type="button"
            onClick={handleCancelEdit}
            className="text-sm text-muted-foreground hover:underline"
          >
            Cancel Editing
          </button>
        </div>
      )}

      {/* Food List */}
      <FoodList
        foods={foods}
        onEdit={setSelectedFood}
        onDelete={handleDelete}
      />
    </FoodsLayout>
  );
}

export default FoodPage;