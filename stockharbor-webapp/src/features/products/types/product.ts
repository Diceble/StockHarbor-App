export interface Product {
  id: number;
  name: string;
  description: string;
  sku: string;
  status: ProductStatus;
  productType: ProductType;
  dimension?: Dimension;
  createdAt: string;
}

export interface CreateProductRequest {
  name: string;
  description: string;
}

export interface UpdateProductRequest extends Partial<CreateProductRequest> {
  id: number;
}

export interface ProductFilters {
  category?: string;
  search?: string;
  page?: number;
  pageSize?: number;
}

export enum ProductStatus {
  ACTIVE = 0,
  INACTIVE = 1,
  ARCHIVED = 2,
  DELETED = 3,
}

export enum ProductType {
  STOCK = 0,
  MATERIAL = 1,
}

export interface Dimension {
  length: number;
  width: number;
  height: number;
  weight: number;
}

export const getStatusLabel = (status: ProductStatus): string => {
  switch (status) {
    case ProductStatus.ACTIVE:
      return "Active";
    case ProductStatus.INACTIVE:
      return "Inactive";
    case ProductStatus.ARCHIVED:
      return "Archived";
    case ProductStatus.DELETED:
      return "Deleted";
    default:
      return "Unknown";
  }
};

export const getProductTypeLabel = (type: ProductType): string => {
  switch (type) {
    case ProductType.MATERIAL:
      return "Material";
    case ProductType.STOCK:
      return "Stock";
    default:
      return "Unknown";
  }
};
