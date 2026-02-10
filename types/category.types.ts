export type CategoryType = "income" | "expense";

export interface Category {
  _id: string;
  userId: string;
  name: string;
  type: CategoryType;
  createdAt: string;
  updatedAt: string;
}

export interface CategoryRef {
  _id: string;
  name: string;
  type: CategoryType;
}


export interface CreateCategoryDTO {
  name: string;
  type: CategoryType;
}

export type UpdateCategoryDTO = Partial<CreateCategoryDTO>;
