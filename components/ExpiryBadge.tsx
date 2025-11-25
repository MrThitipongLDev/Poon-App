import type { Product } from '@/lib/types';
import { getExpiryStatus, getExpiryBadgeColor, getExpiryBadgeText, formatDaysUntilExpiry } from '@/lib/utils';

interface ExpiryBadgeProps {
  product: Product;
  showDays?: boolean;
  size?: 'sm' | 'md';
}

export function ExpiryBadge({ product, showDays = false, size = 'md' }: ExpiryBadgeProps) {
  const expiryStatus = getExpiryStatus(product.expiryDate, product.expiryWarningDays);
  const colorClasses = getExpiryBadgeColor(expiryStatus.status);
  const text = getExpiryBadgeText(expiryStatus.status);
  
  const sizeClasses = {
    sm: 'px-2 py-1 text-xs',
    md: 'px-3 py-1 text-sm',
  };

  if (!product.expiryDate) {
    return (
      <span className={`inline-flex items-center rounded-full border border-gray-200 bg-gray-50 text-gray-500 ${sizeClasses[size]}`}>
        ไม่มีวันหมดอายุ
      </span>
    );
  }

  return (
    <div className="flex flex-col gap-1">
      <span className={`inline-flex items-center rounded-full border ${colorClasses} ${sizeClasses[size]}`}>
        {text}
      </span>
      {showDays && expiryStatus.daysUntilExpiry !== null && (
        <span className="text-xs text-gray-500">
          {formatDaysUntilExpiry(expiryStatus.daysUntilExpiry)}
        </span>
      )}
    </div>
  );
}