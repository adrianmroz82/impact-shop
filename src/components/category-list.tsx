import Link from "next/link";
import { fetchCategories } from "@/app/lib/api";

export default async function CategoryList() {
  const categories = await fetchCategories();

  return (
    <div>
      <h2>Categories</h2>
      <ul>
        {categories.map((category) => (
          <li key={category}>
            <Link href={`/category/${category}`}>
              <div>{category}</div>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
