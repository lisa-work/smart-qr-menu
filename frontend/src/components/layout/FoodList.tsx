import { Card } from "../ui";
import type { FoodData } from "@/types/food";
import { FoodCardLayout } from "@/components";

export type FoodWithId = FoodData & {
  id: number;
};

export interface FoodListProps {
  foods: FoodWithId[];
  onEdit: (food: FoodWithId) => void;
  onDelete: (id: number) => void;
  onAvailableToggle?: (id: number, available: boolean) => void;
  onFeaturedToggle?: (id: number, featured: boolean) => void;
}

function FoodList({
  foods,
  onEdit,
  onDelete,
  onAvailableToggle,
  onFeaturedToggle
}: FoodListProps) {
  if (foods.length === 0) {
    return (
      <Card className="mt-6 p-6 text-center">
        <h2 className="text-lg font-semibold">
          No foods found
        </h2>

        <p className="mt-2 text-sm text-muted-foreground">
          Create your first food item using the Add Item button.
        </p>
      </Card>
    );
  }

  return (
    <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">

      {foods.map((food) => (
        <FoodCardLayout
          key={food.id}
          foods={[food]}
          onEdit={onEdit}
          onDelete={onDelete}
          onAvailableToggle={onAvailableToggle}
          onFeaturedToggle={onFeaturedToggle}
        />
      ))}
    </div>
  );
}

export default FoodList;