import {useParams} from "react-router-dom";
import {useEffect, useMemo, useState} from "react";
import type { Menu } from "@/types/menu";
import { getMenu } from "@/services/menu";
import { 
  Input,
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
  MenuCard
} from "@/components/ui"

function CustomerMenuPage() {
  const { slug } = useParams();

    const [menu, setMenu] = useState<Menu | null>(null);
    const [search, setSearch] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("all");

    const filteredCategories = useMemo(() => {
        const categories = menu?.categories ?? [];

        return categories
            .filter(category => selectedCategory === "all" || category.name === selectedCategory)
            .map(category => ({
                ...category,
                foods: (category.foods ?? []).filter(food =>
                    food.name
                        .toLowerCase()
                        .includes(search.toLowerCase())
                ),
            }))
            .filter(category => category.foods.length > 0);
    }, [menu, search, selectedCategory]);
    

    useEffect(() => {
        if (!slug) return;

        const fetchMenu = async () => {
            try {
                const data = await getMenu(slug);
                setMenu(data as Menu);
                console.log("Fetched menu:", data);
            } catch (error) {
                console.error("Failed to fetch menu:", error);
            }
        };

        fetchMenu();
    }, [slug]);

    if (!menu) {
        return <div>Loading...</div>
    }

    const categories = menu.categories ?? [];

  return (
    <div className="m-1 md:m-8 lg:m-10">
        <h1>{menu.restaurant.name ?? "Menu"}</h1>
        <p className="text-sm">{menu.restaurant.description && menu.restaurant.description}</p>

        <div className="flex flex-row gap-5 items-center justify-center">
            <p className="text-xs">{menu.restaurant.address && menu.restaurant.address}</p>
            <p className="text-xs">{menu.restaurant.phone && menu.restaurant.phone}</p>
            <p className="text-xs">{menu.restaurant.email && menu.restaurant.email}</p>
            <p className="text-xs">{menu.restaurant.website && menu.restaurant.website}</p>
            <p className="text-xs">{menu.restaurant.openingHours && menu.restaurant.openingHours}</p>
        </div>

        {/* Search and Category Selector */}
        <div className="flex gap-4 items-center flex-row justify-between">
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

        {/* Menu Items */}
        {filteredCategories.map(category => (
            <div key={category.name} className="">

                {category.foods.map(food => (
                    <MenuCard key={`${category.name}-${food.name}`} name={food.name} description={food.description} price={food.price} 
                    image={food.image} available={food.available} featured={food.featured}
                    />
                ))}
            </div>
        ))}
    </div>
  )
}

export default CustomerMenuPage