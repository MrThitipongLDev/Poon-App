'use client';

import { useState, useEffect, Suspense } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { Button } from '@/components/ui/Button';
import { Card, CardBody, CardHeader } from '@/components/ui/Card';
import { ExpiryBadge } from '@/components/ExpiryBadge';
import { getMockData } from '@/lib/data';
import { formatCurrency, formatDate, formatExpiryDate, formatDaysUntilExpiry, getExpiryStatus, isLowStock } from '@/lib/utils';
import type { Product } from '@/lib/types';
import Link from 'next/link';

function ProductDetailContent() {
  const params = useParams();
  const router = useRouter();
  const { products } = getMockData();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const foundProduct = products.find(p => p.id === params.id);
    setProduct(foundProduct || null);
    setLoading(false);
  }, [params.id, products]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="space-y-6">
        <div className="text-center py-12">
          <div className="text-gray-400 mb-4">
            <svg className="mx-auto h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">ไม่พบสินค้า</h3>
          <p className="text-gray-500 mb-4">สินค้าที่คุณค้นหาไม่มีในระบบ</p>
          <Link href="/products">
            <Button>กลับไปหน้ารายการสินค้า</Button>
          </Link>
        </div>
      </div>
    );
  }

  const expiryStatus = getExpiryStatus(product.expiryDate, product.expiryWarningDays);
  const lowStock = isLowStock(product);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-4">
          <Link href="/products">
            <Button variant="outline" size="sm">
              ← กลับ
            </Button>
          </Link>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">{product.name}</h1>
            <p className="text-gray-600">{product.category}</p>
          </div>
        </div>
        <div className="flex gap-2">
          <Link href={`/products/${product.id}/edit`}>
            <Button>แก้ไข</Button>
          </Link>
          <Button 
            variant="danger" 
            onClick={() => {
              if (confirm('คุณต้องการลบสินค้านี้ใช่หรือไม่?')) {
                console.log('Delete product:', product.id);
                router.push('/products');
              }
            }}
          >
            ลบ
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Information */}
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <h3 className="text-lg font-semibold text-gray-900">ข้อมูลทั่วไป</h3>
            </CardHeader>
            <CardBody>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <p className="text-sm text-gray-500 mb-1">ชื่อสินค้า</p>
                  <p className="text-base font-medium text-gray-900">{product.name}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500 mb-1">หมวดหมู่</p>
                  <p className="text-base font-medium text-gray-900">{product.category}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500 mb-1">ราคาต่อหน่วย</p>
                  <p className="text-lg font-semibold text-gray-900">{formatCurrency(product.price)}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500 mb-1">จำนวนคงเหลือ</p>
                  <p className={`text-lg font-semibold ${lowStock ? 'text-orange-600' : 'text-gray-900'}`}>
                    {product.quantity} ชิ้น
                  </p>
                </div>
              </div>
            </CardBody>
          </Card>

          <Card>
            <CardHeader>
              <h3 className="text-lg font-semibold text-gray-900">ข้อมูลวันหมดอายุและล็อต</h3>
            </CardHeader>
            <CardBody>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <p className="text-sm text-gray-500 mb-1">หมายเลขล็อต</p>
                  <p className="text-base font-medium text-gray-900">
                    {product.batchNumber || '-'}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-500 mb-1">วันผลิต</p>
                  <p className="text-base font-medium text-gray-900">
                    {product.manufactureDate ? formatDate(product.manufactureDate) : '-'}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-500 mb-1">วันหมดอายุ</p>
                  <p className="text-base font-medium text-gray-900">
                    {formatExpiryDate(product.expiryDate)}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-500 mb-1">สถานะวันหมดอายุ</p>
                  <div className="flex items-center gap-2">
                    <ExpiryBadge product={product} showDays={true} size="sm" />
                    {product.expiryDate && (
                      <span className="text-sm text-gray-600">
                        ({formatDaysUntilExpiry(expiryStatus.daysUntilExpiry)})
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </CardBody>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <h3 className="text-lg font-semibold text-gray-900">สถานะปัจจุบัน</h3>
            </CardHeader>
            <CardBody className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-500">สถานะสต็อก</span>
                {lowStock ? (
                  <span className="inline-flex items-center rounded-full border border-orange-200 bg-orange-50 px-2 py-1 text-xs font-medium text-orange-800">
                    สต็อกต่ำ
                  </span>
                ) : (
                  <span className="inline-flex items-center rounded-full border border-green-200 bg-green-50 px-2 py-1 text-xs font-medium text-green-800">
                    ปกติ
                  </span>
                )}
              </div>
              
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-500">สถานะวันหมดอายุ</span>
                <ExpiryBadge product={product} showDays={false} size="sm" />
              </div>

              <div className="pt-4 border-t border-gray-100">
                <p className="text-sm text-gray-500 mb-2">มูลค่าสินค้าคงเหลือ</p>
                <p className="text-xl font-bold text-gray-900">
                  {formatCurrency(product.price * product.quantity)}
                </p>
              </div>
            </CardBody>
          </Card>

          <Card>
            <CardHeader>
              <h3 className="text-lg font-semibold text-gray-900">การตั้งค่าแจ้งเตือน</h3>
            </CardHeader>
            <CardBody className="space-y-4">
              <div>
                <p className="text-sm text-gray-500 mb-1">เกณฑ์สต็อกต่ำ</p>
                <p className="text-base font-medium text-gray-900">
                  {product.lowStockThreshold || 10} ชิ้น
                </p>
              </div>
              
              <div>
                <p className="text-sm text-gray-500 mb-1">แจ้งเตือนล่วงหน้า</p>
                <p className="text-base font-medium text-gray-900">
                  {product.expiryWarningDays || 7} วันก่อนหมดอายุ
                </p>
              </div>
            </CardBody>
          </Card>

          <Card>
            <CardHeader>
              <h3 className="text-lg font-semibold text-gray-900">ข้อมูลระบบ</h3>
            </CardHeader>
            <CardBody className="space-y-4">
              <div>
                <p className="text-sm text-gray-500 mb-1">รหัสสินค้า</p>
                <p className="text-base font-mono text-gray-900">{product.id}</p>
              </div>
              
              <div>
                <p className="text-sm text-gray-500 mb-1">วันที่สร้าง</p>
                <p className="text-base font-medium text-gray-900">
                  {formatDate(product.createdAt)}
                </p>
              </div>
              
              <div>
                <p className="text-sm text-gray-500 mb-1">อัปเดตล่าสุด</p>
                <p className="text-base font-medium text-gray-900">
                  {formatDate(product.updatedAt)}
                </p>
              </div>
            </CardBody>
          </Card>
        </div>
      </div>
    </div>
  );
}

export default function ProductDetailPage() {
  return (
    <Suspense fallback={
      <div className="flex justify-center items-center min-h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    }>
      <ProductDetailContent />
    </Suspense>
  );
}