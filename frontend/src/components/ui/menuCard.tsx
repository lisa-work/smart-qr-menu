import type { FoodData } from "@/types/food";
import { Separator } from "./";
import { getBackendAssetUrl } from "@/lib/utils";

type MenuCardProps = Omit<FoodData, "categoryId">;

function MenuCard({name, description, price, image}: MenuCardProps) {
  return (
    <div className="mx-10 my-3">
        <div className="rounded-lg p-4">
            {/* <div>
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
                <img src={getBackendAssetUrl(image)} alt={name} className="mb-4 h-50 w-50 rounded-md object-cover" />
            </div> */}
            <div className="flex flex-row items-start gap-2">
                <img src={getBackendAssetUrl(image)} alt={name} className="mb-4 h-30 w-30 rounded-md object-cover" />
                <div className="flex flex-row items-start justify-between gap-4 w-full">
                    <div className="flex flex-col justify-start items-start">
                        <h2 className="text-lg font-semibold">{name}</h2>
                        <p className="text-left text-xs md:text-sm">{description}</p>
                    </div>
                    <p className="font-bold">{price}</p>
                </div>
            </div>
            <Separator />
        </div>
    </div>
  )
}

export default MenuCard;