import { Category, Product } from "@/lib/model";

export const mockCategory: Category = "electronics";

export const mockCategories: Category[] = ["electronics", "jewelery", "men's clothing", "women's clothing"];

export const mockProducts: Product[] = [
  {
    id: 1,
    title: "Product 1",
    description: "Test description 1",
    image: "/path/to/image1",
    price: 10,
    category: "electronics",
  },
  {
    id: 2,
    title: "Product 2",
    description: "Test description 2",
    image: "/path/to/image2",
    price: 20,
    category: "electronics",
  },
];
