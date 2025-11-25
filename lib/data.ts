import type { Product, Category, Transaction } from './types';

export const mockCategories: Category[] = [
  {
    id: 'cat1',
    name: 'อาหารแห้ง',
    description: 'อาหารที่ผ่านการแปรรูปและแห้ง',
    createdAt: new Date('2024-01-01'),
    updatedAt: new Date('2024-01-01'),
  },
  {
    id: 'cat2',
    name: 'เครื่องดื่ม',
    description: 'เครื่องดื่มทุกประเภท',
    createdAt: new Date('2024-01-01'),
    updatedAt: new Date('2024-01-01'),
  },
  {
    id: 'cat3',
    name: 'ขนมขบเคี้ยว',
    description: 'ขนมและของทอดกรอบ',
    createdAt: new Date('2024-01-01'),
    updatedAt: new Date('2024-01-01'),
  },
  {
    id: 'cat4',
    name: 'สินค้าสุขภาพ',
    description: 'วิตามินและอาหารเสริม',
    createdAt: new Date('2024-01-01'),
    updatedAt: new Date('2024-01-01'),
  },
  {
    id: 'cat5',
    name: 'ของใช้ในบ้าน',
    description: 'สินค้าอุปโภคบริโภค',
    createdAt: new Date('2024-01-01'),
    updatedAt: new Date('2024-01-01'),
  },
];

export const mockProducts: Product[] = [
  {
    id: 'prod1',
    name: 'น้ำตาลทรายขาว',
    price: 25,
    quantity: 150,
    category: 'อาหารแห้ง',
    createdAt: new Date('2024-01-15'),
    updatedAt: new Date('2024-01-15'),
    expiryDate: new Date('2025-12-31'),
    batchNumber: 'B001',
    manufactureDate: new Date('2024-01-01'),
    lowStockThreshold: 50,
    expiryWarningDays: 30,
  },
  {
    id: 'prod2',
    name: 'น้ำมันพืช',
    price: 45,
    quantity: 8,
    category: 'อาหารแห้ง',
    createdAt: new Date('2024-02-01'),
    updatedAt: new Date('2024-02-01'),
    expiryDate: new Date('2025-08-15'),
    batchNumber: 'B002',
    manufactureDate: new Date('2024-01-15'),
    lowStockThreshold: 10,
    expiryWarningDays: 14,
  },
  {
    id: 'prod3',
    name: 'กระเทียมแห้ง',
    price: 35,
    quantity: 75,
    category: 'อาหารแห้ง',
    createdAt: new Date('2024-01-20'),
    updatedAt: new Date('2024-01-20'),
    expiryDate: new Date('2025-06-30'),
    batchNumber: 'B003',
    manufactureDate: new Date('2024-01-10'),
    lowStockThreshold: 20,
    expiryWarningDays: 7,
  },
  {
    id: 'prod4',
    name: 'น้ำดื่มตราสัญญา',
    price: 7,
    quantity: 200,
    category: 'เครื่องดื่ม',
    createdAt: new Date('2024-03-01'),
    updatedAt: new Date('2024-03-01'),
    expiryDate: new Date('2026-02-28'),
    batchNumber: 'D001',
    manufactureDate: new Date('2024-02-15'),
    lowStockThreshold: 100,
    expiryWarningDays: 30,
  },
  {
    id: 'prod5',
    name: 'โค้กเล็ก',
    price: 15,
    quantity: 45,
    category: 'เครื่องดื่ม',
    createdAt: new Date('2024-02-15'),
    updatedAt: new Date('2024-02-15'),
    expiryDate: new Date('2025-05-01'),
    batchNumber: 'D002',
    manufactureDate: new Date('2024-01-20'),
    lowStockThreshold: 30,
    expiryWarningDays: 14,
  },
  {
    id: 'prod6',
    name: 'มาม่ารสหมูสับ',
    price: 6,
    quantity: 5,
    category: 'อาหารแห้ง',
    createdAt: new Date('2024-01-10'),
    updatedAt: new Date('2024-01-10'),
    expiryDate: new Date('2025-03-15'),
    batchNumber: 'F001',
    manufactureDate: new Date('2023-12-01'),
    lowStockThreshold: 10,
    expiryWarningDays: 7,
  },
  {
    id: 'prod7',
    name: 'ขนมปังปิ้ง',
    price: 18,
    quantity: 120,
    category: 'ขนมขบเคี้ยว',
    createdAt: new Date('2024-02-20'),
    updatedAt: new Date('2024-02-20'),
    expiryDate: new Date('2025-04-10'),
    batchNumber: 'S001',
    manufactureDate: new Date('2024-01-25'),
    lowStockThreshold: 50,
    expiryWarningDays: 10,
  },
  {
    id: 'prod8',
    name: 'วิตามินซี',
    price: 120,
    quantity: 30,
    category: 'สินค้าสุขภาพ',
    createdAt: new Date('2024-01-25'),
    updatedAt: new Date('2024-01-25'),
    expiryDate: new Date('2025-12-25'),
    batchNumber: 'H001',
    manufactureDate: new Date('2024-01-01'),
    lowStockThreshold: 15,
    expiryWarningDays: 30,
  },
  {
    id: 'prod9',
    name: 'น้ำยาล้างจาน',
    price: 35,
    quantity: 25,
    category: 'ของใช้ในบ้าน',
    createdAt: new Date('2024-02-10'),
    updatedAt: new Date('2024-02-10'),
    expiryDate: new Date('2027-02-10'),
    batchNumber: 'H002',
    manufactureDate: new Date('2024-01-05'),
    lowStockThreshold: 10,
    expiryWarningDays: 60,
  },
  {
    id: 'prod10',
    name: 'กะทิสด',
    price: 22,
    quantity: 18,
    category: 'อาหารแห้ง',
    createdAt: new Date('2024-03-05'),
    updatedAt: new Date('2024-03-05'),
    expiryDate: new Date('2025-02-28'),
    batchNumber: 'F002',
    manufactureDate: new Date('2024-02-20'),
    lowStockThreshold: 15,
    expiryWarningDays: 5,
  },
];

