export interface Product {
  id: string;
  name: string;
  price: number;
  quantity: number;
  category: string;
  image?: string;
  createdAt: Date;
  updatedAt: Date;
  expiryDate?: Date;
  batchNumber?: string;
  manufactureDate?: Date;
  lowStockThreshold?: number;
  expiryWarningDays?: number;
}

export interface Category {
  id: string;
  name: string;
  description?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Transaction {
  id: string;
  productId: string;
  type: 'in' | 'out';
  quantity: number;
  reason: string;
  createdAt: Date;
  batchNumber?: string;
}

export interface ExpiryStatus {
  status: 'safe' | 'warning' | 'expired';
  daysUntilExpiry: number | null;
  isExpired: boolean;
}

export interface AlertSettings {
  expiryWarningDays: number;
  lowStockEnabled: boolean;
  lowStockThreshold: number;
  expiryAlertsEnabled: boolean;
}

export interface ProductStats {
  totalProducts: number;
  lowStockProducts: number;
  expiredProducts: number;
  expiringSoonProducts: number;
  totalValue: number;
}

export type SortField = 'name' | 'price' | 'quantity' | 'expiryDate' | 'createdAt';
export type SortOrder = 'asc' | 'desc';

export interface ProductFilters {
  search?: string;
  category?: string;
  expiryStatus?: 'safe' | 'warning' | 'expired' | 'all';
  lowStock?: boolean;
  sortBy?: SortField;
  sortOrder?: SortOrder;
}