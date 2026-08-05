import { useEffect, useMemo, useState } from "react";
import toast from "react-hot-toast";

import {
  FoodsForm,
  FoodsLayout,
  FoodList,
  Button,
  Input,
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components";

import foodService from "@/services/food";
import categoryService from "@/services/category";

import type { FoodData } from "@/types/food";
import { TiPlus } from "react-icons/ti";
import { RiSubtractFill } from "react-icons/ri";
import type { CategoryWithFoods } from "@/types/menu";


type FoodWithId = FoodData & {
  id: number;
  category?: {
    name: string;
  };
};

interface CategoryWithFoodAndId extends CategoryWithFoods {
  id: number;
};

function FoodPage() {
  const [foods, setFoods] = useState<FoodWithId[]>([]);
  const [categories, setCategories] = useState<CategoryWithFoodAndId[]>([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");

  const [selectedFood, setSelectedFood] =
    useState<FoodWithId | null>(null);

  const [pageLoading, setPageLoading] = useState(true);

  const [submitLoading, setSubmitLoading] =
    useState(false);

  const fetchCategories = async () => {
    try {
      const response = await categoryService.getCategories();

      setCategories(response.category);
    } catch (error) {
      console.error(error);

      toast.error("Failed to load categories.");
    }
  };

  const fetchFoods = async () => {
    try {
      const response = await foodService.getFoods();

      setFoods(
        response.foods.map((food: FoodWithId) => ({
          ...food,
          price: Number(food.price),
        }))
      );
    } catch (error) {
      console.error(error);

      toast.error("Failed to load foods.");
    }
  };

  const filteredFoods = useMemo(() => {
    const query = search.toLowerCase();

    return foods.filter((food) => {
      const matchesCategory =
        selectedCategory === "all" || food.category?.name === selectedCategory;

      const matchesSearch = food.name.toLowerCase().includes(query);

      return matchesCategory && matchesSearch;
    });
  }, [foods, search, selectedCategory]);

  const handleSubmit = async (data: FormData) => {
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

  const handleAvailableToggle = async (id: number, available: boolean) => {
    try {
      await foodService.patchFoodAvailable(id, available);
      toast.success("Food availability updated successfully.");
      await fetchFoods();
    } catch (error) {
      console.error(error);
      toast.error("Failed to update food availability.");
    }
  };

  const handleFeaturedToggle = async (id: number, featured: boolean) => {
    try {
      await foodService.patchFoodFeatured(id, featured);
      toast.success("Food featured status updated successfully.");
      await fetchFoods();
    } catch (error) {
      console.error(error);
      toast.error("Failed to update food featured status.");
    }
  };

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

  const handleCancelEdit = () => {
    setSelectedFood(null);
  };

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

  if (pageLoading) {
    return (
      <FoodsLayout
        title="Menu items"
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

  return (
    <FoodsLayout
      title="Menu Items"
      subtitle="Manage your restaurant's food items"
    >
        {/* Search and Category Selector */}
        <div className="flex gap-4 items-center flex-row justify-between mx-5">
            {/* Search Bar */}
            <Input type="text" placeholder="Search for food..." value={search} onChange={(e) => setSearch(e.target.value)} />
            {/* Category Selector */}
            <Select
                value={selectedCategory}
                onValueChange={setSelectedCategory}
            >
                <SelectTrigger className="w-full max-w-48">
                    <SelectValue placeholder="All Categories" />
                </SelectTrigger>

                <SelectContent>
                    <SelectGroup>
                        <SelectLabel>Categories</SelectLabel>

                        <SelectItem value="all">
                            All Categories
                        </SelectItem>

                        {categories.map(category => (
                            <SelectItem
                                key={category.name}
                                value={category.name}
                            >
                                {category.name}
                            </SelectItem>
                        ))}
                    </SelectGroup>
                </SelectContent>
            </Select>
        </div>
              
      <div className="mt-8 space-y-3 m-3 md:m-5">
        <Button className="flex items-center justify-start mb-3 md:mb-5 cursor-pointer" onClick={() => setModalOpen(!modalOpen)}>
          { modalOpen ? (
          <div className="flex items-center cursor-pointer">
            <RiSubtractFill/>
            <span className="ml-2">Close Form</span>
          </div>)
           : (
            <div className="flex items-center cursor-pointer">
              <TiPlus className="mr-2" />
              <span className="ml-2">Add Item</span>
            </div>
          )}
        </Button>

      { modalOpen && (
        <div>
          {/* Food Form */}
          <FoodsForm
            food={selectedFood}
            categories={categories}
            loading={submitLoading}
            isEditing={!!selectedFood}
            onSubmit={handleSubmit}/>
        </div>
      )}

        {/* Food List */}
        <FoodList
          foods={filteredFoods}
          onEdit={(food) => {
            setSelectedFood(food);
            setModalOpen(true);
          }}
          onDelete={handleDelete}
          onAvailableToggle={handleAvailableToggle}
          onFeaturedToggle={handleFeaturedToggle}
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
      </div>
    </FoodsLayout>
  );
}

export default FoodPage;