import type { Product } from '@/lib/types';
import { Card, CardBody } from '@/components/ui/Card';
import { ExpiryBadge } from '@/components/ExpiryBadge';
import { formatCurrency, formatDate, isLowStock } from '@/lib/utils';

interface ProductCardProps {
  product: Product;
  onEdit?: (product: Product) => void;
  onDelete?: (product: Product) => void;
  onView?: (product: Product) => void;
}

export function ProductCard({ product, onEdit, onDelete, onView }: ProductCardProps) {
  const lowStock = isLowStock(product);

  return (
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

        <div className="flex gap-2 pt-3 border-t border-gray-100">
          {onView && (
            <button
              onClick={() => onView(product)}
              className="flex-1 px-3 py-1.5 text-sm bg-blue-50 text-blue-700 rounded-lg hover:bg-blue-100 transition-colors"
            >
              ดูรายละเอียด
            </button>
          )}
          {onEdit && (
            <button
              onClick={() => onEdit(product)}
              className="flex-1 px-3 py-1.5 text-sm bg-gray-50 text-gray-700 rounded-lg hover:bg-gray-100 transition-colors"
            >
              แก้ไข
            </button>
          )}
          {onDelete && (
            <button
              onClick={() => onDelete(product)}
              className="flex-1 px-3 py-1.5 text-sm bg-red-50 text-red-700 rounded-lg hover:bg-red-100 transition-colors"
            >
              ลบ
            </button>
          )}
        </div>
      </CardBody>
    </Card>
  );
}