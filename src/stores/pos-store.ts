/**
 * Zustand Store สำหรับจัดการตะกร้าสินค้าในระบบ POS (Point of Sale)
 * ใช้ persist middleware เพื่อเก็บข้อมูลใน localStorage
 */

import { create } from "zustand";
import { persist } from "zustand/middleware";

/**
 * ประเภทข้อมูลของสินค้าในตะกร้า POS
 */
export type POSCartItem = {
  id: number;        // ID ของสินค้า (Product ID)
  barcode: string;   // รหัสบาร์โค้ดของสินค้า
  name: string;      // ชื่อสินค้า
  price: number;     // ราคาต่อหน่วย
  quantity: number;  // จำนวนที่สั่งซื้อ
};

/**
 * ประเภทข้อมูลของ POS Store
 * รวม state และ actions ทั้งหมด
 */
type POSStore = {
  items: POSCartItem[];  // รายการสินค้าในตะกร้า

  // Actions สำหรับจัดการตะกร้า
  addItemByBarcode: (id: number, barcode: string, name: string, price: number) => void;  // เพิ่มสินค้าด้วยบาร์โค้ด
  updateQuantity: (barcode: string, quantity: number) => void;  // อัพเดทจำนวนสินค้า
  removeItem: (barcode: string) => void;  // ลบสินค้าออกจากตะกร้า
  clearCart: () => void;  // ล้างตะกร้าทั้งหมด

  // Computed values สำหรับคำนวณยอดรวม
  getTotalItems: () => number;    // จำนวนสินค้าทั้งหมด (รวม quantity)
  getTotalPrice: () => number;    // ยอดชำระทั้งหมด (รวมส่วนลด)
  getSubtotal: () => number;      // ยอดรวมก่อนหักส่วนลด
  getDiscount: () => number;      // ยอดส่วนลด
};

/**
 * สร้าง POS Store ด้วย Zustand
 * ใช้ persist middleware เพื่อบันทึกข้อมูลใน localStorage
 */
export const usePOSStore = create<POSStore>()(
  persist(
    (set, get) => ({
      // State เริ่มต้น: ตะกร้าว่าง
      items: [],

      /**
       * เพิ่มสินค้าเข้าตะกร้าด้วยบาร์โค้ด
       * ถ้ามีสินค้าอยู่แล้ว จะเพิ่ม quantity ขึ้น 1
       * ถ้ายังไม่มี จะเพิ่มสินค้าใหม่เข้าไป
       */
      addItemByBarcode: (id, barcode, name, price) => {
        const existing = get().items.find((i) => i.barcode === barcode);

        if (existing) {
          // สินค้ามีอยู่แล้ว: เพิ่ม quantity
          set({
            items: get().items.map((i) =>
              i.barcode === barcode ? { ...i, quantity: i.quantity + 1 } : i
            ),
          });
        } else {
          // สินค้าใหม่: เพิ่มเข้าตะกร้าด้วย quantity = 1
          set({
            items: [...get().items, { id, barcode, name, price, quantity: 1 }],
          });
        }
      },

      /**
       * อัพเดทจำนวนสินค้า
       * ถ้า quantity <= 0 จะลบสินค้าออกจากตะกร้า
       */
      updateQuantity: (barcode, quantity) => {
        if (quantity <= 0) {
          // ถ้าจำนวนเป็น 0 หรือติดลบ ให้ลบสินค้าออก
          get().removeItem(barcode);
          return;
        }

        // อัพเดท quantity ของสินค้าที่ตรงกับ barcode
        set({
          items: get().items.map((i) =>
            i.barcode === barcode ? { ...i, quantity } : i
          ),
        });
      },

      /**
       * ลบสินค้าออกจากตะกร้าตาม barcode
       */
      removeItem: (barcode) =>
        set({
          items: get().items.filter((i) => i.barcode !== barcode),
        }),

      /**
       * ล้างตะกร้าทั้งหมด (ลบสินค้าทั้งหมด)
       */
      clearCart: () => set({ items: [] }),

      /**
       * คำนวณจำนวนสินค้าทั้งหมดในตะกร้า (รวม quantity)
       * @returns จำนวนสินค้าทั้งหมด
       */
      getTotalItems: () =>
        get().items.reduce((total, item) => total + item.quantity, 0),

      /**
       * คำนวณยอดรวมก่อนหักส่วนลด
       * @returns ยอดรวม (price × quantity ของทุกรายการ)
       */
      getSubtotal: () =>
        get().items.reduce((total, item) => total + item.price * item.quantity, 0),

      /**
       * คำนวณส่วนลด
       * @returns ยอดส่วนลด (ปัจจุบันคืนค่า 0 อาจจะเพิ่มทีหลัง)
       */
      getDiscount: () => 0, // ส่วนลดอาจจะเพิ่มทีหลัง

      /**
       * คำนวณยอดชำระทั้งหมด (ยอดรวม - ส่วนลด)
       * @returns ยอดที่ต้องชำระจริง
       */
      getTotalPrice: () =>
        get().getSubtotal() - get().getDiscount(),
    }),
    {
      name: "my-pos-cart", // ชื่อ key ที่ใช้เก็บใน localStorage
    }
  )
);
