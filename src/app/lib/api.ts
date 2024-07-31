import { Category, Product } from "@/app/lib/model";

const BASE_URL = "https://fakestoreapi.com/products";

export async function fetchCategories(): Promise<Category[]> {
  try {
    const response = await fetch(`${BASE_URL}/categories`);

    if (!response.ok) {
      throw new Error("Failed to fetch categories");
    }

    return response.json();
  } catch (error) {
    console.error(error);
    return [];
  }
}


export async function fetchProductsByCategory(category: Category): Promise<Product[]> {
  try {
    const response = await fetch(`${BASE_URL}/category/${category}`);

    if (!response.ok) {
      throw new Error(`Failed to fetch products for category: ${category}`);
    }

    return response.json();
  } catch (error) {
    console.error(error);
    return [];
  }
}
