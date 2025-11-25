import type { Product, ExpiryStatus } from './types';

export function getExpiryStatus(expiryDate: Date | undefined, warningDays: number = 7): ExpiryStatus {
  if (!expiryDate) {
    return {
      status: 'safe',
      daysUntilExpiry: null,
      isExpired: false,
    };
  }

  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const expiryDateNormalized = new Date(expiryDate);
  expiryDateNormalized.setHours(0, 0, 0, 0);

  const daysUntilExpiry = Math.ceil((expiryDateNormalized.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
  const isExpired = daysUntilExpiry < 0;

  let status: 'safe' | 'warning' | 'expired';
  if (isExpired) {
    status = 'expired';
  } else if (daysUntilExpiry <= warningDays) {
    status = 'warning';
  } else {
    status = 'safe';
  }

  return {
    status,
    daysUntilExpiry,
    isExpired,
  };
}

export function formatExpiryDate(expiryDate: Date | undefined): string {
  if (!expiryDate) return '-';
  
  return new Intl.DateTimeFormat('th-TH', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  }).format(expiryDate);
}

export function formatDaysUntilExpiry(daysUntilExpiry: number | null): string {
  if (daysUntilExpiry === null) return '-';
  
  if (daysUntilExpiry < 0) {
    return `หมดอายุ ${Math.abs(daysUntilExpiry)} วัน`;
  } else if (daysUntilExpiry === 0) {
    return 'หมดอายุวันนี้';
  } else if (daysUntilExpiry === 1) {
    return 'หมดอายุพรุ่งนี้';
  } else {
    return `อีก ${daysUntilExpiry} วัน`;
  }
}

export function getExpiryBadgeColor(status: 'safe' | 'warning' | 'expired'): string {
  switch (status) {
    case 'safe':
      return 'bg-green-100 text-green-800 border-green-200';
    case 'warning':
      return 'bg-yellow-100 text-yellow-800 border-yellow-200';
    case 'expired':
      return 'bg-red-100 text-red-800 border-red-200';
  }
}

export function getExpiryBadgeText(status: 'safe' | 'warning' | 'expired'): string {
  switch (status) {
    case 'safe':
      return 'ปลอดภัย';
    case 'warning':
      return 'ใกล้หมดอายุ';
    case 'expired':
      return 'หมดอายุแล้ว';
  }
}

export function isLowStock(product: Product): boolean {
  const threshold = product.lowStockThreshold || 10;
  return product.quantity <= threshold;
}

export function filterProductsByExpiryStatus(
  products: Product[],
  status: 'safe' | 'warning' | 'expired' | 'all',
  warningDays: number = 7
): Product[] {
  if (status === 'all') return products;

  return products.filter(product => {
    const expiryStatus = getExpiryStatus(product.expiryDate, warningDays);
    return expiryStatus.status === status;
  });
}

export function getProductsExpiringSoon(
  products: Product[],
  warningDays: number = 7
): Product[] {
  return products.filter(product => {
    const expiryStatus = getExpiryStatus(product.expiryDate, warningDays);
    return expiryStatus.status === 'warning';
  });
}

export function getExpiredProducts(products: Product[]): Product[] {
  return products.filter(product => {
    const expiryStatus = getExpiryStatus(product.expiryDate);
    return expiryStatus.isExpired;
  });
}

export function getLowStockProducts(products: Product[]): Product[] {
  return products.filter(product => isLowStock(product));
}

export function calculateProductStats(products: Product[]) {
  const totalProducts = products.length;
  const lowStockProducts = getLowStockProducts(products).length;
  const expiredProducts = getExpiredProducts(products).length;
  const expiringSoonProducts = getProductsExpiringSoon(products).length;
  const totalValue = products.reduce((sum, product) => sum + (product.price * product.quantity), 0);

  return {
    totalProducts,
    lowStockProducts,
    expiredProducts,
    expiringSoonProducts,
    totalValue,
  };
}

export function sortProducts(
  products: Product[],
  sortBy: 'name' | 'price' | 'quantity' | 'expiryDate' | 'createdAt',
  sortOrder: 'asc' | 'desc' = 'asc'
): Product[] {
  return [...products].sort((a, b) => {
    let aValue: string | number | Date;
    let bValue: string | number | Date;

    switch (sortBy) {
      case 'name':
        aValue = a.name.toLowerCase();
        bValue = b.name.toLowerCase();
        break;
      case 'price':
        aValue = a.price;
        bValue = b.price;
        break;
      case 'quantity':
        aValue = a.quantity;
        bValue = b.quantity;
        break;
      case 'expiryDate':
        aValue = a.expiryDate ? new Date(a.expiryDate).getTime() : Infinity;
        bValue = b.expiryDate ? new Date(b.expiryDate).getTime() : Infinity;
        break;
      case 'createdAt':
        aValue = new Date(a.createdAt).getTime();
        bValue = new Date(b.createdAt).getTime();
        break;
      default:
        return 0;
    }

    if (aValue < bValue) {
      return sortOrder === 'asc' ? -1 : 1;
    }
    if (aValue > bValue) {
      return sortOrder === 'asc' ? 1 : -1;
    }
    return 0;
  });
}

export function generateId(): string {
  return Date.now().toString(36) + Math.random().toString(36).substring(2);
}

export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('th-TH', {
    style: 'currency',
    currency: 'THB',
  }).format(amount);
}

export function formatDate(date: Date | string): string {
  const dateObj = typeof date === 'string' ? new Date(date) : date;
  return new Intl.DateTimeFormat('th-TH', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  }).format(dateObj);
}