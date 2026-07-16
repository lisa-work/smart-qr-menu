import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { updateRestaurantSchema } from '@/schema/restaurant';
import { Button, Input, Textarea, Label } from '../ui';
import { RestaurantSettings, type RestaurantData, type UpdatedRestaurantData } from '@/types/restaurant';

type RestaurantFormProps = {
    restaurant: RestaurantData | null;
    onSubmit: (data: UpdatedRestaurantData) => Promise<void>;
    loading: boolean;
}

function SettingsForm({ restaurant, loading, onSubmit }: RestaurantFormProps) {
    const {register, handleSubmit, formState: { errors, isSubmitting, isDirty }, reset} = useForm<UpdatedRestaurantData>({
        resolver: zodResolver(updateRestaurantSchema),
        defaultValues: {
            name: "",
            description: "",
            logo: "",
            email: "",
            phone: "",
            address: "",
            openingHours: "",
            website: ""
        }
    });

    useEffect(() => {
        if (restaurant) {
            reset(restaurant);
        }
    }, [restaurant, reset]);

  return (
    <div>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">

            {RestaurantSettings.map((setting) => (
                <div key={setting.id}>
                    <Label className="block text-sm font-medium text-gray-700">{setting.label}</Label>
                    {setting.type === "textarea" ? (
                        <div>
                            <Textarea
                                {...register(setting.id as keyof RestaurantData)}
                                placeholder={setting.placeholder}
                                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                            />
                            <p className="text-sm text-red-500">
                                {errors[setting.id as keyof RestaurantData]?.message}
                            </p>
                        </div>
                    ) : (
                        <div>
                            <Input
                                {...register(setting.id as keyof RestaurantData)}
                                type={setting.type}
                                placeholder={setting.placeholder}
                                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                            />
                            <p className="text-sm text-red-500">
                                {errors[setting.id as keyof RestaurantData]?.message}
                            </p>
                        </div>
                    )}
                </div>
            ))}

            <Button type="submit" disabled={loading || isSubmitting || !isDirty}>
                {loading || isSubmitting ? "Saving..." : "Save Changes"}
            </Button>

        </form>
    </div>
  )
}

export default SettingsForm
