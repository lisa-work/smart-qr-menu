import { Card, Button, Toggle } from "@/components/ui";
import type { FoodListProps } from "./FoodList";
import { MdOutlineEdit, MdDeleteOutline} from "react-icons/md";
import { CiStar } from "react-icons/ci";
import { getBackendAssetUrl } from "@/lib/utils";
import { FaT, FaToggleOff } from "react-icons/fa6";
import { FaToggleOn } from "react-icons/fa";

function FoodCardLayout({ foods, onEdit, onDelete }: FoodListProps) {
  return (
    <div className="">
      {foods.map((food) => {
        const {
          id,
          name,
          price,
          description,
          image,
          categoryId,
          available,
          featured,
        } = food;

        return (
          <Card key={id} className="p-3">
            {/* Image */}
            {image && (
              <img
                src={getBackendAssetUrl(image)}
                alt={name}
                className="mt-4 h-[50%] md:h-[70%] md:w-full rounded-md object-cover"
              />
            )}

            {/* Header */}
            <div className="">
              <div className="flex flex-row justify-between items-center overflow-hidden h-7">
                <h3 className="text-lg font-semibold">{name}</h3>

                <p className="text-sm text-muted-foreground">
                  ${Number(price).toFixed(2)}
                </p>
              </div>

              {/* Description */}
              {description && <p className="mt-4 text-sm wrap-break-word text-left border-b pb-2 h-12 overflow-hidden">{description}</p>}

            <div className="flex flex-row items-center gap-2 justify-between">

              {/* Available Toggle */}
              <div className="flex flex-row items-center gap-1">
                <button>
                  <FaToggleOff size={40} />
                </button>
                <span className="text-xs">Available</span>
              </div>

              <div className="flex flex-row items-center gap-1">
                {/* Featured Button */}
                  <Button>
                      <CiStar />
                  </Button>

                {/* Edit Button */}
                  <Button variant="outline" onClick={() => onEdit?.(food)}>
                    <MdOutlineEdit />
                  </Button>

                {/* Delete Button */}
                  <Button variant="destructive" onClick={() => onDelete(id)}>
                    <MdDeleteOutline />
                  </Button>
                </div>
              </div>
            </div>
          </Card>
        );
      })}
    </div>
  );
}

export default FoodCardLayout