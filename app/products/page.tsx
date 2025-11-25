'use client';

import { useState, useMemo } from 'react';
import { ProductCard } from '@/components/ProductCard';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Card, CardBody, CardHeader } from '@/components/ui/Card';
import { getMockData } from '@/lib/data';
import { sortProducts, filterProductsByExpiryStatus, getLowStockProducts } from '@/lib/utils';
import type { ProductFilters } from '@/lib/types';
import Link from 'next/link';

export default function ProductsPage() {
  const { products } = getMockData();
  const [filters, setFilters] = useState<ProductFilters>({
    search: '',
    category: '',
    expiryStatus: 'all',
    lowStock: false,
    sortBy: 'name',
    sortOrder: 'asc',
  });

  const filteredAndSortedProducts = useMemo(() => {
    let filtered = products;

    // Search filter
    if (filters.search) {
      filtered = filtered.filter(product =>
        product.name.toLowerCase().includes(filters.search!.toLowerCase()) ||
        product.category.toLowerCase().includes(filters.search!.toLowerCase()) ||
        product.batchNumber?.toLowerCase().includes(filters.search!.toLowerCase())
      );
    }

    // Category filter
    if (filters.category) {
      filtered = filtered.filter(product => product.category === filters.category);
    }

    // Expiry status filter
    if (filters.expiryStatus !== 'all') {
      filtered = filterProductsByExpiryStatus(filtered, filters.expiryStatus!);
    }

    // Low stock filter
    if (filters.lowStock) {
      filtered = getLowStockProducts(filtered);
    }

    // Sort
    filtered = sortProducts(filtered, filters.sortBy!, filters.sortOrder!);

    return filtered;
  }, [products, filters]);

  const handleFilterChange = (key: keyof ProductFilters, value: string | number | boolean) => {
    setFilters((prev: ProductFilters) => ({ ...prev, [key]: value }));
  };

  const clearFilters = () => {
    setFilters({
      search: '',
      category: '',
      expiryStatus: 'all',
      lowStock: false,
      sortBy: 'name',
      sortOrder: 'asc',
    });
  };

  const uniqueCategories = Array.from(new Set(products.map(p => p.category)));

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">รายการสินค้า</h1>
          <p className="text-gray-600">จัดการสินค้าทั้งหมด ({filteredAndSortedProducts.length} รายการ)</p>
        </div>
        <Link href="/products/add">
          <Button>เพิ่มสินค้าใหม่</Button>
        </Link>
      </div>

      {/* Filters */}
      <Card>
        <CardHeader>
          <h3 className="text-lg font-semibold text-gray-900">ค้นหาและกรอง</h3>
        </CardHeader>
        <CardBody>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Input
              placeholder="ค้นหาสินค้า..."
              value={filters.search}
              onChange={(e) => handleFilterChange('search', e.target.value)}
            />

            <select
              className="block w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
              value={filters.category}
              onChange={(e) => handleFilterChange('category', e.target.value)}
            >
              <option value="">ทุกหมวดหมู่</option>
              {uniqueCategories.map(category => (
                <option key={category} value={category}>{category}</option>
              ))}
            </select>

            <select
              className="block w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
              value={filters.expiryStatus}
              onChange={(e) => handleFilterChange('expiryStatus', e.target.value)}
            >
              <option value="all">ทุกสถานะวันหมดอายุ</option>
              <option value="safe">ปลอดภัย</option>
              <option value="warning">ใกล้หมดอายุ</option>
              <option value="expired">หมดอายุแล้ว</option>
            </select>

            <div className="flex gap-2">
              <select
                className="flex-1 block rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                value={`${filters.sortBy}-${filters.sortOrder}`}
                onChange={(e) => {
                  const [sortBy, sortOrder] = e.target.value.split('-');
                  handleFilterChange('sortBy', sortBy);
                  handleFilterChange('sortOrder', sortOrder);
                }}
              >
                <option value="name-asc">ชื่อ (ก-ฮ)</option>
                <option value="name-desc">ชื่อ (ฮ-ก)</option>
                <option value="price-asc">ราคา (น้อย-มาก)</option>
                <option value="price-desc">ราคา (มาก-น้อย)</option>
                <option value="quantity-asc">จำนวน (น้อย-มาก)</option>
                <option value="quantity-desc">จำนวน (มาก-น้อย)</option>
                <option value="expiryDate-asc">วันหมดอายุ (ใกล้-ไกล)</option>
                <option value="expiryDate-desc">วันหมดอายุ (ไกล-ใกล้)</option>
              </select>
            </div>
          </div>

          <div className="flex items-center gap-4 mt-4">
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={filters.lowStock}
                onChange={(e) => handleFilterChange('lowStock', e.target.checked)}
                className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
              />
              <span className="text-sm text-gray-700">แสดงเฉพาะสต็อกต่ำ</span>
            </label>

            <Button variant="outline" size="sm" onClick={clearFilters}>
              ล้างตัวกรอง
            </Button>
          </div>
        </CardBody>
      </Card>

      {/* Active Filters Summary */}
      {(filters.search || filters.category || filters.expiryStatus !== 'all' || filters.lowStock) && (
        <Card className="bg-blue-50 border-blue-200">
          <CardBody className="p-4">
            <div className="flex items-center gap-2">
              <span className="text-sm font-medium text-blue-900">ตัวกรองที่ใช้:</span>
              {filters.search && (
                <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                  ค้นหา: {filters.search}
                </span>
              )}
              {filters.category && (
                <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                  หมวดหมู่: {filters.category}
                </span>
              )}
              {filters.expiryStatus !== 'all' && (
                <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                  สถานะ: {filters.expiryStatus === 'safe' ? 'ปลอดภัย' : filters.expiryStatus === 'warning' ? 'ใกล้หมดอายุ' : 'หมดอายุแล้ว'}
                </span>
              )}
              {filters.lowStock && (
                <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                  สต็อกต่ำ
                </span>
              )}
            </div>
          </CardBody>
        </Card>
      )}

      {/* Products Grid */}
      {filteredAndSortedProducts.length === 0 ? (
        <Card>
          <CardBody className="text-center py-12">
            <div className="text-gray-400 mb-4">
              <svg className="mx-auto h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
              </svg>
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">ไม่พบสินค้า</h3>
            <p className="text-gray-500 mb-4">ลองปรับเปลี่ยนตัวกรองหรือเพิ่มสินค้าใหม่</p>
            <Link href="/products/add">
              <Button>เพิ่มสินค้าใหม่</Button>
            </Link>
          </CardBody>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredAndSortedProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onView={(product) => {
                // TODO: Navigate to product detail
                console.log('View product:', product);
              }}
              onEdit={(product) => {
                // TODO: Navigate to edit product
                console.log('Edit product:', product);
              }}
              onDelete={(product) => {
                // TODO: Show delete confirmation
                console.log('Delete product:', product);
              }}
            />
          ))}
        </div>
      )}
    </div>
  );
}