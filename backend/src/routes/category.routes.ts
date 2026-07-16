import { createNewCategory, getAllCategories, getCategoryListById, updateCategoryById, deleteCategoryById } from '../controllers/category.controller';
import { Router } from 'express';
import { protect } from '../middlewares/auth.middleware';

const router = Router();

router.post('/', protect, createNewCategory);
router.get('/all', protect, getAllCategories);
router.get('/:categoryId', protect, getCategoryListById);
router.put('/:categoryId', protect, updateCategoryById);
router.delete('/:categoryId', protect, deleteCategoryById);

export default router