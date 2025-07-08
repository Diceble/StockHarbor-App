import { productService } from "@/features/products/services/productService";
import { ApiError } from "@/features/shared/services/api";
import { Product } from "@/features/products/types/product";
import ProductsPageClient from "@/features/products/components/ProductPageClient";

export default async function ProductsPage() {
  let products: Product[];

  try {
    products = await productService.getProducts();
  } catch (error) {
    if (error instanceof ApiError && error.status === 401) {
      // Redirect to login if unauthorized
      console.error(
        "Unauthorized access, redirecting to login:",
        error.message
      );
    }
    return (
      <div className="p-8">
        <h1 className="text-2xl font-bold mb-4">Products</h1>
        <div className="text-red-600">
          Failed to load products. Please try again later.
        </div>
      </div>
    );
  }

  return <ProductsPageClient products={products} />;
}
