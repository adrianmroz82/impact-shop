import { Category, Product } from "@/lib/model";
import { BASE_URL } from "@/lib/api/constants";

export async function getProductsByCategory(category: Category): Promise<Product[]> {
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
