import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { foodSchema } from "@/schema/food";
import type { FoodData } from "@/types/food";
import { FoodFields } from "@/types/food";
import { FaUpload } from "react-icons/fa";

import {
  Button,
  Input,
  Label,
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
  Textarea,
  Toggle,
} from "../ui";

type Category = {
  id: number;
  name: string;
};

type FoodsFormProps = {
  food: FoodData | null;
  categories: Category[];
  loading: boolean;
  isEditing: boolean;
  onSubmit: (data: FoodData) => Promise<void>;
};

const defaultFoodValues: FoodData = {
  name: "",
  description: "",
  price: 0,
  categoryId: 0,
  available: true,
  featured: false,
};


// const preview =
//     URL.createObjectURL(file);

// <img src={preview} />

function FoodsForm({
  food,
  categories,
  loading,
  isEditing,
  onSubmit,
}: FoodsFormProps) {
  const {
    register,
    control,
    handleSubmit,
    reset,
    formState: {
      errors,
      isSubmitting,
      isDirty,
    },
  } = useForm<FoodData>({
    resolver: zodResolver(foodSchema),
    defaultValues: defaultFoodValues,
  });

  const [choosenFile, setChoosenFile] = useState<File | null>(null);

  useEffect(() => {
    if (food) {
      reset(food);
    } else {
      reset(defaultFoodValues);
    }
  }, [food, reset]);

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-5 border rounded-lg shadow-sm"
    >
      <div>
      {FoodFields.map((field) => (
        <div key={field.id} className="grid md:grid-cols-6 space-y-3 md:gap-5">
          { field.type === "file" && (
              <div className="col-span-6">
                <Label className="flex flex-col items-start justify-center text-sm font-medium text-gray-700 text-left cursor-pointer">
                  {field.label}
                    <div className="border border-dashed rounded-md flex flex-col items-center justify-centre w-full py-2 md:py-3">
                      <FaUpload size={50}/>
                      <Input
                        {...register(field.id as keyof FoodData)}
                        type="file"
                        className="hidden"
                        onChange={(e) => setChoosenFile(e.target.files?.[0] || null)}
                      />
                      <p className="text-xs text-gray-500 text-left">
                        {choosenFile?.name || "No file chosen"}
                      </p>
                      <p className="text-xs text-red-500">
                        {errors[field.id as keyof FoodData]?.message}
                      </p>
                    </div>
                </Label>
              </div>
          )}

          {field.type !== "file" && (
              <div className="my-2 col-span-1">
              <Label htmlFor={field.id}>
                {field.label}
                {field.required && (
                  <span className="ml-1 text-red-500">*</span>
                )}
              </Label>
            </div>
          )}
          
          <div className="col-span-5">
          {(() => {
            switch (field.type) {
              case "textarea":
                return (
                  <Textarea
                    id={field.id}
                    rows={4}
                    placeholder={field.placeholder}
                    {...register(field.id as "description")}
                  />
                );

              case "text":
                return (
                  <Input
                    id={field.id}
                    type={field.type}
                    placeholder={field.placeholder}
                    {...register(field.id as "name")}
                  />
                );

              case "number":
                return (
                  <Input
                    id={field.id}
                    type="number"
                    step="0.01"
                    min="0"
                    placeholder={field.placeholder}
                    {...register("price", {
                      valueAsNumber: true,
                    })}
                  />
                );

              case "select":
                return (
                  <Controller
                    control={control}
                    name="categoryId"
                    render={({ field: selectField }) => (
                      <Select
                        value={selectField.value?.toString()}
                        onValueChange={(value) =>
                          selectField.onChange(Number(value))
                        }
                      >
                        <SelectTrigger id="categoryId" className="w-full">
                          <SelectValue placeholder="Select a category" />
                        </SelectTrigger>

                        <SelectContent>
                          <SelectGroup>
                            {categories.map((category) => (
                              <SelectItem
                                key={category.id}
                                value={category.id.toString()}
                              >
                                {category.name}
                              </SelectItem>
                            ))}
                          </SelectGroup>
                        </SelectContent>
                      </Select>
                    )}
                  />
                );

              case "toggle":
                return (
                  <Controller
                    control={control}
                    name={field.id as "available" | "featured"}
                    render={({ field: toggleField }) => (
                      <Toggle
                        pressed={Boolean(toggleField.value)}
                        onPressedChange={toggleField.onChange}
                      >
                        {field.label}
                      </Toggle>
                    )}
                  />
                );

              default:
                return null;
            }
          })()}
          </div>

          {errors[field.id as keyof FoodData] && (
            <p className="text-sm text-red-500">
              {errors[field.id as keyof FoodData]?.message as string}
            </p>
          )}
        </div>
      ))}
      

      <Button
        type="submit"
        className="w-full"
        disabled={
          loading ||
          isSubmitting ||
          !isDirty
        }
      >
        {loading || isSubmitting
          ? "Saving..."
          : isEditing
          ? "Save Changes"
          : "Create Food"}
      </Button>
      

      {/* const formData = new FormData();

      formData.append("name", values.name);
      formData.append("price", values.price.toString());
      formData.append("description", values.description);
      formData.append(
          "categoryId",
          values.categoryId.toString()
      );
      formData.append("image", selectedFile);

      await axios.post(
          "/api/foods",
          formData
      ); */}
      </div>
    </form>
  );
}

export default FoodsForm;