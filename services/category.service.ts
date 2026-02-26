/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  createCategory as createCategoryRepo,
  getUserCategories as getUserCategoriesRepo,
  getCategoryById as getCategoryByIdRepo,
  updateCategory as updateCategoryRepo,
  deleteCategory as deleteCategoryRepo,
} from "@/repository/category.repository";

import {
  CreateCategoryDTO,
  UpdateCategoryDTO,
  Category as CategoryDTO,
} from "@/types/category.types";

/** Create a new category */
export const createCategory = async (
  userId: string,
  data: CreateCategoryDTO,
): Promise<CategoryDTO> => {
  const { name, type } = data;

  return createCategoryRepo({
    userId,
    name,
    type,
  });
};

/** Get all categories of a user */
export const getUserCategories = async (
  userId: string,
): Promise<CategoryDTO[]> => {
  const categories = await getUserCategoriesRepo(userId);

  // ✅ Sort by createdAt descending (latest first)
  return categories.sort((a, b) => {
    const dateA = new Date(a.createdAt).getTime();
    const dateB = new Date(b.createdAt).getTime();
    return dateB - dateA; // latest first
  });
};
/** Get single category by id */
export const getCategoryById = async (
  id: string,
): Promise<CategoryDTO | null> => {
  return getCategoryByIdRepo(id);
};

/** Update a category */
export const updateCategory = async (
  id: string,
  data: UpdateCategoryDTO,
): Promise<CategoryDTO | null> => {
  const { name, type } = data;

  return updateCategoryRepo(id, {
    ...(name && { name }),
    ...(type && { type }),
  });
};

/** Delete a category */
export const deleteCategory = async (id: string): Promise<boolean> => {
  return deleteCategoryRepo(id);
};
