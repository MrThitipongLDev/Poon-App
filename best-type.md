หมวด 1: Configuration & Setup 

    Strict Mode: ตั้งค่า "strict": true เสมอ (สำคัญที่สุด)

    No Implicit Any: เปิด "noImplicitAny": true ห้ามปล่อยให้ตัวแปรเป็น any โดยอัตโนมัติ

    Strict Null Checks: เปิด "strictNullChecks": true ต้องจัดการค่า null และ undefined เสมอ

    No Unused Locals: เปิด "noUnusedLocals": true แจ้งเตือนเมื่อมีตัวแปรที่ประกาศแต่ไม่ได้ใช้

    No Unused Parameters: เปิด "noUnusedParameters": true แจ้งเตือนเมื่อมี parameter ในฟังก์ชันที่ไม่ได้ใช้

    Exact Optional Property: เปิด "exactOptionalPropertyTypes": true (ถ้าใช้ TS เวอร์ชั่นใหม่) เพื่อความแม่นยำของ optional field

    Force Consistent Casing: เปิด "forceConsistentCasingInFileNames": true ป้องกันปัญหาชื่อไฟล์ตัวเล็ก/ใหญ่ใน OS ต่างกัน

    Skip Lib Check: เปิด "skipLibCheck": true เพื่อลดเวลา compile (ข้ามการเช็ค file definition ของ library)

    Target ES Version: ตั้ง target ให้เหมาะสมกับ Environment (เช่น ES2020 หรือ ESNext สำหรับ Modern Browsers/Node)

    Module Resolution: ใช้ "moduleResolution": "bundler" หรือ "node" ตาม Project Setup

    Isolated Modules: เปิด "isolatedModules": true หากใช้ Vite หรือ Next.js

    Resolve Json Module: เปิด "resolveJsonModule": true หากต้องการ import file .json เข้ามาในโค้ด

หมวด 2: Type System Fundamentals

    Avoid any: ห้ามใช้ any ยกเว้นจำเป็นจริงๆ หรือกำลัง migrate โค้ดเก่า

    Use unknown: ใช้ unknown แทน any เมื่อไม่รู้ type แล้วค่อยทำ Type Guard ก่อนใช้

    Explicit Return Types: ระบุ Return Type ให้กับฟังก์ชันเสมอ (แม้ TS จะ infer ได้ก็ตาม) เพื่อความชัดเจน

    Type Inference: ปล่อยให้ TS infer ตัวแปรง่ายๆ เอง เช่น const x = 10 (ไม่ต้องเขียน const x: number = 10)

    Arrays: ใช้ Type[] (เช่น string[]) สำหรับ Array ง่ายๆ และ Array<Type> สำหรับ Array ที่ซับซ้อน

    Tuples: ใช้ Tuple เมื่อ Array มีขนาดคงที่และรู้ลำดับ type แน่นอน เช่น [string, number]

    Enums vs Unions: หลีกเลี่ยง enum ให้ใช้ Union Types ('A' | 'B') แทน เพราะเบากว่าและจัดการง่ายกว่า

    Const Assertions: ใช้ as const เมื่อต้องการให้ Object หรือ Array เป็น Readonly literal (เช่น const Config = { ... } as const)

    Type Aliases vs Interfaces:

        ใช้ interface สำหรับ Object ที่ต้องการ extends หรือ Public API

        ใช้ type สำหรับ Unions, Primitives, Tuples หรือ Function signatures

    No Object Type: ห้ามใช้ type Object หรือ {} (ตัวใหญ่) ให้ใช้ object (ตัวเล็ก) หรือระบุ structure ไปเลย

    Void vs Never:

        void: ฟังก์ชันที่ทำงานจบแต่ไม่ return ค่า

        never: ฟังก์ชันที่ไม่เคยทำงานจบ (เช่น throw error หรือ while true)

