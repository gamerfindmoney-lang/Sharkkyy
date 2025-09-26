import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

// ข้อมูลสินค้า
const PRODUCTS = {
  featured: [
    {
      id: "feat-001",
      title: "Over size Tee",
      description: "เสื้อยืด Over size ผ้านุ่ม ใส่สบาย — ดีไซน์ลายครีบฉลาม",
      image: "65192_0.jpg",
    },
    {
      id: "feat-002",
      title: "Polo Shirt",
      description: "เสื้อคอปกตัดเย็บประณีต มีรายละเอียดครีบฉลามแบบเรียบ",
      image: "65193_0.jpg",
    },
    {
      id: "feat-003",
      title: "Hoodie",
      description: "เสื้อฮู้ดลายครีบฉลาม ผ้าหนาอุ่น พร้อมกระเป๋าหน้า",
      image: "65202.jpg",
      gallery: ["65192_0.jpg", "65192_0.jpg", "65192_0.jpg", "65192_0.jpg"],
    },
  ],
  men: [
    {
      id: "men-001",
      title: "Over size Tee",
      price: 1200,
      sizes: ["S", "M", "L", "XL"],
      image: "65192_0.jpg",
    },
    {
      id: "men-002",
      title: "Polo Shirt",
      price: 1500,
      sizes: ["S", "M", "L", "XL"],
      image: "65193_0.jpg",
    },
    {
      id: "men-003",
      title: "Hoodie",
      price: 2200,
      sizes: ["S", "M", "L", "XL"],
      image: "65202.jpg",
    },
  ],
  women: [
    {
      id: "women-001",
      title: "Over size Tee",
      price: 1200,
      sizes: ["S", "M", "L", "XL"],
      image: "65195_0.jpg",
    },
    {
      id: "women-002",
      title: "Polo Shirt",
      price: 1500,
      sizes: ["S", "M", "L", "XL"],
      image: "65196_0.jpg",
    },
    {
      id: "women-003",
      title: "Hoodie",
      price: 2200,
      sizes: ["S", "M", "L", "XL"],
      image: "65197_0.jpg",
    },
  ],
  kids: [
    {
      id: "kids-001",
      title: "Over size Tee (Kids)",
      price: 800,
      sizes: ["S", "M", "L"],
      image: "65198_0.jpg",
    },
    {
      id: "kids-002",
      title: "Polo Shirt (Kids)",
      price: 900,
      sizes: ["S", "M", "L"],
      image: "65199_0.jpg",
    },
    {
      id: "kids-003",
      title: "Hoodie (Kids)",
      price: 1200,
      sizes: ["S", "M", "L"],
      image: "65200_0.jpg",
    },
  ],
};

// App หลัก
export default function App() {
  const [cart, setCart] = useState([]);

  // ฟังก์ชันเพิ่มใส่ตะกร้า
  const addToCart = (item, size = null, quantity = 1) => {
    const entry = {
      id: `${item.id}_${size || "na"}_${Date.now()}`,
      title: item.title,
      price: item.price ?? 0,
      size,
      quantity,
    };
    setCart((prev) => [...prev, entry]);
  };

  // ฟังก์ชันลบรายการในตะกร้า
  const removeFromCart = (id) => {
    setCart((prev) => prev.filter((item) => item.id !== id));
  };

  return (
    <Router>
      {/* Navbar */}
      <nav className="flex justify-between items-center p-4 bg-black text-white">
        <h1 className="font-extrabold text-2xl">SHARKKY</h1>
        <ul className="flex gap-6">
          <li>
            <Link to="/">New & Featured</Link>
          </li>
          <li>
            <Link to="/men">Men</Link>
          </li>
          <li>
            <Link to="/women">Women</Link>
          </li>
          <li>
            <Link to="/kids">Kids</Link>
          </li>
          <li>
            <Link to="/checkout">Checkout</Link>
          </li>
        </ul>
      </nav>

      {/* Routes */}
      <Routes>
        <Route
          path="/"
          element={<FeaturedSection products={PRODUCTS.featured} />}
        />
        <Route
          path="/men"
          element={
            <CatalogSection products={PRODUCTS.men} addToCart={addToCart} />
          }
        />
        <Route
          path="/women"
          element={
            <CatalogSection products={PRODUCTS.women} addToCart={addToCart} />
          }
        />
        <Route
          path="/kids"
          element={
            <CatalogSection products={PRODUCTS.kids} addToCart={addToCart} />
          }
        />
        <Route
          path="/checkout"
          element={<Checkout cart={cart} removeFromCart={removeFromCart} />}
        />
      </Routes>
    </Router>
  );
}

