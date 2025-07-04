import { Product, productService } from "@/lib/services/productService";
import { ApiError } from "@/lib/services/api";
import ProductsTable from "@/components/ProductsTable";

export default async function ProductsPage() {
  let products: Product[];

  try {
    products = await productService.getProducts();
  } catch (error) {
    if (error instanceof ApiError && error.status === 401) {
      // Redirect to login if unauthorized
      console.error("Unauthorized access, redirecting to login:", error);
    }

    console.error("Failed to fetch products:", error);
    return (
      <div className="p-8">
        <h1 className="text-2xl font-bold mb-4">Products</h1>
        <div className="text-red-600">
          Failed to load products. Please try again later.
        </div>
      </div>
    );
  }
  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-6">Products</h1>

      {products.length === 0 ? (
        <p className="text-gray-500">No products found.</p>
      ) : (
        <div>
          <ProductsTable products={products} />
        </div>
      )}
    </div>
  );
}
