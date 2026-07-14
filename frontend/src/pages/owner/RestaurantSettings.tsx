import { SettingsForm, SettingsLayout } from "@/components"
import { useEffect, useState } from "react";
import type { RestaurantData } from "@/types/restaurant";
import restaurantService from "@/services/restaurant";
import { toast } from "react-hot-toast";

function RestaurantSettingsPage() {
  const [restaurant, setRestaurant] = useState<RestaurantData | null>(null);
  const [loading, setLoading] = useState(true);
  const {getRestaurant} = restaurantService;

  const fetchRestaurant = async () => {
    setLoading(true);
    try {
      const response = await getRestaurant();
      setRestaurant(response.restaurant);
    } catch (error) {
      console.error("Failed to fetch restaurant data.", error);
      toast.error("Failed to fetch restaurant data. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  const handleSubmit = async (data: Partial<RestaurantData> & { name?: string }) => {
    const payload: RestaurantData = {
      ...(restaurant ?? {}),
      ...data,
      name: data.name ?? restaurant?.name ?? "",
    } as RestaurantData;

    if (restaurant) {
      try {
        await restaurantService.updateRestaurant(payload);
        toast.success("Restaurant settings updated successfully.");
      } catch (error) {
        console.error("Failed to update restaurant settings.", error);
        toast.error("Failed to update restaurant settings. Please try again.");
      }
    } else {
      try {
        await restaurantService.createRestaurant(payload);
        toast.success("Restaurant created successfully.");
      } catch (error) {
        console.error("Failed to create restaurant.", error);
        toast.error("Failed to create restaurant. Please try again.");
      }
    } 
    await fetchRestaurant(); // Refresh the restaurant data after update
  }

  useEffect(() => {
    fetchRestaurant();
  }, []);

  return (
    <div>
        <SettingsLayout title="Restaurant Settings" subtitle="Configure your restaurant profile">
            <SettingsForm restaurant={restaurant} loading={loading} onSubmit={handleSubmit} />
        </SettingsLayout>
    </div>
  )
}

export default RestaurantSettingsPage