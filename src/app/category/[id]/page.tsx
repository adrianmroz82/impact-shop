import { fetchProductsByCategory } from "@/lib/api";
import { Category } from "@/lib/model";
import { ProductsList } from "@/components/products-list/products-list";

interface Props {
  params: {
    id: string;
  };
}

export default async function Product({ params }: Props) {
  const category = decodeURIComponent(params.id) as Category;
  const products = await fetchProductsByCategory(category);

  return <ProductsList products={products} category={category} />;
}
