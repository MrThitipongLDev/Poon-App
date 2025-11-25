'use client';

import { useState } from 'react';
import type { Product } from '@/lib/types';
import { Card, CardBody } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Modal } from '@/components/ui/Modal';
import { ExpiryBadge } from '@/components/ExpiryBadge';
import { formatCurrency, formatDate, isLowStock } from '@/lib/utils';
import Link from 'next/link';

interface ProductCardProps {
  product: Product;
  onEdit?: (product: Product) => void;
  onDelete?: (product: Product) => void;
  onView?: (product: Product) => void;
  showActions?: boolean;
}

export function ProductCard({ product, onEdit, onDelete, onView, showActions = true }: ProductCardProps) {
  const lowStock = isLowStock(product);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const handleDelete = () => {
    if (onDelete) {
      onDelete(product);
      setShowDeleteModal(false);
    }
  };

  return (
    <>
      <Card className="hover:shadow-md transition-shadow">
      <CardBody>
        <div className="flex justify-between items-start mb-3">
          <div className="flex-1">
            <h3 className="text-lg font-semibold text-gray-900 mb-1">{product.name}</h3>
            <p className="text-sm text-gray-500">{product.category}</p>
          </div>
          <div className="flex flex-col items-end gap-2">
            <ExpiryBadge product={product} showDays={true} size="sm" />
            {lowStock && (
              <span className="inline-flex items-center rounded-full border border-orange-200 bg-orange-50 px-2 py-1 text-xs font-medium text-orange-800">
                สต็อกต่ำ
              </span>
            )}
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 mb-4">
          <div>
            <p className="text-sm text-gray-500">ราคา</p>
            <p className="text-lg font-semibold text-gray-900">{formatCurrency(product.price)}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">คงเหลือ</p>
            <p className={`text-lg font-semibold ${lowStock ? 'text-orange-600' : 'text-gray-900'}`}>
              {product.quantity} ชิ้น
            </p>
          </div>
        </div>

        {product.expiryDate && (
          <div className="mb-4">
            <p className="text-sm text-gray-500">วันหมดอายุ</p>
            <p className="text-sm font-medium text-gray-900">{formatDate(product.expiryDate)}</p>
          </div>
        )}

        {product.batchNumber && (
          <div className="mb-4">
            <p className="text-sm text-gray-500">หมายเลขล็อต</p>
            <p className="text-sm font-medium text-gray-900">{product.batchNumber}</p>
          </div>
        )}

        {showActions && (
          <div className="flex gap-2 pt-3 border-t border-gray-100">
            {onView ? (
              <button
                onClick={() => onView(product)}
                className="flex-1 px-3 py-1.5 text-sm bg-blue-50 text-blue-700 rounded-lg hover:bg-blue-100 transition-colors"
              >
                ดูรายละเอียด
              </button>
            ) : (
              <Link
                href={`/products/${product.id}`}
                className="flex-1 px-3 py-1.5 text-sm bg-blue-50 text-blue-700 rounded-lg hover:bg-blue-100 transition-colors text-center"
              >
                ดูรายละเอียด
              </Link>
            )}
            {onEdit ? (
              <button
                onClick={() => onEdit(product)}
                className="flex-1 px-3 py-1.5 text-sm bg-gray-50 text-gray-700 rounded-lg hover:bg-gray-100 transition-colors"
              >
                แก้ไข
              </button>
            ) : (
              <Link
                href={`/products/${product.id}/edit`}
                className="flex-1 px-3 py-1.5 text-sm bg-gray-50 text-gray-700 rounded-lg hover:bg-gray-100 transition-colors text-center"
              >
                แก้ไข
              </Link>
            )}
            {onDelete && (
              <button
                onClick={() => setShowDeleteModal(true)}
                className="flex-1 px-3 py-1.5 text-sm bg-red-50 text-red-700 rounded-lg hover:bg-red-100 transition-colors"
              >
                ลบ
              </button>
            )}
          </div>
        )}
      </CardBody>
    </Card>

    <Modal
      isOpen={showDeleteModal}
      onClose={() => setShowDeleteModal(false)}
      title="ยืนยันการลบสินค้า"
      size="sm"
    >
      <div className="space-y-4">
        <div className="text-center">
          <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-red-100 mb-4">
            <svg className="h-6 w-6 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z" />
            </svg>
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">ยืนยันการลบสินค้า</h3>
          <p className="text-sm text-gray-500">
            คุณต้องการลบสินค้า &quot;{product.name}&quot; ใช่หรือไม่?
          </p>
          <p className="text-xs text-gray-400 mt-1">
            การดำเนินการนี้ไม่สามารถย้อนกลับได้
          </p>
        </div>
        
        <div className="flex gap-3 pt-4">
          <Button
            variant="outline"
            className="flex-1"
            onClick={() => setShowDeleteModal(false)}
          >
            ยกเลิก
          </Button>
          <Button
            variant="danger"
            className="flex-1"
            onClick={handleDelete}
          >
            ลบสินค้า
          </Button>
        </div>
      </div>
    </Modal>
    </>
  );
}