หมวด 3: Coding Syntax & Modern JS

    Optional Chaining: ใช้ ?. เช็ค property ซ้อนๆ กัน (user?.address?.city)

    Nullish Coalescing: ใช้ ?? แทน || เมื่อต้องการเช็คเฉพาะ null หรือ undefined (ไม่ใช่ Falsy values)

    Destructuring: ใช้ Object Destructuring ใน Function Parameter เพื่อให้เห็นชื่อตัวแปรชัดเจน

    Rest Parameters: ใช้ ...args แทน arguments object แบบเก่า

    Default Parameters: กำหนดค่าเริ่มต้นใน Parameter (func(a = 10)) แทนการเช็คในฟังก์ชัน

    Template Literals: ใช้ Backticks (`) แทน String concatenation (+)

    Arrow Functions: ใช้ Arrow function สำหรับ Callback หรือฟังก์ชันสั้นๆ

    Async/Await: ใช้ async/await แทน Promise.then/.catch เพื่อความอ่านง่าย

    Modules: ใช้ ES Modules (import/export) เสมอ ห้ามใช้ require (CommonJS) เว้นแต่จำเป็น

หมวด 4: Type Manipulation & Utility Types

    Partial: ใช้ Partial<T> เมื่อต้องการให้ทุก field เป็น optional (เช่น ตอน update ข้อมูล)

    Required: ใช้ Required<T> เมื่อต้องการบังคับว่าต้องมีครบทุก field

    Readonly: ใช้ Readonly<T> เพื่อป้องกันการแก้ไข Object

    Pick: ใช้ Pick<T, 'key'> เลือกเอาเฉพาะ field ที่ใช้

    Omit: ใช้ Omit<T, 'key'> ตัด field ที่ไม่ใช้ออก

    Record: ใช้ Record<Key, Value> แทน { [key: string]: any }

    ReturnType: ใช้ ReturnType<typeof func> เพื่อดึง type จากสิ่งที่ฟังก์ชัน return

    Parameters: ใช้ Parameters<typeof func> เพื่อดึง type ของ arguments

    Awaited: ใช้ Awaited<Promise<T>> เพื่อแกะ Type ออกจาก Promise

หมวด 5: Control Flow & Type Guards

    User-Defined Type Guards: สร้างฟังก์ชัน is... (เช่น isString(val): val is string)

    Discriminated Unions: ใส่ field type หรือ kind ใน object เพื่อให้ switch case แยก type ได้ง่าย

    Exhaustive Check: ใช้ตัวแปร type never ใน default case ของ switch เพื่อมั่นใจว่าดักครบทุกเคสแล้ว

    Assertion Functions: ใช้ asserts condition สำหรับฟังก์ชันที่ throw error ถ้าไม่ผ่านเงื่อนไข

    Use in Operator: เช็ค key ใน object ด้วย 'key' in obj เพื่อเป็น Type Guard

หมวด 6: Classes & OOP

    Access Modifiers: ระบุ public, private, protected ให้ชัดเจน

    Readonly Properties: ใช้ readonly กับ property ที่กำหนดค่าแค่ครั้งเดียวใน constructor

    Parameter Properties: ใช้ shortcut ใน constructor (constructor(private name: string)) เพื่อลดโค้ด

    Getters/Setters: ใช้ get และ set สำหรับ computed properties

    Abstract Classes: ใช้ abstract class สำหรับ base class ที่ห้าม new instance

    Implements: ใช้ implements เพื่อบังคับให้ Class ทำตาม Interface

    Prefer Composition: เน้น Composition (ประกอบ object) มากกว่า Inheritance (สืบทอด) ที่ลึกเกินไป

หมวด 7: Generics

    Naming Convention: ใช้ T, U, V สำหรับ Generic ง่ายๆ แต่ถ้าซับซ้อนให้ตั้งชื่อสื่อความหมาย (TResponse, TUser)

    Constraints: ใช้ extends จำกัดขอบเขต Generic (<T extends { id: string }>)

    Default Types: กำหนดค่า default ให้ Generic (<T = string>) ถ้าจำเป็น

    Don't Overuse: อย่าใช้ Generic ถ้า Type ธรรมดาก็เพียงพอแล้ว มันทำให้อ่านยาก

หมวด 8: Safety & Validation

    Avoid Non-Null Assertion: พยายามเลี่ยง ! (เช่น val!.prop) ให้ใช้ if เช็คแทน

    Runtime Validation: ใช้ Library อย่าง Zod, Yup หรือ Valibot ตรวจสอบข้อมูลจาก API หรือ Form

    Type Safe Fetching: สร้าง Wrapper function สำหรับ fetch ที่รับ Generic เพื่อกำหนด Type ของ Response

    No @ts-ignore: ห้ามใช้ @ts-ignore ถ้าไม่สุดวิสัยจริงๆ

    Use @ts-expect-error: ใช้ @ts-expect-error แทน @ts-ignore หากคาดว่าบรรทัดนั้นจะ error จริงๆ (เช่น ใน Test file)

หมวด 9: Naming Conventions

    PascalCase: ใช้สำหรับ Types, Interfaces, Classes, Enums

    camelCase: ใช้สำหรับ Variables, Functions, Methods, Properties

    UPPER_CASE: ใช้สำหรับ Constants ที่เป็น Global Config (MAX_RETRY)

    Boolean Naming: ตัวแปร Boolean ควรขึ้นต้นด้วย is, has, can, should (เช่น isValid, hasPermission)

    Interface Prefix: ไม่แนะนำ ให้ใส่ I นำหน้า Interface (เช่น IUser) ใน TypeScript สมัยใหม่ (ใช้ User ไปเลย)

    Generic Names: อย่าใช้ตัวย่อถ้าบริบทกว้าง ให้ใช้ชื่อเต็ม InputType, PropsType

หมวด 10: Code Organization & Comments

    Colocation: เก็บ Type ไว้ใกล้กับ Code ที่ใช้ (ไฟล์เดียวกัน หรือไฟล์ข้างๆ)

    Global Types: เก็บ Type ที่ใช้ทั้งโปรเจกต์ไว้ใน types/index.d.ts หรือ folder types/

    JSDoc: ใช้ JSDoc (/** ... */) อธิบายฟังก์ชัน เพื่อให้ IntelliSense แสดงคำอธิบายตอนเอาเมาส์ไปชี้

    TODO Comments: ใช้ // TODO: เพื่อมาร์คจุดที่ต้องกลับมาทำ

    Deprecated: ใช้ @deprecated ใน JSDoc เพื่อแจ้งเตือนว่าฟังก์ชันนี้เลิกใช้แล้ว

หมวด 11: React & Next.js Specifics (แถม)

    Component Props: ใช้ type Props = { ... } หรือ interface Props { ... } เสมอ

    No FC: หลีกเลี่ยง React.FC (ในบางกรณี) ให้เขียน function ธรรมดาและระบุ type props แทน

    Event Types: ใช้ Type ของ Event ให้ถูกต้อง (เช่น React.ChangeEvent<HTMLInputElement>)

    Hooks Typing: ระบุ Generic ให้ useState ถ้าค่าเริ่มต้นเป็น null (useState<User | null>(null))

    Children Prop: ใช้ React.ReactNode สำหรับ Type ของ children

    Style Props: ใช้ React.CSSProperties สำหรับ style object

หมวด 12: Advanced & Performance

    Mapped Types: เรียนรู้การใช้ Mapped Types ({ [K in keyof T]: ... }) เพื่อแปลง Type

    Conditional Types: เรียนรู้ T extends U ? X : Y เพื่อสร้าง Logic ในระดับ Type

    Template Literal Types: สร้าง Type จากการต่อ String (type ClickEvent = 'click:${Component}')

    Key Remapping: เปลี่ยนชื่อ Key ใน Mapped Types (as NewKey)

    Import Type: ใช้ import type { ... } เพื่อให้ Compiler รู้ว่า import นี้เอามาแค่ Type (ช่วยเรื่อง Tree Shaking)

หมวด 13: Testing (Testing Library / Jest)

    Mocking Types: ใช้ jest.Mocked<typeof func> เพื่อ Type safe ในการ Mock

    Test Id: ใช้ data-testid สำหรับ element ที่หาได้ยาก

    Type Safe Tests: เขียน Test ให้ผ่าน Type Check ด้วย อย่าใช้ any ใน Test เยอะเกินไป

หมวด 14: Linting & Formatting

    ESLint: ต้องมี ESLint ติดตั้งพร้อม Plugin TypeScript

    Prettier: ใช้ Prettier จัด Format อัตโนมัติ

    Husky: ใช้ Husky ทำ Git Hooks เพื่อรัน Lint ก่อน Commit

    Lint Staged: รัน Lint เฉพาะไฟล์ที่แก้ เพื่อความเร็ว

หมวด 15: Error Handling

    Custom Error Classes: สร้าง Class Error ของตัวเอง (class AppError extends Error)

    Catch Clause Variable: Type ของตัวแปรใน catch(e) คือ unknown (หรือ any ใน config เก่า) ต้องเช็คก่อนใช้

    Error Message: อย่า return error code เปล่าๆ ให้ return Object ที่มี message ชัดเจน

หมวด 16: Refactoring Mindset

    Kill Dead Code: ลบ Code หรือ Type ที่ไม่ได้ใช้ออกทันที

    Small Functions: แตกฟังก์ชันใหญ่ๆ ให้เล็กลง เพื่อให้ Type ไม่ซับซ้อนเกินไป

    Single Responsibility: 1 ฟังก์ชัน/Class ทำหน้าที่เดียว

    Meaningful Variable Names: ตั้งชื่อตัวแปรให้รู้เรื่องโดยไม่ต้องอ่าน comment

    Don't Clever: อย่าเขียน Type ที่ "ฉลาด" หรือซับซ้อนเกินไปจนทีมงง (KISS Principle)

    Update Deps: อัปเดต TypeScript และ Library อย่างสม่ำเสมอ

    Review: ทำ Code Review โดยเน้นดูเรื่อง Type Safety เป็นหลัก