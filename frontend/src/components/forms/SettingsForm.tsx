import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { updateRestaurantSchema } from '@/schema/restaurant';
import { Button, Input, Textarea, Label } from '../ui';
import { RestaurantSettings, type RestaurantData } from '@/types/restaurant';
import { FaUpload } from "react-icons/fa6";

type RestaurantFormValues = {
    name: string;
    description?: string;
    email?: string;
    phone?: string;
    address?: string;
    openingHours?: string;
    website?: string;
}

type RestaurantFormProps = {
    restaurant: RestaurantData | null;
    onSubmit: (data: FormData) => Promise<void>;
    loading: boolean;
}

function SettingsForm({ restaurant, loading, onSubmit }: RestaurantFormProps) {
    const [choosenFile, setChoosenFile] = useState<File | null>(null);
    const {register, handleSubmit, formState: { errors, isSubmitting, isDirty }, reset} = useForm<RestaurantFormValues>({
        resolver: zodResolver(updateRestaurantSchema) as any,
        defaultValues: {
            name: "",
            description: "",
            email: "",
            phone: "",
            address: "",
            openingHours: "",
            website: ""
        }
    });

    useEffect(() => {
        if (restaurant) {
            reset({
                name: restaurant.name ?? "",
                description: restaurant.description ?? "",
                email: restaurant.email ?? "",
                phone: restaurant.phone ?? "",
                address: restaurant.address ?? "",
                openingHours: restaurant.openingHours ?? "",
                website: restaurant.website ?? "",
            });
            setChoosenFile(null);
        }
    }, [restaurant, reset]);

    const submitForm = async (values: RestaurantFormValues) => {
        const formData = new FormData();

        if (values.name) formData.append("name", values.name);
        if (values.description) formData.append("description", values.description);
        if (values.email) formData.append("email", values.email);
        if (values.phone) formData.append("phone", values.phone);
        if (values.address) formData.append("address", values.address);
        if (values.openingHours) formData.append("openingHours", values.openingHours);
        if (values.website) formData.append("website", values.website);

        if (choosenFile) {
            formData.append("logo", choosenFile);
        }

        await onSubmit(formData);
    };

  return (
    <div className="m-5">
        <form onSubmit={handleSubmit(submitForm)} className="space-y-4">

            {RestaurantSettings.map((setting) => (
                <div key={setting.id} className="space-y-2 md:space-y-3">
                    { setting.type === "file" ? (
                        <div>
                            <Label className="flex flex-col items-start justify-center text-sm font-medium text-gray-700 text-left cursor-pointer">
                                {setting.label}
                                <FaUpload className="inline mr-2 border p-3 rounded-md hover:bg-gray-100 border-dashed" 
                                size={100}/>
                                <Input
                                    type="file"
                                    className="hidden"
                                    onChange={(e) => setChoosenFile(e.target.files?.[0] || null)}
                                />
                            </Label>
                            <p className="text-sm text-gray-500 text-left py-2">
                                Chosen file: {choosenFile?.name || "No file chosen"}
                            </p>
                        </div>
                    ) : (
                    <Label className="block text-sm font-medium text-gray-700 text-left">
                        {setting.label}
                        {setting.required && (
                            <span className="ml-1 text-red-500">*</span>
                        )}
                    </Label>
                    )}
                    {setting.type === "textarea" ? (
                        <div>
                            <Textarea
                                {...register(setting.id as keyof RestaurantFormValues)}
                                placeholder={setting.placeholder}
                                className="mt-1 block w-[80%] border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                            />
                            <p className="text-sm text-red-500">
                                {errors[setting.id as keyof RestaurantFormValues]?.message}
                            </p>
                        </div>
                    ) : setting.type !== "file" ? (
                        <div>
                            <Input
                                {...register(setting.id as keyof RestaurantFormValues)}
                                type={setting.type}
                                placeholder={setting.placeholder}
                                className="mt-1 block w-[80%] border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                            />
                            <p className="text-sm text-red-500">
                                {errors[setting.id as keyof RestaurantFormValues]?.message}
                            </p>
                        </div>
                    ) : null}
                </div>
            ))}

            <Button className="flex items-center justify-center my-2" type="submit" disabled={loading || isSubmitting || (!isDirty && !choosenFile)}>
                {loading || isSubmitting ? "Saving..." : "Save Changes"}
            </Button>

        </form>
    </div>
  )
}

export default SettingsForm
