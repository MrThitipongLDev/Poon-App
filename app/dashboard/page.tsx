'use client';

import { Card, CardBody, CardHeader } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { getMockData } from '@/lib/data';
import { calculateProductStats, getProductsExpiringSoon, getExpiredProducts, getLowStockProducts, formatCurrency } from '@/lib/utils';
import Link from 'next/link';

export default function DashboardPage() {
  const { products } = getMockData();
  const stats = calculateProductStats(products);
  const expiringSoon = getProductsExpiringSoon(products);
  const expired = getExpiredProducts(products);
  const lowStock = getLowStockProducts(products);

  const statCards = [
    {
      title: 'สินค้าทั้งหมด',
      value: stats.totalProducts,
      color: 'bg-blue-50 text-blue-700 border-blue-200',
      icon: (
        <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
        </svg>
      ),
    },
    {
      title: 'สินค้าใกล้หมดอายุ',
      value: stats.expiringSoonProducts,
      color: 'bg-yellow-50 text-yellow-700 border-yellow-200',
      icon: (
        <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
    },
    {
      title: 'สินค้าหมดอายุแล้ว',
      value: stats.expiredProducts,
      color: 'bg-red-50 text-red-700 border-red-200',
      icon: (
        <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
        </svg>
      ),
    },
    {
      title: 'สต็อกต่ำ',
      value: stats.lowStockProducts,
      color: 'bg-orange-50 text-orange-700 border-orange-200',
      icon: (
        <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
        </svg>
      ),
    },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">แดชบอร์ด</h1>
          <p className="text-gray-600">ภาพรวมระบบจัดการสินค้า</p>
        </div>
        <Link href="/products/add">
          <Button>เพิ่มสินค้าใหม่</Button>
        </Link>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statCards.map((stat, index) => (
          <Card key={index} className="border-l-4 border-l-blue-500">
            <CardBody className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                  <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                </div>
                <div className={`p-3 rounded-full ${stat.color}`}>
                  {stat.icon}
                </div>
              </div>
            </CardBody>
          </Card>
        ))}
      </div>

      {/* Total Value Card */}
      <Card>
        <CardBody className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">มูลค่าสินค้าทั้งหมด</p>
              <p className="text-3xl font-bold text-gray-900">{formatCurrency(stats.totalValue)}</p>
            </div>
            <div className="p-3 rounded-full bg-green-50 text-green-700 border-green-200">
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
          </div>
        </CardBody>
      </Card>

      {/* Alerts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Expiring Soon */}
        <Card>
          <CardHeader>
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-semibold text-gray-900">สินค้าใกล้หมดอายุ</h3>
              <Link href="/alerts/expiry">
                <Button variant="outline" size="sm">ดูทั้งหมด</Button>
              </Link>
            </div>
          </CardHeader>
          <CardBody>
            {expiringSoon.length === 0 ? (
              <p className="text-gray-500 text-center py-4">ไม่มีสินค้าใกล้หมดอายุ</p>
            ) : (
              <div className="space-y-3">
                {expiringSoon.slice(0, 5).map((product) => (
                  <div key={product.id} className="flex justify-between items-center p-3 bg-yellow-50 rounded-lg">
                    <div>
                      <p className="font-medium text-gray-900">{product.name}</p>
                      <p className="text-sm text-gray-600">{product.category}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-medium text-yellow-700">คงเหลือ {product.quantity} ชิ้น</p>
                      <p className="text-xs text-gray-500">
                        หมดอายุ: {product.expiryDate?.toLocaleDateString('th-TH')}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardBody>
        </Card>

        {/* Low Stock */}
        <Card>
          <CardHeader>
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-semibold text-gray-900">สต็อกต่ำ</h3>
              <Link href="/products?filter=lowstock">
                <Button variant="outline" size="sm">ดูทั้งหมด</Button>
              </Link>
            </div>
          </CardHeader>
          <CardBody>
            {lowStock.length === 0 ? (
              <p className="text-gray-500 text-center py-4">ไม่มีสินค้าสต็อกต่ำ</p>
            ) : (
              <div className="space-y-3">
                {lowStock.slice(0, 5).map((product) => (
                  <div key={product.id} className="flex justify-between items-center p-3 bg-orange-50 rounded-lg">
                    <div>
                      <p className="font-medium text-gray-900">{product.name}</p>
                      <p className="text-sm text-gray-600">{product.category}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-medium text-orange-700">คงเหลือ {product.quantity} ชิ้น</p>
                      <p className="text-xs text-gray-500">
                        เกณฑ์: {product.lowStockThreshold || 10} ชิ้น
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardBody>
        </Card>
      </div>

      {/* Expired Products */}
      {expired.length > 0 && (
        <Card>
          <CardHeader>
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-semibold text-red-900">สินค้าหมดอายุแล้ว</h3>
              <Link href="/alerts/expiry?status=expired">
                <Button variant="danger" size="sm">จัดการทันที</Button>
              </Link>
            </div>
          </CardHeader>
          <CardBody>
            <div className="space-y-3">
              {expired.slice(0, 3).map((product) => (
                <div key={product.id} className="flex justify-between items-center p-3 bg-red-50 rounded-lg border border-red-200">
                  <div>
                    <p className="font-medium text-red-900">{product.name}</p>
                    <p className="text-sm text-red-700">{product.category}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium text-red-700">คงเหลือ {product.quantity} ชิ้น</p>
                    <p className="text-xs text-red-600">
                      หมดอายุเมื่อ: {product.expiryDate?.toLocaleDateString('th-TH')}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </CardBody>
        </Card>
      )}
    </div>
  );
}