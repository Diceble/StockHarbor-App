"use client";

import { Product } from "@/features/products/types/product";
import Button from "@/components/ui/Button";
import ProductsTable from "@/features/products/components/ProductsTable";
import { useRouter, useSearchParams } from "next/navigation";
import CreateProductModal from "./CreateProductModal";

interface ProductsPageClientProps {
  products: Product[];
}

export default function ProductsPageClient({
  products,
}: ProductsPageClientProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const showCreate = searchParams.get("create") === "true";

  const handleCreateClick = () => {
    router.push("/products?create=true");
  };

  const handleCloseModal = () => {
    router.push("/products");
  };

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Products</h1>
        <Button variant="success" size="md" onClick={handleCreateClick}>
          Add New Product
        </Button>
      </div>
      {products.length === 0 ? (
        <p className="text-gray-500">No products found.</p>
      ) : (
        <div>
          <ProductsTable products={products} />
        </div>
      )}

      {showCreate && <CreateProductModal onClose={handleCloseModal} />}
    </div>
  );
}
