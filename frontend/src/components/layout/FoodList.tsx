import { Button, Card } from "../ui";
import type { FoodData } from "@/types/food";

type FoodWithId = FoodData & {
  id: number;
};

interface FoodListProps {
  foods: FoodWithId[];
  onEdit: (food: FoodWithId) => void;
  onDelete: (id: number) => void;
}

function FoodList({
  foods,
  onEdit,
  onDelete,
}: FoodListProps) {
  if (foods.length === 0) {
    return (
      <Card className="mt-6 p-6 text-center">
        <h2 className="text-lg font-semibold">
          No foods found
        </h2>

        <p className="mt-2 text-sm text-muted-foreground">
          Create your first food item using the form above.
        </p>
      </Card>
    );
  }

  return (
    <div className="mt-8 space-y-4">
      <h2 className="text-xl font-semibold">
        Food Items
      </h2>

      {foods.map((food) => (
        <Card
          key={food.id}
          className="p-5"
        >
          {/* Header */}
          <div className="flex items-start justify-between">
            <div>
              <h3 className="text-lg font-semibold">
                {food.name}
              </h3>

              <p className="text-sm text-muted-foreground">
                ${food.price.toFixed(2)}
              </p>
            </div>

            <div className="flex gap-2">
              <Button
                variant="outline"
                onClick={() => onEdit(food)}
              >
                Edit
              </Button>

              <Button
                variant="destructive"
                onClick={() => onDelete(food.id)}
              >
                Delete
              </Button>
            </div>
          </div>

          {/* Description */}
          {food.description && (
            <p className="mt-4 text-sm">
              {food.description}
            </p>
          )}

          {/* Image */}
          {food.image && (
            <img
              src={food.image}
              alt={food.name}
              className="mt-4 h-40 w-full rounded-md object-cover"
            />
          )}

          {/* Footer */}
          <div className="mt-5 flex flex-wrap gap-2">
            <span className="rounded-md bg-slate-100 px-3 py-1 text-sm">
              Category ID: {food.categoryId}
            </span>

            <span
              className={`rounded-md px-3 py-1 text-sm ${
                food.available
                  ? "bg-green-100 text-green-700"
                  : "bg-red-100 text-red-700"
              }`}
            >
              {food.available
                ? "Available"
                : "Unavailable"}
            </span>

            {food.featured && (
              <span className="rounded-md bg-yellow-100 px-3 py-1 text-sm text-yellow-700">
                ⭐ Featured
              </span>
            )}
          </div>
        </Card>
      ))}
    </div>
  );
}

export default FoodList;