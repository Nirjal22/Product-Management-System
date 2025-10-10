"use client";
import React, { memo, useState, useEffect } from "react";
import Image from "next/image";
import { deleting, updating } from "../deleteAndUpdate/page";

function ProductCard({
  id,
  name,
  brand,
  category,
  price,
  warranty,
  pictureBase64,
}: {
  id: string;
  name: string;
  brand: string;
  category: string;
  price: number;
  warranty: string;
  pictureBase64: string;
}) {
  return (
    <li className="p-4 border rounded-lg shadow-md ">
      <div>
        <p>ID: {id}</p>
        <h2>{name}</h2>
        <p>Brand: {brand}</p>
        <p>Category: {category}</p>
        <p>Price: ${price}</p>
        <p>Warranty: {warranty}</p>
        {pictureBase64 && (
          <img
            src={`data:image/jpeg;base64,${pictureBase64}`}
            alt={name}
            style={{ width: "150px", height: "150px", objectFit: "cover" }}
          />
        )}
        {/* updating and deleting the products */}
        <div>
          <button onClick={() => updating()}>
            <Image src="/update.svg" alt="Update" width={20} height={20} />
          </button>
          <button onClick={() => deleting(id)}>
            <Image src="/delete.svg" alt="delete" width={20} height={20} />
          </button>
        </div>
      </div>
    </li>
  );
}

function ReceivingData() {
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch("http://localhost:8080/products/viewProducts")
      .then((res) => {
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }
        return res.json();
      })
      .then((data) => {
        console.log("Fetched products:", data);
        setProducts(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching products:", err);
        setError(err.message);
        setLoading(false);
      });
  }, []);

  if (loading) return <p>Loading products...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div>
      <h1>Products</h1>
      <ul style={{ listStyle: "none", padding: 0, display: "grid", gap: "1rem" }}>
        {products.map((prod) => (
          <ProductCard
            key={prod.id}
            id={prod.id}
            name={prod.name}
            brand={prod.brand}
            category={prod.category}
            price={prod.price}
            warranty={prod.warranty}
            pictureBase64={prod.pictureBase64}
          />
        ))}
      </ul>
    </div>
  );
}

export default memo(ReceivingData);
