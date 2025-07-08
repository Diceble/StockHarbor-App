import {
  CreateProductRequest,
  Product,
  ProductFilters,
  UpdateProductRequest,
} from "@/features/products/types/product";
import { apiService } from "@/features/shared/services/api";

export class ProductService {
  private readonly endpoint = "/api/product";

  async getProducts(filters?: ProductFilters): Promise<Product[]> {
    const queryParams = new URLSearchParams();

    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
          queryParams.append(key, value.toString());
        }
      });
    }

    const url = queryParams.toString()
      ? `${this.endpoint}?${queryParams.toString()}`
      : this.endpoint;

    return apiService.get<Product[]>(url);
  }

  async getProduct(id: number): Promise<Product> {
    return apiService.get<Product>(`${this.endpoint}/${id}`);
  }

  async createProduct(product: CreateProductRequest): Promise<Product> {
    return apiService.post<Product, CreateProductRequest>(
      this.endpoint,
      product
    );
  }

  async updateProduct(product: UpdateProductRequest): Promise<Product> {
    return apiService.put<Product, UpdateProductRequest>(
      `${this.endpoint}/${product.id}`,
      product
    );
  }

  async deleteProduct(id: number): Promise<void> {
    return apiService.delete<void>(`${this.endpoint}/${id}`);
  }

  async getProductsByCategory(category: string): Promise<Product[]> {
    return apiService.get<Product[]>(`${this.endpoint}/category/${category}`);
  }
}

// Export a singleton instance
export const productService = new ProductService();
