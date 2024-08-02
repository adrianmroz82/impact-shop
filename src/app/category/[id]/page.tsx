import { fetchProductsByCategory } from "@/lib/api";
import { Category } from "@/lib/model";
import { ProductList } from "@/components/product-list/product-list";

interface Props {
  params: {
    id: string;
  };
}

export default async function Product({ params }: Props) {
  const category = decodeURIComponent(params.id) as Category;
  const products = await fetchProductsByCategory(category);

  return <ProductList products={products} category={category} />;
}
