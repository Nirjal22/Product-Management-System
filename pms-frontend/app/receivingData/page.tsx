"use client";
import React, { memo, useState, useEffect } from "react";
import Image from "next/image";
import { deleting } from "../sendingData/page";

// ---------- Product Card ----------
function ProductCard({
  id,
  name,
  brand,
  category,
  price,
  warranty,
  pictureBase64,
  onProductUpdated,
}: {
  id: string;
  name: string;
  brand: string;
  category: string;
  price: number;
  warranty: string;
  pictureBase64: string;
  onProductUpdated: (updatedProduct: any) => void;
}) {
  const [showPopup, setShowPopup] = useState(false);
  const [showClickingYes, setShowClickingYes] = useState(false);

  const [updatedName, setUpdatedName] = useState(name);
  const [updatedBrand, setUpdatedBrand] = useState(brand);
  const [updatedCategory, setUpdatedCategory] = useState(category);
  const [updatedWarranty, setUpdatedWarranty] = useState(warranty);
  const [updatedPrice, setUpdatedPrice] = useState(price.toString());
  const [updatedPicture, setUpdatedPicture] = useState<File | null>(null);

  const handleUpdatedImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) setUpdatedPicture(event.target.files[0]);
  };

  // Update logic
  const handleSubmitUpdate = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append("name", updatedName);
    formData.append("brand", updatedBrand);
    formData.append("category", updatedCategory);
    formData.append("warranty", updatedWarranty);
    formData.append("price", updatedPrice);
    if (updatedPicture) formData.append("picture", updatedPicture);

    try {
      const response = await fetch(`http://localhost:8080/products/updateProduct/${id}`, {
        method: "POST",
        body: formData,
      });

      if (!response.ok) throw new Error(`Failed to update: ${response.status}`);
      const updatedProduct = await response.json();

      onProductUpdated(updatedProduct);
      setShowClickingYes(false);
      setShowPopup(false);
    } catch (error) {
      console.error("Update failed:", error);
      alert("Failed to update product.");
    }
  };

  return (
    <li style={{ border: "1px solid #ccc", padding: "1rem", borderRadius: "10px" }}>
      <div>
        <p><b>ID:</b> {id}</p>
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

        <div style={{ marginTop: "1rem" }}>
          <button onClick={() => setShowPopup(true)}>
            <Image src="/update.svg" alt="Update" width={20} height={20} />
          </button>{" "}
          <button onClick={() => deleting(id)}>
            <Image src="/delete.svg" alt="delete" width={20} height={20} />
          </button>
        </div>
      </div>

      {/* Confirmation Popup */}
      {showPopup && (
        <div style={{ background: "#eee", padding: "1rem", marginTop: "1rem", borderRadius: "8px" }}>
          <h2>Update Product: {name}</h2>
          <p>Would you like to update this product?</p>
          <div>
            <button onClick={() => setShowClickingYes(true)}>Yes</button>{" "}
            <button onClick={() => setShowPopup(false)}>Cancel</button>
          </div>
        </div>
      )}

      {/* Update Form */}
      {showClickingYes && (
        <div style={{ marginTop: "1rem", background: "#fafafa", padding: "1rem", borderRadius: "8px" }}>
          <h2>Update Product Details</h2>
          <form onSubmit={handleSubmitUpdate}>
            <label>Name:</label>
            <input
              type="text"
              value={updatedName}
              onChange={(e) => setUpdatedName(e.target.value)}
            />
            <br />

            <label>Brand:</label>
            <input
              type="text"
              value={updatedBrand}
              onChange={(e) => setUpdatedBrand(e.target.value)}
            />
            <br />

            <label>Category:</label>
            <input
              type="text"
              value={updatedCategory}
              onChange={(e) => setUpdatedCategory(e.target.value)}
            />
            <br />

            <label>Warranty:</label>
            <input
              type="text"
              value={updatedWarranty}
              onChange={(e) => setUpdatedWarranty(e.target.value)}
            />
            <br />

            <label>Price:</label>
            <input
              type="number"
              value={updatedPrice}
              onChange={(e) => setUpdatedPrice(e.target.value)}
            />
            <br />

            <label>Picture:</label>
            <input type="file" accept="image/*" onChange={handleUpdatedImageChange} />
            <br />
            <br />

            <button type="submit">Submit</button>{" "}
            <button type="button" onClick={() => setShowClickingYes(false)}>
              Cancel
            </button>
          </form>
        </div>
      )}
    </li>
  );
}

// ---------- Product List ----------
function ReceivingData() {
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch("http://localhost:8080/products/viewProducts")
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
        return res.json();
      })
      .then((data) => {
        setProducts(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  // Update product in the list without reload
  const handleProductUpdated = (updatedProduct: any) => {
    setProducts((prev) =>
      prev.map((p) =>
        p.id === updatedProduct.id
          ? { ...p, ...updatedProduct } // spread all fields including pictureBase64
          : p
      )
    );
  };


  if (loading) return <p>Loading products...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div>
      <h1>Products</h1>
      <ul style={{ listStyle: "none", padding: 0, display: "grid", gap: "1rem" }}>
        {products
          .sort((a, b) => a.id - b.id)
          .map((prod) => (
            <ProductCard
              key={prod.id}
              id={prod.id}
              name={prod.name}
              brand={prod.brand}
              category={prod.category}
              price={prod.price}
              warranty={prod.warranty}
              pictureBase64={prod.pictureBase64}
              onProductUpdated={handleProductUpdated}
            />
          ))}
      </ul>
    </div>
  );
}

export default memo(ReceivingData);
