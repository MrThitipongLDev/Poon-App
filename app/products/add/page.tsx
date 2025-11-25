'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/Button';
import { Input, Textarea } from '@/components/ui/Input';
import { Card, CardBody, CardHeader } from '@/components/ui/Card';
import { getMockData } from '@/lib/data';
import { generateId } from '@/lib/utils';
import type { Product } from '@/lib/types';
import Link from 'next/link';

export default function AddProductPage() {
  const router = useRouter();
  const { categories } = getMockData();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    price: '',
    quantity: '',
    category: '',
    batchNumber: '',
    manufactureDate: '',
    expiryDate: '',
    lowStockThreshold: '10',
    expiryWarningDays: '7',
    description: '',
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // In a real app, this would be an API call
      const newProduct: Product = {
        id: generateId(),
        name: formData.name,
        price: parseFloat(formData.price),
        quantity: parseInt(formData.quantity),
        category: formData.category,
        batchNumber: formData.batchNumber || undefined,
        manufactureDate: formData.manufactureDate ? new Date(formData.manufactureDate) : undefined,
        expiryDate: formData.expiryDate ? new Date(formData.expiryDate) : undefined,
        lowStockThreshold: parseInt(formData.lowStockThreshold),
        expiryWarningDays: parseInt(formData.expiryWarningDays),
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      console.log('New product:', newProduct);
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Redirect to products list
      router.push('/products');
    } catch (error) {
      console.error('Error creating product:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const isFormValid = formData.name && formData.price && formData.quantity && formData.category;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">เพิ่มสินค้าใหม่</h1>
          <p className="text-gray-600">กรอกข้อมูลสินค้าใหม่ในระบบ</p>
        </div>
        <Link href="/products">
          <Button variant="outline">ยกเลิก</Button>
        </Link>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Information */}
          <div className="lg:col-span-2 space-y-6">
            <Card>
              <CardHeader>
                <h3 className="text-lg font-semibold text-gray-900">ข้อมูลหลัก</h3>
              </CardHeader>
              <CardBody className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Input
                    label="ชื่อสินค้า *"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="กรอกชื่อสินค้า"
                    required
                  />

                  <div>
                    <label className="mb-1 block text-sm font-medium text-gray-700">
                      หมวดหมู่ *
                    </label>
                    <select
                      name="category"
                      value={formData.category}
                      onChange={handleInputChange}
                      className="block w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                      required
                    >
                      <option value="">เลือกหมวดหมู่</option>
                      {categories.map(category => (
                        <option key={category.id} value={category.name}>
                          {category.name}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Input
                    label="ราคา *"
                    name="price"
                    type="number"
                    step="0.01"
                    min="0"
                    value={formData.price}
                    onChange={handleInputChange}
                    placeholder="0.00"
                    helperText="บาท"
                    required
                  />

                  <Input
                    label="จำนวน *"
                    name="quantity"
                    type="number"
                    min="0"
                    value={formData.quantity}
                    onChange={handleInputChange}
                    placeholder="0"
                    helperText="ชิ้น"
                    required
                  />
                </div>

                <Textarea
                  label="รายละเอียดสินค้า"
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  placeholder="กรอกรายละเอียดเพิ่มเติม (ถ้ามี)"
                  rows={3}
                />
              </CardBody>
            </Card>

            <Card>
              <CardHeader>
                <h3 className="text-lg font-semibold text-gray-900">ข้อมูลวันหมดอายุและล็อต</h3>
              </CardHeader>
              <CardBody className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Input
                    label="หมายเลขล็อต"
                    name="batchNumber"
                    value={formData.batchNumber}
                    onChange={handleInputChange}
                    placeholder="กรอกหมายเลขล็อต (ถ้ามี)"
                  />

                  <Input
                    label="วันผลิต"
                    name="manufactureDate"
                    type="date"
                    value={formData.manufactureDate}
                    onChange={handleInputChange}
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Input
                    label="วันหมดอายุ"
                    name="expiryDate"
                    type="date"
                    value={formData.expiryDate}
                    onChange={handleInputChange}
                    helperText="ปล่อยว่างไว้ถ้าสินค้าไม่มีวันหมดอายุ"
                  />

                  <Input
                    label="แจ้งเตือนล่วงหน้า (วัน)"
                    name="expiryWarningDays"
                    type="number"
                    min="1"
                    max="365"
                    value={formData.expiryWarningDays}
                    onChange={handleInputChange}
                    helperText="จำนวนวันก่อนหมดอายุที่จะแจ้งเตือน"
                  />
                </div>
              </CardBody>
            </Card>
          </div>

          {/* Settings */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <h3 className="text-lg font-semibold text-gray-900">การตั้งค่า</h3>
              </CardHeader>
              <CardBody className="space-y-4">
                <Input
                  label="เกณฑ์สต็อกต่ำ"
                  name="lowStockThreshold"
                  type="number"
                  min="1"
                  value={formData.lowStockThreshold}
                  onChange={handleInputChange}
                  helperText="แจ้งเตือนเมื่อสินค้าเหลือน้อยกว่าจำนวนนี้"
                />

                <div className="p-4 bg-blue-50 rounded-lg">
                  <h4 className="font-medium text-blue-900 mb-2">ข้อมูลการแจ้งเตือน</h4>
                  <ul className="text-sm text-blue-700 space-y-1">
                    <li>• แจ้งเตือนสินค้าใกล้หมดอายุ {formData.expiryWarningDays} วัน</li>
                    <li>• แจ้งเตือนเมื่อสินค้าเหลือ {formData.lowStockThreshold} ชิ้น</li>
                    <li>• แสดงสถานะวันหมดอายุด้วยสี</li>
                  </ul>
                </div>
              </CardBody>
            </Card>

            {/* Actions */}
            <Card>
              <CardBody className="space-y-3">
                <Button
                  type="submit"
                  className="w-full"
                  disabled={!isFormValid || isSubmitting}
                >
                  {isSubmitting ? 'กำลังบันทึก...' : 'บันทึกสินค้า'}
                </Button>
                
                <Link href="/products">
                  <Button variant="outline" className="w-full">
                    ยกเลิก
                  </Button>
                </Link>
              </CardBody>
            </Card>
          </div>
        </div>
      </form>
    </div>
  );
}