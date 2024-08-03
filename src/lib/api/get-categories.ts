import { Category } from "@/lib/model";
import { BASE_URL } from "@/lib/api/constants";

export async function getCategories(): Promise<Category[]> {
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
