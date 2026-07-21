import type { FoodData } from "@/types/food";
import { Separator } from "./";

type MenuCardProps = Omit<FoodData, "categoryId">;

function MenuCard({name, description, price, image, available, featured}: MenuCardProps) {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        <div className="rounded-lg border border-gray-200 bg-white p-4 shadow-md">
            <div>
                {featured && (
                    <span className="mb-2 inline-block rounded-md bg-yellow-100 px-3 py-1 text-sm text-yellow-700">
                        ⭐ Featured
                    </span>
                )}
                {!available && (
                    <span className="mb-2 inline-block rounded-md bg-red-100 px-3 py-1 text-sm text-red-700">
                        Sold out
                    </span>
                )}
                <img src={image} alt={name} className="mb-4 h-40 w-full rounded-md object-cover" />
            </div>
            <div className="flex flex-row justify-between">
                <h1 className="text-lg font-semibold">{name}</h1>
                <p >{price}</p>
            </div>
            <p>{description}</p>
            <Separator />
        </div>
    </div>
  )
}

export default MenuCard;