/* eslint-disable @typescript-eslint/no-explicit-any */
import "server-only";

import DbConnection from "@/lib/mongodb";
import CategoryModel from "@/models/category";
import { Category as CategoryDTO } from "@/types/category.types";

/** Mapper: Mongo doc → DTO */
const mapCategory = (doc: any): CategoryDTO => ({
  _id: doc._id.toString(),
  userId: doc.userId.toString(),
  name: doc.name,
  type: doc.type, // "income" | "expense"
  createdAt: doc.createdAt.toISOString(),
  updatedAt: doc.updatedAt.toISOString(),
});

export async function createCategory(data: any): Promise<CategoryDTO> {
  await DbConnection();
  const doc = await CategoryModel.create(data);
  return mapCategory(doc);
}

export async function getUserCategories(
  userId: string,
): Promise<CategoryDTO[]> {
  await DbConnection();
  const docs = await CategoryModel.find({ userId }).sort({ name: 1 });
  return docs.map(mapCategory);
}

export async function getCategoryById(
  id: string,
  userId: string,
): Promise<CategoryDTO | null> {
  await DbConnection();
  const doc = await CategoryModel.findOne({ _id: id, userId });
  return doc ? mapCategory(doc) : null;
}

export async function updateCategory(
  id: string,
  userId: string,
  data: any,
): Promise<CategoryDTO | null> {
  await DbConnection();
  const doc = await CategoryModel.findOneAndUpdate({ _id: id, userId }, data, {
    new: true,
    runValidators: true,
  });
  return doc ? mapCategory(doc) : null;
}

export async function deleteCategory(id: string, userId: string): Promise<boolean> {
  await DbConnection();
  const doc = await CategoryModel.findOneAndDelete({ _id: id, userId });
  return !!doc;
}
