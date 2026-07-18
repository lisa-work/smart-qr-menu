import { useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { foodSchema } from "@/schema/food";
import type { FoodData } from "@/types/food";
import { FoodFields } from "@/types/food";

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
  image: "",
  price: 0,
  categoryId: 0,
  available: true,
  featured: false,
};

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
      className="space-y-5"
    >
      {FoodFields.map((field) => (
        <div key={field.id} className="space-y-2">
          <Label htmlFor={field.id}>
            {field.label}
            {field.required && (
              <span className="ml-1 text-red-500">*</span>
            )}
          </Label>

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
              case "url":
                return (
                  <Input
                    id={field.id}
                    type={field.type}
                    placeholder={field.placeholder}
                    {...register(field.id as "name" | "image")}
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
    </form>
  );
}

export default FoodsForm;