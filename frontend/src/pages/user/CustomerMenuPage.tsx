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
        if (!menu) return [];

        return menu.categories
            .map(category => ({
                ...category,
                foods: category.foods.filter(food =>
                    food.name
                        .toLowerCase()
                        .includes(search.toLowerCase())
                ),
            }))
            .filter(category => category.foods.length > 0);
    }, [menu, search]);
    

    useEffect(() => {
        if (!slug) return;

        const fetchMenu = async () => {
            try {
                const data = await getMenu(slug);
                setMenu(data);
            } catch (error) {
                console.error("Failed to fetch menu:", error);
            }
        };

        fetchMenu();
    }, [slug]);

    if (!menu) {
        return <div>Loading...</div>
    }

  return (
    <div>
        <h1>{menu.restaurant.name}</h1>

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

                        {menu.categories.map(category => (
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
            <div key={category.name}>

                {category.foods.map(food => (
                    <MenuCard name={food.name} description={food.description} price={food.price} 
                    image={food.image} available={food.available} featured={food.featured}
                    />
                ))}
            </div>
        ))}
    </div>
  )
}

export default CustomerMenuPage