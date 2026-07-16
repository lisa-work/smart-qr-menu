import { asyncHandler } from "../middlewares/asyncHandler";
import { Request, Response } from 'express';
import { createCategory, getCategories, getCategoryById, updateCategory, deleteCategory } from '../services/category.service';
import { categoryValidation, updateCategoryValidation } from '../validators/category.validation';
import { getUserId } from '../utils';

// Controller function to create a new category
export const createNewCategory = asyncHandler(async (req: Request, res: Response) => {
    const parsed = categoryValidation.safeParse(req.body);

    if (!parsed.success) {
        return res.status(400).json({errors: parsed.error.issues, message: "Invalid category data"});
    }

    const validatedData = parsed.data;

    const userId = getUserId(req);

    const newCategory = await createCategory(userId, validatedData);

    return res.status(201).json({
        message: "Category created successfully",
        category: newCategory
    })
})

// Controller function to get all categories for a restaurant
export const getAllCategories = asyncHandler(async (req: Request, res: Response) => {
    const userId = getUserId(req);

    const categoryList = await getCategories(userId);

    return res.status(200).json({
        message: "Categories retrieved successfully",
        category: categoryList
    })

})

// Controller function to get a specific category by ID
export const getCategoryListById = asyncHandler(async (req: Request, res: Response) => {
    const userId = getUserId(req);

    const categoryId = Number(req.params.categoryId);

    if (Number.isNaN(categoryId)) {
        return res.status(400).json({message: "Invalid category ID"});
    }

    const category = await getCategoryById(userId, categoryId);

    return res.status(200).json({
        message: "Category retrieved successfully",
        categories: category
    })
})

// Controller function to get a specific category by ID
export const updateCategoryById = asyncHandler(async (req: Request, res: Response) => {
    const parsed = updateCategoryValidation.safeParse(req.body);

    if (!parsed.success) {
        return res.status(400).json({errors: parsed.error.issues, message: "Invalid category data"});
    }
    
    const validatedData = parsed.data;

    const userId = getUserId(req);

    const categoryId = Number(req.params.categoryId);

    if (Number.isNaN(categoryId)) {
        return res.status(400).json({message: "Invalid category ID"});
    }

    const updatedCategory = await updateCategory(userId, categoryId, validatedData);

    return res.status(200).json({
        message: "Category updated successfully",
        category: updatedCategory
    })
})

// Controller function to delete a specific category by ID
export const deleteCategoryById = asyncHandler(async (req: Request, res: Response) => {
    const userId = getUserId(req);

    const categoryId = Number(req.params.categoryId);

    if (Number.isNaN(categoryId)) {
        return res.status(400).json({message: "Invalid category ID"});
    }

    await deleteCategory(userId, categoryId);

    return res.status(200).json({
        message: "Category deleted successfully"
    })
})