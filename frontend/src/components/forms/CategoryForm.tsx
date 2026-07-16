import { type CategoryData, type UpdateCategoryData } from '@/types/category';
import { zodResolver } from '@hookform/resolvers/zod/dist/zod.js';
import { useForm } from 'react-hook-form';
import { categoryValidation, updateCategoryValidation } from '@/schema/category';
import { useEffect } from 'react';
import { CategoryFields } from '@/types/category';
import { Input } from '../ui';

type CategoryFormProps = {
    category: CategoryData | null;
    onSubmit: (data: UpdateCategoryData) => Promise<void>;
    loading: boolean;
}

function CategoryForm({category, onSubmit, loading}: CategoryFormProps) {
    const {register, handleSubmit, formState: { errors, isSubmitting, isDirty }, reset} = useForm<UpdateCategoryData>({
        resolver: zodResolver(updateCategoryValidation),
        defaultValues: {
            name: "",
            description: ""
        }
    });;

    useEffect(() => {
        if (category) {
            reset(category);
        }
    }, [category, reset]);

}

export default CategoryForm;