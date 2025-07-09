import React, { ChangeEvent, FormEvent, useState } from "react";
import { X, Package, FileText } from "lucide-react";
import ImageInput from "@/components/ui/ImageInput";
import TextInput from "@/components/ui/TextInput";
import SelectBoxInput from "@/components/ui/SelectBoxInput";
import { enumToOptions, parseEnum } from "@/features/shared/utils/EnumUtils";
import {
  CreateProductRequest,
  Product,
  ProductStatus,
  ProductType,
} from "../types/product";

interface CreateProductModalProps {
  onClose: () => void;
  onSubmit: (productData: CreateProductRequest) => Promise<
    | {
        success: boolean;
        data: Product;
        error?: undefined;
      }
    | {
        success: boolean;
        error: unknown;
        data?: undefined;
      }
  >;
}

export default function CreateProductModal({
  onClose,
  onSubmit,
}: CreateProductModalProps) {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    productType: "0",
    productStatus: "0",
    sku: "",
    inventory: "",
    images: [],
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: FormEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const createProductRequest: CreateProductRequest = {
        name: formData.name,
        description: formData.description,
        sku: formData.sku,
        status: parseEnum(ProductStatus, formData.productStatus),
        productType: parseEnum(ProductType, formData.productType),
      };

      const result = await onSubmit(createProductRequest);
      if (result.success) {
        console.log("Product created successfully:", result.data);
        onClose();
      } else {
        console.error("Error creating product:", result.error);
        alert("Failed to create product. Please try again.");
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      alert("Failed to create product. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };
  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleImageUpload = (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    // Handle image upload logic here
    console.log("Images uploaded:", files);
  };

  return (
    <div
      className="fixed inset-0 flex items-center justify-center p-6 z-50"
      style={{ backgroundColor: "rgba(0, 0, 0, 0.3)" }}
    >
      <div className="bg-white rounded-lg shadow-2xl w-full max-w-[75vw] max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-2xl font-bold text-gray-900">
            Create New Product
          </h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X size={24} className="text-gray-600" />
          </button>
        </div>

        {/* Form Content */}
        <div className="overflow-y-auto max-h-[calc(90vh-140px)]">
          <div className="p-6 space-y-6">
            {/* Product Images */}
            <ImageInput
              labelText="Product Images"
              handleImageUpload={handleImageUpload}
            />

            {/* Product Details Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Product Name */}
              <TextInput
                label="Product Name"
                name="name"
                value={formData.name}
                icon={<Package className="inline w-4 h-4 mr-1" />}
                handleInputChange={handleInputChange}
              />

              {/* SKU */}
              <TextInput
                label="SKU"
                name="sku"
                value={formData.sku}
                handleInputChange={handleInputChange}
              />

              <SelectBoxInput
                name="productType"
                label="Product type"
                icon={<Package className="inline w-4 h-4 mr-1" />}
                options={enumToOptions(ProductType)}
                value={formData.productType}
                onChange={handleInputChange}
              />

              <SelectBoxInput
                name="productStatus"
                label="Product status"
                icon={<Package className="inline w-4 h-4 mr-1" />}
                options={enumToOptions(ProductStatus)}
                value={formData.productStatus}
                onChange={handleInputChange}
              />
            </div>

            {/* Description */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <FileText className="inline w-4 h-4 mr-1" />
                Description
              </label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                rows={4}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Describe your product..."
              />
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="border-t border-gray-200 p-6 bg-gray-50">
          <div className="flex justify-end space-x-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={handleSubmit}
              disabled={isSubmitting}
              className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors font-medium disabled:opacity-50"
            >
              {isSubmitting ? "Creating..." : "Create Product"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
