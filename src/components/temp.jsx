export interface Product {
  id: string;
  name: string;
  price: number;
  category: string;
  brand: string;
  rating: number;
  stock: number;
  remainingQuantity: number;
  description: string;
  image: string;
  subImage: string[];
  reviewCount: number;
  availableColors: string[];
  availableSizes: string[];
  isBestSeller: boolean;
}