export const mockTransactions: Transaction[] = [
  {
    id: 'trans1',
    productId: 'prod1',
    type: 'in',
    quantity: 100,
    reason: 'สั่งซื้อเพิ่ม',
    createdAt: new Date('2024-01-15'),
    batchNumber: 'B001',
  },
  {
    id: 'trans2',
    productId: 'prod2',
    type: 'in',
    quantity: 50,
    reason: 'สั่งซื้อเพิ่ม',
    createdAt: new Date('2024-02-01'),
    batchNumber: 'B002',
  },
  {
    id: 'trans3',
    productId: 'prod4',
    type: 'out',
    quantity: 20,
    reason: 'ขายปลีก',
    createdAt: new Date('2024-03-10'),
    batchNumber: 'D001',
  },
  {
    id: 'trans4',
    productId: 'prod5',
    type: 'out',
    quantity: 15,
    reason: 'ขายส่ง',
    createdAt: new Date('2024-03-12'),
    batchNumber: 'D002',
  },
  {
    id: 'trans5',
    productId: 'prod6',
    type: 'out',
    quantity: 5,
    reason: 'ขายปลีก',
    createdAt: new Date('2024-03-14'),
    batchNumber: 'F001',
  },
];

// Data manipulation functions (for demo purposes)
// In a real app, these would be API calls

export function addProduct(product: Omit<Product, 'id' | 'createdAt' | 'updatedAt'>): Product {
  const newProduct: Product = {
    ...product,
    id: Date.now().toString(36) + Math.random().toString(36).substring(2),
    createdAt: new Date(),
    updatedAt: new Date(),
  };
  mockProducts.push(newProduct);
  return newProduct;
}

export function updateProduct(id: string, updates: Partial<Product>): Product | null {
  const index = mockProducts.findIndex(p => p.id === id);
  if (index === -1) return null;
  
  mockProducts[index] = {
    ...mockProducts[index],
    ...updates,
    updatedAt: new Date(),
  };
  return mockProducts[index];
}

export function deleteProduct(id: string): boolean {
  const index = mockProducts.findIndex(p => p.id === id);
  if (index === -1) return false;
  
  mockProducts.splice(index, 1);
  return true;
}

export function getProductById(id: string): Product | null {
  return mockProducts.find(p => p.id === id) || null;
}

export function getMockData() {
  return {
    products: mockProducts,
    categories: mockCategories,
    transactions: mockTransactions,
  };
}