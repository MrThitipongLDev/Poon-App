'use client';

import { useMemo, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { ProductCard } from '@/components/ProductCard';
import { Button } from '@/components/ui/Button';
import { Card, CardBody, CardHeader } from '@/components/ui/Card';
import { getMockData } from '@/lib/data';
import { getProductsExpiringSoon, getExpiredProducts, formatCurrency, formatDate } from '@/lib/utils';
import Link from 'next/link';

function ExpiryAlertsContent() {
  const searchParams = useSearchParams();
  const statusFilter = searchParams.get('status') || 'all';
  const { products } = getMockData();

  const expiringSoon = getProductsExpiringSoon(products);
  const expired = getExpiredProducts(products);

  const filteredProducts = useMemo(() => {
    switch (statusFilter) {
      case 'expiring':
        return expiringSoon;
      case 'expired':
        return expired;
      case 'all':
      default:
        return [...expiringSoon, ...expired];
    }
  }, [statusFilter, expiringSoon, expired]);

  const stats = {
    expiringSoon: expiringSoon.length,
    expired: expired.length,
    total: expiringSoon.length + expired.length,
  };

  const handleBulkAction = (action: 'remove' | 'discount' | 'transfer') => {
    console.log(`Bulk action: ${action}`, filteredProducts);
    // TODO: Implement bulk actions
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">แจ้งเตือนวันหมดอายุ</h1>
          <p className="text-gray-600">จัดการสินค้าที่ใกล้หมดอายุและหมดอายุแล้ว</p>
        </div>
        <Link href="/dashboard">
          <Button variant="outline">กลับแดชบอร์ด</Button>
        </Link>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="border-l-4 border-l-yellow-500">
          <CardBody className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">ใกล้หมดอายุ</p>
                <p className="text-2xl font-bold text-yellow-700">{stats.expiringSoon}</p>
              </div>
              <div className="p-3 rounded-full bg-yellow-50 text-yellow-700 border-yellow-200">
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
            </div>
          </CardBody>
        </Card>

        <Card className="border-l-4 border-l-red-500">
          <CardBody className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">หมดอายุแล้ว</p>
                <p className="text-2xl font-bold text-red-700">{stats.expired}</p>
              </div>
              <div className="p-3 rounded-full bg-red-50 text-red-700 border-red-200">
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
              </div>
            </div>
          </CardBody>
        </Card>

        <Card className="border-l-4 border-l-blue-500">
          <CardBody className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">มูลค่าสินค้า</p>
                <p className="text-2xl font-bold text-blue-700">
                  {formatCurrency(
                    filteredProducts.reduce((sum, product) => sum + (product.price * product.quantity), 0)
                  )}
                </p>
              </div>
              <div className="p-3 rounded-full bg-blue-50 text-blue-700 border-blue-200">
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
            </div>
          </CardBody>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <CardBody className="p-4">
          <div className="flex flex-wrap gap-2">
            <Link href="/alerts/expiry?status=all">
              <Button
                variant={statusFilter === 'all' ? 'primary' : 'outline'}
                size="sm"
              >
                ทั้งหมด ({stats.total})
              </Button>
            </Link>
            <Link href="/alerts/expiry?status=expiring">
              <Button
                variant={statusFilter === 'expiring' ? 'primary' : 'outline'}
                size="sm"
                className="border-yellow-300 text-yellow-700 hover:bg-yellow-50"
              >
                ใกล้หมดอายุ ({stats.expiringSoon})
              </Button>
            </Link>
            <Link href="/alerts/expiry?status=expired">
              <Button
                variant={statusFilter === 'expired' ? 'primary' : 'outline'}
                size="sm"
                className="border-red-300 text-red-700 hover:bg-red-50"
              >
                หมดอายุแล้ว ({stats.expired})
              </Button>
            </Link>
          </div>
        </CardBody>
      </Card>

      {/* Bulk Actions */}
      {filteredProducts.length > 0 && (
        <Card>
          <CardBody className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-medium text-gray-900">ดำเนินการกับสินค้าที่เลือก ({filteredProducts.length} รายการ)</h3>
                <p className="text-sm text-gray-500">เลือกสินค้าเพื่อดำเนินการพร้อมกัน</p>
              </div>
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleBulkAction('discount')}
                  className="text-orange-700 border-orange-300 hover:bg-orange-50"
                >
                  ลดราคา
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleBulkAction('transfer')}
                  className="text-blue-700 border-blue-300 hover:bg-blue-50"
                >
                โอนย้าย
                </Button>
                <Button
                  variant="danger"
                  size="sm"
                  onClick={() => handleBulkAction('remove')}
                >
                  นำออก/ทำลาย
                </Button>
              </div>
            </div>
          </CardBody>
        </Card>
      )}

      {/* Products List */}
      {filteredProducts.length === 0 ? (
        <Card>
          <CardBody className="text-center py-12">
            <div className="text-gray-400 mb-4">
              <svg className="mx-auto h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">ไม่มีสินค้าที่ต้องจัดการ</h3>
            <p className="text-gray-500 mb-4">ไม่มีสินค้าที่ใกล้หมดอายุหรือหมดอายุแล้วในขณะนี้</p>
            <Link href="/dashboard">
              <Button>กลับแดชบอร์ด</Button>
            </Link>
          </CardBody>
        </Card>
      ) : (
        <div className="space-y-4">
          {/* Summary Table */}
          <Card>
            <CardHeader>
              <h3 className="text-lg font-semibold text-gray-900">สรุปรายการสินค้า</h3>
            </CardHeader>
            <CardBody>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-gray-200">
                      <th className="text-left py-3 px-4 font-medium text-gray-900">สินค้า</th>
                      <th className="text-left py-3 px-4 font-medium text-gray-900">หมวดหมู่</th>
                      <th className="text-left py-3 px-4 font-medium text-gray-900">จำนวน</th>
                      <th className="text-left py-3 px-4 font-medium text-gray-900">มูลค่า</th>
                      <th className="text-left py-3 px-4 font-medium text-gray-900">วันหมดอายุ</th>
                      <th className="text-left py-3 px-4 font-medium text-gray-900">สถานะ</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredProducts.map((product) => (
                      <tr key={product.id} className="border-b border-gray-100 hover:bg-gray-50">
                        <td className="py-3 px-4">
                          <div>
                            <p className="font-medium text-gray-900">{product.name}</p>
                            {product.batchNumber && (
                              <p className="text-xs text-gray-500">ล็อต: {product.batchNumber}</p>
                            )}
                          </div>
                        </td>
                        <td className="py-3 px-4 text-gray-600">{product.category}</td>
                        <td className="py-3 px-4 text-gray-600">{product.quantity} ชิ้น</td>
                        <td className="py-3 px-4 text-gray-600">
                          {formatCurrency(product.price * product.quantity)}
                        </td>
                        <td className="py-3 px-4 text-gray-600">
                          {product.expiryDate ? formatDate(product.expiryDate) : '-'}
                        </td>
                        <td className="py-3 px-4">
                          {product.expiryDate && (
                            <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                              new Date(product.expiryDate) < new Date()
                                ? 'bg-red-100 text-red-800 border-red-200'
                                : 'bg-yellow-100 text-yellow-800 border-yellow-200'
                            }`}>
                              {new Date(product.expiryDate) < new Date() ? 'หมดอายุแล้ว' : 'ใกล้หมดอายุ'}
                            </span>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardBody>
          </Card>

          {/* Product Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onView={(product) => {
                  console.log('View product:', product);
                }}
                onEdit={(product) => {
                  console.log('Edit product:', product);
                }}
                onDelete={(product) => {
                  console.log('Delete product:', product);
                }}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default function ExpiryAlertsPage() {
  return (
    <Suspense fallback={<div className="flex justify-center items-center h-64">กำลังโหลด...</div>}>
      <ExpiryAlertsContent />
    </Suspense>
  );
}