// คอมโพเนนต์ Featured
function FeaturedSection({ products }) {
  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">New & Featured</h2>
      <p className="mb-4">
        แนะนำแบรนด์ SHARKKY —
        แรงบันดาลใจจากครีบฉลามและความกล้าหาญในการออกแบบเสื้อผ้า
      </p>
      <div className="space-y-6">
        {products.map((p) => (
          <div key={p.id} className="text-center">
            <img
              src={p.image}
              alt={p.title}
              className="w-full h-[600px] object-contain bg-gray-100 rounded mb-2"
            />
            <h3 className="font-bold mb-1 text-xl">{p.title}</h3>
            <p className="mb-4">{p.description}</p>

            {p.gallery && (
              <div className="grid grid-cols-2 md:grid-cols-4 gap-2 mt-4">
                {p.gallery.map((img, idx) => (
                  <img
                    key={idx}
                    src={img}
                    alt={`${p.title} ${idx + 1}`}
                    className="w-full h-25 object-contain bg-gray-100 rounded"
                  />
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

// คอมโพเนนต์ Catalog สำหรับ Men / Women / Kids
function CatalogSection({ products, addToCart }) {
  return (
    <div className="p-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {products.map((p) => (
        <ProductCard key={p.id} product={p} addToCart={addToCart} />
      ))}
    </div>
  );
}

// คอมโพเนนต์ ProductCard
function ProductCard({ product, addToCart }) {
  const [size, setSize] = useState(product.sizes?.[0] ?? "M");
  const [quantity, setQuantity] = useState(1);

  return (
    <div className="border rounded p-4 text-center shadow">
      <img
        src={product.image}
        alt={product.title}
        className="w-full h-[300px] object-contain bg-gray-100 rounded mb-2"
      />
      <h3 className="font-bold mb-1">{product.title}</h3>
      <p className="font-semibold mb-2">฿{product.price}</p>

      <div className="mb-2">
        <label className="mr-2">Size:</label>
        <select
          value={size}
          onChange={(e) => setSize(e.target.value)}
          className="border rounded p-1"
        >
          {product.sizes?.map((s) => (
            <option key={s} value={s}>
              {s}
            </option>
          ))}
        </select>
      </div>

      <div className="mb-2">
        <label className="mr-2">Qty:</label>
        <input
          type="number"
          min="1"
          value={quantity}
          onChange={(e) => setQuantity(Number(e.target.value))}
          className="border rounded p-1 w-16"
        />
      </div>

      <button
        onClick={() => addToCart(product, size, quantity)}
        className="px-4 py-2 bg-black text-white rounded hover:bg-gray-800"
      >
        Add to Cart
      </button>
    </div>
  );
}

// คอมโพเนนต์ Checkout
function Checkout({ cart, removeFromCart }) {
  const [payment, setPayment] = useState("");
  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <div className="p-8 max-w-2xl mx-auto">
      <h2 className="text-3xl font-bold mb-6">ชำระเงิน</h2>

      {/* ตะกร้าสินค้า */}
      <div className="mb-6 border rounded-lg p-4 shadow">
        <h3 className="text-xl font-semibold mb-2">ตะกร้าสินค้า</h3>
        {cart.length === 0 ? (
          <p className="text-gray-500">ไม่มีสินค้าในตะกร้า</p>
        ) : (
          <>
            <ul className="space-y-2">
              {cart.map((item) => (
                <li
                  key={item.id}
                  className="flex justify-between border-b pb-2"
                >
                  <span>
                    {item.title} ({item.size}) x{item.quantity}
                  </span>
                  <span>฿{item.price * item.quantity}</span>
                </li>
              ))}
            </ul>
            <div className="flex justify-between mt-4 font-bold">
              <span>รวมทั้งหมด</span>
              <span>฿{total}</span>
            </div>
          </>
        )}
      </div>

      {/* เลือกช่องทางการชำระเงิน */}
      <div className="mb-6 border rounded-lg p-4 shadow">
        <h3 className="text-xl font-semibold mb-2">เลือกช่องทางการชำระเงิน</h3>
        <label className="block mb-2">
          <input
            type="radio"
            name="payment"
            value="card"
            onChange={(e) => setPayment(e.target.value)}
          />
          <span className="ml-2">บัตรเครดิต / เดบิต</span>
        </label>
        <label className="block">
          <input
            type="radio"
            name="payment"
            value="qr"
            onChange={(e) => setPayment(e.target.value)}
          />
          <span className="ml-2">QR Code / พร้อมเพย์</span>
        </label>
      </div>

      {/* ถ้าเลือกบัตร */}
      {payment === "card" && (
        <div className="mb-6 border rounded-lg p-4 shadow">
          <input
            placeholder="หมายเลขบัตร"
            className="w-full p-2 border mb-2 rounded"
          />
          <div className="flex gap-2">
            <input placeholder="MM/YY" className="w-1/2 p-2 border rounded" />
            <input placeholder="CVV" className="w-1/2 p-2 border rounded" />
          </div>
        </div>
      )}

      {/* ถ้าเลือก QR */}
      {payment === "qr" && (
        <div className="text-center mb-6">
          <img
            src="https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=SHARKKY-PROMPTPAY"
            alt="QR Code"
            className="mx-auto h-52 w-52 object-contain bg-gray-100 rounded"
          />
          <p className="mt-2 text-sm text-gray-600">พร้อมเพย์: 0XX-XXX-XXXX</p>
        </div>
      )}

      <button className="bg-black text-white px-6 py-3 rounded hover:bg-gray-800">
        ยืนยันการชำระเงิน
      </button>
    </div>
  );
}
