import { Card, Button } from "@/components/ui";
import type { FoodListProps } from "./FoodList";
import { MdOutlineEdit, MdDeleteOutline} from "react-icons/md";
import { FaRegStar } from "react-icons/fa";
import { getBackendAssetUrl } from "@/lib/utils";
import { PiToggleLeftLight } from "react-icons/pi";
import { PiToggleRightFill } from "react-icons/pi";
import { FaStar } from "react-icons/fa";

function FoodCardLayout({ foods, onEdit, onDelete, onAvailableToggle, onFeaturedToggle }: FoodListProps) {
  return (
    <div className="">
      {foods.map((food) => {
        const {
          id,
          name,
          price,
          description,
          image,
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
                className="mt-4 h-70 w-[100%] rounded-md object-cover"
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
                <button className="cursor-pointer" onClick={() => onAvailableToggle?.(id, !available)}>
                  { available ? (
                    <PiToggleRightFill size={40} />
                  ) : (
                  <PiToggleLeftLight size={40} />)}
                </button>
                <span className="text-xs">Available</span>
              </div>

              <div className="flex flex-row items-center gap-1">
                {/* Featured Button */}
                  <button className="cursor-pointer" onClick={() => onFeaturedToggle?.(id, !featured)}>
                    { featured ? (
                      <FaStar size={20} color="#FEC700"/>
                    ) : (
                      <FaRegStar size={20} color="#000000"/>
                    )}
                  </button>

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