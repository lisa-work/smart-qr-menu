import type {RestaurantData} from "./restaurant";
import type {CategoryData} from "./category";
import type {FoodData} from "./food";

export interface CategoryWithFoods extends CategoryData {
    foods: FoodData[];
}

export interface Menu {
    restaurant: RestaurantData;
    categories: CategoryWithFoods[];
}